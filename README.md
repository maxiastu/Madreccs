# MADRE Trattoria

Landing page de MADRE Trattoria — masa madre, fuego lento y sabor italiano en Chacao, Caracas.

Sitio estático: HTML + Tailwind (CDN) + JavaScript sin dependencias. Sin build step.

## Estructura

```
web/                        Raíz pública que sirve Vercel
  index.html                Landing: hero, filosofía, menú, reservas, ubicación
  menu.html                 Carta completa (antipasti, pizzas, pastas, dolci, bebidas)
  privacidad.html           Política de privacidad
  assets/
    app.js                  Toda la lógica del sitio + configuración del negocio
    tailwind-config.js      Design tokens compartidos por las tres páginas
    favicon.svg
    *.jpg                   Fotografía del menú y el hero
scripts/serve.ps1           Servidor local de desarrollo (PowerShell)
madre/                      Archivos de diseño de origen (DESIGN.md, mockup)
vercel.json                 Configuración de despliegue
```

## Configuración del negocio

Los datos de contacto viven en **un solo sitio**: el objeto `SITE` al principio de
[`web/assets/app.js`](web/assets/app.js).

```js
var SITE = {
  whatsapp: '',       // Solo dígitos con código de país. Ej: '584121234567'
  telefono: '',       // Formato visible. Ej: '+58 412 123 4567'
  direccion: 'Chacao, Caracas, Venezuela',
  mapsUrl: '',        // Enlace de Google Maps del local
  instagram: '',
  horario: [ /* ... */ ]
};
```

Los campos vacíos **ocultan** su botón o enlace en lugar de dejarlo roto. Al rellenar
`whatsapp` aparecen automáticamente los botones "Pedir por WhatsApp" y el envío de la
reserva por ese canal; al rellenar `telefono` aparece el enlace de llamada, y así con
el resto.

## Desarrollo local

No requiere Node ni Python. Desde la raíz del repo:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts/serve.ps1" -Port 3000
```

Luego abrir http://localhost:3000

## Funcionalidad

- **Menú de navegación**: panel lateral accesible (`aria-modal`), bloquea el scroll de
  fondo, cierra con ESC o clic fuera y devuelve el foco al botón que lo abrió.
- **Navegación por anclas**: desplazamiento suave que compensa la altura del header fijo,
  respetando `prefers-reduced-motion`.
- **Formulario de reservas**: validación en cliente con mensajes accesibles
  (`aria-invalid`, `role="alert"`), fecha mínima igual a hoy y control de horario de
  servicio. **No hay backend**: al enviar se muestra una confirmación local y, si
  WhatsApp está configurado, un enlace para enviar la solicitud por ese canal.

## Despliegue

Conectado a Vercel vía la integración de GitHub: cada push a `main` publica automáticamente.
El directorio público es `web/`, definido en `vercel.json`.

## Pendientes conocidos

- El diseño de origen es solo móvil; en escritorio el contenido se estira a todo el ancho.
- Tailwind se carga por CDN, pensado para prototipos. Para producción conviene compilar
  el CSS.
- Los platos y precios de `menu.html` son contenido de ejemplo coherente con la marca:
  sustituir por la carta real antes de publicar.

## Diseño

El sistema de diseño (paleta, tipografía, espaciado y componentes) está documentado en
[`madre/DESIGN.md`](madre/DESIGN.md). Tipografías: Bodoni Moda para titulares, Manrope para
cuerpo y etiquetas. Color primario: verde albahaca `#3a6700` sobre fondo crema `#fcf9f3`.
