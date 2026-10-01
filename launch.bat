@echo off
echo ========================================================
echo  Starting HORIZONS.MUMBAI React Application
echo ========================================================
echo.
cd /d "%~dp0"
start http://localhost:5173
npm run dev
