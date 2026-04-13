# Design System: Dorm Product Requirements

## Typography

*   **Headlines & Display:** Epilogue
*   **Body Text:** Plus Jakarta Sans
*   **Labels & Metadata:** Space Grotesk

## Color Palette

### Primary
*   **Primary:** `#f3ffca`
*   **Primary Container:** `#cafd00`

### Secondary
*   **Secondary:** `#759aff`
*   **Secondary Container:** `#0054d6`

### Tertiary / Accents
*   **Tertiary:** `#ff6b9b`
*   **Tertiary Container:** `#ff067f`

### Backgrounds & Surfaces (Dark Mode)
*   **Background & Surface Root:** `#0e0e0e`
*   **Surface Bright:** `#2c2c2c`
*   **Surface Container Highest:** `#262626`
*   **Surface Container High:** `#20201f`
*   **Surface Container:** `#1a1a1a`
*   **Surface Container Low:** `#131313`
*   **Surface Container Lowest:** `#000000`

### Text & Icons
*   **On Background/Surface:** `#ffffff`
*   **On Surface Variant:** `#adaaaa`
*   **Outline:** `#767575`
*   **Outline Variant:** `#484847`

### Utility
*   **Error:** `#ff7351`
*   **Error Container:** `#b92902`

---

## Design Strategy: The Raw Editorial ("The Digital Zine")

### 1. Overview & Creative North Star
This design system rejects the "polished corporate" aesthetic in favor of a student-owned, neo-brutalist identity. It treats the interface not as a software application, but as a living, unfiltered publication. The system breaks the "template" look by utilizing intentional asymmetry, heavy-weight strokes, and overlapping elements.

### 2. Colors & Surface Logic
The palette is rooted in a deep, void-like dark mode, punctuated by aggressive, "high-voltage" accents.

**The "No-Line" Rule (Internal) & The "Hard-Line" Rule (External)**
Unlike traditional systems, we prohibit 1px subtle dividers:
1.  **Background Shifts:** Use `surface-container-low` against `surface` for subtle sectioning.
2.  **Hard Strokes:** Use 2px-3px solid `outline` (black or high-contrast accent) for primary interactive containers. There is no middle ground.

### 3. Typography: Loud & Technical
*   **Display & Headlines:** Heavy, loud, and unapologetic. Tight letter-spacing (-2%).
*   **Body:** Clean and highly legible to balance the chaos of the headlines.
*   **Labels & Meta:** Monospaced vibes for technical data, creating a "raw data", student-owned aesthetic.

### 4. Elevation & Depth: The Offset Principle
We reject Gaussian blurs and soft shadows. Depth in this design system is purely structural and rhythmic.
*   **The Hard Offset:** Floating elements (buttons, active cards) use a hard-edged shadow. (e.g., `3px 3px 0px 0px #000000` or an accent color).
*   **Sticker Layering:** Components should intentionally overlap (e.g., a badge half-on/half-off a card edge).
*   **Tonal Layering:** Use `surface-container-lowest` (`#000000`) for "sunken" areas like input fields.

### 5. Components
*   **Buttons:** 
    *   *Primary:* `#cafd00` background, 0px border-radius, 2px black border, 3px hard offset shadow. 
    *   *Secondary:* `#0054d6` background, white text. No shadow until hover.
*   **Cards & Lists:** Never use a horizontal line to separate list items. Use vertical 1.4rem gaps or alternating background shades. Interactive cards must use a 2px stroke and lift on hover by increasing the offset shadow from 3px to 6px.
*   **Small Win Badges:** Emulate physical stickers. Rotate 2-3 degrees randomly. High-contrast backgrounds (`tertiary` or `secondary`). Thick borders.

### 6. Golden Rules
*   **Do** use extreme contrast.
*   **Do** use `0px` border-radius for everything. Sharp corners are non-negotiable.
*   **Do** lean into monospaced fonts for system messages.
*   **Do** allow elements to break the grid. Asymmetry is a feature, not a bug.
*   **Don't** use gradients, blurs, or soft drop-shadows.
*   **Don't** use standard icon sets. Use thick-stroke (2px+) icons that match the typography weight.
