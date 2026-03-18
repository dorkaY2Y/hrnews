@echo off
REM HRNEWS Task Scheduler beállítás — egyszeri futtatás elegendő
REM Futtatás rendszergazdaként (Run as Administrator)!

echo HRNEWS napi frissítés ütemezése...
echo.

set PS_SCRIPT=C:\Users\dorka\OneDrive\Desktop\HRNEWS\scripts\daily-update.ps1
set CMD_LINE=powershell -NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File "%PS_SCRIPT%"

REM Reggeli frissítés 5:00
schtasks /create ^
  /tn "HRNEWS Morning Update" ^
  /tr "%CMD_LINE%" ^
  /sc DAILY ^
  /st 05:00 ^
  /ru "%USERNAME%" ^
  /f

if %ERRORLEVEL%==0 (
  echo [OK] Reggeli frissites: 05:00
) else (
  echo [HIBA] Reggeli feladat letrehozasa sikertelen
)

REM Délutáni frissítés 15:00
schtasks /create ^
  /tn "HRNEWS Afternoon Update" ^
  /tr "%CMD_LINE%" ^
  /sc DAILY ^
  /st 15:00 ^
  /ru "%USERNAME%" ^
  /f

if %ERRORLEVEL%==0 (
  echo [OK] Delutani frissites: 15:00
) else (
  echo [HIBA] Delutani feladat letrehozasa sikertelen
)

echo.
echo Kész! Az ütemezett feladatok megtekintéséhez:
echo   schtasks /query /tn "HRNEWS Morning Update"
echo   schtasks /query /tn "HRNEWS Afternoon Update"
echo.
pause
