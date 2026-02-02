# PHASE 2: ARCHITECTURE UPGRADE PLAN
## Target Architecture & Migration Strategy

**Date:** 2025-01-27  
**Phase:** Architecture Upgrade  
**Status:** Planning - Awaiting Approval

---

## STEP 1: TARGET ARCHITECTURE

### 📁 Final Folder Structure

```
src/
├── app/                          # App-level configuration
│   ├── routes/                   # Route definitions & config
│   │   ├── index.tsx             # Main route configuration
│   │   └── constants.ts          # Route paths as constants
│   └── providers/                # Global providers (auth, theme, etc.)
│       └── AppProviders.tsx      # Combined providers wrapper
│
├── features/                     # Feature-based modules (unchanged structure)
│   ├── admin/
│   │   ├── api/                  # NEW: Admin-specific API calls
│   │   │   └── adminApi.ts
│   │   ├── components/           # Existing components
│   │   ├── hooks/                # NEW: Admin-specific hooks
│   │   ├── pages/                # Existing pages
│   │   └── types/                # NEW: Admin-specific types
│   │
│   ├── auth/
│   │   ├── api/                  # NEW: Auth API calls
│   │   │   └── authApi.ts
│   │   ├── components/          # Existing components
│   │   ├── hooks/                # NEW: useAuth, useLogin, etc.
│   │   ├── pages/                # NEW: Move pages here from components
│   │   └── types/                # NEW: Auth types
│   │
│   ├── landing/
│   │   │   ├── api/             # NEW: Landing API calls
│   │   │   ├── components/      # Existing components
│   │   │   ├── pages/           # Existing pages
│   │   │   └── types/           # NEW: Landing types
│   │
│   ├── mentor/
│   │   ├── api/                  # NEW: Mentor API calls
│   │   ├── components/          # Existing components
│   │   ├── hooks/                # NEW: Mentor-specific hooks
│   │   ├── pages/                # Existing pages
│   │   └── types.ts              # Existing (keep, improve)
│   │
│   └── student/
│       ├── api/                  # NEW: Student API calls
│       ├── components/          # Existing components
│       ├── hooks/                # NEW: Student-specific hooks
│       └── types/                # NEW: Student types
│
├── shared/                       # Shared across features
│   ├── api/                      # NEW: Base API client & interceptors
│   │   ├── client.ts            # Axios/fetch wrapper
│   │   ├── interceptors.ts      # Request/response interceptors
│   │   └── types.ts             # API response types
│   │
│   ├── components/              # Shared UI components
│   │   ├── Footer.tsx           # Existing
│   │   ├── Navbar.tsx           # Existing
│   │   └── ErrorBoundary.tsx    # NEW: Global error boundary
│   │
│   ├── constants/                # NEW: App-wide constants
│   │   ├── routes.ts            # Route paths
│   │   ├── api.ts               # API endpoints
│   │   └── storage.ts           # LocalStorage keys
│   │
│   ├── design/                   # Design tokens (existing)
│   │   ├── colors.ts
│   │   ├── radii.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   │
│   ├── hooks/                    # NEW: Reusable hooks
│   │   ├── useLocalStorage.ts    # LocalStorage abstraction
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── layouts/                  # Layout components (existing)
│   │   ├── AuthLayout.tsx
│   │   └── MainLayout.tsx
│   │
│   ├── lib/                      # NEW: Third-party integrations
│   │   └── react-query.ts       # React Query setup
│   │
│   ├── stores/                   # NEW: Global state (Zustand/Context)
│   │   ├── authStore.ts          # Auth state
│   │   └── uiStore.ts            # UI state (theme, sidebar, etc.)
│   │
│   ├── types/                    # NEW: Shared TypeScript types
│   │   ├── api.ts                # API response types
│   │   ├── common.ts             # Common types
│   │   └── index.ts              # Re-exports
│   │
│   ├── ui/                       # UI primitives (existing)
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ... (all existing)
│   │
│   └── utils/                    # Utility functions
│       ├── cn.ts                 # Existing
│       ├── format.ts             # NEW: Formatting utilities
│       └── validation.ts        # NEW: Validation helpers
│
├── pages/                        # NEW: Top-level page components
│   └── NotFound.tsx              # Move from src/pages/
│
├── App.tsx                       # Root component (refactor)
├── main.tsx                      # Entry point (minimal changes)
├── index.css                     # Global styles (existing)
└── vite-env.d.ts                 # Vite types (existing)
```

---

## STEP 2: FOLDER RESPONSIBILITIES

