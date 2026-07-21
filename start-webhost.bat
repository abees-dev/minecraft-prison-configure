@echo off
title ItemsAdder ResourcePack WebHost (Node.js)
echo Starting ItemsAdder WebHost server on port 8080...
cd /d "%~dp0webhost"
node server.js
pause
