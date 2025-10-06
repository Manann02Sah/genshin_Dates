# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Genshin Impact Birthday Calendar** web application built with Next.js 15, React 19, and TypeScript. It displays character birthdays, character information with YouTube trailers, and includes an interactive discussion forum for birthday wishes.

**Live Demo**: http://genshincallander.netlify.app

## Development Commands

```bash
# Install dependencies (npm or pnpm)
npm install
# or
pnpm install

# Run development server
npm run dev
# Access at http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks + localStorage for persistence

### Directory Structure

```
app/
├── page.tsx                    # Main calendar page (client component)
├── layout.tsx                  # Root layout with metadata
├── globals.css                 # Global styles and Tailwind directives
├── data/
│   └── characters.ts          # Character data source (GenshinCharacter[])
└── components/
    └── DiscussionForum.tsx    # Birthday wishes forum component

components/
├── theme-provider.tsx         # Theme context (unused currently)
└── ui/                        # shadcn/ui components (50+ components)

lib/
└── utils.ts                   # Utility functions (cn for class merging)

hooks/
└── use-toast.ts              # Toast notification hook
```

### Key Components

**`app/page.tsx`** (Main Component)
- Client-side rendered ("use client")
- Manages three views: Calendar, All Characters, Favorites
- Features:
  - Interactive calendar with birthday highlighting
  - Character detail modal with YouTube embeds
  - Favorites system (localStorage)
  - Today's birthdays alert
  - Month-based character filtering
- State: selectedDate, selectedCharacter, favorites, view, showVideo

**`app/components/DiscussionForum.tsx`**
- Forum for posting birthday wishes
- Features:
  - Message posting with author name
  - Character selection
  - Like system (tracked per user)
  - localStorage persistence
- State: messages, authorName, selectedCharacter

**`app/data/characters.ts`**
- Single source of truth for all character data
- TypeScript interface: `GenshinCharacter`
  - id, name, title, element, weapon, region
  - birthday: { month, day }
  - bio, image (URL), youtubeLink (optional)
- Currently contains ~30 characters

### Data Flow

1. **Character Data**: Imported from `app/data/characters.ts`
2. **Persistence**: localStorage for favorites and forum messages
3. **YouTube Integration**: URLs parsed and converted to embed format
4. **Image Handling**: External URLs with fallback to placeholder on error

### Styling Approach

- **Tailwind CSS**: Utility-first with custom theme configuration
- **Color Scheme**: Blue/indigo gradient background with amber/yellow accents (Genshin Impact theme)
- **Custom Classes**: `.birthday-date` for calendar birthday highlighting (defined in globals.css)
- **Responsive**: Mobile-first with grid layouts adapting to screen size

### Important Patterns

**Adding New Characters**:
1. Add entry to `genshinCharacters` array in `app/data/characters.ts`
2. Include all required fields (id, name, title, element, weapon, region, birthday, bio, image)
3. Optional: Add youtubeLink for character trailer

**Image Error Handling**:
All `<Image>` components include `onError` handlers that fallback to placeholder with character initial.

**Calendar Birthday Logic**:
- `getCharactersForDate()` filters by month/day match
- Calendar uses Radix UI with custom modifiers for birthday highlighting
- Dates with birthdays get `.birthday-date` class

**localStorage Keys**:
- `genshin-favorites`: Array of character IDs
- `genshin-birthday-messages`: Forum messages array
- `genshin-forum-author`: Last used author name

## Configuration Notes

- **TypeScript**: Paths alias `@/*` maps to project root
- **Tailwind**: Custom colors use CSS variables (see globals.css)
- **Next.js**: App Router with client components, no server components currently used
- **Image Domains**: External images loaded from various CDNs (configure in next.config.mjs if needed)

## Known Constraints

- All data is static (no backend/API)
- State persists only in browser localStorage
- External image URLs may break if sources change
- YouTube links must be valid youtube.com or youtu.be URLs
