# HRNEWS napi frissítés — Windows Task Scheduler hívja 5:00 és 15:00-kor
# claude -p mód: nem-interaktív, Claude Code nem szükséges nyitva

$logDir  = "C:\Users\dorka\OneDrive\Desktop\HRNEWS\logs"
$logFile = "$logDir\hrnews-$(Get-Date -Format 'yyyy-MM-dd').log"

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }

"=== HRNEWS frissítés: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ===" | Tee-Object -FilePath $logFile -Append

Set-Location "C:\Users\dorka\OneDrive\Desktop\HRNEWS"

$skillFile = "C:\Users\dorka\.claude\scheduled-tasks\hrnews-daily-update\SKILL.md"
$prompt    = Get-Content $skillFile -Raw

# ── Claude CLI keresése (verziófrissítés-álló) ──────────────────────────────
# A Roaming mappa alatti legújabb claude.exe-t keresi — nem hardcoded verzió
$claudeBase = "$env:APPDATA\Claude\claude-code"
$claudeExe  = $null

if (Test-Path $claudeBase) {
    $claudeExe = Get-ChildItem -Path $claudeBase -Filter "claude.exe" -Recurse -ErrorAction SilentlyContinue |
        Sort-Object LastWriteTime -Descending |
        Select-Object -First 1 -ExpandProperty FullName
}

# Fallback: PATH-ban elérhető claude
if (-not $claudeExe) {
    $claudeExe = (Get-Command claude -ErrorAction SilentlyContinue).Source
}

if (-not $claudeExe) {
    "HIBA: claude.exe nem található! Ellenőrizd, hogy telepítve van-e a Claude Code." | Tee-Object -FilePath $logFile -Append
    exit 1
}

"Claude CLI: $claudeExe" | Tee-Object -FilePath $logFile -Append

$prompt | & $claudeExe -p --dangerously-skip-permissions 2>&1 | Tee-Object -FilePath $logFile -Append

$exitCode = $LASTEXITCODE
"=== Vége: $(Get-Date -Format 'HH:mm:ss') (exit: $exitCode) ===" | Tee-Object -FilePath $logFile -Append
