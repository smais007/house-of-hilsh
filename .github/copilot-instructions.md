# Copilot Instructions for This Codebase

## Project Overview

- This is a large Next.js project using TypeScript, Tailwind CSS, and a modular folder structure.
- The main app code is in `src/app/`, with route segments under `src/app/(routes)/` and reusable UI blocks in `src/app/blocks/`.
- Data and configuration for UI blocks are managed via `src/app/hooks/data-*.tsx` files.
- Static assets (images, icons, etc.) are in the `public/` directory, organized by feature.

## Key Patterns & Conventions

- **Component Organization:**
  - UI blocks are grouped by feature in `src/app/blocks/` (e.g., `blocks/gallery/`, `blocks/hero/`, `blocks/auth/`, `blocks/cart/`).
  - Common UI and layout components are in `src/app/components/common/` and `src/app/components/layout/`.
  - Variants for blocks are in `variants/` subfolders.
- **Data Flow:**
  - Data for blocks is imported from `src/app/hooks/data-*.tsx` files, not fetched from APIs.
  - Example: `blocks/gallery/index.ts` imports from `hooks/data-gallery.tsx`.
- **Global State (Context):**
  - App-wide state is managed via React Context in `src/app/context/`.
  - `AuthContext.tsx`: Handles user authentication (login, signup, logout, password update). State is persisted in localStorage.
  - `CartContext.tsx`: Handles shopping cart (add/remove items, update quantity, clear cart). State is persisted in localStorage.
  - Contexts are provided in `LayoutProvider.tsx` and wrap the entire app.
- **Styling:**
  - Uses Tailwind CSS, configured in `tailwind.config.ts` and `postcss.config.mjs`.
  - Global styles in `src/app/globals.css` and `src/app/css/base.css`.
  - Feature-specific CSS in `src/app/css/blocks/` (e.g., `auth.css`, `cart.css`).
- **Routing:**
  - Next.js app directory routing: each folder in `src/app/(routes)/` is a route segment.
  - Page entry points are `page.tsx` files.
  - Auth routes: `/login`, `/signup`, `/forgot-password`, `/update-password`
  - Cart routes: `/cart`, `/checkout`
- **Type Definitions:**
  - Shared types are in `src/app/types/` (e.g., `auth.types.ts`, `cart.types.ts`, `menu.types.ts`, `common.types.ts`).

## Developer Workflows

- **Development:**
  - Start with `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`).
  - Edit pages in `src/app/(routes)/*/page.tsx` or components in `src/app/blocks/`.
- **Build:**
  - Run `pnpm build` to create a production build.
- **Deployment:**
  - Deploy to Vercel for best compatibility.

## Project-Specific Notes

- **No API routes or backend logic**: All data is static and local. Auth and cart are client-side only using localStorage.
- **Prefer composition**: Build new features by composing existing blocks and data patterns.
- **Follow file/folder naming conventions**: Match the structure in `src/app/blocks/` and `public/`.
- **Do not fetch remote data**: Use or extend the local data files in `src/app/hooks/`.
- **Protected routes**: Checkout requires authentication; redirects to `/login` if not logged in.
- **Cart integration**: Menu items use `DishItemWithCart` component for add-to-cart functionality.

## References

- See `README.md` for basic setup and deployment.
- Example block: `src/app/blocks/gallery/index.ts` + `src/app/hooks/data-gallery.tsx`.
- Example route: `src/app/(routes)/about-us/page.tsx`.
- Auth forms: `src/app/blocks/auth/` (LoginForm, SignupForm, etc.)
- Cart components: `src/app/blocks/cart/` (CartItem, CartList, CartSummary, CheckoutSummary)
- Global contexts: `src/app/context/AuthContext.tsx`, `src/app/context/CartContext.tsx`

---

If you are unsure about a pattern or workflow, review similar files in the relevant directory before introducing new approaches.
