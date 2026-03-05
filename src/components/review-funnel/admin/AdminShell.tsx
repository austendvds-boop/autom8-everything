"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Building2, BarChart3, LogOut } from "lucide-react"

interface AdminShellProps {
  children: ReactNode
}

const NAV_ITEMS = [
  {
    href: "/review-funnel/admin",
    label: "Tenants",
    icon: Building2,
  },
  {
    href: "/review-funnel/admin/stats",
    label: "Stats",
    icon: BarChart3,
  },
] as const

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/review-funnel/admin") {
    return pathname === href || pathname.startsWith("/review-funnel/admin/tenants/")
  }

  return pathname === href
}

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await fetch("/api/review-funnel/admin/auth", {
        method: "DELETE",
      })
    } finally {
      router.push("/review-funnel/admin/login")
      router.refresh()
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-[-220px] z-0 mx-auto h-[420px] w-[760px] rounded-full bg-[#8B5CF6]/12 blur-3xl" />

      <div className="relative z-10 flex min-h-screen">
        <aside className="sticky top-0 h-screen w-72 border-r border-white/10 bg-[#101018]/95 p-6 backdrop-blur-xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Review Funnel</p>
            <h1 className="mt-2 text-xl font-semibold text-white">Admin Panel</h1>
            <p className="mt-1 text-sm text-[#A1A1AA]">Internal controls for Austen</p>
          </div>

          <nav className="space-y-2" aria-label="Admin navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(pathname, item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-white"
                      : "border border-transparent text-[#D4D4D8] hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-[#C4B5FD]" : "text-[#A1A1AA] group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
