---
name: Modern Trattoria
colors:
  surface: '#fcf9f3'
  surface-dim: '#dcdad4'
  surface-bright: '#fcf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ed'
  surface-container: '#f0eee8'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e5e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#424939'
  inverse-surface: '#31312d'
  inverse-on-surface: '#f3f0ea'
  outline: '#727a67'
  outline-variant: '#c2c9b4'
  surface-tint: '#3b6a00'
  primary: '#3a6700'
  on-primary: '#ffffff'
  primary-container: '#4a8300'
  on-primary-container: '#f9ffeb'
  inverse-primary: '#98d857'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#7d5400'
  on-tertiary: '#ffffff'
  tertiary-container: '#9d6b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b3f570'
  primary-fixed-dim: '#98d857'
  on-primary-fixed: '#0e2000'
  on-primary-fixed-variant: '#2b5000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffddaf'
  tertiary-fixed-dim: '#fbbb53'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#614000'
  background: '#fcf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e5e2dc'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 24px
  gutter: 16px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The brand personality is a "Modern Trattoria": a fusion of traditional Italian warmth and contemporary Caracas energy. The UI is designed to feel artisanal, tactile, and appetizing, moving away from corporate rigidity toward a "crafted" digital experience.

The design style utilizes **Minimalism** enriched with **Tactile** elements. It prioritizes heavy whitespace to let high-quality food photography breathe, while using paper-like textures and organic layering to evoke the feeling of a physical menu found in a sophisticated sun-drenched courtyard. The emotional response should be one of immediate comfort, culinary anticipation, and understated luxury.

## Colors
This design system uses a palette inspired by fresh Mediterranean ingredients and traditional kitchen materials.

- **Primary (Basil Green):** A fresh, organic green (#508a07) used exclusively for high-priority actions, primary buttons, and critical accents to evoke freshness and culinary vitality.
- **Background (Cream/Off-white):** A warm, non-reflective base (#f9f6f0) that mimics high-quality paper stock.
- **Secondary (Charcoal Black):** Used for primary typography and deep structural contrast to ensure high legibility and a premium feel.
- **Accents (Mustard & Wood):** Mustard is reserved for ratings and soft highlights; Wood tones are used for thin borders and subtle UI dividers to ground the digital space in natural textures.

## Typography
The typography strategy centers on the contrast between high-fashion editorial flair and functional modernism.

- **Headlines:** Use **Bodoni Moda**. Its high stroke contrast provides an "Italian Vogue" aesthetic that feels both traditional and sharp. Use it for large titles and menu item names.
- **Body & Labels:** Use **Manrope**. Its geometric but warm construction ensures readability during mobile browsing and provides a quiet, professional counterbalance to the expressive serif.
- **Hierarchy Note:** All "Display" and "Headline" levels should be set in Charcoal Black. Use "Label-caps" for dish categories or metadata like "VEGAN" or "CHEF'S CHOICE."

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous margins to maintain an artisanal, uncrowded feel.

- **Desktop:** 12-column grid with a max-width of 1280px.
- **Mobile:** Single column with 24px side margins. 
- **Rhythm:** Use an 8px base unit. Section-to-section vertical spacing should be aggressive (80px+) to distinguish different parts of the experience (e.g., from Menu to Booking).
- **Photography:** Images should frequently break the grid or use asymmetric aspect ratios (e.g., 4:5 or 3:4) to avoid the "template" look.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

Depth is created by stacking elements of slightly different warm neutrals. For example, a "Menu Card" may sit on a Cream background with a 1px border colored in a faint Wood tone (#D7CCC8). 

When a shadow is necessary for interactivity (like a floating CTA), use a very soft, diffused Charcoal shadow with low opacity (10-15%) and a large blur radius to mimic natural ambient light rather than digital elevation.

## Shapes
The shape language is **Soft (Level 1)**.

While the brand is sophisticated, perfectly sharp corners feel too clinical. Slight rounding (4px-8px) on cards and buttons softens the UI, making it feel more organic and approachable. 

- **Buttons:** Use 4px radius for a structured but "touched" look.
- **Photography:** Food images should remain sharp or have a very subtle 4px radius to maintain their editorial quality.
- **Booking Fields:** Use a 4px radius to match buttons.

## Components

### Buttons & CTAs
- **Primary Action:** Solid Basil Green background with White text. Bold weight. No gradients.
- **Secondary Action:** Ghost style with a Charcoal border and text.
- **Sticky Nav CTA:** A compact Primary Button integrated into the right side of the navigation bar.

### Menu Cards
- Large, high-contrast food photography as the hero.
- Content block below the image using Cream background.
- Price displayed in Bodoni Moda (Headline-sm).
- Subtle Wood-toned divider between items in a list view.

### Booking Section
- **Contrast Block:** The booking area should use a Charcoal Black background with Cream text to create a high-conversion "moment."
- **Inputs:** Underlined or lightly bordered fields with a warm-grey focus state.

### Testimonial Cards
- Simple, centered typography.
- Star ratings using the Mustard Yellow accent.
- No heavy borders; use a slightly lighter Cream tint to define the card area.

### Service Icons
- Thin-stroke (1.5pt) custom icons in Charcoal. 
- Avoid bulky, filled icons to maintain the "Modern Trattoria" lightness.