### `app/`
**Purpose:** Application-level configuration and setup
- **routes/**: Route definitions, route constants, route guards
- **providers/**: Global React context providers (AuthProvider, ThemeProvider, QueryClientProvider)

**Rules:**
- Only app-wide concerns
- No business logic
- No feature-specific code

---

### `features/`
**Purpose:** Feature modules (domain-driven)
- Each feature is self-contained
- Can have: `api/`, `components/`, `hooks/`, `pages/`, `types/`, `utils/`

**Structure per feature:**
```
feature-name/
├── api/          # Feature-specific API calls
├── components/   # Feature-specific UI components
├── hooks/        # Feature-specific hooks
├── pages/        # Feature page components
├── types/        # Feature-specific types
└── index.ts      # Public API (exports)
```

**Rules:**
- Features should not import from other features directly
- Use `shared/` for cross-feature code
- Each feature can be extracted to a separate package later

---

### `shared/`
**Purpose:** Code shared across multiple features

**Subfolders:**
- **api/**: Base API client, interceptors, common API utilities
- **components/**: Shared UI components (Navbar, Footer, ErrorBoundary)
- **constants/**: App-wide constants (routes, API endpoints, storage keys)
- **design/**: Design tokens (colors, spacing, typography)
- **hooks/**: Reusable React hooks
- **layouts/**: Layout components
- **lib/**: Third-party library configurations
- **stores/**: Global state management
- **types/**: Shared TypeScript types
- **ui/**: UI primitives (Button, Card, Input, etc.)
- **utils/**: Pure utility functions

**Rules:**
- No feature-specific logic
- Must be reusable across features
- Well-documented

---

### `pages/`
**Purpose:** Top-level page components (route entry points)
- Only contains page components that are route entry points
- Minimal logic, delegates to features

**Rules:**
- One file per route
- Thin wrappers around feature components
- Can be lazy-loaded

---

## STEP 3: FILE MAPPING

### ✅ **Files to Keep (No Changes)**
- `src/main.tsx` - Entry point
- `src/index.css` - Global styles
- `src/vite-env.d.ts` - Vite types
- `src/shared/design/*` - Design tokens (all 4 files)
- `src/shared/ui/*` - All UI primitives (13 files)
- `src/shared/utils/cn.ts` - Utility function

### 📦 **Files to Move**

#### **From `src/pages/` → `src/pages/`**
- `NotFound.tsx` → Keep in `src/pages/NotFound.tsx` (already correct location)

#### **From `src/features/auth/components/` → `src/features/auth/pages/`**
- `AuthPage.tsx` → `features/auth/pages/AuthPage.tsx`
- `AdminLoginPage.tsx` → `features/auth/pages/AdminLoginPage.tsx`

#### **From `src/features/landing/data/` → Keep (no change)**
- `coursesData.ts` → Keep
- `stories.ts` → Keep

#### **From `src/features/mentor/types.ts` → `src/features/mentor/types/index.ts`**
- `types.ts` → `types/index.ts` (better organization)

#### **From `src/shared/components/` → Keep (no change)**
- `Navbar.tsx` → Keep
- `Footer.tsx` → Keep

#### **From `src/shared/layouts/` → Keep (no change)**
- `MainLayout.tsx` → Keep (but fix import)
- `AuthLayout.tsx` → Keep

### 🆕 **Files to Create**

#### **Configuration Files**
1. `src/app/routes/index.tsx` - Route configuration
2. `src/app/routes/constants.ts` - Route path constants
3. `src/app/providers/AppProviders.tsx` - Combined providers

#### **API Layer**
4. `src/shared/api/client.ts` - Base API client
5. `src/shared/api/interceptors.ts` - Request/response interceptors
6. `src/shared/api/types.ts` - API response types
7. `src/features/auth/api/authApi.ts` - Auth API calls
8. `src/features/admin/api/adminApi.ts` - Admin API calls

#### **Constants**
9. `src/shared/constants/routes.ts` - Route paths
10. `src/shared/constants/api.ts` - API endpoint constants
11. `src/shared/constants/storage.ts` - LocalStorage keys

#### **Hooks**
12. `src/shared/hooks/useLocalStorage.ts` - LocalStorage abstraction
13. `src/features/auth/hooks/useAuth.ts` - Auth hook
14. `src/features/auth/hooks/useLogin.ts` - Login hook

#### **Stores**
15. `src/shared/stores/authStore.ts` - Auth state
16. `src/shared/stores/uiStore.ts` - UI state

#### **Types**
17. `src/shared/types/api.ts` - API types
18. `src/shared/types/common.ts` - Common types
19. `src/shared/types/index.ts` - Type re-exports
20. `src/features/auth/types/index.ts` - Auth types
21. `src/features/admin/types/index.ts` - Admin types

#### **Components**
22. `src/shared/components/ErrorBoundary.tsx` - Error boundary

#### **Utils**
23. `src/shared/utils/format.ts` - Formatting utilities
24. `src/shared/utils/validation.ts` - Validation helpers

#### **Config Files**
25. `.env.example` - Environment variables template
26. `src/config/env.ts` - Environment variable validation

### 🔧 **Files to Refactor**

#### **High Priority (Build-Breaking)**
1. **`src/shared/layouts/MainLayout.tsx`**
   - Fix: Change `../components/Navbar` → `../components/Navbar` (already correct path, but verify)
   - Actually: Import should be `@shared/components/Navbar` after path aliases

2. **`eslint.config.js`**
   - Fix: Remove invalid `import { globalIgnores } from 'eslint/config'`
   - Replace with proper ESLint flat config

3. **`src/features/admin/components/MentorApproval.tsx`**
   - Fix: Remove unused `selectedMentor` variable (line 33)

#### **Medium Priority (Architecture)**
4. **`src/App.tsx`**
   - Refactor: Extract routes to `app/routes/index.tsx`
   - Use route constants from `shared/constants/routes.ts`
   - Add lazy loading for routes

5. **`src/features/auth/components/AuthPage.tsx`**
   - Refactor: Replace direct `fetch()` with `authApi.login()` / `authApi.signup()`
   - Extract form logic to custom hook
   - Use environment variables for API URLs

6. **`src/features/auth/components/AdminLoginPage.tsx`**
   - Refactor: Replace direct `fetch()` with `authApi.adminLogin()`
   - Use environment variables

7. **`src/features/landing/pages/CourseDetail.tsx`**
   - Refactor: Replace localStorage direct access with `useLocalStorage` hook
   - Add proper error handling

8. **`src/shared/components/Footer.tsx`**
   - Refactor: Extract chatbot to separate component
   - Extract contact form to separate component
   - Split into smaller components (292 lines → 3-4 components)

#### **Low Priority (Code Quality)**
9. **`src/features/admin/pages/AdminDashboard.tsx`**
   - Refactor: Extract sidebar to `shared/components/Sidebar/`
   - Extract sidebar context to `shared/stores/uiStore.ts`
   - Remove duplicate `cn()` import

10. **`src/features/mentor/pages/MentorDashboard.tsx`**
    - Refactor: Extract notification logic to hook
    - Extract sidebar to shared component

### 🗑️ **Files/Directories to Delete**

1. **Empty Directories:**
   - `src/components/Admin Dashboard/` (empty)
   - `src/pages/Home/` (empty)
   - `src/pages/Navbar/` (empty)
   - `src/pages/auth/` (empty)

2. **Dead Code:**
   - Commented code in `main.tsx` (line 3)

3. **Temporary Files:**
   - `tsc_error_2.txt`
   - `tsc_output_2.txt`
   - `tsc_output_3.txt`

### 📝 **Files to Update (Imports Only)**

All files that import from moved/renamed locations:
- Update relative imports to use path aliases (`@/`, `@shared/`, `@features/`)
- Estimated: ~30-40 files need import updates

---

## STEP 4: MIGRATION STRATEGY

### 🎯 **Migration Order (Highest Impact + Lowest Risk)**

#### **Sprint 1: Foundation (Build-Breaking Fixes)**
**Goal:** Fix all build errors, establish foundation

1. ✅ **Fix ESLint Configuration**
   - File: `eslint.config.js`
   - Risk: Low (config only)
   - Impact: High (enables linting)

2. ✅ **Fix TypeScript Error**
   - File: `src/features/admin/components/MentorApproval.tsx`
   - Risk: Low (remove unused variable)
   - Impact: Medium (fixes build)

3. ✅ **Add Path Aliases**
   - Files: `tsconfig.json`, `vite.config.ts`
   - Risk: Low (configuration)
   - Impact: High (enables clean imports)

4. ✅ **Fix MainLayout Import**
   - File: `src/shared/layouts/MainLayout.tsx`
   - Risk: Low (single import fix)
   - Impact: High (fixes runtime error)

5. ✅ **Create Environment Configuration**
   - Files: `.env.example`, `src/config/env.ts`
   - Risk: Low (new files)
   - Impact: High (enables env vars)

6. ✅ **Delete Empty Directories**
   - Risk: None (empty)
   - Impact: Low (cleanup)

**Deliverable:** Project builds without errors, path aliases work

---

#### **Sprint 2: API Layer & Constants**
**Goal:** Create API abstraction, centralize constants

7. ✅ **Create Base API Client**
   - Files: `src/shared/api/client.ts`, `interceptors.ts`, `types.ts`
   - Risk: Medium (new abstraction)
   - Impact: High (enables API refactoring)

8. ✅ **Create Constants**
   - Files: `src/shared/constants/routes.ts`, `api.ts`, `storage.ts`
   - Risk: Low (new files)
   - Impact: Medium (centralizes constants)

9. ✅ **Create Feature API Files**
   - Files: `src/features/auth/api/authApi.ts`, `src/features/admin/api/adminApi.ts`
   - Risk: Medium (new API layer)
   - Impact: High (enables API migration)

10. ✅ **Create Route Configuration**
    - Files: `src/app/routes/index.tsx`, `src/app/routes/constants.ts`
    - Risk: Low (extract from App.tsx)
    - Impact: Medium (better organization)

**Deliverable:** API layer ready, constants centralized

---

#### **Sprint 3: Hooks & Utilities**
**Goal:** Create reusable hooks and utilities

11. ✅ **Create Shared Hooks**
    - Files: `src/shared/hooks/useLocalStorage.ts`, `useDebounce.ts`, `useMediaQuery.ts`
    - Risk: Low (new utilities)
    - Impact: Medium (reusable logic)

12. ✅ **Create Auth Hooks**
    - Files: `src/features/auth/hooks/useAuth.ts`, `useLogin.ts`
    - Risk: Medium (new abstraction)
    - Impact: High (enables auth refactoring)

13. ✅ **Create Utility Functions**
    - Files: `src/shared/utils/format.ts`, `validation.ts`
    - Risk: Low (new utilities)
    - Impact: Low (nice to have)

**Deliverable:** Reusable hooks and utilities available

---

#### **Sprint 4: State Management**
**Goal:** Add global state management

14. ✅ **Create Auth Store**
    - Files: `src/shared/stores/authStore.ts`
    - Risk: Medium (new state management)
    - Impact: High (enables auth state)

15. ✅ **Create UI Store**
    - Files: `src/shared/stores/uiStore.ts`
    - Risk: Low (UI state only)
    - Impact: Medium (sidebar, theme state)

16. ✅ **Create App Providers**
    - Files: `src/app/providers/AppProviders.tsx`
    - Risk: Low (wrapper component)
    - Impact: Medium (cleaner setup)

**Deliverable:** Global state management in place

---

#### **Sprint 5: Component Migration**
**Goal:** Move and refactor components

17. ✅ **Move Auth Pages**
    - Move: `AuthPage.tsx`, `AdminLoginPage.tsx` to `features/auth/pages/`
    - Risk: Low (file move)
    - Impact: Medium (better organization)

18. ✅ **Refactor Auth Components**
    - Files: `AuthPage.tsx`, `AdminLoginPage.tsx`
    - Replace: Direct `fetch()` → `authApi` calls
    - Risk: Medium (logic change)
    - Impact: High (uses new API layer)

19. ✅ **Create Error Boundary**
    - File: `src/shared/components/ErrorBoundary.tsx`
    - Risk: Low (new component)
    - Impact: Medium (better error handling)

20. ✅ **Refactor CourseDetail**
    - File: `src/features/landing/pages/CourseDetail.tsx`
    - Replace: Direct localStorage → `useLocalStorage` hook
    - Risk: Low (abstraction only)
    - Impact: Medium (better patterns)

**Deliverable:** Components use new abstractions

---

#### **Sprint 6: Types & Final Cleanup**
**Goal:** Improve type safety, final cleanup

21. ✅ **Create Shared Types**
    - Files: `src/shared/types/api.ts`, `common.ts`, `index.ts`
    - Risk: Low (type definitions)
    - Impact: Medium (better type safety)

22. ✅ **Create Feature Types**
    - Files: `src/features/auth/types/index.ts`, `admin/types/index.ts`
    - Move: `mentor/types.ts` → `mentor/types/index.ts`
    - Risk: Low (organization)
    - Impact: Low (better organization)

23. ✅ **Update All Imports**
    - Update: All files to use path aliases
    - Risk: Medium (many files)
    - Impact: High (clean imports)

24. ✅ **Refactor App.tsx**
    - File: `src/App.tsx`
    - Extract: Routes to `app/routes/index.tsx`
    - Add: Lazy loading
    - Risk: Medium (route changes)
    - Impact: High (better structure)

**Deliverable:** Type-safe, clean imports, optimized routes

---

### ⚠️ **What Will NOT Be Refactored in Phase 2**

**Explicitly Excluded:**
1. ❌ **UI Component Refactoring** (Phase 3)
   - Footer.tsx split (292 lines) → Phase 3
   - AdminDashboard sidebar extraction → Phase 3
   - MentorDashboard refactoring → Phase 3

2. ❌ **Performance Optimizations** (Phase 4)
   - Code splitting → Phase 4
   - React.memo/useMemo → Phase 4
   - Image optimization → Phase 4

3. ❌ **Testing Infrastructure** (Phase 5)
   - Test setup → Phase 5
   - Unit tests → Phase 5

4. ❌ **Route Protection** (Phase 3)
   - Auth guards → Phase 3
   - Protected routes → Phase 3

5. ❌ **Data Fetching Library** (Phase 3)
   - React Query integration → Phase 3
   - Caching strategy → Phase 3

**Reason:** Focus on architecture foundation first, UI/UX improvements later.

---

## STEP 5: RISK ASSESSMENT

### 🔴 **High Risk Items**

1. **API Layer Migration**
   - **Risk:** Breaking existing API calls
   - **Mitigation:** 
     - Keep old `fetch()` calls working during migration
     - Migrate one feature at a time
     - Test each migration before moving to next

2. **Import Path Updates**
   - **Risk:** Breaking imports across 30-40 files
   - **Mitigation:**
     - Use automated find/replace with verification
     - Update in batches (feature by feature)
     - Test build after each batch

3. **Route Refactoring**
   - **Risk:** Breaking navigation
   - **Mitigation:**
     - Keep route paths identical
     - Test all routes after refactoring
     - Use route constants to prevent typos

### 🟡 **Medium Risk Items**

4. **State Management Introduction**
   - **Risk:** Changing state patterns mid-development
   - **Mitigation:**
     - Start with simple Context API
     - Can upgrade to Zustand later if needed
     - Keep localStorage abstraction for backward compatibility

5. **Environment Variables**
   - **Risk:** Breaking existing hardcoded URLs
   - **Mitigation:**
     - Provide fallback values
     - Document required env vars
     - Create `.env.example` with defaults

### 🟢 **Low Risk Items**

6. **File Moves**
   - **Risk:** Minimal (just location changes)
   - **Mitigation:** Use git to track moves

7. **New File Creation**
   - **Risk:** None (new files only)
   - **Mitigation:** None needed

8. **Empty Directory Deletion**
   - **Risk:** None (empty)
   - **Mitigation:** None needed

---

## STEP 6: VALIDATION CHECKLIST

After each sprint, verify:

- [ ] Project builds without errors (`npm run build`)
- [ ] TypeScript compiles (`npm run build` or `tsc`)
- [ ] ESLint passes (`npm run lint`)
- [ ] All routes work (manual testing)
- [ ] No runtime errors in browser console
- [ ] Imports use path aliases (no `../../../`)
- [ ] Environment variables work (API calls use env vars)
- [ ] API layer is used (no direct `fetch()` in components)

---

## STEP 7: ROLLBACK PLAN

If issues arise:

1. **Git Branches:**
   - Create feature branch: `phase-2-architecture`
   - Commit after each sprint
   - Can revert individual sprints if needed

2. **Incremental Migration:**
   - Each sprint is independent
   - Can pause after any sprint
   - Old code remains until fully migrated

3. **Backward Compatibility:**
   - Keep old patterns working during migration
   - Remove only after new pattern is verified

---

## ESTIMATED EFFORT

- **Sprint 1 (Foundation):** 4-6 hours
- **Sprint 2 (API Layer):** 6-8 hours
- **Sprint 3 (Hooks):** 4-6 hours
- **Sprint 4 (State):** 4-6 hours
- **Sprint 5 (Components):** 6-8 hours
- **Sprint 6 (Types/Cleanup):** 6-8 hours

**Total:** 30-42 hours (~1 week of focused work)

---

## NEXT STEPS

1. ✅ **Review this plan**
2. ✅ **Approve migration strategy**
3. ⏳ **Begin Sprint 1** (Foundation fixes)

---

**END OF PHASE 2 ARCHITECTURE PLAN**
