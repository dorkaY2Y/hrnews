# HRNEWS napi frissítés — Windows Task Scheduler hívja 5:00 és 15:00-kor
# claude -p mód: nem-interaktív, Claude Code nem szükséges nyitva

$logDir  = "C:\Users\dorka\OneDrive\Desktop\HRNEWS\logs"
$logFile = "$logDir\hrnews-$(Get-Date -Format 'yyyy-MM-dd').log"

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

"=== HRNEWS frissítés: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Tee-Object -FilePath $logFile -Append

Set-Location "C:\Users\dorka\OneDrive\Desktop\HRNEWS"

$skillFile = "C:\Users\dorka\.claude\scheduled-tasks\hrnews-daily-update\SKILL.md"
$prompt    = Get-Content $skillFile -Raw

# claude -p = non-interactive print mode, --dangerouslySkipPermissions = no approval prompts
$prompt | & claude -p --dangerouslySkipPermissions 2>&1 | Tee-Object -FilePath $logFile -Append

"=== Vége: $(Get-Date -Format 'HH:mm:ss') ===" | Tee-Object -FilePath $logFile -Append
