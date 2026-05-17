# 🚀 Spoon & Soul — Complete Deployment Guide

## WHAT YOU HAVE
A complete React.js food blog with:
- ✅ Home page (hero email opt-in, categories, posts, YouTube section)
- ✅ Blog page (with search + sidebar)
- ✅ About page (AdSense requires this)
- ✅ Contact page with working form (AdSense requires this)
- ✅ Privacy Policy page (AdSense REQUIRES this)
- ✅ robots.txt (lets Google crawl your site)
- ✅ sitemap.xml (helps Google find all your pages)

---

## STEP 1 — Install Node.js on Your Computer

1. Go to https://nodejs.org
2. Download and install the **LTS version** (e.g. 20.x)
3. After installing, open your terminal (Command Prompt on Windows, Terminal on Mac)
4. Type this to confirm it worked:
   ```
   node --version
   npm --version
   ```
   You should see version numbers.

---

## STEP 2 — Set Up the Project on Your Computer

1. Copy the entire `spoon-and-soul` folder to your Desktop (or anywhere you like)
2. Open your terminal and navigate to it:
   ```
   cd Desktop/spoon-and-soul
   ```
3. Install all dependencies:
   ```
   npm install
   ```
   (This will take 1–2 minutes)

4. Start the development server to preview the site:
   ```
   npm start
   ```
   Your browser will open at http://localhost:3000 — you'll see the full website!

---

## STEP 3 — Customize the Website WITH YOUR DETAILS

