# Project Structure Overview

This is a Next.js application built with TypeScript, Tailwind CSS, and MongoDB (using Mongoose). It follows the App Router paradigm for routing and structure.

- `app/`: The core of the Next.js application, using the App Router.
  - `(auth)/`: Handles all authentication-related routes like sign-in, sign-up, and onboarding. Uses Clerk for authentication.
  - `(root)/`: Contains the main application pages that are accessible after a user is authenticated. This includes the main feed, activity, communities, profile, etc.
  - `api/`: Contains API routes, including a route for file uploads using `uploadthing`.
- `components/`: Contains all the React components.
  - `cards/`: Components that display data in a card format, like `PostCard`.
  - `forms/`: Reusable form components for creating posts, updating profiles, etc.
  - `shared/`: Common components used across the application, such as the navigation bar, footer, and sidebars.
  - `ui/`: Low-level UI components (likely from `shadcn/ui`) like `Button`, `Input`, `Label`, etc.
- `lib/`: Contains the application's core logic.
  - `actions/`: Server-side logic (Next.js Server Actions) for data fetching and mutations (e.g., creating threads, updating users).
  - `models/`: Mongoose schemas that define the structure of the data in the MongoDB database (e.g., `User`, `Thread`).
  - `mongoose.ts`: Handles the connection to the MongoDB database.
  - `utils/`: Utility functions used throughout the application.
  - `validations/`: Zod schemas for validating data, especially from forms.
- `constants/`: Stores constant values used throughout the application.
- `hooks/`: Custom React hooks for managing client-side logic and state (e.g., `useLike`, `useFollow`).
- `public/`: Stores static assets like images and SVGs.
- `interfaces/`: Contains TypeScript interfaces for defining data structures.
- Configuration Files:
  - `next.config.js`: Next.js configuration.
  - `tailwind.config.ts`: Tailwind CSS configuration.
  - `tsconfig.json`: TypeScript configuration.
  - `biome.jsonc`: Biome linter and formatter configuration.

# Ultracite

Enforces strict type safety, accessibility, and code quality for JS/TS projects using Biome.

## Claude Development Rules MUST BE FOLLOWED

1. Think and Plan: First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md
2. Create Todo List: The plan should have a list of todo items that you can check off as you complete them
3. Get Approval: Before you begin working, check in with me and I will verify the plan
4. Execute and Track: Begin working on the todo items, marking them as complete as you go
5. Communicate Changes: Every step of the way just give me a high level explanation of what changes you made
6. Keep It Simple: Make every task and code change as simple as possible. Avoid massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity
7. Review and Document: Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information

## Rules

### Core Principles

- Analyze existing patterns before writing code
- Consider edge cases and accessibility
- Use semantic HTML elements over ARIA roles
- Prefer arrow functions over function expressions
- Use `const` for variables assigned once
- Use `===` and `!==` for comparisons

### Accessibility

- No `accessKey` or `aria-hidden` on focusable elements
- Label elements need text content and input association
- Include `alt` text (no "image"/"photo" words)
- Button elements need `type` attribute
- Include `lang` on html element
- Accompany `onClick` with keyboard handlers

### React/JSX

- No Array index in keys
- Use `<>...</>` instead of `<Fragment>`
- Don't define components inside components
- All hook dependencies must be specified
- Call hooks from top level only

### TypeScript

- No enums or namespaces
- Use `export type` and `import type` for types
- Use `as const` instead of literal types
- Use `T[]` or `Array<T>` consistently
- No non-null assertions (`!`)

### Code Quality

- Use `for...of` instead of `Array.forEach`
- Use `.flatMap()` instead of `map().flat()`
- Use optional chaining over chained logical expressions
- No `console`, `debugger`, or hardcoded secrets
- No unused variables, imports, or parameters
- Use template literals over string concatenation

### Error Handling

```typescript
// ✅ Good
try {
  const result = await fetchData();
  return {success: true, data: result};
} catch (error) {
  console.error("API call failed:", error);
  return {success: false, error: error.message};
}
```

### Next.js

- Use `next/image` instead of `<img>`
- Use `next/head` properly (not in `_document.js`)

## Commands

- `npx ultracite init` - Initialize
- `npx ultracite format` - Format and fix
- `npx ultracite lint` - Check issues
