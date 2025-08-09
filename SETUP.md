# GitHub Repository Setup Guide

Follow these steps to create a new GitHub repository for the TipTap AI Autocomplete extension.

## 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right → "New repository"
3. Fill in the details:
   - **Repository name**: `tiptap-ai-autocomplete`
   - **Description**: `AI-powered autocomplete and text editing extension for TipTap editor with streaming preview`
   - **Visibility**: Public (recommended for open source)
   - **Initialize**: Don't check any boxes (we have files ready)
4. Click "Create repository"

## 2. Initialize Git Repository

```bash
# Navigate to the extension directory
cd tiptap-ai-autocomplete

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: TipTap AI Autocomplete Extension

Features:
- AI-powered autocomplete with Tab key
- Text transformation with streaming preview
- Ghost text overlay
- Selection-based editing menu
- Accept/reject workflow
- TypeScript support"
```

## 3. Connect to GitHub

Replace `yourusername` with your actual GitHub username:

```bash
# Add remote origin
git remote add origin https://github.com/yourusername/tiptap-ai-autocomplete.git

# Push to main branch
git branch -M main
git push -u origin main
```

## 4. Update Package.json

After creating the repository, update the URLs in `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/tiptap-ai-autocomplete.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/tiptap-ai-autocomplete/issues"
  },
  "homepage": "https://github.com/yourusername/tiptap-ai-autocomplete#readme"
}
```

## 5. Set up GitHub Pages (Optional)

To showcase examples:

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / docs folder
4. Create `docs/` folder with demo files

## 6. Add Repository Topics

In your GitHub repository:
1. Go to the main page
2. Click the gear icon next to "About"
3. Add topics: `tiptap`, `ai`, `autocomplete`, `text-editing`, `react`, `typescript`

## 7. Create Issues Templates

Create `.github/ISSUE_TEMPLATE/` folder with templates for:
- Bug reports
- Feature requests
- Documentation improvements

## 8. Set up GitHub Actions (Optional)

Create `.github/workflows/ci.yml` for automated testing and building.

## 9. Publish to NPM

When ready to publish:

```bash
# Build the package
npm run build

# Test the build
npm pack

# Publish (make sure you're logged in to npm)
npm publish
```

## Next Steps

- Create demo site
- Write comprehensive documentation
- Add unit tests
- Set up continuous integration
- Create contribution guidelines