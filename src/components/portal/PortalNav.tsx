"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import BrandLogo from "@/components/BrandLogo"

const portalLinks = [
  { href: "/portal", label: "Dashboard" },
  { href: "/portal/cadence", label: "Cadence" },
  { href: "/portal/billing", label: "Billing" },
]

export default function PortalNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-white/[0.06] bg-[#0E1015]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <BrandLogo size="sm" showDescriptor={false} />
        <div className="flex items-center gap-6">
          {portalLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/portal" && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${isActive ? "font-semibold text-[#EDEBE8]" : "text-[#9B978F] hover:text-white"}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
