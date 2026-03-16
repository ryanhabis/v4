# FPV Build Lab - Website Documentation & Scaling Guide

## Table of Contents
1. [Website Architecture Overview](#architecture)
2. [Folder Structure Explained](#folder-structure)
3. [How the Site Works](#how-it-works)
4. [Daily Maintenance Guide](#daily-maintenance)
5. [Adding New Content](#adding-content)
6. [Scaling Strategies](#scaling)
7. [Troubleshooting](#troubleshooting)

---

## 1. Website Architecture Overview {#architecture}

Your website uses a **component-based static site architecture**. This means:

- **Header and footer** are stored once and loaded everywhere
- **Content is separate from layout** (HTML pages contain only unique content)
- **Data lives in JSON files** (products, affiliate links) for easy updates
- **Everything is static** (fast, secure, no database to hack)

### Key Principle: DRY (Don't Repeat Yourself)
- **One change = updates everywhere**
- If you need to edit the same thing in multiple places, you're doing it wrong

---

## 2. Folder Structure Explained {#folder-structure}

```
websiteV3/
├── assets/                      # ALL static files (never edit directly in production)
│   ├── css/                     # Stylesheets
│   │   ├── main.css              # Core styles (colors, typography, layout)
│   │   ├── home.css              # Homepage-only styles
│   │   ├── shop.css               # Shop pages styles
│   │   └── digital.css            # Digital hub styles
│   ├── js/                       # JavaScript
│   │   ├── main.js                # Global functions
│   │   ├── cart.js                 # Shopping cart logic
│   │   ├── affiliate.js            # Affiliate link handling
│   │   └── include.js              # THE ENGINE - loads header/footer
│   ├── img/                       # ALL images (organized by section)
│   │   ├── products/               # Product photos
│   │   ├── services/               # Service photos
│   │   ├── digital/                 # Digital hub images
│   │   └── global/                   # Logo, favicon, trust badges
│   └── fonts/                       # Custom fonts (if any)
│
├── components/                   # Reusable HTML parts
│   ├── header.html                 # Navigation (edit once, updates everywhere)
│   ├── footer.html                 # Footer (edit once, updates everywhere)
│   ├── trust-banner.html           # Trust badges section
│   ├── affiliate-disclosure.html    # Legal disclosure text
│   └── product-card.html            # Template for product displays
│
├── pages/                        # ACTUAL WEBSITE PAGES
│   ├── index.html                   # Homepage
│   ├── shop/                         # All shop pages
│   │   ├── index.html
│   │   ├── rtf-kits.html
│   │   └── ...
│   ├── services/                     # Service pages
│   │   ├── index.html
│   │   └── ...
│   ├── digital/                       # Learning hub
│   │   ├── index.html
│   │   ├── simulators/
│   │   └── ...
│   ├── resources/                     # Help pages
│   └── legal/                          # Legal pages
│
├── data/                          # THE BRAIN - all site data
│   ├── products.json                 # ALL product info
│   ├── affiliate-links.json           # ALL affiliate links
│   ├── simulators.json                 # Simulator data
│   ├── courses.json                     # Course data
│   └── site-settings.json               # Global settings
│
└── utils/                          # Helper scripts (for you, not the site)
    ├── sitemap-generator.js           # Creates sitemap.xml automatically
    └── build-script.js                  # Assembles pages (future use)
```

---

## 3. How the Site Works {#how-it-works}

### The include.js Engine

Every page on your site has this at the bottom:

```html
<div id="header-placeholder"></div>
<div id="footer-placeholder"></div>
<script src="/assets/js/include.js"></script>
```

**include.js** does this:
1. Looks at the current page's URL
2. Fetches `header.html` and `footer.html` from the components folder
3. Inserts them into the page

**Result:** Change header.html once, every page updates automatically.

### Page Structure Pattern

Every HTML page follows this exact pattern:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 1. Meta tags (unique per page) -->
    <title>Page Title</title>
    <meta name="description" content="Unique for this page">
    
    <!-- 2. CSS (same for all pages) -->
    <link rel="stylesheet" href="/assets/css/main.css">
    <link rel="stylesheet" href="/assets/css/shop.css"> <!-- if needed -->
</head>
<body>
    <!-- 3. Header placeholder -->
    <div id="header-placeholder"></div>
    
    <!-- 4. PAGE UNIQUE CONTENT - this is the only part that changes -->
    <main>
        <h1>This page's unique heading</h1>
        <p>This page's unique content...</p>
    </main>
    <!-- END UNIQUE CONTENT -->
    
    <!-- 5. Footer placeholder -->
    <div id="footer-placeholder"></div>
    
    <!-- 6. JS includes -->
    <script src="/assets/js/include.js"></script>
</body>
</html>
```

---

## 4. Daily Maintenance Guide {#daily-maintenance}

### How to Update Common Elements

| What to Update | Where to Edit | Effect |
|----------------|---------------|--------|
| Add a nav link | `components/header.html` | Updates EVERY page |
| Change footer copyright | `components/footer.html` | Updates EVERY page |
| Update trust badges | `components/trust-banner.html` | Updates wherever it's used |
| Add new product | `data/products.json` + product page | Centralized |
| Change affiliate ID | `data/affiliate-links.json` | Updates ALL links |
| Fix typo on one page | That page in `pages/` folder | Only that page |
| Change site colors | `assets/css/main.css` | Global style change |

### Golden Rules for Maintenance

1. **Never copy-paste content** - If you need it twice, make it a component
2. **Never hardcode affiliate links** - Always use the data files
3. **Never edit the live site directly** - Make changes in your local copy first
4. **Test one page before updating all** - When changing CSS, check one page first

---

## 5. Adding New Content {#adding-content}

### Scenario A: Adding a New Product

**STEP 1:** Add product image
- Save image to `assets/img/products/`
- Name format: `product-name.jpg` (use hyphens, no spaces)

**STEP 2:** Add product data
- Open `data/products.json`
- Add your new product to the correct category:

```json
{
  "rtf-kits": [
    {
      "id": "rtf-002",
      "name": "New Product Name",
      "price": 349,
      "image": "/assets/img/products/new-product.jpg",
      "description": "Product description here",
      "features": ["Feature 1", "Feature 2"]
    }
    // ... existing products
  ]
}
```

**STEP 3:** Add to product page
- Open `pages/shop/rtf-kits.html`
- The page should already have JavaScript that reads from `products.json`
- If not, you'll add the HTML for the new product manually following existing pattern

### Scenario B: Adding a New Page

**STEP 1:** Create the HTML file
- Go to the appropriate folder in `pages/`
- Create `new-page-name.html`
- Copy the template from an existing page

**STEP 2:** Update the header
- Open `components/header.html`
- Add your new link to the navigation

**STEP 3:** Update sitemap
- Run `utils/sitemap-generator.js` (creates/updates sitemap.xml)

### Scenario C: Adding a New Section (e.g., "Blog")

**STEP 1:** Create folders
```
pages/blog/
├── index.html
├── post-1.html
└── post-2.html
```

**STEP 2:** Update navigation
- Add "Blog" link to `components/header.html`

**STEP 3:** Consider data structure
- If blog will have many posts, create `data/blog-posts.json`

---

## 6. Scaling Strategies {#scaling}

### When You Have 10 Products (Now)

- Manual HTML is fine
- Keep products in HTML pages

### When You Have 50 Products (Soon)

**Start using the data files:**
- Move all product info to `data/products.json`
- Create one template page that loads from JSON
- Example: `pages/shop/rtf-kits.html` becomes a generic template that displays all RTF kits from JSON

**Benefits:**
- Add products by editing JSON only
- No more HTML editing for new products
- Can sort, filter, search automatically

### When You Have 200 Products

**Implement the build script:**
- `utils/build-script.js` reads all JSON files
- Generates all HTML pages automatically
- You edit data, script builds site

**This is how professional sites work:**
```
Edit JSON → Run build script → Deploy HTML
(5 minutes)    (2 seconds)      (1 minute)
```

### When You Have 1000+ Products

**Consider a static site generator:**
- **11ty (Eleventy)** - Best for beginners
- **Hugo** - Fastest
- **Next.js** - Most powerful

But your current structure is designed to migrate easily to any of these.

### Traffic Scaling

| Visitors/Month | Action |
|----------------|--------|
| 0-1000 | Current hosting is fine |
| 1000-10,000 | Add CDN (Cloudflare free tier) |
| 10,000-100,000 | Upgrade hosting, enable caching |
| 100,000+ | Consider static hosting (Netlify, Vercel) |

---

## 7. Troubleshooting {#troubleshooting}

### Common Issues and Fixes

**Issue:** Header not showing on new page
- Check: Did you include `<div id="header-placeholder"></div>`?
- Check: Is the path to include.js correct? (`/assets/js/include.js` not `../assets/js/include.js`)

**Issue:** CSS not loading
- Check: Are you using absolute paths starting with `/`?
- Correct: `/assets/css/main.css`
- Wrong: `css/main.css` or `../css/main.css`

**Issue:** Images not showing
- Check: Path starts with `/assets/img/...`
- Check: File exists in correct folder
- Check: File name matches exactly (case-sensitive on some servers)

**Issue:** Affiliate links broken
- Check: `data/affiliate-links.json` has correct IDs
- Check: The page is using the JSON data, not hardcoded links

### Backup Strategy

**Weekly:**
- Copy entire `websiteV3` folder to external drive
- Or use GitHub (recommended)

**Monthly:**
- Test restoring from backup

### Development vs Production

**Local Development (your computer):**
- Edit files freely
- Test in browser with `file://` or local server

**Production (live site):**
- Never edit directly
- Upload entire folder after testing
- Keep a backup of previous version

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                    QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  EDIT THESE DAILY:                                       │
│  • pages/           - Page content (unique per page)    │
│  • data/            - Products, affiliate links         │
│                                                          │
│  EDIT THESE WEEKLY:                                      │
│  • components/header.html  - Navigation                 │
│  • components/footer.html   - Footer                    │
│                                                          │
│  EDIT THESE MONTHLY:                                     │
│  • assets/css/main.css     - Site-wide styles           │
│  • assets/js/               - Functionality             │
│                                                          │
│  NEVER EDIT:                                             │
│  • include.js (it just works)                           │
│  • Generated files (if using build script)              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Final Advice

1. **Start simple** - Use manual HTML until it hurts
2. **Move to data files** when you're tired of copy-pasting
3. **Automate with build script** when you have 50+ products
4. **Always think "where will I edit this next time?"**

The structure you have now will carry you from **1 product to 1000 products** without rewriting. Every decision was made with "what happens when this gets big?" in mind.

**Remember:** The goal is to spend time on content and sales, not on fixing broken links or copy-pasting the same update 50 times.

---

*Documentation v1.0 - Last Updated: March 2026*