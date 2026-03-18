# HRNEWS napi frissítés — Windows Task Scheduler hívja 5:00 és 15:00-kor
# claude -p mód: nem-interaktív, Claude Code nem szükséges nyitva

$logDir  = "C:\Users\dorka\OneDrive\Desktop\HRNEWS\logs"
$logFile = "$logDir\hrnews-$(Get-Date -Format 'yyyy-MM-dd').log"

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

"=== HRNEWS frissítés: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Tee-Object -FilePath $logFile -Append

Set-Location "C:\Users\dorka\OneDrive\Desktop\HRNEWS"

$skillFile = "C:\Users\dorka\.claude\scheduled-tasks\hrnews-daily-update\SKILL.md"
$prompt    = Get-Content $skillFile -Raw

# Auth token beolvasása (gitignorált fájlból — frissítsd ha lejár: scripts/refresh-auth.bat)
$tokenFile = "C:\Users\dorka\OneDrive\Desktop\HRNEWS\.claude-token"
if (Test-Path $tokenFile) {
  $env:CLAUDE_CODE_OAUTH_TOKEN = (Get-Content $tokenFile -Raw).Trim()
}

# claude -p = non-interactive print mode, --dangerously-skip-permissions = no approval prompts
# Teljes elérési út — nincs PATH-ban a Task Scheduler kontextusban
$claudeExe = "C:\Users\dorka\AppData\Roaming\Claude\claude-code\2.1.76\claude.exe"
$prompt | & $claudeExe -p --dangerously-skip-permissions 2>&1 | Tee-Object -FilePath $logFile -Append

"=== Vége: $(Get-Date -Format 'HH:mm:ss') ===" | Tee-Object -FilePath $logFile -Append
