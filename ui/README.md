# UI structure

## Layout (site chrome)

Shared header, nav, and footer used across home and blog (and other routes).

- **`layout/header.tsx`** – Logo + Connects
- **`layout/nav-links.tsx`** – Main navigation (About, Projects, Contact, Blog)
- **`layout/footer.tsx`** – GoToTop, Connects, copyright

## Primitives (design system)

Single-file components from shadcn or your design system. **New variants** (e.g. a new button style) go here.

- **`button.tsx`** – Main Button with variants (default, outline, ghost, etc.). Add new variants in `buttonVariants`.
- **`card.tsx`** – Card primitive (when added from shadcn). Add new card variants here if needed.
- **`input.tsx`**, **`dialog.tsx`**, etc. – Same idea: one file per primitive.

## Composed / feature components

Specific UI pieces that **use** the primitives. One file per component.

- **`buttons/`** – Feature buttons: `gototop.tsx`, `contact.tsx`, etc. Each uses `<Button>` or a plain `<button>` with its own behavior and label.
- **`cards/`** – Feature cards: `project-card.tsx`, `blog-card.tsx`, etc. Each uses `<Card>` (or the card primitive) with specific layout and content.

**Rule of thumb:** Primitive = reusable building block (variants live here). Folder = specific feature components that use primitives.
