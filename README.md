# MADRE Trattoria

Landing page de MADRE Trattoria — masa madre, fuego lento y sabor italiano en Chacao, Caracas.

Sitio estático: HTML + Tailwind (CDN). Sin build step.

## Estructura

```
web/                    Raíz pública que sirve Vercel
  index.html            La landing page
  assets/               Imágenes y recursos
scripts/serve.ps1       Servidor local de desarrollo (PowerShell)
madre/                  Archivos de diseño de origen (DESIGN.md, mockup)
vercel.json             Configuración de despliegue
```

## Desarrollo local

No requiere Node ni Python. Desde la raíz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/serve.ps1" -Port 3000
```

Luego abrir http://localhost:3000

## Despliegue

Conectado a Vercel vía la integración de GitHub: cada push a `main` publica automáticamente.
El directorio público es `web/`, definido en `vercel.json`.

## Diseño

El sistema de diseño (paleta, tipografía, espaciado y componentes) está documentado en
[`madre/DESIGN.md`](madre/DESIGN.md). Tipografías: Bodoni Moda para titulares, Manrope para
cuerpo y etiquetas. Color primario: verde albahaca `#3a6700` sobre fondo crema `#fcf9f3`.
