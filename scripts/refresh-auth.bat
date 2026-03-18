@echo off
REM Token frissítés — futtasd Claude Code terminálból ha a Task Scheduler nem fut!
REM (Claude Code-on belül az CLAUDE_CODE_OAUTH_TOKEN env var mindig friss)

if "%CLAUDE_CODE_OAUTH_TOKEN%"=="" (
  echo [HIBA] Ezt a scriptet Claude Code terminaljaban futtasd!
  echo       A CLAUDE_CODE_OAUTH_TOKEN env var nincs beallitva.
  pause
  exit /b 1
)

echo %CLAUDE_CODE_OAUTH_TOKEN%> "C:\Users\dorka\OneDrive\Desktop\HRNEWS\.claude-token"
echo [OK] Token frissitve! A Task Scheduler legkozelebb mar mukodni fog.
pause
