#!/bin/bash

# Script de test pour valider les redirections du middleware
# Usage: ./test-redirects.sh

echo "=== Tests de Redirection Middleware ==="
echo ""
echo "Assurez-vous que le serveur est démarré: npm run dev"
echo ""

BASE_URL="http://localhost:3000"

echo "Test 1: /checklist"
curl -I "$BASE_URL/checklist" 2>&1 | head -n 5
echo ""
echo "---"
echo ""

echo "Test 2: /parcours"
curl -I "$BASE_URL/parcours" 2>&1 | head -n 5
echo ""
echo "---"
echo ""

echo "Test 3: /resources"
curl -I "$BASE_URL/resources" 2>&1 | head -n 5
echo ""
echo "---"
echo ""

echo "Test 4: /parcours/guide/steps/nas"
curl -I "$BASE_URL/parcours/guide/steps/nas" 2>&1 | head -n 5
echo ""
echo "---"
echo ""

echo "Test 5: /robots.txt (doit retourner 200, pas de redirection)"
curl -I "$BASE_URL/robots.txt" 2>&1 | head -n 5
echo ""
echo "---"
echo ""

echo "Test 6: /sitemap.xml (doit retourner 200, pas de redirection)"
curl -I "$BASE_URL/sitemap.xml" 2>&1 | head -n 5
echo ""
echo "=== Fin des Tests ==="

