const PHONE_REGEX = /\+?\d[\d\s\-().]{7,}\d/g

export function extractPhoneCandidates(...inputs: Array<string | null | undefined>): string[] {
  const candidates: string[] = []

  for (const input of inputs) {
    if (!input) continue
    const matches = input.match(PHONE_REGEX)
    if (!matches) continue
    candidates.push(...matches)
  }

  return candidates
}

export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null

  const digits = raw.replace(/[^\d+]/g, "")
  if (!digits) return null

  if (digits.startsWith("+") && digits.length >= 10 && digits.length <= 16) {
    return digits
  }

  const onlyNums = digits.replace(/\D/g, "")

  if (onlyNums.length === 10) {
    return `+1${onlyNums}`
  }

  if (onlyNums.length === 11 && onlyNums.startsWith("1")) {
    return `+${onlyNums}`
  }

  if (onlyNums.length >= 11 && onlyNums.length <= 15) {
    return `+${onlyNums}`
  }

  return null
}
