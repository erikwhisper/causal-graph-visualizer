@echo off
echo Building Electron distributables...
call npm run dist
echo.
echo Electron builds complete! Check the 'release' folder.
echo Files created:
dir release
pause