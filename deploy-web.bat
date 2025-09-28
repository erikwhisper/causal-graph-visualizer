@echo off
echo Building web version...
call npm run build
echo.
echo Web build complete! Upload the 'dist' folder to your web server.
echo Or use services like:
echo - Netlify: drag ^& drop dist folder
echo - Vercel: connect GitHub repo
echo - GitHub Pages: enable in repository settings
pause