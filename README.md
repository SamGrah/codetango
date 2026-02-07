# CodeTango

A technical blog about agentic AI development and operations, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

**Live site:** [codetango.vercel.app](https://codetango.vercel.app/) ftm

## Topics

- Local agentic AI development workflows
- LLMOps: deploying, monitoring, and operating agents in production
- Agentic design patterns (tool use, orchestration, evaluation, guardrails)
- Software architecture and systems design

## Local Development

**Prerequisites:** Python 3.x

```bash
# Install dependencies
pip install -r requirements.txt

# Start the dev server with live reload
mkdocs serve
```

The site will be available at `http://127.0.0.1:8000/codetango/`.

## Project Structure

```
docs/
├── index.md              # Homepage
├── about.md              # About page
├── blog/
│   ├── index.md          # Blog listing
│   └── posts/            # Blog posts (Markdown)
└── stylesheets/
    └── extra.css         # CSS overrides
mkdocs.yml                # Site configuration
requirements.txt          # Python dependencies
```

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on every push to `main`. The workflow installs dependencies and runs `mkdocs gh-deploy --force`.

## Tech Stack

- [MkDocs](https://www.mkdocs.org/) with [Material theme](https://squidfunk.github.io/mkdocs-material/)
- Plugins: blog, search, mermaid2, rss
- Extensions: highlight, inlinehilite, snippets, superfences
- CI/CD: GitHub Actions
