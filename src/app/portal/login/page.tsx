import type { Metadata } from "next"
import PortalLoginClient from "./PortalLoginClient"

export const metadata: Metadata = {
  title: "Client Portal Login",
  description: "Autom8 Everything client portal.",
  robots: {
    index: false,
    follow: false,
  },
}

interface PortalLoginPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const errorParam = resolvedSearchParams.error
  const oauthError = Array.isArray(errorParam) ? errorParam[0] : errorParam

  return <PortalLoginClient oauthError={oauthError} />
}
