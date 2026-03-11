import Link from "next/link";

type BrandLogoSize = "xs" | "sm" | "md" | "lg";

type BrandLogoProps = {
  href?: string;
  className?: string;
  size?: BrandLogoSize;
  showDescriptor?: boolean;
  showMark?: boolean;
  as?: "link" | "span";
  screenReaderText?: string;
};

const sizeClasses = {
  xs: {
    mark: "h-6 w-6",
    autom: "text-base",
    eight: "text-base",
    descriptor: "text-[9px]",
    gap: "gap-2",
  },
  sm: {
    mark: "h-8 w-8",
    autom: "text-lg",
    eight: "text-lg",
    descriptor: "text-[10px]",
    gap: "gap-2.5",
  },
  md: {
    mark: "h-10 w-10",
    autom: "text-xl",
    eight: "text-xl",
    descriptor: "text-xs",
    gap: "gap-3",
  },
  lg: {
    mark: "h-14 w-14",
    autom: "text-3xl",
    eight: "text-3xl",
    descriptor: "text-sm",
    gap: "gap-3",
  },
};

function BrandMark({ size = "md" }: { size?: BrandLogoSize }) {
  return (
    <span
      className={`${sizeClasses[size].mark} shrink-0 rounded-xl border border-white/10 bg-[rgba(212,160,48,0.10)] p-1.5 shadow-[0_0_20px_rgba(212,160,48,0.12)] transition-shadow hover:shadow-[0_0_28px_rgba(212,160,48,0.22)]`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="h-full w-full" role="img">
        <defs>
          <linearGradient id="autom8-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A030" />
            <stop offset="100%" stopColor="#E8C068" />
          </linearGradient>
        </defs>
        {/* Three stacked chevrons — forward motion / automation flow */}
        <path d="M8 6 L18 16 L8 26" stroke="url(#autom8-mark-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 6 L24 16 L14 26" stroke="url(#autom8-mark-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
        <path d="M20 6 L30 16 L20 26" stroke="url(#autom8-mark-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
      </svg>
    </span>
  );
}

function BrandWordmark({ size = "md", showDescriptor = true }: { size?: BrandLogoSize; showDescriptor?: boolean }) {
  return (
    <span className="flex flex-col leading-none whitespace-nowrap">
      <span className="flex items-center gap-0.5 tracking-tight">
        <span
          className={`${sizeClasses[size].autom} font-bold text-[#EDEBE8]`}
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          Autom
        </span>
        <span
          className={`${sizeClasses[size].eight} font-bold bg-gradient-to-r from-[#D4A030] to-[#E8C068] bg-clip-text text-transparent`}
          style={{ fontFamily: "var(--font-manrope), sans-serif" }}
        >
          8
        </span>
      </span>
      {showDescriptor ? (
        <span
          className={`${sizeClasses[size].descriptor} font-semibold uppercase tracking-[0.22em] text-[#9B978F]`}
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          everything
        </span>
      ) : null}
    </span>
  );
}

export default function BrandLogo({
  href = "/",
  className = "",
  size = "md",
  showDescriptor = true,
  showMark = true,
  as = "link",
  screenReaderText,
}: BrandLogoProps) {
  const fallbackText = screenReaderText ?? (showDescriptor ? "Autom8 Everything" : "Autom8");

  const visual = (
    <span aria-hidden="true" className={`inline-flex items-center ${sizeClasses[size].gap}`}>
      {showMark ? <BrandMark size={size} /> : null}
      <BrandWordmark size={size} showDescriptor={showDescriptor} />
    </span>
  );

  if (as === "span") {
    return (
      <span className={`inline-flex align-[-0.08em] ${className}`}>
        {visual}
        <span className="sr-only">{fallbackText}</span>
      </span>
    );
  }

  return (
    <Link href={href} className={`group inline-flex items-center ${className}`} aria-label={`${fallbackText} home`}>
      {visual}
    </Link>
  );
}
