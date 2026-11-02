#!/bin/bash
# Publica el sitio KASYA (solo la pagina) y el APK como Release. Ejecutar desde esta carpeta.
set -e
cd "$(dirname "$0")"
APK="../kasya-release/kasya-1.0.apk"
REPO="vaultumbra33-droid/kasya"
ID=$(gh api user --jq .id)
rm -rf .git
git init -q -b main
git config user.name "vaultumbra33-droid"
git config user.email "${ID}+vaultumbra33-droid@users.noreply.github.com"
git add -A -- . ':!publicar.sh'
git commit -q -m "KASYA website"
gh repo create "$REPO" --public --source=. --remote=origin --push --description "KASYA - sitio web y descarga"
gh release create v1.0 "$APK" --repo "$REPO" --title "KASYA 1.0" --notes "Primera version de KASYA."
gh api -X POST "repos/$REPO/pages" -f "source[branch]=main" -f "source[path]=/"
echo "Listo: https://vaultumbra33-droid.github.io/kasya/ (tarda 1-2 min en activarse)"
