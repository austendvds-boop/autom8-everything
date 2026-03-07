import type { Metadata } from "next"
import AdminClientDetailClient from "./AdminClientDetailClient"

export const metadata: Metadata = {
  title: "Admin | Client Detail",
  description: "Internal client detail dashboard.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <AdminClientDetailClient clientId={id} />
}
