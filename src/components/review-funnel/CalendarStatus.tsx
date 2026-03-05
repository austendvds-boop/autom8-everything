interface CalendarStatusProps {
  connected: boolean
  googleEmail?: string | null
  activeWatchCount?: number
  isBusy?: boolean
  onConnect: () => void | Promise<void>
  onDisconnect: () => void | Promise<void>
  errorMessage?: string | null
}

export default function CalendarStatus({
  connected,
  googleEmail,
  activeWatchCount = 0,
  isBusy = false,
  onConnect,
  onDisconnect,
  errorMessage,
}: CalendarStatusProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#12121A] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#8B5CF6]">Google Calendar</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Calendar connection</h3>
          <p className="mt-1 text-sm text-[#A1A1AA]">
            {connected
              ? "Your calendar is connected, so review requests can go out automatically."
              : "Connect your calendar to start sending review requests automatically."}
          </p>
        </div>

        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
            connected
              ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
              : "border-amber-400/35 bg-amber-500/10 text-amber-200"
          }`}
        >
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {connected ? (
        <div className="mt-4 space-y-1 text-sm text-[#D4D4D8]">
          <p>
            Connected account: <span className="font-medium text-white">{googleEmail?.trim() || "Unknown"}</span>
          </p>
          <p>
            Active calendar syncs: <span className="font-medium text-white">{activeWatchCount}</span>
          </p>
        </div>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{errorMessage}</p>
      ) : null}

      <div className="mt-5">
        {connected ? (
          <button
            type="button"
            onClick={() => void onDisconnect()}
            disabled={isBusy}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-red-300/50 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBusy ? "Disconnecting..." : "Disconnect Calendar"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void onConnect()}
            disabled={isBusy}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBusy ? "Connecting..." : "Connect Calendar"}
          </button>
        )}
      </div>
    </section>
  )
}
