# Nextfolio

A modern, responsive portfolio website built with Next.js 15 and React 19, showcasing the work and skills of Sanudin, a passionate software engineer and developer.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15.2.1, React 19, and TypeScript
- **Responsive Design**: Fully responsive layout using Tailwind CSS v4
- **Performance Optimized**: Utilizes Next.js Turbopack for fast development
- **SEO Friendly**: Comprehensive metadata and Open Graph tags
- **Clean Architecture**: Well-organized component structure and type definitions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.1 with Turbopack
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint with Next.js configuration
- **Font**: Montserrat (Google Fonts)

## 📋 Portfolio Sections

- **Hero**: Personal introduction with animated elements
- **About**: Professional background and skills showcase
- **Skills**: Technology stack including React, TypeScript, Next.js, PHP, Laravel, Node.js, and more
- **Projects**: Featured projects including:
  - Wedding Website (Sass, Bootstrap, Notion)
  - Bookshelf App (JavaScript)
  - Notes App (JavaScript, Webpack)
- **Contact**: Professional contact information
- **Footer**: Additional links and information

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🎨 Customization

The portfolio content can be easily customized by editing the data files:

- **Skills**: Update `app/lib/data.ts` - `getSkillset()` function
- **Projects**: Update `app/lib/data.ts` - `getProjects()` function
- **Personal Info**: Update `app/ui/home/hero.tsx` and `app/layout.tsx`
- **Styling**: Modify Tailwind classes throughout the components

## 📁 Project Structure

```
nextfolio/
├── app/
│   ├── lib/
│   │   ├── data.ts          # Portfolio data (skills, projects)
│   │   ├── definition.ts    # TypeScript type definitions
│   │   └── utils.ts         # Utility functions
│   ├── ui/
│   │   ├── home/           # Homepage components
│   │   ├── buttons/        # Reusable button components
│   │   ├── fonts.ts        # Font configurations
│   │   └── globals.css     # Global styles
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Homepage
├── public/                 # Static assets (images, icons)
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🌐 Deployment

This project can be easily deployed on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sanudin**
- Website: [https://sanudin.dev](https://sanudin.dev)
- GitHub: [@sanudin-dev](https://github.com/sanudin-dev)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sanudin-dev/nextfolio/issues).

---

Built with ❤️ using Next.js and React
