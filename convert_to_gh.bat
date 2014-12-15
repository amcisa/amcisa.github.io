@echo off
rem this will point the command to the working directory of the batch file.
cd %~dp0
cd img
pause
rd /S originals
cd ..
cd events
rd /S /Q 14-15
rd /S /Q 14-15.includes
cd ..
rd /S /Q data
rd /S /Q __pycache__
rd /S /Q post
rd /S /Q includes
rd /S /Q .git
del .gitignore
del .gitattributes
del *.py 
del *.bat
del *.md
pause