@echo off
title HQN POLICE MOD - Public Server
cd /d C:\Users\oppc\Desktop\HQNPOL~1\HQN-PO~1

echo.
echo  ==========================================
echo   HQN POLICE MOD - Starting Public Server
echo  ==========================================
echo.

:: شغّل السيرفر في الخلفية
echo  [1/2] Starting Next.js...
start "HQN-NextJS" cmd /c "node node_modules\next\dist\bin\next dev"

echo  Waiting 20 seconds for server to start...
timeout /t 20 /nobreak >nul

echo  [2/2] Opening public tunnel...
echo.
echo  ==========================================
echo   Your PUBLIC link will appear below
echo   Share this link with anyone!
echo  ==========================================
echo.

:: Serveo - لا يحتاج تسجيل، يحافظ على الاتصال
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -o ServerAliveCountMax=6 -R 80:localhost:3000 serveo.net

pause
