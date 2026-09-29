@echo off
chcp 65001 >nul
title Speakout - Launcher

rem Run from the folder this script lives in, so it works from anywhere.
cd /d "%~dp0"

rem Marker used to recognise THIS project's dev server (must match <title> in index.html).
set "MARKER=Speakout B1"

if not exist "node_modules\" (
  echo Installing dependencies... first time only
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting the course companion...
echo Waiting for the dev server; the browser opens by itself.
echo.

start "Speakout Dev Server" /min cmd /c "npm run dev"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ErrorActionPreference='SilentlyContinue';" ^
  "$m='%MARKER%';" ^
  "for($p=5173;$p -le 5185;$p++){" ^
  "  try{ $r=Invoke-WebRequest -Uri ('http://localhost:'+$p+'/') -UseBasicParsing -TimeoutSec 2;" ^
  "       if($r.Content -match $m){ $u='http://localhost:'+$p+'/'; Write-Host ('Ready: '+$u) -ForegroundColor Green; Start-Process $u; exit 0 } } catch { }" ^
  "  Start-Sleep -Milliseconds 600 };" ^
  "Write-Host 'ERROR: the dev server never answered on ports 5173-5185.' -ForegroundColor Red;" ^
  "Write-Host 'Open the Speakout Dev Server window to read the real error.';" ^
  "Read-Host 'Press Enter to close'"

endlocal
exit /b 0
