# Deployment Guide - Wikrama Hotel

Panduan lengkap untuk deploy website ke Netlify atau Vercel dengan mudah.

## Persiapan

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd cozy-stay-finder-main
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment (Optional)**
   ```bash
   cp .env.example .env.local
   ```

## Deploy ke Vercel (Recommended)

### Metode 1: UI Vercel (Termudah)

1. Buka [vercel.com](https://vercel.com)
2. Klik **"New Project"**
3. Hubungkan GitHub/GitLab/Bitbucket repository
4. Pilih repository project ini
5. Vercel akan otomatis detect konfigurasi
6. Klik **"Deploy"**

**Selesai!** Website akan live di `https://[project-name].vercel.app`

### Metode 2: CLI Vercel

```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### Metode 3: GitHub Integration

1. Push code ke GitHub
2. Di Vercel dashboard, connect GitHub
3. Pilih repository ini
4. Setiap kali push ke `main` branch, otomatis deploy

## Deploy ke Netlify

### Metode 1: UI Netlify (Termudah)

1. Buka [netlify.com](https://netlify.com)
2. Klik **"Add new site"** → **"Connect to Git"**
3. Pilih Git provider (GitHub/GitLab/Bitbucket)
4. Hubungkan repository project ini
5. Build settings akan auto-detect, klik **"Deploy site"**

**Selesai!** Website akan live di `https://[site-name].netlify.app`

### Metode 2: CLI Netlify

```bash
# Install Netlify CLI (jika belum)
npm i -g netlify-cli

# Login ke Netlify
netlify login

# Deploy
netlify deploy

# Deploy ke production
netlify deploy --prod
```

### Metode 3: GitHub Integration

1. Push code ke GitHub
2. Di Netlify dashboard, connect GitHub
3. Pilih repository ini
4. Setiap kali push ke `main` branch, otomatis deploy

## Build Lokal untuk Testing

```bash
# Build production version
npm run build

# Preview hasil build
npm run preview

# Development mode
npm run dev
```

## Build Output

- **Output Directory**: `dist/`
- **Entry Point**: `dist/index.html`
- **Build Command**: `npm run build`

## Environment Variables

Jika ada environment variables yang dibutuhkan:

1. **Vercel**: Dashboard → Project Settings → Environment Variables
2. **Netlify**: Site Settings → Build & Deploy → Environment

## Troubleshooting

### Build gagal di Vercel/Netlify

**Solusi:**
- Pastikan `Node.js` version sama antara lokal dan platform
- Hapus `node_modules` dan `package-lock.json` di lokal, re-install
- Check build logs di dashboard platform

### Site tidak muncul setelah deploy

**Solusi:**
- Pastikan `dist` folder tidak ada di `.gitignore` saat build
- Clear cache di Vercel/Netlify (Settings → Clear Cache)
- Re-trigger deploy

### Static assets tidak load

**Solusi:**
- Vercel/Netlify sudah handle caching otomatis
- Check console browser untuk error messages
- Clear browser cache

## Custom Domain

### Vercel
Settings → Domains → Add → Masukkan domain kamu

### Netlify
Site Settings → Domain Management → Add Custom Domain

## Performance Tips

1. **Vercel** → lebih cepat untuk production, support edge functions
2. **Netlify** → lebih mudah config, great for static + dynamic
3. Dua-duanya support continuous deployment dari GitHub
4. Keduanya cache assets otomatis

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
