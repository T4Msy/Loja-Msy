"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  target: string;
  size?: "sm" | "md" | "lg";
};

function calc(target: string) {
  const t = new Date(target).getTime();
  const diff = Math.max(0, t - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, ended: diff <= 0 };
}

export function Countdown({ target, size = "md" }: Props) {
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    setT(calc(target));
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const sizes = {
    sm: { num: "text-2xl", lbl: "text-[9px]" },
    md: { num: "text-4xl md:text-5xl", lbl: "text-[10px]" },
    lg: { num: "text-6xl md:text-8xl", lbl: "text-xs" },
  } as const;

  if (t.ended) {
    return (
      <p className="seal text-3xl md:text-4xl text-blood">完売 · ENCERRADO</p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3">
      <Cell value={t.days} label="Dias" size={size} />
      <Cell value={t.hours} label="Horas" size={size} />
      <Cell value={t.minutes} label="Min" size={size} />
      <Cell value={t.seconds} label="Seg" size={size} pulse />
    </div>
  );
}

function Cell({
  value,
  label,
  size,
  pulse,
}: {
  value: number;
  label: string;
  size: "sm" | "md" | "lg";
  pulse?: boolean;
}) {
  const sizes = {
    sm: "text-2xl",
    md: "text-4xl md:text-5xl",
    lg: "text-6xl md:text-8xl",
  };
  const padded = value.toString().padStart(2, "0");

  return (
    <div className={`flex flex-col items-center justify-center border border-line bg-bg p-3 md:p-4 ${pulse ? "border-blood-3" : ""}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={padded}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`display tabular-nums text-bone ${sizes[size]} leading-none`}
        >
          {padded}
        </motion.span>
      </AnimatePresence>
      <span className="font-mono text-[9px] mt-2 uppercase tracking-[0.32em] text-fg-muted">
        {label}
      </span>
    </div>
  );
}
