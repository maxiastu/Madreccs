/**
 * Design tokens de MADRE Trattoria, compartidos por todas las páginas.
 * Se carga después del CDN de Tailwind y antes de renderizar.
 * Fuente de verdad: madre/DESIGN.md
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "error-container": "#ffdad6", "on-surface": "#1c1c18", "tertiary-container": "#9d6b00",
        outline: "#8d706c", "on-secondary-container": "#636262", "on-tertiary-container": "#fffbff",
        "surface-container-high": "#ebe8e2", "surface-tint": "#3b6a00", "on-tertiary": "#ffffff",
        primary: "#3a6700", "on-secondary-fixed": "#1c1b1b", "on-surface-variant": "#59413d",
        "surface-container-lowest": "#ffffff", "outline-variant": "#e1bfb9", "on-primary-fixed": "#0e2000",
        "on-secondary-fixed-variant": "#474746", "on-primary-fixed-variant": "#2b5000",
        "surface-bright": "#fcf9f3", "surface-container-low": "#f6f3ed", surface: "#fcf9f3",
        "inverse-primary": "#98d857", "surface-dim": "#dcdad4", "secondary-fixed": "#e5e2e1",
        "secondary-container": "#e2dfde", "on-error": "#ffffff", "inverse-surface": "#31312d",
        "inverse-on-surface": "#f3f0ea", "primary-fixed": "#b3f570", "secondary-fixed-dim": "#c8c6c5",
        "tertiary-fixed-dim": "#fbbb53", "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#614000", "primary-fixed-dim": "#98d857",
        "surface-container-highest": "#e5e2dc", tertiary: "#7d5400", secondary: "#5f5e5e",
        "on-secondary": "#ffffff", "on-primary": "#ffffff", background: "#fcf9f3", error: "#ba1a1a",
        "surface-container": "#f0eee8", "tertiary-fixed": "#ffddaf", "primary-container": "#4a8300",
        "surface-variant": "#e5e2dc", "on-primary-container": "#f9ffeb", "on-tertiary-fixed": "#281800",
        "on-background": "#1c1c18"
      },
      borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "0.75rem" },
      spacing: {
        "stack-lg": "32px", "stack-sm": "8px", gutter: "16px", "section-gap": "80px",
        "container-padding": "24px", "stack-md": "16px", unit: "8px"
      },
      fontFamily: {
        "headline-sm": ["Bodoni Moda"], "label-caps": ["Manrope"], "display-lg": ["Bodoni Moda"],
        "body-lg": ["Manrope"], "body-md": ["Manrope"], "headline-md": ["Bodoni Moda"],
        "display-lg-mobile": ["Bodoni Moda"], headline: ["Bodoni Moda"], display: ["Bodoni Moda"],
        body: ["Manrope"], label: ["Manrope"]
      },
      fontSize: {
        "headline-sm": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "700" }],
        "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "600" }],
        "display-lg-mobile": ["40px", { lineHeight: "1.1", fontWeight: "700" }]
      }
    }
  }
};
