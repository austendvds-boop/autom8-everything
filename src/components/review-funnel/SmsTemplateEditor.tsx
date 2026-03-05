"use client"

const VARIABLE_KEYS = ["{customer_name}", "{business_name}", "{funnel_url}"] as const

interface SmsTemplateEditorProps {
  value: string
  onChange: (nextValue: string) => void
  disabled?: boolean
  customerNamePreview?: string
  businessNamePreview?: string
  funnelUrlPreview?: string
}

function interpolateTemplate(template: string, vars: { customerName: string; businessName: string; funnelUrl: string }): string {
  return template
    .replaceAll("{customer_name}", vars.customerName)
    .replaceAll("{business_name}", vars.businessName)
    .replaceAll("{funnel_url}", vars.funnelUrl)
}

export default function SmsTemplateEditor({
  value,
  onChange,
  disabled = false,
  customerNamePreview = "Alex",
  businessNamePreview = "Your Business",
  funnelUrlPreview = "https://autom8everything.com/r/abc123",
}: SmsTemplateEditorProps) {
  const previewText = interpolateTemplate(value, {
    customerName: customerNamePreview,
    businessName: businessNamePreview,
    funnelUrl: funnelUrlPreview,
  })

  function insertVariable(variableKey: string) {
    if (disabled) {
      return
    }

    const spacer = value.length > 0 && !value.endsWith(" ") ? " " : ""
    onChange(`${value}${spacer}${variableKey}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[#D4D4D8]">Template variables</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {VARIABLE_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => insertVariable(key)}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-[#C4B5FD] transition hover:border-[#8B5CF6]/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#D4D4D8]">SMS template</span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          rows={6}
          className="w-full rounded-xl border border-white/15 bg-[#0D0D13] p-3 text-sm text-white placeholder:text-[#71717A] focus:border-[#8B5CF6] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Hi {customer_name}! Thanks for choosing {business_name}..."
        />
      </label>

      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
        <p className="text-xs uppercase tracking-wide text-[#8B5CF6]">Preview</p>
        <p className="mt-2 whitespace-pre-wrap text-sm text-[#E4E4E7]">{previewText}</p>
      </div>
    </div>
  )
}
