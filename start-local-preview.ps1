$previewPort = 5500

Write-Host "Starting local preview for Kuberis site..." -ForegroundColor Cyan
Write-Host "Open: http://localhost:$previewPort/index.html" -ForegroundColor Green

if (Get-Command py -ErrorAction SilentlyContinue) {
  py -m http.server $previewPort
  exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $previewPort
  exit $LASTEXITCODE
}

Write-Error "Python was not found. Install Python or run a different local static server."