Open the files in a code editor (VS Code is free: https://code.visualstudio.com).

### Things to change before going live:

**Your name/story:** Open `src/pages/About.js` and replace all mentions of "Maya Tamang" and "Kathmandu" with your real name and location.

**Your contact email:** Open `src/pages/Contact.js` and change `maya@spoonandsoul.com` to your real email.

**Your site name:** If you want a different name than "Spoon & Soul", do a find & replace across all files.

**Your domain:** In `public/sitemap.xml` and `public/index.html`, replace `https://www.spoonandsoul.com` with your actual domain (once you have it).

**Add real recipes:** Open `src/pages/Blog.js` and edit the `ALL_POSTS` array. Add your own recipes with your own titles, excerpts, dates, and emoji.

**Write 10+ blog posts:** Google AdSense wants to see original, useful content. Once deployed, go to your live site regularly and add new recipes.

---

## STEP 4 — Get a Free Domain (or Buy a .com)

### Option A: FREE domain with Netlify (easiest)
You'll get a free URL like: `spoon-and-soul.netlify.app`
This works for AdSense approval!

### Option B: Buy a real .com domain (~$10–15/year)
Recommended providers:
- **Namecheap** → https://namecheap.com (cheapest)
- **Porkbun** → https://porkbun.com (also cheap)
- **Google Domains** → https://domains.google.com

Search for your name, e.g.: `spoonandsoul.com`, `mayaskitchen.com`, `homecookrecipes.com`

Buy the domain and keep the login details safe — you'll need them in Step 6.

---

## STEP 5 — Build the Production Version

In your terminal (inside the spoon-and-soul folder):
```
npm run build
```

This creates a `build/` folder. That folder is what you upload to the internet.

---

## STEP 6 — Deploy to Netlify (FREE Hosting)

### 6a. Create a free Netlify account
Go to https://netlify.com → Sign Up (use your Google or GitHub account)

### 6b. Deploy your site (drag and drop — no coding needed)
1. On your Netlify dashboard, look for the section that says **"Want to deploy a new site without connecting to Git?"**
2. Click **"browse to upload"** or drag your `build/` folder right onto the page
3. Wait 30 seconds — your site is LIVE!
4. Netlify gives you a URL like `quirky-ramanujan-1234.netlify.app`
5. Click **"Site settings" → "Change site name"** and rename it to something like `spoonandsoul`
   → Your URL becomes: `spoonandsoul.netlify.app` ✅

---

## STEP 7 — Connect Your Custom Domain (Optional but Recommended)

If you bought a .com domain:

1. In Netlify, go to: **Site Settings → Domain Management → Add a domain**
2. Enter your domain (e.g. `spoonandsoul.com`) and click Verify
3. Netlify will show you nameservers (they look like `dns1.p01.nsone.net`)
4. Go to your domain registrar (Namecheap, Porkbun, etc.)
5. Find **"Nameservers"** settings and replace them with the ones Netlify gave you
6. Wait 24–48 hours for the domain to fully connect

**Netlify also gives you FREE HTTPS (SSL certificate)** automatically — Google requires this for AdSense!

---

## STEP 8 — Submit Your Site to Google Search Console

This helps Google find and index your site faster.

1. Go to https://search.google.com/search-console
2. Sign in with your Google account
3. Click **"Add Property"** and enter your website URL
4. Choose **"HTML tag"** verification method
5. Copy the meta tag Google gives you (looks like `<meta name="google-site-verification" content="abc123">`)
6. Open `spoon-and-soul/public/index.html` and paste it inside the `<head>` section
7. Rebuild and redeploy: run `npm run build` then re-upload to Netlify
8. Click **"Verify"** in Google Search Console
9. Then go to **"Sitemaps"** → enter `sitemap.xml` → Submit

Google will now crawl your entire site within a few days.

---

## STEP 9 — Write Original Content BEFORE Applying to AdSense

Before applying, make sure you have:
- [ ] At least **10 original recipe posts** (each 500–1000+ words)
- [ ] All 4 required pages: Home, About, Contact, Privacy Policy
- [ ] Real, human-written content (not obvious AI spam)
- [ ] Your site has been live for at least 2–3 weeks
- [ ] Some real visitors (share on Facebook, Pinterest, WhatsApp groups)

**How to add content:**
Open `src/pages/Blog.js` and add new entries to the `ALL_POSTS` array. Redeploy after each update.

---

## STEP 10 — Apply for Google AdSense

1. Go to https://adsense.google.com
2. Sign in with your Google account
3. Click **"Get Started"**
4. Enter your website URL (your live domain)
5. Enter your payment information (your name, address — this is for getting paid)
6. Google will give you a small piece of code — paste it in `public/index.html` inside `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOURPUBLISHERID" crossorigin="anonymous"></script>
   ```
7. Rebuild and redeploy
8. **Wait** — approval takes 3–14 days typically

---

## STEP 11 — After AdSense Approval: Add Real Ad Slots

After approval, replace the `<div className="ad-slot">` placeholders in the code with real AdSense ad unit code.

In Netlify, you can also set up **automatic redeploy from GitHub** so you never have to manually upload again — but that's optional.

---

## QUICK REFERENCE — FILE STRUCTURE

```
spoon-and-soul/
├── public/
│   ├── index.html        ← Add AdSense script + Google verification here
│   ├── robots.txt        ← Tells Google to crawl your site
│   └── sitemap.xml       ← Update with your real domain URL
├── src/
│   ├── App.js            ← Router — connects all pages
│   ├── index.js          ← React entry point
│   ├── styles/
│   │   └── global.css    ← Colors, fonts, shared styles
│   ├── components/
│   │   ├── Navbar.js     ← Navigation bar
│   │   ├── Footer.js     ← Footer
│   │   ├── TopBar.js     ← Top announcement bar
│   │   ├── RecipeCard.js ← Recipe card component
│   │   └── NewsletterBar.js ← Newsletter signup
│   └── pages/
│       ├── Home.js       ← Homepage
│       ├── Blog.js       ← All recipes + sidebar
│       ├── About.js      ← About page (edit with YOUR story)
│       ├── Contact.js    ← Contact form
│       └── PrivacyPolicy.js ← Privacy policy
└── package.json
```

---

## SUMMARY CHECKLIST

- [ ] Install Node.js
- [ ] Run `npm install` inside the project folder
- [ ] Edit About.js with your real name and story
- [ ] Edit Contact.js with your real email
- [ ] Run `npm run build`
- [ ] Create free Netlify account
- [ ] Upload `build/` folder to Netlify
- [ ] Buy a .com domain (optional but recommended)
- [ ] Connect domain to Netlify
- [ ] Submit sitemap to Google Search Console
- [ ] Write 10+ original recipe articles
- [ ] Keep site live for 2–3 weeks with real content
- [ ] Apply to Google AdSense
- [ ] Wait for approval (3–14 days)
- [ ] Add real ad code after approval

---

## NEED HELP?

If you get stuck at any step, just ask Claude! Share the exact error message or describe what step you're on and I'll help you through it.
