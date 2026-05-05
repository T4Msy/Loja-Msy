-- ============================================================
-- MASAYOSHI — Supabase Schema
-- Execute this in the Supabase SQL Editor to set up the database.
-- ============================================================

-- ─── Extensions ────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles (extends auth.users) ────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  role         TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ─── Products ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                TEXT UNIQUE NOT NULL,
  name                TEXT NOT NULL,
  subtitle            TEXT,
  category            TEXT NOT NULL CHECK (category IN ('tee','long-sleeve','hoodie','crewneck','outerwear','pants','shorts','headwear','accessory')),
  drop_id             UUID REFERENCES drops(id) ON DELETE SET NULL,
  description         TEXT NOT NULL DEFAULT '',
  story               TEXT,
  composition         TEXT[],
  price_cents         INTEGER NOT NULL,
  compare_price_cents INTEGER,
  image_front         TEXT NOT NULL,
  image_back          TEXT NOT NULL,
  image_gallery       TEXT[],
  image_hover          TEXT,
  status              TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active','draft','sold-out','scheduled','archived')),
  release_at          TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  position            INTEGER DEFAULT 0
);

-- ─── Variants (sizes + stock) ──────────────────────────────
CREATE TABLE IF NOT EXISTS variants (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size       TEXT NOT NULL CHECK (size IN ('PP','P','M','G','GG','XGG','U')),
  stock      INTEGER NOT NULL DEFAULT 0,
  sku        TEXT UNIQUE NOT NULL
);

-- ─── Drops ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS drops (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  tagline         TEXT NOT NULL DEFAULT '',
  story           TEXT NOT NULL DEFAULT '',
  cover           TEXT NOT NULL,
  poster          TEXT,
  video_url       TEXT,
  status          TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('live','scheduled','sold-out','archived')),
  release_at      TIMESTAMPTZ NOT NULL,
  ends_at         TIMESTAMPTZ,
  product_count    INTEGER NOT NULL DEFAULT 0,
  total_units      INTEGER,
  ordem_numero    TEXT NOT NULL DEFAULT '047',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Orders ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number           TEXT UNIQUE NOT NULL,
  user_id          UUID REFERENCES profiles(id) ON DELETE SET NULL,
  email            TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','shipped','delivered','canceled','refunded')),
  subtotal_cents   INTEGER NOT NULL,
  shipping_cents   INTEGER NOT NULL DEFAULT 0,
  discount_cents   INTEGER NOT NULL DEFAULT 0,
  total_cents      INTEGER NOT NULL,
  shipping_address  JSONB NOT NULL,
  shipping_method   JSONB,
  payment_method   TEXT NOT NULL CHECK (payment_method IN ('pix','credit_card','stripe','mp','apple_pay','google_pay')),
  tracking_code    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at           TIMESTAMPTZ
);

-- ─── Order Items ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id     UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   UUID NOT NULL REFERENCES products(id),
  variant_id   UUID NOT NULL REFERENCES variants(id),
  name         TEXT NOT NULL,
  size         TEXT NOT NULL,
  image        TEXT NOT NULL,
  price_cents  INTEGER NOT NULL,
  quantity     INTEGER NOT NULL
);

-- ─── Coupons ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coupons (
  code           TEXT PRIMARY KEY,
  discount_type  TEXT NOT NULL CHECK (discount_type IN ('percent','fixed')),
  value          INTEGER NOT NULL,
  minimum_cents  INTEGER,
  expires_at     TIMESTAMPTZ,
  active         BOOLEAN NOT NULL DEFAULT true
);

-- ─── Newsletter ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Indexes ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_drop_id ON products(drop_id);
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON variants(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_drops_status ON drops(status);

-- ─── RLS (Row Level Security) ─────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public read variants" ON variants FOR SELECT USING (TRUE);
CREATE POLICY "Public read drops" ON drops FOR SELECT USING (TRUE);
CREATE POLICY "Public read coupons" ON coupons FOR SELECT USING (active = true);

-- Users can read their own profile
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Users can read their own orders
CREATE POLICY "Users read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Newsletter insert (anon)
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

-- ─── Admin policies ──────────────────────────────────────
-- Create a helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Admin full access
CREATE POLICY "Admin manage products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admin manage variants" ON variants FOR ALL USING (is_admin());
CREATE POLICY "Admin manage drops" ON drops FOR ALL USING (is_admin());
CREATE POLICY "Admin manage orders" ON orders FOR ALL USING (is_admin());
CREATE POLICY "Admin manage order_items" ON order_items FOR ALL USING (is_admin());
CREATE POLICY "Admin manage coupons" ON coupons FOR ALL USING (is_admin());
CREATE POLICY "Admin read profiles" ON profiles FOR SELECT USING (is_admin());