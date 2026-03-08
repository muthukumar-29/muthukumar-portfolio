# Muthukumar — Portfolio Website

A modern, animated portfolio for an AI Automation Engineer. Built with Vite + React + Tailwind CSS + Framer Motion.

## Tech Stack

- **Vite** — lightning-fast build tool
- **React 18** — UI framework
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — animations & transitions
- **React Router** — client-side routing
- **React Markdown** — blog rendering

## Features

- 🤖 **Floating tech icons** — n8n, OpenAI, React, Node.js with parallax mouse effect
- 🌙 **Dark/Light mode** — smooth theme switching
- 📱 **Fully responsive** — mobile-first design
- 📝 **Blog system** — markdown-powered posts with categories and search
- ✨ **Scroll animations** — Framer Motion reveal effects
- 🎯 **Custom cursor** — dot + follower cursor (desktop)
- ⚡ **Contact form** — with loading state

## Sections

1. **Hero** — animated floating icons, name, role, CTA
2. **About** — bio, highlights, skills tags
3. **Skills** — animated skill bars by category
4. **Projects** — filterable cards with hover effects
5. **Blog** — preview cards linking to full posts
6. **Contact** — form + social links

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/
│       └── CustomCursor.jsx
├── sections/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── BlogPreview.jsx
│   └── Contact.jsx
├── pages/
│   ├── Home.jsx
│   ├── BlogPage.jsx
│   └── BlogPost.jsx
├── blogs/
│   └── blogData.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Navigate into the portfolio folder
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Customization

### Personal Info
Update these files:
- `src/sections/Hero.jsx` — name, title, stats
- `src/sections/About.jsx` — bio text, highlights
- `src/sections/Projects.jsx` — your real projects
- `src/sections/Contact.jsx` — email, social links
- `src/components/layout/Footer.jsx` — links

### Adding Blog Posts
Edit `src/blogs/blogData.js` — add a new object with:
```js
{
  slug: 'your-post-slug',
  title: 'Post Title',
  excerpt: 'Short summary...',
  category: 'Tutorial',
  readTime: '5 min read',
  date: '2025-01-01',
  color: '#00FFB2',
  tags: ['n8n', 'AI'],
  content: `# Markdown Content Here...`
}
```

### Colors & Theme
Edit `tailwind.config.js` — update `colors.primary` and `colors.accent`.

## Deployment

### Vercel (recommended)
```bash
npm run build
# Deploy /dist to Vercel
```

### GitHub Pages
Update `vite.config.js`:
```js
base: '/your-repo-name/'
```

---

Built with ❤️ by Muthukumar | [automaitee.com](https://automaitee.com)
