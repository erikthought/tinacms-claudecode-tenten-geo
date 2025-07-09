# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual landing page for Tenten's Generative Engine Optimization (GEO) services, built with Next.js 14, TypeScript, and TinaCMS as the headless CMS.

## Key Commands

```bash
# Development with TinaCMS visual editor
npm run dev

# Production build
npm run build

# Start production server
npm start

# Export static site
npm run export
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 with TypeScript
- **CMS**: TinaCMS (Git-based headless CMS)
- **Styling**: CSS with styled-components v6
- **Deployment**: Vercel

### Content Management
- Content is stored as markdown files in `/content/pages/`
- Each language has its own markdown file (en.md, ja.md, zh-cn.md, zh-tw.md, ko.md, ar.md, de.md, es.md, fr.md, pt.md, tr.md, vi.md)
- TinaCMS schema is defined in `/tina/config.ts`
- Visual editor accessible at `/admin` in development

### Key Architectural Decisions

1. **Dynamic Language Routing**: The `[...filename].tsx` page handles all language variants dynamically
2. **TinaCMS Integration**: 
   - TinaProvider wraps the app and is dynamically imported with SSR disabled
   - Content queries use the `useTina` hook for live editing
   - Schema defines structured content blocks (hero, problems, solutions, pricing, etc.)
3. **Language Detection**: Automatic browser language detection in `utils/languageDetection.ts`
4. **RTL Support**: Arabic language includes RTL text direction support

### Component Structure
- `components/Layout.tsx`: Page layout wrapper with meta tags
- `components/LandingPage.tsx`: Main component rendering all content sections
- `components/TinaProvider.tsx`: TinaCMS provider wrapper

### Environment Variables
Required for TinaCMS functionality:
- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_TOKEN`
- `NEXT_PUBLIC_TINA_BRANCH` (defaults to main)

### Development Notes
- When modifying content structure, update the schema in `/tina/config.ts`
- After schema changes, TinaCMS will regenerate types automatically
- The admin interface at `/admin` provides visual editing for all content
- Media uploads are handled by TinaCMS and stored in `/public/uploads/`