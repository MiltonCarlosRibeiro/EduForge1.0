@echo off
chcp 65001 >nul
echo.
echo 🚀 EduForge - Script de Instalação e Execução
echo ==============================================
echo.

REM Verificar se Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro.
    echo    Visite: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado
node --version
echo.

REM Verificar se npm está instalado
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm não encontrado.
    pause
    exit /b 1
)

echo ✅ npm encontrado
npm --version
echo.

REM Instalar dependências
echo 📦 Instalando dependências...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências.
    pause
    exit /b 1
)

echo.
echo ✅ Dependências instaladas com sucesso!
echo.

REM Perguntar modo de execução
echo Escolha o modo de execução:
echo 1) Desenvolvimento (npm run dev)
echo 2) Produção com PM2
echo.
set /p choice="Digite sua escolha (1 ou 2): "

if "%choice%"=="1" (
    echo.
    echo 🔧 Iniciando em modo desenvolvimento...
    echo    Acesse: http://localhost:5173
    echo.
    call npm run dev
) else if "%choice%"=="2" (
    REM Verificar se PM2 está instalado
    where pm2 >nul 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo 📦 PM2 não encontrado. Instalando globalmente...
        call npm install -g pm2
    )

    REM Verificar se serve está instalado
    where serve >nul 2>nul
    if %errorlevel% neq 0 (
        echo.
        echo 📦 serve não encontrado. Instalando globalmente...
        call npm install -g serve
    )

    echo.
    echo 🏗️  Fazendo build da aplicação...
    call npm run build

    if %errorlevel% neq 0 (
        echo ❌ Erro ao fazer build.
        pause
        exit /b 1
    )

    echo.
    echo 🚀 Iniciando com PM2...
    call pm2 start ecosystem.config.js

    echo.
    echo ✅ Aplicação iniciada com sucesso!
    echo.
    echo 📊 Comandos úteis:
    echo    pm2 status          - Ver status
    echo    pm2 logs eduforge   - Ver logs
    echo    pm2 restart eduforge - Reiniciar
    echo    pm2 stop eduforge   - Parar
    echo    pm2 delete eduforge - Remover
    echo.
    echo 🌐 Acesse: http://localhost:3000
    echo.
    
    call pm2 status
    pause
) else (
    echo ❌ Opção inválida.
    pause
    exit /b 1
)
