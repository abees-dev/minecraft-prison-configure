@echo off
setlocal
cd /d "%~dp0\.."
python "%~dp0clear-local-data.py" %*
endlocal
