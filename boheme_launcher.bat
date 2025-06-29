@echo off
cls
echo.
echo ===============================================
echo     BOHEME PRODUCTION - WORKFLOW LAUNCHER
echo ===============================================
echo.
echo Navigation vers le projet...
cd /d "C:\Users\caidj\OneDrive\Bureau\Bohemme plaquette\boheme-production"
echo.
echo Verification du projet...
dir *.js
echo.
echo ===============================================
echo     VOTRE ENVIRONNEMENT EST PRET !
echo ===============================================
echo.
echo Commandes disponibles:
echo   node workflow.js help       - Aide complete
echo   node workflow.js health     - Diagnostic
echo   node workflow.js status     - Etat du projet  
echo   node asset-manager.js help  - Gestion assets
echo.
echo ===============================================
echo.
cmd /k