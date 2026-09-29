# 🚀 Deploy Wikrama Hotel ke Vercel atau Netlify

## ⚡ Quick Deploy (5 Menit)

### Deploy ke Vercel
```
1. Buka https://vercel.com/new
2. Klik "Continue with GitHub" dan select repository ini
3. Klik Deploy
4. Selesai! ✅
```

**URL**: `https://[nama-project].vercel.app`

### Deploy ke Netlify  
```
1. Buka https://app.netlify.com/start
2. Klik "Connect to Git" dan select repository ini
3. Klik Deploy
4. Selesai! ✅
```

**URL**: `https://[nama-site].netlify.app`

---

## 📋 Build Configuration

**Build Command**: `npm run build`  
**Output Directory**: `dist`  
**Node Version**: 18+ (auto-detected)

Konfigurasi sudah tersedia di:
- ✅ `vercel.json` - Pre-configured untuk Vercel
- ✅ `netlify.toml` - Pre-configured untuk Netlify

---

## 🔗 Custom Domain

1. **Beli domain** di (Namecheap, GoDaddy, etc)
2. **Vercel**: Settings → Domains → Add → Masukkan domain
3. **Netlify**: Site Settings → Domain Management → Add Custom Domain
4. **Update DNS** sesuai instruksi platform

---

## 📝 Environment Variables (Jika Diperlukan)

**Vercel**:  
Settings → Environment Variables → Add

**Netlify**:  
Site Settings → Build & Deploy → Environment

---

## 🔄 Auto Deploy dari GitHub

Sudah configured! Setiap kali push ke `main` branch, otomatis deploy.

```bash
git add .
git commit -m "Update"
git push origin main
# Deploy otomatis! 🚀
```

---

## 📂 Detail File Config

| File | Purpose |
|------|---------|
| `vercel.json` | Konfigurasi Vercel deployment |
| `netlify.toml` | Konfigurasi Netlify deployment |
| `.vercelignore` | File yang diabaikan saat deploy Vercel |
| `.netlifyignore` | File yang diabaikan saat deploy Netlify |
| `DEPLOYMENT.md` | Panduan lengkap deployment |

---

## ✨ Fitur Website (No Database)

- ✅ Booking kamar (dummy data, no database)
- ✅ Cafe ordering (dummy data, no database)
- ✅ Favorit kamar (saved locally)
- ✅ Responsive design
- ✅ Fast performance

---

## 🐛 Troubleshooting

**Build gagal?**
- `npm install` ulang di lokal
- Delete `node_modules` & `package-lock.json`
- Clear cache di platform dashboard

**Asset tidak muncul?**
- Clear browser cache
- Check console untuk errors

**Site tidak open?**
- Tunggu 1-2 menit setelah deploy
- Check platform's deployment logs

---

## 📚 Links

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [TanStack Start](https://tanstack.com/start)
