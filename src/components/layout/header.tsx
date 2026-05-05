"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { Wordmark } from "@/components/brand/seal";
import { useCart, cartTotals } from "@/store/cart";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { SearchOverlay } from "./search-overlay";

const navLinks = [
  { label: "Drops", href: "/drops" },
  { label: "Loja", href: "/shop" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItems = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const itemCount = cartItems.reduce((acc, x) => acc + x.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.78)" : "rgba(5,5,5,0)",
          borderColor: scrolled ? "rgba(36,36,36,1)" : "rgba(36,36,36,0)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-xl",
          scrolled && "supports-[backdrop-filter]:bg-bg/60"
        )}
      >
        <div className="container-edge flex h-[68px] items-center justify-between gap-6">
          {/* Left — nav + mobile burger */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-bone hover:text-blood transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group relative font-mono text-[11px] uppercase tracking-[0.28em] text-fg-muted transition-colors hover:text-bone"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-px">
                    {l.label}
                  </span>
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-blood transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Center — wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-label="Página inicial Masayoshi"
          >
            <Wordmark className="text-bone hover:text-blood transition-colors duration-500" />
          </Link>

          {/* Right — actions */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="text-fg-muted hover:text-bone transition-colors"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link
              href="/conta"
              aria-label="Minha conta"
              className="hidden sm:inline-flex text-fg-muted hover:text-bone transition-colors"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={openCart}
              aria-label="Abrir carrinho"
              className="relative inline-flex items-center gap-2 text-bone hover:text-blood transition-colors"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center bg-blood px-1 font-mono text-[9px] text-bone leading-none"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
