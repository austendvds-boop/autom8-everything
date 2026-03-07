"use client";

type ComparisonColumn = {
  label: string;
  highlight?: boolean;
};

type ComparisonRow = {
  feature: string;
  values: string[];
};

type Props = {
  title: string;
  subtitle?: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
};

export default function ComparisonTable({ title, subtitle, columns, rows }: Props) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-heading mb-4">{title}</h2>
        {subtitle && <p className="section-subheading mb-8">{subtitle}</p>}

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0A0F]">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-5 py-4 text-sm font-semibold text-white">Feature</th>
                {columns.map((col) => (
                  <th
                    key={col.label}
                    className={`px-5 py-4 text-sm font-semibold ${
                      col.highlight ? "text-[#C4B5FD] bg-[#8B5CF6]/[0.05]" : "text-[#A1A1AA]"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 last:border-b-0">
                  <td className="px-5 py-4 text-sm font-medium text-white">{row.feature}</td>
                  {row.values.map((val, i) => (
                    <td
                      key={i}
                      className={`px-5 py-4 text-sm ${
                        columns[i]?.highlight ? "text-[#DDD6FE] bg-[#8B5CF6]/[0.03]" : "text-[#A1A1AA]"
                      }`}
                    >
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.feature} className="card-base p-4">
              <p className="text-sm font-semibold text-white mb-3">{row.feature}</p>
              {columns.map((col, i) => (
                <div
                  key={col.label}
                  className={`flex justify-between py-1.5 ${i > 0 ? "border-t border-white/5" : ""}`}
                >
                  <span className={`text-xs ${col.highlight ? "text-[#C4B5FD] font-medium" : "text-[#52525B]"}`}>
                    {col.label}
                  </span>
                  <span className={`text-sm ${col.highlight ? "text-[#DDD6FE]" : "text-[#A1A1AA]"}`}>
                    {row.values[i]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
