# Contributing to DriveNation

Thanks for your interest in contributing.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

## Branching

- Create a feature branch from `main`.
- Use clear branch names, for example:
  - `feature/inventory-filters`
  - `fix/navbar-mobile`

## Commit Guidelines

- Keep commits small and focused.
- Use meaningful commit messages.
- Example format:
  - `feat: add service booking form validation`
  - `fix: correct EMI slider rounding`

## Pull Request Checklist

Before opening a PR, make sure:

- Code builds successfully (`npm run build`)
- UI is responsive on desktop and mobile
- No obvious regressions in core pages (Home, Inventory, Details)
- Changes are scoped to the intended feature/fix
- PR description includes:
  - what changed
  - why it changed
  - screenshots/GIFs for UI changes

## Coding Standards

- Use TypeScript and existing component patterns.
- Keep styles aligned with existing Tailwind design tokens.
- Avoid introducing new dependencies unless necessary.
- Prefer reusable components over duplicated markup.

## Reporting Bugs

When filing issues, include:

- Environment (OS, browser, Node version)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## Questions

If you need clarification before implementing a change, open an issue first.