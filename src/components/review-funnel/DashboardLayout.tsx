"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMemo, useState, type ReactNode } from "react"
import {
  LayoutDashboard,
  MessageSquareText,
  MessageSquareWarning,
  Menu,
  Settings,
  X,
  LogOut,
} from "lucide-react"

interface DashboardLayoutProps {
  businessName: string
  children: ReactNode
}

const NAV_ITEMS = [
  {
    href: "/review-funnel/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/review-funnel/dashboard/reviews",
    label: "Reviews",
    icon: MessageSquareText,
  },
  {
    href: "/review-funnel/dashboard/feedback",
    label: "Feedback",
    icon: MessageSquareWarning,
  },
  {
    href: "/review-funnel/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
] as const

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/review-funnel/dashboard") {
    return pathname === href
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function DashboardLayout({ businessName, children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const initials = useMemo(() => {
    const words = businessName
      .trim()
      .split(/\s+/)
      .filter(Boolean)

    if (words.length === 0) {
      return "RF"
    }

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase()
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }, [businessName])

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await fetch("/api/review-funnel/auth/logout", {
        method: "POST",
      })
    } finally {
      router.push("/review-funnel/login")
      router.refresh()
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-[-220px] z-0 mx-auto h-[420px] w-[760px] rounded-full bg-[#8B5CF6]/12 blur-3xl" />

      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-[#050507]/70 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#101018]/95 px-4 py-5 backdrop-blur-xl transition-transform duration-200 md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-6 flex items-center justify-between md:justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-[#8B5CF6]/40"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] text-xs font-bold text-white">
              {initials}
            </span>
            <span>Review Funnel</span>
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Dashboard navigation" className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = isNavItemActive(pathname, item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "border border-[#8B5CF6]/40 bg-[#8B5CF6]/15 text-white"
                    : "border border-transparent text-[#D4D4D8] hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-[#C4B5FD]" : "text-[#A1A1AA] group-hover:text-white"}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="relative z-10 md:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0A0A0F]/90 px-4 py-3 backdrop-blur-md sm:px-6 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open navigation"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/80 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Dashboard</p>
                <h1 className="truncate text-base font-semibold text-white sm:text-lg">{businessName}</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="h-4 w-4" />
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 md:px-8">{children}</main>
      </div>
    </div>
  )
}
