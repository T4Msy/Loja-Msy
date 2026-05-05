"use client";

import { motion } from "framer-motion";

type Props = {
  items?: string[];
  speed?: number;
  reverse?: boolean;
};

const defaultItems = [
  "MASAYOSHI",
  "正義",
  "DROP 003",
  "OBSIDIAN",
  "ORDEM 047",
  "ESTOQUE FECHADO",
  "MASAYOSHI",
  "正義",
];

export function MarqueeStrip({ items = defaultItems, speed = 28, reverse = false }: Props) {
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg py-6 md:py-8">
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display flex items-center gap-12 text-[clamp(2.5rem,7vw,7rem)] leading-none text-bone"
          >
            {item}
            <span className="seal text-blood text-[0.7em]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
