# Static file server for the MADRE web project.
# Pure PowerShell (no Node/Python required). Usage: powershell -File scripts/serve.ps1 [-Port 3000]
param(
    [int]$Port = 3000,
    [string]$Root = (Join-Path (Split-Path -Parent $PSScriptRoot) 'web')
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path $Root).Path

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.htm'  = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.mjs'  = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.webp' = 'image/webp'
    '.avif' = 'image/avif'
    '.gif'  = 'image/gif'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
    '.ttf'  = 'font/ttf'
    '.txt'  = 'text/plain; charset=utf-8'
    '.map'  = 'application/json; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "[serve] MADRE dev server running at http://localhost:$Port/"
Write-Host "[serve] Serving files from $Root"

try {
    while ($listener.IsListening) {
        $context  = $listener.GetContext()
        $request  = $context.Request
        $response = $context.Response
        $status   = 200

        try {
            # Decode and normalize the request path.
            $relative = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($relative)) { $relative = 'index.html' }
            $relative = $relative -replace '/', '\'

            $candidate = [System.IO.Path]::GetFullPath((Join-Path $Root $relative))

            # Directory traversal guard: never serve outside the web root.
            if (-not $candidate.StartsWith($Root, [StringComparison]::OrdinalIgnoreCase)) {
                $status = 403
                $bytes  = [Text.Encoding]::UTF8.GetBytes('403 Forbidden')
                $response.ContentType = 'text/plain; charset=utf-8'
            }
            else {
                # Directory request -> serve its index.html.
                if (Test-Path -LiteralPath $candidate -PathType Container) {
                    $candidate = Join-Path $candidate 'index.html'
                }
                # Extensionless request -> try the .html file (clean URLs).
                if (-not (Test-Path -LiteralPath $candidate -PathType Leaf) -and -not [System.IO.Path]::GetExtension($candidate)) {
                    $candidate = "$candidate.html"
                }

                if (Test-Path -LiteralPath $candidate -PathType Leaf) {
                    $bytes = [System.IO.File]::ReadAllBytes($candidate)
                    $ext   = [System.IO.Path]::GetExtension($candidate).ToLowerInvariant()
                    $response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
                    $response.Headers.Add('Cache-Control', 'no-store')
                }
                else {
                    $status = 404
                    $bytes  = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
                    $response.ContentType = 'text/plain; charset=utf-8'
                }
            }

            $response.StatusCode = $status
            $response.ContentLength64 = $bytes.Length
            # HEAD responses carry headers only - writing a body throws.
            if ($request.HttpMethod -ne 'HEAD') {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        }
        catch {
            $status = 500
            Write-Host "[serve] 500 $($request.Url.AbsolutePath) - $($_.Exception.Message)"
            try { $response.StatusCode = 500 } catch {}
        }
        finally {
            Write-Host "[serve] $status $($request.HttpMethod) $($request.Url.AbsolutePath)"
            try { $response.OutputStream.Close() } catch {}
        }
    }
}
finally {
    $listener.Stop()
    $listener.Close()
    Write-Host '[serve] stopped'
}
