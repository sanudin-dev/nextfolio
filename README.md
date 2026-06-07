# Nextfolio

A modern, responsive portfolio website built with Next.js and React, showcasing the work, projects, and writing of Sanudin — a software engineer and frontend enthusiast based in Indonesia.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, and TypeScript
- **Dark / Light Theme**: System-aware theme toggle powered by `next-themes`
- **Blog**: Markdown-based blog with syntax highlighting and GFM support
- **Responsive Design**: Fully responsive layout using Tailwind CSS v4
- **Animations**: Smooth UI animations via Motion (Framer Motion successor)
- **SEO Friendly**: Comprehensive metadata, Open Graph, and Twitter card tags
- **Content-Driven**: Projects and blog posts managed as plain Markdown files

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with Turbopack
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, `@tailwindcss/typography`
- **Animations**: Motion (`motion`)
- **Theming**: next-themes
- **Markdown**: gray-matter, react-markdown, remark-gfm
- **UI Primitives**: Radix UI, class-variance-authority, clsx, tailwind-merge
- **Icons**: react-icons
- **Linting / Formatting**: ESLint (Next.js config), Prettier
- **Font**: Montserrat (Google Fonts)

## 📋 Portfolio Sections

- **Hero**: Personal introduction with animated elements
- **About**: Professional background and identity
- **Experience**: Work history and timeline
- **Skills**: Technology stack (TypeScript, Next.js, Node.js, Python, PHP, Laravel, PostgreSQL, MySQL, Tailwind CSS)
- **Projects**: Featured projects sourced from `content/projects/`:
  - DDevs Story
  - Book Collection Manager (Bookshelf App)
  - Money Tracker
  - Notes App
  - Wedding Site
- **Latest Posts**: Recent blog posts pulled from `content/blog/`
- **Contact**: Professional contact information

## 🏗️ Architecture

The project uses a three-layer content architecture:

```
content/              ← Plain Markdown + TypeScript data (edit here)
  blog/*.md           ← Blog posts (frontmatter: title, description, date)
  projects/*.md       ← Project details (frontmatter: title, tags, link, github …)
  skills.ts           ← Skills list with icons

lib/                  ← Server-side content layer (parse + serve)
  blog.ts             ← getPosts(), getPostBySlug(), getPostSlugs()
  projects.ts         ← getProjects(), getProjectBySlug(), getProjectSlugs()
  data.ts             ← getSkillset() (reads content/skills.ts)
  definition.ts       ← Shared TypeScript types (Skillset, Project)
  utils.ts            ← Shared utility functions

ui/                   ← Presentational components (no data fetching)
  home/               ← Page section components (hero, about, projects …)
  layout/             ← Header, footer, nav, theme toggle
  *.tsx               ← Shared primitives (Button, DropdownMenu, …)

app/                  ← Next.js App Router (routing + page composition)
  layout.tsx          ← Root layout, metadata, ThemeProvider
  page.tsx            ← Homepage (assembles ui/home/ sections)
  blog/
    page.tsx          ← Blog listing
    [slug]/page.tsx   ← Individual post (dynamic route)
```

**Data flow**: Markdown files in `content/` are parsed at build/request time by functions in `lib/`, then passed as props to components in `ui/`, which are composed into pages in `app/`.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sanudin-dev/nextfolio.git
cd nextfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` — Start development server with Turbopack
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint
- `npm run format` — Format all files with Prettier
- `npm run format:check` — Check formatting without writing

## 🎨 Customization

All portfolio content lives in the `content/` directory — no code changes needed:

| What to change | Where |
|---|---|
| Skills list | `content/skills.ts` |
| Projects | `content/projects/*.md` (add/edit/delete `.md` files) |
| Blog posts | `content/blog/*.md` (add/edit/delete `.md` files) |
| Personal info / metadata | `app/layout.tsx` and `ui/home/hero.tsx` |
| Global styles | `ui/globals.css` |

## 📁 Project Structure

```
nextfolio/
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx   # Individual post page
│   │   ├── layout.tsx        # Blog layout
│   │   └── page.tsx          # Blog listing page
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Homepage
├── content/
│   ├── blog/                 # Blog posts as Markdown
│   ├── projects/             # Project details as Markdown
│   └── skills.ts             # Skills data
├── lib/
│   ├── blog.ts               # Blog data functions
│   ├── data.ts               # Skills data functions
│   ├── definition.ts         # TypeScript type definitions
│   ├── projects.ts           # Project data functions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── ui/
│   ├── home/                 # Homepage section components
│   ├── layout/               # Header, footer, nav, theme toggle
│   ├── fonts.ts              # Font configuration
│   └── globals.css           # Global styles
├── next.config.ts            # Next.js configuration
└── tsconfig.json             # TypeScript configuration
```

## 🌐 Deployment

Recommended platform: **Vercel** (zero-config for Next.js).

```bash
npm install -g vercel
vercel
```

Also works on Netlify and similar platforms that support Node.js runtimes.

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Sanudin**
- Website: [https://sanudin.dev](https://sanudin.dev)
- GitHub: [@sanudin-dev](https://github.com/sanudin-dev)
