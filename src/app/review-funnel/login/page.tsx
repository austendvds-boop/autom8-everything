import type { Metadata } from "next"
import LoginClient from "./LoginClient"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Review Funnel Login | Autom8 Everything",
    description: "Enter your email and we'll send you a link to sign in.",
    path: "/review-funnel/login",
    keywords: ["review funnel login", "business review dashboard"],
  }),
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ReviewFunnelLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await searchParams
  const rawError = resolvedSearchParams.error
  const errorKey = typeof rawError === "string" ? rawError : Array.isArray(rawError) ? rawError[0] : null

  return <LoginClient initialErrorKey={errorKey} />
}
