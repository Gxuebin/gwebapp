# Hot GitHub

A polished React + Vite + TypeScript + Zustand app for exploring popular GitHub repositories with trending-style discovery.

## Overview

Hot GitHub helps you browse popular repositories with a cleaner, faster interface inspired by the GitHub trending experience. It supports language filtering, keyword search, sort switching, pagination, refresh, and clear request states.

## Stack

- React 18
- Vite 5
- TypeScript
- Zustand
- GitHub Search API

## Features

- Trending-style repository discovery
- Language filters
- Keyword search
- Sort by stars or recently updated
- Load more pagination
- Refresh current query
- Loading / empty / error states
- Responsive card-based UI
- Zustand-powered state management

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

- `src/api.ts` – GitHub API access
- `src/store.ts` – Zustand state and async actions
- `src/components/*` – UI building blocks
- `src/App.tsx` – page composition

## GitHub API Notes

This app uses the public GitHub Search API.

- Unauthenticated requests are rate-limited.
- If rate limits are hit, the UI will show an error state.
- Search results are a practical approximation of trending content, not the official GitHub Trending page.

## Branch

Current feature work lives on the `hotgithub` branch.
