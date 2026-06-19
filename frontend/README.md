# CYCLION Frontend

Next.js tabanlı tek sayfalık kurumsal site: landing bölümleri, interaktif harita ve iletişim formu.

---

## Özellikler

- **Landing:** Hero, MobiQ / RE-LITH platform sekmeleri, süreç haritası, hakkımızda, iletişim
- **Harita:** SVG Türkiye haritası → MapLibre ilçe görünümü → istasyon pinleri ve filtreler
- **İletişim:** Form gönderimi Vercel API route (`/api/contact`) üzerinden backend'e iletilir
- **Demo rezervasyon:** İstasyon çekmecesinde prototip giriş akışı (gerçek hizmet yok)

---

## Kurulum

```powershell
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

**http://localhost:3000**

---

## Ortam değişkenleri

`/.env.local`:

```env
# Harita: yerel stations.json kullan (production'da da true kalabilir)
NEXT_PUBLIC_USE_MOCK_DATA=true

# İletişim formu proxy hedefi (yerel backend)
BACKEND_URL=http://127.0.0.1:8000
```

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_USE_MOCK_DATA` | `true` → istasyon verisi `src/data/stations.json`'dan |
| `BACKEND_URL` | FastAPI adresi; `/api/contact` buraya proxy eder |
| `NEXT_PUBLIC_API_URL` | Opsiyonel; doğrudan backend istasyon API'si için |

İletişim formunun çalışması için backend'in ayakta olması gerekir → [`../backend/README.md`](../backend/README.md)

---

## Komutlar

| Komut | Açıklama |
|--------|----------|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Production build |
| `npm run start` | Production sunucusu |
| `npm run lint` | ESLint |
| `npm run generate:map` | Harita geometrisini yenile |
| `npm run fetch:ankara` | Ankara ilçe GeoJSON (OSM) |

---

## Önemli klasörler

```
src/
├── app/              Sayfa ve API route'ları
├── components/
│   ├── map/          Harita modülü, filtreler, demo giriş
│   ├── sections/     Landing bölümleri
│   └── layout/       Header, Footer, Section
├── data/             İstasyonlar, içerik JSON, GeoJSON referansları
├── stores/           Zustand (harita, platform, demo auth)
└── lib/              API client, harita teması
```

---

## Vercel deploy

1. Repo root'u değil, **`frontend`** klasörünü seçin
2. Env: `BACKEND_URL` = Render API URL'niz
3. Env: `NEXT_PUBLIC_USE_MOCK_DATA=true`

Genel deploy adımları → [`../README.md`](../README.md)
