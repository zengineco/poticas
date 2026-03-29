# Poticas.com

**The world's first community dedicated entirely to potica** — the ancient rolled pastry of Central Europe.

A community and commerce platform for lovers of traditional Slovenian, Croatian, Czech, and Slovak rolled pastry. Share recipes, connect with bakers, and eventually order artisan potica shipped fresh.

Live site: [https://poticas.com](https://poticas.com)

---

## Stack

| Layer | Technology |
|---|---|
| Hosting | GitHub Pages |
| Database + Auth | Supabase (PostgreSQL + Row Level Security) |
| Frontend | Vanilla HTML/CSS/JS — zero framework, zero build step |
| Authentication | Supabase Auth — Google OAuth + email/password |
| Analytics | Google Analytics 4 |
| Advertising | Google AdSense (ca-pub-8826956454892311) |

---

## Files

```
/
├── index.html          ← Main site (community feed, shop teaser, all features)
├── privacy.html        ← Privacy Policy (AdSense + GDPR + CAN-SPAM compliant)
├── terms.html          ← Terms of Service (UGC community platform)
└── README.md           ← This file
```

---

## Supabase Schema

Run this in your Supabase SQL Editor before going live:

```sql
-- Posts
create table if not exists posts (
  id           bigint generated always as identity primary key,
  created_at   timestamptz default now() not null,
  body         text not null,
  content_type text default 'Post',
  user_id      uuid references auth.users(id) on delete set null,
  display_name text default 'Community Member'
);

-- Likes
create table if not exists post_likes (
  id      bigint generated always as identity primary key,
  post_id bigint references posts(id) on delete cascade not null,
  user_id uuid  references auth.users(id) on delete cascade not null,
  unique(post_id, user_id)
);

-- Shop waitlist
create table if not exists notify_list (
  id         bigint generated always as identity primary key,
  created_at timestamptz default now() not null,
  email      text unique not null
);

-- RLS
alter table posts       enable row level security;
alter table post_likes  enable row level security;
alter table notify_list enable row level security;

create policy "Public read posts"    on posts       for select using (true);
create policy "Auth insert posts"    on posts       for insert with check (auth.uid() is not null);
create policy "Public read likes"    on post_likes  for select using (true);
create policy "Auth insert likes"    on post_likes  for insert with check (auth.uid() = user_id);
create policy "Auth delete likes"    on post_likes  for delete using (auth.uid() = user_id);
create policy "Public insert notify" on notify_list for insert with check (true);

-- Indexes
create index if not exists idx_posts_created_at on posts(created_at desc);
create index if not exists idx_likes_post_id    on post_likes(post_id);
```

---

## Google OAuth Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → Create project
2. APIs & Services → OAuth consent screen → External → fill name + email
3. APIs & Services → Credentials → Create OAuth Client ID → Web application
4. Authorized redirect URI: `https://[your-project-ref].supabase.co/auth/v1/callback`
5. Copy Client ID + Client Secret
6. Supabase dashboard → Authentication → Providers → Google → paste credentials
7. Supabase → Authentication → URL Configuration → set Site URL to `https://poticas.com`

---

## GA4 Setup

1. Create a new GA4 property at [analytics.google.com](https://analytics.google.com) specifically for poticas.com
2. Copy your Measurement ID (format: `G-XXXXXXXXXX`)
3. In `index.html`, replace both instances of `POTICAS_GA4_ID` with your Measurement ID

---

## Deployment

This site deploys automatically via GitHub Pages on push to `main`.

```
Settings → Pages → Source: Deploy from branch → Branch: main → / (root)
```

Custom domain: add `poticas.com` and `www.poticas.com` in Pages settings. SSL provisions automatically within 30 minutes. If delayed: remove the custom domain, save, re-add.

---

## Features

- Community feed with real-time DB posts (Supabase)
- Google OAuth + email/password authentication
- Like system (DB-backed for authenticated users, localStorage fallback)
- Shop waitlist email capture (stored in `notify_list` table)
- GDPR consent banner — AdSense loads only after user consent
- Mobile-responsive with slide-in navigation drawer
- Load More pagination (10 posts per page)
- Mock post fallback when DB is empty
- Easter egg: 5× logo click → memorial modal (do not remove)
- Privacy Policy and Terms of Service pages

---

## License

© 2026 Poticas.com. All rights reserved. Site design and codebase owned by Vincent Gonzalez / Zengine™.

User-submitted content remains the property of the respective users, subject to the license granted in the Terms of Service.
