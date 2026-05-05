"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-[80px_1fr] lg:gap-4">
        {/* Thumbs */}
        <div className="hidden lg:flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden border transition-all",
                active === i ? "border-blood" : "border-line hover:border-line-3"
              )}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image src={src} alt={`${alt} - ${i + 1}`} fill sizes="80px" className="object-cover" />
              {active === i && (
                <span className="absolute inset-0 ring-1 ring-inset ring-blood pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Main */}
        <div
          ref={ref}
          className="relative aspect-[4/5] w-full overflow-hidden bg-bg-2 border border-line cursor-zoom-in group"
          onMouseMove={handleMouse}
          onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
          onClick={() => setZoom(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]}
                alt={alt}
                fill
                priority={active === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                style={{
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-bg/85 border border-line-2 backdrop-blur-md px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.32em] text-bone opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-3 w-3" />
            Clique para ampliar
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.32em] text-bone bg-bg/85 border border-line-2 backdrop-blur-md px-3 py-1.5">
            {active + 1} / {images.length}
          </div>
        </div>

        {/* Mobile thumbs */}
        <div className="flex gap-2 lg:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-16 shrink-0 overflow-hidden border transition-all",
                active === i ? "border-blood" : "border-line"
              )}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image src={src} alt={`${alt} - ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg/95 backdrop-blur-2xl flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setZoom(false)}
          >
            <button
              onClick={() => setZoom(false)}
              aria-label="Fechar"
              className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center text-bone hover:text-blood transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full max-w-5xl max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
