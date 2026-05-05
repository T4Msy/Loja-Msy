# MASAYOSHI — Loja Oficial

> Drops limitados. Streetwear premium. Uma ordem para os que carregam o peso da própria coroa.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4 + custom theme
- **Animações:** Framer Motion
- **Estado:** Zustand (cart + auth)
- **Banco:** Supabase (PostgreSQL + Auth)
- **UI:** Radix UI + componentes customizados
- **Pagamentos:** Preparado para Stripe / Mercado Pago
- **Formulários:** React Hook Form + Zod

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o `.env.example` para `.env` e preencha com seus dados:

```bash
cp .env.example .env
```

Variáveis obrigatórias:
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Chave anônima do Supabase

### 3. Configurar o banco de dados

Execute o schema SQL no Supabase SQL Editor:

```bash
# O arquivo está em supabase/schema.sql
```

Isso criará as tabelas: `profiles`, `products`, `variants`, `drops`, `orders`, `order_items`, `coupons`, `newsletter_subscribers` e as políticas RLS.

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### 5. Build de produção

```bash
npm run build
npm start
```

## Estrutura do projeto

```
src/
├── app/                    # Rotas (App Router)
│   ├── page.tsx            # Home
│   ├── layout.tsx          # Layout principal (header/footer/cart)
│   ├── globals.css         # Tema + utilitários CSS
│   ├── shop/               # Catálogo de produtos
│   ├── drops/              # Página de drops
│   ├── produto/[slug]/     # Detalhe do produto
│   ├── checkout/           # Checkout
│   ├── login/              # Login
│   ├── cadastro/           # Cadastro
│   ├── conta/              # Perfil do usuário
│   ├── manifesto/          # Manifesto da marca
│   ├── lookbook/           # Lookbook
│   ├── contato/            # Contato
│   ├── sobre/              # Sobre
│   ├── ajuda/              # Páginas de ajuda
│   ├── legal/              # Termos / privacidade
│   ├── (admin)/admin/      # Painel admin (route group)
│   └── api/                # API routes
├── components/
│   ├── brand/              # Seal, Wordmark
│   ├── cart/               # Cart drawer
│   ├── checkout/           # Checkout stepper
│   ├── drop/               # Drop card, countdown
│   ├── home/               # Hero, featured, manifesto, etc.
│   ├── layout/             # Header, footer, mobile menu, search
│   ├── product/            # Product card, detail, grid, gallery
│   ├── shop/               # Shop controls
│   └── ui/                 # Button, Input, Badge, Dialog, etc.
├── lib/
│   ├── fonts.ts            # Fontes (Inter, Cormorant, Noto Serif JP, JetBrains Mono)
│   ├── mock/               # Dados mock (produtos, drops)
│   ├── site.ts             # Config central da marca
│   ├── types.ts            # Tipos TypeScript
│   ├── utils.ts            # Utilidades (cn, formatBRL, etc.)
│   └── supabase/           # Client Supabase (browser + server)
├── providers/              # QueryClient + Auth + Toaster
└── store/
    ├── cart.ts              # Zustand — carrinho
    └── auth.ts             # Zustand — autenticação
```

## Funcionalidades

### Loja
- Home animada com hero, drops, produtos e manifesto
- Página de drops com filtros (live, scheduled, archived)
- Catálogo de produtos com filtros e ordenação
- Página de produto com galeria, seleção de tamanho, add-to-cart
- Cards com hover frente/costas
- Carrinho lateral com drawer
- Checkout completo com identificação, endereço, frete e pagamento
- Cupom de desconto

### Autenticação
- Login / Cadastro com Supabase Auth
- Perfil do usuário com pedidos e endereços
- Middleware de proteção para rotas admin

### Admin
- Dashboard com métricas
- CRUD de produtos (criar, editar, ativar/desativar, excluir)
- CRUD de drops
- Controle de estoque por tamanho
- Gestão de pedidos com filtros por status
- Acesso restrito a role "admin"

### Design
- Tema escuro premium (preto profundo + vermelho escuro)
- Glassmorphism discreto
- Animações suaves com Framer Motion
- Tipografia japonesa (Kanji) + serif + mono
- Totalmente responsivo
- Loading, empty e error states

## Depende de configuração externa

- **Supabase:** Criar projeto, configurar URL/keys, rodar `supabase/schema.sql`
- **Pagamentos:** Integrar Stripe ou Mercado Pago (rotas API preparadas)
- **Domínio:** Configurar `NEXT_PUBLIC_SITE_URL` para produção
- **Storage:** Configurar buckets no Supabase para upload de imagens

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Iniciar servidor de produção |
| `npm run lint` | Lint com ESLint |
| `npm run typecheck` | Verificação de tipos TypeScript |

---

MASAYOSHI · 正義 · A Ordem não pede licença.