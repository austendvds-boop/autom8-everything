import type { Metadata } from "next"
import SuccessClient from "./SuccessClient"

export const metadata: Metadata = {
  title: "Welcome to Autom8",
  robots: {
    index: false,
    follow: false,
  },
}

function normalizeSearchParam(value: string | string[] | undefined): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  if (Array.isArray(value) && value.length > 0) {
    const first = value[0]?.trim()
    return first && first.length > 0 ? first : null
  }

  return null
}

export default async function PortalCheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await searchParams
  const email = normalizeSearchParam(resolvedSearchParams.email)

  return <SuccessClient email={email} />
}
