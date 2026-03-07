import type { Metadata } from "next"
import AdminClientsClient from "./AdminClientsClient"

export const metadata: Metadata = {
  title: "Admin | Client Management",
  description: "Internal client management dashboard.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

export default function AdminClientsPage() {
  return <AdminClientsClient />
}
