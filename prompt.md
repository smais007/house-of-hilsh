You are working inside an existing Next.js (App Router) + TypeScript + Tailwind CSS project.
You MUST strictly follow the existing file/folder structure, naming conventions, layout styles, and architectural patterns.

=================================
OBJECTIVE
=================================
Implement a complete FRONTEND-ONLY (mocked) system for:

1. Authentication (Email + Social UI)
2. Cart with Navbar Drawer
3. Checkout with Billing + Payment Options

NO backend, NO APIs, NO server actions.

=================================
ABSOLUTE CONSTRAINTS
=================================

- ❌ No API routes
- ❌ No database
- ❌ No real Stripe or OAuth integration
- ✅ UI + mocked logic only
- ✅ Persist state using localStorage
- ✅ Pages are Server Components by default
- ✅ Client Components only where interaction is required
- ✅ Must be backend-ready (clean abstractions)

=================================
ROUTES (ONLY THESE)
=================================

Auth:

- src/app/(routes)/login/page.tsx
- src/app/(routes)/signup/page.tsx
- src/app/(routes)/forgot-password/page.tsx
- src/app/(routes)/update-password/page.tsx

Commerce:

- src/app/(routes)/checkout/page.tsx

⚠️ Cart is NOT a route

=================================
NAVBAR CART (DRAWER-BASED)
=================================

- Cart opens as a drawer / slide-over from navbar
- NOT a separate route
- Drawer includes:
  - Cart items list
  - Quantity controls
  - Remove item
  - Subtotal
  - "Go to Checkout" button

Files:

- src/app/blocks/cart/CartDrawer.tsx
- src/app/blocks/cart/CartDrawerItem.tsx
- Integrate drawer into existing Navbar component

Navbar must display:

- Cart icon
- Total item count badge (reactive)

=================================
MENU PAGE INTEGRATION
=================================

- Do NOT change layout or styling
- Add:
  - Quantity selector
  - Add to Cart button
- Use existing menu data from:
  src/app/hooks/data-\*.tsx

=================================
CHECKOUT PAGE (DETAILED)
=================================
Checkout page must collect:

Billing Information:

- Full Name
- Email
- Phone Number
- Address
- Notes (optional)

Payment Method (radio selection):

- Cash on Delivery (COD)
- Stripe (UI placeholder only)

Stripe rules:

- Stripe is a MOCK option
- Show "Pay with Stripe" button (disabled or simulated)
- Clearly structured so real Stripe can be added later

Files:

- src/app/blocks/checkout/
  - BillingForm.tsx
  - PaymentMethodSelector.tsx
  - OrderSummary.tsx

Checkout behavior:

- Requires authentication
- If user is not logged in → redirect to /login
- On submit:
  - Simulate order placement
  - Clear cart
  - Show success state (UI only)

=================================
AUTHENTICATION (ENHANCED)
=================================
Auth methods:

- Email + Password (mocked)
- Social Login UI:
  - Google
  - Facebook

Social login rules:

- UI buttons only
- Simulate successful login
- Same AuthContext flow

AuthContext must expose:

- user
- isAuthenticated
- login()
- signup()
- logout()
- socialLogin(provider)
- updatePassword()

Persist auth state in localStorage.

=================================
GLOBAL STATE
=================================
Contexts:

- src/app/context/AuthContext.tsx
- src/app/context/CartContext.tsx

CartContext must expose:

- addItem()
- removeItem()
- updateQuantity()
- clearCart()
- totalItems
- subtotal
- isDrawerOpen
- openDrawer()
- closeDrawer()

=================================
TYPES (STRICT)
=================================
Create types in:

- src/app/types/auth.types.ts
- src/app/types/cart.types.ts
- src/app/types/checkout.types.ts
- src/app/types/menu.types.ts

NO `any`. Strong typing only.

=================================
STYLING & UI RULES
=================================

- Tailwind CSS only
- Reuse existing button, form, spacing styles
- No inline styles
- No new design system
- Drawer animation should match existing UI patterns

=================================
ARCHITECTURE RULES
=================================

- page.tsx = composition only
- blocks = UI
- context = logic
- hooks/data-\*.tsx = static data only
- No business logic inside UI components

=================================
DELIVERABLES
=================================

- Auth with email + social UI
- Navbar cart drawer with live updates
- Menu → Cart → Checkout flow
- Billing form + payment selection
- Clean, scalable, backend-ready frontend

If uncertain, inspect existing files in:

- src/app/blocks/
- src/app/components/layout/
- src/app/(routes)/

DO NOT introduce new patterns.
FOLLOW the codebase EXACTLY.
