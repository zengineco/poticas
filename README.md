# poticas_README_v1.0.0.md

```
// Author: Vincent Gonzalez | © 2026 Zengine™ | www.zengine.site
// Project: Poticas.com — Temporary Homepage v1.0.0
// Brand: Zengine (on behalf of poticas.com)
```

---

## What This Is

A fully self-contained single-file HTML temporary website for **www.poticas.com** — a future social platform and shop dedicated to potica, the world's greatest rolled pastry.

This is the **"holding page + community preview"** build. It establishes full brand identity and presents all planned site sections in working, polished form, ready for real backend integration at your pace.

---

## What's Inside

### Sections

| Section | Description |
|---|---|
| **Header** | Sticky navigation with logo (SVG recreated from your uploaded reference), nav links, and Join CTA |
| **Hero** | Full-bleed intro with headline, subtitle, and dual CTAs |
| **Community Feed** | Mock social posts with working like/unlike (persisted via localStorage), post composer (adds live posts to the feed), trending sidebar, top bakers sidebar |
| **Shop Teaser** | Six potica varieties on display with email capture (UI-only, no backend yet) |
| **Footer** | Three-column links + watermark |
| **Easter Egg** | See below |

---

## The Easter Egg — Anne Kapel

**How it works:**
Click the spiral logo in the header **5 times** within 6 seconds.

A memorial modal will appear — soft, candlelit — with a dedication:

> *"Dedicated in loving memory of: Anne Kapel"*

The full dedication text is also preserved in an HTML comment block in the footer source (`<!-- ... -->`) so it lives permanently in the file regardless of whether the easter egg is ever triggered.

**The tribute is invisible in normal browsing. It lives in the code — in the source where the real work happens.**

---

## Features That Work Right Now (No Backend Needed)

- ✅ **Like / Unlike posts** — state saved in localStorage, persists across page refreshes
- ✅ **Post composer** — type anything, click "Post," your post appears at the top of the feed live
- ✅ **Tag buttons** (Recipe / Photo / Question) — attached to new posts
- ✅ **Shop email capture** — UI confirmation shown (no data sent yet — see Next Steps)
- ✅ **Scroll reveal animations** — sections animate in as you scroll
- ✅ **Easter egg** — 5x logo click triggers Anne Kapel memorial modal
- ✅ **Responsive layout** — works on mobile, tablet, and desktop

---

## Design System

| Token | Value | Notes |
|---|---|---|
| `--clr-bg` | `#f5efe4` | Aged parchment base |
| `--clr-walnut` | `#3b2314` | Deep walnut brown — primary UI |
| `--clr-caramel` | `#b86b2e` | Warm caramel — links, CTAs |
| `--clr-gold` | `#c9922a` | Honey gold — accents, dividers |
| `--clr-cream` | `#fdf6e9` | Softest cream — text on dark |
| **Display font** | Playfair Display | Headlines, post authors |
| **Body font** | Lora | Body copy, post text |
| **Accent font** | Cormorant Garamond | Labels, tags, nav, captions |

All fonts loaded from Google Fonts CDN with CSS fallback stacks.

---

## File Structure

```
poticas_v1.0.0.html     ← The entire site. One file.
poticas_README_v1.0.0.md ← This document.
```

No build step. No dependencies to install. Open in a browser.

---

## Deployment

1. Upload `poticas_v1.0.0.html` to your host, renamed to `index.html`
2. Point `www.poticas.com` DNS to your host
3. Done

Works on any static host: GitHub Pages, Netlify, Cloudflare Pages, shared hosting, etc.

---

## AdSense

AdSense pub ID `ca-pub-8826956454892311` is noted in the source code comment block.
An ad unit placement (below header / above footer) is pre-commented for easy drop-in when you're ready to go live. It is **not active** in this build.

---

## Next Steps (Flagged — Await Approval Before Building)

These features are **not built** yet. They are noted here for future sessions:

1. **User accounts & real auth** — email/password or OAuth (Google/Apple)
2. **Real backend for posts** — Supabase, Firebase, or similar; replace mock posts with live data
3. **Image upload for posts** — file input + cloud storage (Cloudflare R2, Supabase Storage, etc.)
4. **Recipe detail pages** — individual pages per recipe with full ingredient list + instructions
5. **Real shop / product pages** — Stripe integration for potica orders
6. **Email notification backend** — connect the "Notify Me" form to Mailchimp, ConvertKit, or similar
7. **Comment threads** — expand post footer comments into a real thread UI
8. **Mobile nav drawer** — hamburger menu for small screens (currently hides nav links under 600px)
9. **Search** — search posts and recipes by keyword or tag
10. **Moderation tools** — for managing community posts at scale

---

## Security Notes (Sympolar/Zengine standard disclosures)

- No API keys are exposed in this file.
- No user data is sent anywhere — all interactions (likes, posts, email capture) are UI-only.
- All `target="_blank"` links include `rel="noopener noreferrer"`.
- Post composer output is HTML-escaped before DOM insertion (XSS prevention).
- LocalStorage is used only for like state — no sensitive data is stored.

---

## Version History

| Version | Date | Notes |
|---|---|---|
| 1.0.0 | 2026-03-14 | Initial build — full homepage, community feed, shop teaser, easter egg |

---

## Browser Targets

**MODERN-BROWSERS** — Chrome, Firefox, Safari, Edge (latest 2 versions).
Not optimized for IE or legacy mobile browsers.

---

## Credits

```
// Author: Vincent Gonzalez | © 2026 Zengine™ | www.zengine.site
// Logo: Spiral roll icon recreated as inline SVG from client-supplied reference image.
// Fonts: Google Fonts (Playfair Display, Lora, Cormorant Garamond)
```

---

*www.zengine.site | © 2026 Zengine™*
