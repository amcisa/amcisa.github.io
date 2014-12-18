@echo off
rem this will point the command to the working directory of the batch file.
cd %~dp0
cd events
cd 14-15
del *.html
cd ..
jade -P ./14-15.post --out ./14-15/