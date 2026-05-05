import { cn } from "@/lib/utils";

type SealProps = {
  className?: string;
  variant?: "full" | "mark" | "kanji";
  size?: number;
};

/**
 * MASAYOSHI seal — used on hero, footer, loading states, products.
 * Modular: full (mark + ring + kanji), mark (just M), kanji (正義).
 */
export function Seal({ className, variant = "full", size = 80 }: SealProps) {
  if (variant === "kanji") {
    return (
      <span
        className={cn("seal text-[1em] leading-none", className)}
        style={{ fontSize: size }}
        aria-label="Masayoshi"
      >
        正義
      </span>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={cn(className)}
      aria-label="Masayoshi seal"
    >
      <circle
        cx="60"
        cy="60"
        r="58"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.3"
      />
      {/* tick marks */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const r1 = 50;
        const r2 = i % 6 === 0 ? 44 : 47;
        return (
          <line
            key={i}
            x1={60 + Math.cos(a) * r1}
            y1={60 + Math.sin(a) * r1}
            x2={60 + Math.cos(a) * r2}
            y2={60 + Math.sin(a) * r2}
            stroke="currentColor"
            strokeWidth="0.4"
            opacity={i % 6 === 0 ? 0.7 : 0.35}
          />
        );
      })}
      {/* M monogram */}
      {variant === "full" && (
        <>
          <path
            d="M30 78 L30 42 L42 42 L60 66 L78 42 L90 42 L90 78 L82 78 L82 56 L66 78 L54 78 L38 56 L38 78 Z"
            fill="currentColor"
          />
          <text
            x="60"
            y="96"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6"
            letterSpacing="2"
            fill="currentColor"
            opacity="0.6"
          >
            ORDEM · 047
          </text>
        </>
      )}
      {variant === "mark" && (
        <path
          d="M30 78 L30 42 L42 42 L60 66 L78 42 L90 42 L90 78 L82 78 L82 56 L66 78 L54 78 L38 56 L38 78 Z"
          fill="currentColor"
        />
      )}
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-[clamp(1.3rem,2vw,1.7rem)] font-medium tracking-tight",
        className
      )}
    >
      <span className="font-jp text-[0.85em] text-blood opacity-80">正</span>
      <span>MASAYOSHI</span>
      <span className="font-jp text-[0.85em] text-blood opacity-80">義</span>
    </span>
  );
}
