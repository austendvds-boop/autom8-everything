import { NextResponse } from "next/server"

const GOOGLE_PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getPlacesApiKey(): string | null {
  return (
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim() ||
    null
  )
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get("q")?.trim()

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Please enter at least 2 characters" }, { status: 400 })
  }

  const apiKey = getPlacesApiKey()

  if (!apiKey) {
    return NextResponse.json({ error: "Google Places search is not set up yet" }, { status: 500 })
  }

  const response = await fetch(GOOGLE_PLACES_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress",
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 6,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    const errorText = await response.text()
    return NextResponse.json({ error: errorText || "Google Places request failed" }, { status: 500 })
  }

  const payload = (await response.json()) as {
    places?: Array<{
      id?: string
      displayName?: { text?: string }
      formattedAddress?: string
    }>
  }

  const results = (payload.places ?? [])
    .map((place) => {
      const placeId = place.id?.trim()
      const name = place.displayName?.text?.trim() || "Business"
      const address = place.formattedAddress?.trim() || ""

      if (!placeId) {
        return null
      }

      return {
        placeId,
        name,
        address,
      }
    })
    .filter((item): item is { placeId: string; name: string; address: string } => Boolean(item))

  return NextResponse.json({ results })
}
