# Portfolio & Developer Blog Platform

A modern, high-performance software engineer portfolio and technical blog built with React 19, TypeScript, Vite, and Tailwind CSS. The project features dynamic Markdown blog parsing, automated AI blog post generation via GitHub Actions, and an integrated deployment pipeline targeting GitHub Pages.

---

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Directory Structure](#project-directory-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Managing Portfolio Content](#managing-portfolio-content)
- [Automated AI Blog Generation](#automated-ai-blog-generation)
- [Production Build & Verification](#production-build--verification)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Environment Variables & Secrets](#environment-variables--secrets)

---

## Overview

This repository contains a full-stack developer portfolio application designed to showcase projects, technical skills, career experience, and technical blog posts.

Key capabilities include:
- Client-side Single Page Application (SPA) routing powered by React Router.
- Dynamic Markdown rendering for blog articles with custom frontmatter parsing.
- Automated daily AI article generation using OpenRouter, Google Gemini, or OpenAI APIs.
- Continuous Integration and Continuous Deployment (CI/CD) pipelines to publish updates to GitHub Pages automatically.

---

## Technologies Used

### Core Framework & Build System
- **React 19**: Modern UI library for component architecture.
- **TypeScript**: Static type checking and interface contracts.
- **Vite 8**: Next-generation frontend tooling and fast HMR development server.

### Styling & UI Components
- **Tailwind CSS v4**: Utility-first CSS engine with custom design system variables.
- **Lucide React**: Vector iconography library.
- **Radix UI Primitives**: Accessible UI component building blocks.
- **JetBrains Mono & Space Grotesk**: Monospaced code aesthetics and display typography.

### Automation & Scripting
- **Node.js**: Script execution environment for post generation.
- **AI Model Integration**: Multi-provider support (OpenRouter API, Google Gemini API, OpenAI API).
- **GitHub Actions**: Automated scheduled crons and CI/CD pipelines.

---

## Project Directory Structure

```
portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml            # CI/CD deployment workflow to GitHub Pages
│       └── generate-blog.yml     # Daily automated AI blog generation workflow
├── public/                       # Static public assets (images, icons)
├── scripts/
│   └── generate-blog.js          # Node.js script for generating AI blog posts
├── src/
│   ├── assets/                   # Project media assets
│   ├── components/               # React UI components (Navbar, Hero, Projects, etc.)
│   ├── data/
│   │   ├── blogs/                # Markdown blog source files (*.md)
│   │   ├── about.ts              # Personal bio data configuration
│   │   ├── experience.ts         # Career timeline data configuration
│   │   ├── projects.ts           # Highlighted projects data configuration
│   │   └── skills.ts             # Technical skills matrix data configuration
│   ├── hooks/                    # Custom React hooks
│   ├── lib/
│   │   ├── blogs.ts              # Blog post aggregator and sorter
│   │   ├── markdown.tsx          # Custom frontmatter parser and markdown renderer
│   │   └── utils.ts              # Shared utility functions
│   ├── pages/                    # Route pages (Home, BlogsList, BlogPostDetail, NotFound)
│   ├── App.tsx                   # Core layout container
│   ├── main.tsx                  # Application entry point & router configuration
│   └── index.css                 # Global CSS tokens and design utility classes
├── test/                         # Standalone WYSIWYG Blog Editor (Quill.js + Tailwind)
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts declaration
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite build and path alias configuration
```

---

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: Version 18.0.0 or higher (Version 22+ recommended).
- **npm**: Version 9.0.0 or higher.
- **Git**: For version control management.

---

## Local Development Setup

Follow these steps to run the project locally on your development environment.

### 1. Clone the Repository

```bash
git clone https://github.com/Mohamed-n-Samir/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies

Install all required NPM packages:

```bash
npm install
```

### 3. Start Development Server

Run the Vite local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:3001
```

### 4. Running Code Quality & Linting Tools

To inspect the codebase for syntax or type errors:

```bash
npm run lint
```

---

## Managing Portfolio Content

### Modifying Portfolio Data

Portfolio sections are driven by structured TypeScript files located in `src/data/`:
- **About Section**: Edit `src/data/about.ts` to update bio information.
- **Experience Timeline**: Edit `src/data/experience.ts` to add or update work experience.
- **Projects Showcase**: Edit `src/data/projects.ts` to update project titles, descriptions, stack tags, and repository links.
- **Skills Matrix**: Edit `src/data/skills.ts` to update categorized technical skills.

### Creating Blog Posts Manually

Blog posts are stored as Markdown files inside `src/data/blogs/`. Each `.md` file must contain YAML frontmatter at the top of the file:

```markdown
---
title: Your Article Title
date: Jul 29, 2026
readTime: 5 min read
pinned: false
tags: [REACT, TYPESCRIPT, WEB DEV]
desc: A short summary description for the article card display.
image: /blogs/keyboard_setup.png
---

# Introduction

Write your article content using standard Markdown syntax.

# Section Header

- Bullet point item 1
- Bullet point item 2

```python
# Code snippets supported with syntax styling
print("Hello World")
```
```

The application automatically parses and compiles all files in `src/data/blogs/*.md` at build time.

---

## Automated AI Blog Generation

The project includes an automated AI pipeline in `scripts/generate-blog.js` that generates new technical articles and saves them to `src/data/blogs/`.

### 1. Running the Generator Locally

You can run the generator locally using the following NPM command:

```bash
npm run generate-blog
```

To execute using a specific AI API key, set the environment variable prior to execution:

#### On Linux / macOS / Git Bash:

```bash
OPENROUTER_API_KEY="your_api_key_here" npm run generate-blog
```

#### On Windows PowerShell:

```powershell
$env:OPENROUTER_API_KEY="your_api_key_here"; node scripts/generate-blog.js
```

### 2. Provider Fallback Strategy

The script automatically selects the available API provider in order of priority:
1. **OpenRouter API** (`OPENROUTER_API_KEY`): Rotates through free models (`google/gemini-2.0-flash-lite-preview-02-05:free`, `meta-llama/llama-3.3-70b-instruct:free`, `deepseek/deepseek-r1:free`, `qwen/qwen-2.5-coder-32b-instruct:free`).
2. **Google Gemini API** (`GEMINI_API_KEY`): Uses models `gemini-2.5-flash` or `gemini-1.5-flash`.
3. **OpenAI API** (`OPENAI_API_KEY`): Uses model `gpt-4o-mini`.
4. **Offline Mode**: If no API key is supplied, a structured template article is generated to prevent script failure during testing.

---

## Production Build & Verification

Before deploying to production, test and verify the compiled production distribution.

### 1. Build the Production Bundle

Execute the TypeScript compilation check and Vite production build:

```bash
npm run build
```

This compiles static assets into the `dist/` folder.

### 2. Preview the Production Build Locally

Simulate the production environment locally:

```bash
npm run preview
```

Open the printed URL in your browser to verify routing, styles, and assets.

---

## GitHub Pages Deployment

Deployment is handled automatically via GitHub Actions workflows, but manual deployment is also supported.

### 1. Automated CI/CD Deployment (GitHub Actions)

The repository contains two connected workflows in `.github/workflows/`:

- **Daily Blog Generation (`.github/workflows/generate-blog.yml`)**:
  - Scheduled to run daily at 8:00 AM UTC (`cron: '0 8 * * *'`).
  - Calls `scripts/generate-blog.js` using secrets configured in your GitHub repository.
  - Automatically commits and pushes newly generated `.md` articles to the repository.

- **Portfolio Deployment (`.github/workflows/deploy.yml`)**:
  - Automatically triggered whenever a push occurs on the `main` or `it-track` branches.
  - Automatically triggered when `generate-blog.yml` finishes execution (`workflow_run`).
  - Builds the production bundle and deploys output to GitHub Pages.

### 2. Manual Deployment via NPM

You can manually build and deploy to GitHub Pages directly from your terminal:

```bash
npm run deploy
```

This command utilizes the `gh-pages` CLI tool to publish the `dist/` directory to the target deployment branch.

---

## Environment Variables & Secrets

### Local Environment Variables

Create a `.env` file in the root directory if you wish to configure base path overrides or API keys locally:

```env
VITE_BASE_PATH=/
OPENROUTER_API_KEY=your_openrouter_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### GitHub Repository Secrets Setup

To enable automated AI blog generation in GitHub Actions, add your API key as a repository secret:

1. Navigate to your GitHub Repository -> **Settings**.
2. Select **Secrets and variables** -> **Actions**.
3. Click **New repository secret**.
4. Set Name to `OPENROUTER_API_KEY` (or `GEMINI_API_KEY` / `OPENAI_API_KEY`).
5. Paste your API key string into Value.
6. Save the secret.
