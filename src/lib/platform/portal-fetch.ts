export class PortalSessionExpiredError extends Error {
  constructor() {
    super("Your session has expired. Please log in again.")
    this.name = "PortalSessionExpiredError"
  }
}

export async function portalFetch(url: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(url, { ...init, cache: "no-store" })

  if (response.status === 401) {
    throw new PortalSessionExpiredError()
  }

  return response
}
