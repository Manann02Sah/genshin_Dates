# Genshin Impact Guide Website

A production-ready guide website for Genshin Impact built with Next.js 15, TypeScript, and TailwindCSS. Features stunning animations, modern UI, and comprehensive game guides.

> 🔗 Live Demo: [genshincallander.netlify.app](http://genshincallander.netlify.app)

---

## 🌟 Features

### Content
- **Character Database**: Comprehensive profiles with builds, weapons, artifacts, and team recommendations
- **Weapon Guide**: Detailed stats, passives, and character matchups
- **Artifact Sets**: Complete set information with bonuses and recommendations
- **Strategy Guides**: In-depth guides for team building and combat strategies
- **Team Compositions**: Pre-built teams with rotations and analysis

### UI/UX
- **Stunning Animations**: Framer Motion animations throughout the site
- **Hero Sections**: Full-width hero images with gradient overlays on character pages
- **Advanced Search**: Fuzzy search powered by Fuse.js
- **Smart Filtering**: Multi-criteria filtering (element, weapon, region, rarity)
- **Dark Mode**: Full theme support with system preference detection
- **Responsive Design**: Mobile-first, works on all screen sizes

### Performance
- **Static Generation**: Pre-rendered pages for instant loading
- **Optimized Images**: Next.js Image optimization
- **SEO Optimized**: Complete metadata, sitemap, and robots.txt
- **Type-Safe**: Full TypeScript coverage

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: TailwindCSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion
- **Search**: Fuse.js (fuzzy search)
- **Icons**: Lucide React
- **Theme**: next-themes
- **Content**: Markdown rendering with react-markdown
- **Deployment**: Vercel / Netlify
- **Data Source**: Local JSON files

---

## 📷 Preview

<img width="1556" height="427" alt="image" src="https://github.com/user-attachments/assets/ff3421ba-1da4-4af6-b85f-ec56e3869109" />



## 📂 Project Structure

```
genshin_Dates/
├── app/
│   ├── genshin/
│   │   ├── characters/
│   │   │   ├── [slug]/page.tsx    # Character detail page
│   │   │   └── page.tsx           # Characters list page
│   │   ├── weapons/
│   │   │   ├── [slug]/page.tsx    # Weapon detail page
│   │   │   └── page.tsx           # Weapons list page
│   │   ├── artifacts/
│   │   │   ├── [slug]/page.tsx    # Artifact detail page
│   │   │   └── page.tsx           # Artifacts list page
│   │   ├── guides/
│   │   │   ├── [slug]/page.tsx    # Guide detail page
│   │   │   └── page.tsx           # Guides list page
│   │   └── teams/
│   │       └── page.tsx           # Team compositions page
│   ├── layout.tsx                 # Root layout with navbar & footer
│   ├── page.tsx                   # Homepage
│   ├── sitemap.ts                 # Dynamic sitemap generation
│   └── robots.ts                  # Robots.txt configuration
├── components/
│   ├── ui/                        # shadcn/ui components (18 components)
│   ├── CharacterCard.tsx          # Animated character grid card
│   ├── CharacterHero.tsx          # Hero section for character pages
│   ├── WeaponCard.tsx             # Weapon grid card
│   ├── ArtifactCard.tsx           # Artifact grid card
│   ├── GuideCard.tsx              # Guide card with metadata
│   ├── FilterBar.tsx              # Multi-select filter component
│   ├── SearchBar.tsx              # Fuzzy search with Fuse.js
│   ├── Navbar.tsx                 # Main navigation
│   ├── Footer.tsx                 # Site footer
│   └── ThemeToggle.tsx            # Dark/light mode toggle
├── hooks/
│   └── use-toast.ts               # Toast notification hook
├── lib/
│   ├── data.ts                    # Data access layer & TypeScript types
│   └── utils.ts                   # Utility functions (cn, etc.)
├── data/                          # JSON data files
│   ├── characters.json            # Character database
│   ├── weapons.json               # Weapon database
│   ├── artifacts.json             # Artifact sets
│   ├── guides.json                # Strategy guides
│   └── teams.json                 # Team compositions
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
``
## 🚀 Getting Started

To run the project locally:

```bash
# 1. Clone the repository
git clone https://github.com/your-username/genshin-birthday-calendar.git
cd genshin-birthday-calendar

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# Visit http://localhost:3000 to view the app

# 4. Build for production
npm run build:production

# 5. Start production server
npm start

```
## 📊 Data Management

### Adding New Content

All content is stored in JSON files in the `data/` directory:

**Characters** (`data/characters.json`):
```json
{
  "slug": "character-name",
  "name": "Character Name",
  "rarity": 5,
  "element": "Pyro",
  "weaponType": "Sword",
  "bestBuild": {
    "weapons": ["weapon-slug"],
    "artifacts": ["artifact-slug"],
    "mainStats": {...},
    "substatsPriority": [...]
  }
}
```

**Guides** (`data/guides.json`):
- Use Markdown in the `content` field
- Automatically renders with proper styling
- Supports headings, lists, code blocks, etc.

### Deployment

**Vercel** (Recommended):
1. Push to GitHub
2. Import to Vercel
3. Auto-deploy on commit

**Build Commands**:
```bash
npm install              # Install dependencies
npm run build           # Build for production
npm run build:production # Type-check and build
npm start               # Start production server
npm run type-check      # Run TypeScript type checking
npm run lint            # Run ESLint
npm run clean           # Clean build artifacts
```

### Environment Variables

No environment variables are required for basic operation. All data is sourced from local JSON files.

## 📦 Production Optimization

The codebase has been optimized for production:

- ✅ Removed 31 unused UI components
- ✅ Cleaned up 23 unused dependencies
- ✅ Added production build scripts
- ✅ Configured proper .gitignore
- ✅ Optimized bundle size
- ✅ Type-safe throughout
- ✅ SEO optimized with sitemap and robots.txt

## 🤝 Contributing
Pull requests and suggestions are welcome! Feel free to fork this repo and improve the project.


