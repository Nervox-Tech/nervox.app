## Client APP RULES 
### 1. **React is a UI state machine**

* UI = `f(state)`
* No side effects during render
* If something is hard to reason about → your state model is wrong

> If you can’t explain a component with **inputs → outputs**, refactor it.

---

## 🧩 Component Design Principles

### 2. **Single Responsibility Components**

Each component should do **one thing well**:

* Fetch data **or**
* Manage state **or**
* Render UI

❌ Bad

```tsx
UserDashboard = fetch + transform + render + side effects
```

✅ Good

```tsx
<UserDashboardContainer />
<UserDashboardView />
```

---

### 3. **400 LOC is a hard stop (200 is ideal)**

* > 400 LOC = architectural smell
* Split by **behavior**, not by JSX chunks

Good split:

* `DashboardLayout.tsx`
* `DashboardStats.tsx`
* `useDashboardData.ts`

---

### 4. **Prefer Composition over Conditionals**

Avoid:

```tsx
if (isAdmin) return <AdminUI />
else return <UserUI />
```

Prefer:

```tsx
<DashboardLayout sidebar={<Sidebar role={role} />} />
```

---

## 🧬 State Management Rules

### 5. **State lives as close as possible to where it’s used**

* UI state → local component
* Shared UI state → context
* Server state → React Query / TanStack Query
* Global app state → Zustand / Redux (sparingly)

❌ Lifting state “just in case”
✅ Lift state **only when required**

---

### 6. **No Prop Drilling beyond 2 levels**

If you’re passing props through components that don’t use them:

* Stop
* Introduce Context or a Store

Rule of thumb:

* 1–2 levels → props
* 3+ levels → context/store

---

### 7. **Derived State is a Code Smell**

Never do:

```tsx
const [fullName, setFullName] = useState("")
```

If it can be derived:

```tsx
const fullName = `${firstName} ${lastName}`
```

---

## 🔁 Side Effects & Data Fetching

### 8. **All side effects belong in hooks**

* `useEffect`
* `useMutation`
* `useQuery`
* Custom hooks

❌ Side effects in render
❌ API calls in components

✅ Custom hooks:

```ts
useUserProfile()
useUpdateSettings()
```

---

### 9. **One API concern = One Hook**

Bad:

```ts
useDashboardEverything()
```

Good:

```ts
useDashboardStats()
useDashboardActivities()
useDashboardPermissions()
```

Hooks should be:

* Testable
* Reusable
* Predictable

---

## 🧱 Folder & File Architecture

### 10. **Feature-First Folder Structure**

Not:

```
components/
hooks/
utils/
```

But:

```
dashboard/
 ├─ components/
 ├─ hooks/
 ├─ services/
 ├─ types.ts
 └─ index.ts
```

This scales. The other one doesn’t.

---

### 11. **Public API per Feature**

Every feature exports **only what is allowed**:

```ts
// dashboard/index.ts
export { DashboardPage } from "./DashboardPage";
```

Never import deep paths:

```ts
❌ import x from "dashboard/components/internal/X"
```

---

## ⚡ Performance Rules (Real-World)

### 12. **Don’t prematurely memoize**

* `useMemo` / `useCallback` are tools, not defaults
* Measure first (React DevTools Profiler)

Use memoization when:

* Expensive computation
* Stable props for pure components
* Large lists

---

### 13. **Keys Must Be Stable**

Never use index as key unless:

* List is static
* Order never changes

Bad:

```tsx
key={index}
```

Good:

```tsx
key={user.id}
```

---

## 🛡️ TypeScript Discipline (Critical)

### 14. **Strict Mode ON (always)**

* `strict: true`
* `noImplicitAny`
* `strictNullChecks`

If TS is annoying → your design is weak.

---

### 15. **Types belong close to usage**

* Component props near component
* API types near service layer
* Shared types explicitly exported

Avoid:

```ts
types/global.ts (dumping ground)
```

---

## 🧪 Testing & Reliability

### 16. **Test behavior, not implementation**

Test:

* What user sees
* What user does
* What happens next

Don’t test:

* Internal state
* Hook internals
* Implementation details

---

### 17. **Every async path handles:**

* Loading
* Empty
* Error
* Success

If any is missing → production bug waiting.

---

## 🧼 Code Hygiene Rules

### 18. **No Magic Numbers / Strings**

```ts
❌ if (role === "ADMIN")
✅ enum UserRole { Admin }
```

---

### 19. **Remove Dead Code Aggressively**

* Commented code = deleted code
* Git is your backup

---

### 20. **Readable > Clever**

If someone else can’t debug it at 2 AM:

* Rewrite it

---

