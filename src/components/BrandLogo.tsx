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
      className={`${sizeClasses[size].mark} shrink-0 rounded-xl border border-white/20 bg-[#12121A] p-1.5 shadow-[0_0_24px_rgba(139,92,246,0.2)]`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" role="img">
        <defs>
          <linearGradient id="autom8-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#autom8-mark-gradient)" opacity="0.2" />
        <path
          d="M50 15C34 15 23 25 23 38c0 8 4 15 11 19-8 4-13 12-13 21 0 14 12 24 29 24s29-10 29-24c0-9-5-17-13-21 7-4 11-11 11-19 0-13-11-23-27-23zm0 10c10 0 16 6 16 14s-6 14-16 14-16-6-16-14 6-14 16-14zm0 37c11 0 18 7 18 16s-7 16-18 16-18-7-18-16 7-16 18-16z"
          fill="url(#autom8-mark-gradient)"
        />
      </svg>
    </span>
  );
}

function BrandWordmark({ size = "md", showDescriptor = true }: { size?: BrandLogoSize; showDescriptor?: boolean }) {
  return (
    <span className="flex flex-col leading-none whitespace-nowrap">
      <span className="flex items-center gap-0.5 tracking-tight">
        <span className={`${sizeClasses[size].autom} font-semibold text-white`} style={{ fontFamily: "var(--font-playfair), serif" }}>
          autom
        </span>
        <span className={`${sizeClasses[size].eight} font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent`}>
          8
        </span>
      </span>
      {showDescriptor ? (
        <span className={`${sizeClasses[size].descriptor} uppercase tracking-[0.22em] text-[#A1A1AA]`}>everything</span>
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
