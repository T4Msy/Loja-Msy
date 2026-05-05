"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const shots = [
  {
    src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1600&auto=format&fit=crop",
    label: "Editorial 01",
    h: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1600&auto=format&fit=crop",
    label: "Editorial 02",
    h: "short",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    label: "Editorial 03",
    h: "short",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1600&auto=format&fit=crop",
    label: "Editorial 04",
    h: "tall",
  },
];

export function LookbookTeaser() {
  return (
    <section className="bg-bg py-32 md:py-40">
      <div className="container-edge">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end pb-12 border-b border-line"
        >
          <div>
            <p className="label-tag mb-3">Lookbook · DROP 003</p>
            <h2 className="display text-4xl md:text-6xl text-bone leading-[0.95]">
              <span className="italic font-light text-fg">Vestido em</span>
              <br />
              silêncio.
            </h2>
          </div>
          <Link
            href="/lookbook"
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-bone hover:text-blood transition-colors"
          >
            Ver editorial completo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-4 mt-12">
          {shots.map((shot, i) => (
            <motion.figure
              key={shot.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative overflow-hidden bg-bg-2 border border-line group ${
                shot.h === "tall" ? "aspect-[3/5]" : "aspect-[3/4] md:mt-12"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.label}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-bone opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.32em]">
                  {shot.label}
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
