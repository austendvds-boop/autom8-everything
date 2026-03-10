# SWT-B1: Add scout-watcher-test.md

**Thinking level:** low

## Task
Create the file `docs/scout-watcher-test.md` in this repo with exactly one line:

```
Scout watcher test — <current UTC timestamp>
```

Use the actual current UTC date/time when you create the file (e.g., `Scout watcher test — 2026-03-10T08:53:00Z`).

## Steps
1. Create `docs/scout-watcher-test.md` with the line above.
2. `git add docs/scout-watcher-test.md`
3. `git commit -m "test: add scout-watcher-test.md"`
4. `git push origin master`

## Gate
- **Command:** `git log -1 --oneline`
- **Pass condition:** Commit message contains "scout-watcher-test"

## Telegram notification (mandatory — do this AFTER git push)

Read the bot token from the OpenClaw config, then send a notification:

```bash
BOT_TOKEN=$(cat /c/Users/austen/.openclaw/openclaw.json 2>/dev/null | jq -r '.channels.telegram.botToken' 2>/dev/null)
if [ -z "$BOT_TOKEN" ]; then
  BOT_TOKEN=$(python3 -c "import json; print(json.load(open('C:/Users/austen/.openclaw/openclaw.json'))['channels']['telegram']['botToken'])" 2>/dev/null)
fi
curl -s "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -d chat_id=7077676180 \
  -d text="✅ SWT-B1 done — scout-watcher-test.md committed and pushed to master."
```

If the above doesn't work (Windows/shell compatibility), try PowerShell:
```powershell
$ocConfig = Get-Content "C:\Users\austen\.openclaw\openclaw.json" -Raw | ConvertFrom-Json
$botToken = $ocConfig.channels.telegram.botToken
$uri = "https://api.telegram.org/bot$botToken/sendMessage"
Invoke-RestMethod -Uri $uri -Method Post -Body @{ chat_id = "7077676180"; text = "✅ SWT-B1 done — scout-watcher-test.md committed and pushed to master." }
```

## STOP after this. Do not start servers, run tests, or do anything else.
