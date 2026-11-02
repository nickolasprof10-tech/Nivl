#!/usr/bin/env bash
# Copies the OCR engine + language data into www/vendor so the app never needs internet.
set -euo pipefail
D=www/vendor/tesseract
mkdir -p $D/core $D/lang
cp node_modules/tesseract.js/dist/tesseract.min.js $D/
cp node_modules/tesseract.js/dist/worker.min.js $D/
cp node_modules/tesseract.js-core/tesseract-core*.js $D/core/
cp node_modules/tesseract.js-core/tesseract-core*.wasm $D/core/ 2>/dev/null || true
for L in eng por; do
  src=node_modules/@tesseract.js-data/$L/4.0.0_best_int/$L.traineddata.gz
  [ -f "$src" ] || src=node_modules/@tesseract.js-data/$L/4.0.0/$L.traineddata.gz
  cp "$src" $D/lang/
done
echo "vendor files:"; find www/vendor -type f | sort
