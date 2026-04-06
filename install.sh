#!/bin/bash

echo "🚀 EduForge - Script de Instalação e Execução"
echo "=============================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Verificar se npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado."
    exit 1
fi

echo "✅ npm encontrado: $(npm --version)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências."
    exit 1
fi

echo ""
echo "✅ Dependências instaladas com sucesso!"
echo ""

# Perguntar modo de execução
echo "Escolha o modo de execução:"
echo "1) Desenvolvimento (npm run dev)"
echo "2) Produção com PM2"
echo ""
read -p "Digite sua escolha (1 ou 2): " choice

case $choice in
    1)
        echo ""
        echo "🔧 Iniciando em modo desenvolvimento..."
        echo "   Acesse: http://localhost:5173"
        echo ""
        npm run dev
        ;;
    2)
        # Verificar se PM2 está instalado
        if ! command -v pm2 &> /dev/null; then
            echo ""
            echo "📦 PM2 não encontrado. Instalando globalmente..."
            npm install -g pm2
        fi

        # Verificar se serve está instalado
        if ! command -v serve &> /dev/null; then
            echo ""
            echo "📦 serve não encontrado. Instalando globalmente..."
            npm install -g serve
        fi

        echo ""
        echo "🏗️  Fazendo build da aplicação..."
        npm run build

        if [ $? -ne 0 ]; then
            echo "❌ Erro ao fazer build."
            exit 1
        fi

        echo ""
        echo "🚀 Iniciando com PM2..."
        pm2 start ecosystem.config.js

        echo ""
        echo "✅ Aplicação iniciada com sucesso!"
        echo ""
        echo "📊 Comandos úteis:"
        echo "   pm2 status          - Ver status"
        echo "   pm2 logs eduforge   - Ver logs"
        echo "   pm2 restart eduforge - Reiniciar"
        echo "   pm2 stop eduforge   - Parar"
        echo "   pm2 delete eduforge - Remover"
        echo ""
        echo "🌐 Acesse: http://localhost:3000"
        echo ""
        
        pm2 status
        ;;
    *)
        echo "❌ Opção inválida."
        exit 1
        ;;
esac
