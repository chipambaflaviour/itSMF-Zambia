---
name: itSMF Zambia Design Framework
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#74777f'
  outline-variant: '#c4c6d0'
  surface-tint: '#455f8a'
  primary: '#000e24'
  on-primary: '#ffffff'
  primary-container: '#00234b'
  on-primary-container: '#718bb9'
  inverse-primary: '#adc7f8'
  secondary: '#006a6a'
  on-secondary: '#ffffff'
  secondary-container: '#8cf3f3'
  on-secondary-container: '#007070'
  tertiary: '#0a0e10'
  on-tertiary: '#ffffff'
  tertiary-container: '#202426'
  on-tertiary-container: '#878b8d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f8'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2c4771'
  secondary-fixed: '#8cf3f3'
  secondary-fixed-dim: '#6fd7d6'
  on-secondary-fixed: '#002020'
  on-secondary-fixed-variant: '#004f4f'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#181c1e'
  on-tertiary-fixed-variant: '#434749'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
---

## Brand & Style

This design system is built to project the authority of a global professional body while maintaining deep resonance with the Zambian IT landscape. The brand personality is **Expert, Visionary, and Dependable**. It avoids clinical coldness by utilizing balanced layouts and meaningful depth, positioning itSMF Zambia as the definitive hub for IT Service Management excellence in the region.

The design style follows a **Corporate / Modern** aesthetic. It prioritizes clarity, structural integrity, and trust. The visual language uses a rigorous alignment system to mirror the precision required in ITIL and service management frameworks. To ensure local relevance, the design incorporates subtle geometric patterns inspired by Zambian textile heritage, used as low-opacity backgrounds or decorative elements within hero sections to bridge the gap between global standards and local identity.

## Colors

The color palette is anchored in **Victoria Blue**, a deep, saturated navy that communicates stability and institutional knowledge. This is paired with **Zambian Teal**, a professional and vibrant shade used to highlight growth, innovation, and digital transformation.

- **Primary (Deep Blue):** Used for headers, primary navigation, and foundational brand elements. It represents the "Excellence" pillar of the organization.
- **Secondary (Teal):** Used for interaction points, success states, and progress indicators. It provides a modern, energetic contrast to the deep blue.
- **Corporate White & Grays:** High-quality white backgrounds ensure a clean, breathable interface. Light grays are used for container backgrounds to define layout sections without creating visual noise.
- **Status Colors:** Standardized red for alerts and amber for warnings are used sparingly, maintaining a 1px stroke weight to remain professional rather than alarming.

## Typography

This design system utilizes **Inter** across all levels to achieve a systematic, utilitarian, and highly legible interface. The typography is designed to feel authoritative yet accessible.

Large headlines use a bold weight with slightly tighter letter spacing to create a sense of institutional gravity. Body copy is set with generous line heights (1.6) to ensure that technical documentation and event descriptions remain readable during extended sessions. Label styles are set in uppercase with increased letter spacing to serve as clear structural signposts for metadata, such as event categories or membership tiers.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop and a fluid model for mobile. A 12-column grid provides the structural backbone, ensuring that complex information—like membership benefit tables and event calendars—is organized logically.

Spacing is based on an **8px linear scale**, promoting a consistent rhythm throughout the UI. Large vertical gaps (80px+) are used between major homepage sections to provide "visual breathing room," reinforcing the premium nature of the professional body. Components within cards use tighter spacing (12px-16px) to maintain a cohesive grouping of information.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**. This design system avoids heavy gradients in favor of subtle depth that mimics professional stationery and modern corporate dashboards.

- **Level 0 (Surface):** The primary background, typically Corporate White or the lightest Teal-tinted gray.
- **Level 1 (Cards/Sections):** Uses a very soft, diffused shadow (15% opacity Deep Blue) with a 4px blur to lift membership cards and event listings off the page.
- **Level 2 (Dropdowns/Modals):** Features a more pronounced shadow with a 12px blur to indicate immediate interaction priority.
- **Level 3 (CTAs):** High-contrast buttons use a slight inner-glow effect rather than a drop shadow to appear "inset" and solid, emphasizing their stability.

## Shapes

The shape language is **Soft and Professional**. A standard corner radius of 4px (0.25rem) is applied to most UI elements, including input fields and secondary buttons. This provides a modern touch without sacrificing the serious tone required for a professional IT body.

For **Membership Cards**, a slightly larger radius (rounded-lg) is used to mimic the physical form of a plastic ID card. **Call-to-Action buttons** utilize the same 4px radius to maintain consistency with the input fields, creating a unified form-factor for all interactive elements.

## Components

### Call-to-Action (CTA) Buttons
The primary CTA is a solid block of Deep Blue or Teal. It uses "Label-MD" typography for the text. On hover, the button shifts slightly in tone (darker) rather than changing color, maintaining a steady professional presence.

### Membership Cards
These are the signature components of the design system. They feature a Deep Blue background with a subtle, low-opacity "copper-wire" or "geometric-weave" pattern. The member's name is set in Headline-MD, with the membership tier (e.g., "Professional," "Corporate") displayed in a high-contrast Teal tag.

### Event Listings
Event listings are presented as horizontal or vertical cards with a white background and a 1px light gray border. The date is featured in a dedicated Teal box to ensure it is the first piece of information the user processes.

### Input Fields & Forms
Forms use a "Flat-Corporate" style: white backgrounds, 1px deep blue borders on focus, and clear Label-MD titles positioned above the field. Error states use a refined 1px red border with supporting micro-copy below the field.

### Status Chips
Used within event listings or member profiles (e.g., "Active," "Expired," "Upcoming"). These are small, pill-shaped elements with light background tints of the status color and dark text for maximum accessibility.