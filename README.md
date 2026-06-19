# CYCLION — MobiQ × RE-LITH

**CYCLION** markası altında MobiQ (akıllı şarj ağı) ve RE-LITH (döngüsel batarya geri dönüşümü) platformlarını anlatan kurumsal landing page ve canlı harita prototipi.

---

## Proje yapısı

```
cyclion/
├── frontend/     Next.js 16 — landing, harita, iletişim formu
├── backend/      FastAPI — istasyon API + e-posta (iletişim formu)
├── render.yaml   Backend deploy (Render)
└── README.md     Bu dosya
```

| Bölüm | Ne işe yarar? |
|--------|----------------|
| **Landing** | Hero, MobiQ / RE-LITH sekmeleri, süreç haritası, hakkımızda |
| **Harita** | Türkiye → ilçe → istasyon (111 nokta; Ankara gerçek veri) |
| **İletişim** | Pitch deck talebi → Gmail SMTP ile e-posta |
| **Demo rezervasyon** | Haritada prototip giriş akışı (gerçek hizmet değil) |

---

## Yerel çalıştırma

### Frontend

```powershell
cd frontend
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm install
npm run dev
```

Tarayıcı: **http://localhost:3000**

### Backend (iletişim formu için)

```powershell
cd backend
uv sync
cp .env.example .env         # Windows: copy .env.example .env
uv run uvicorn app.main:app --reload --port 8000
```

API dokümantasyonu: **http://localhost:8000/docs**

### Frontend ↔ Backend bağlantısı

`frontend/.env.local`:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
BACKEND_URL=http://127.0.0.1:8000
```

Harita verisi frontend içindeki JSON'dan gelir; iletişim formu `BACKEND_URL` üzerinden API'ye gider.

Detaylı backend ve SMTP ayarları için → [`backend/README.md`](backend/README.md)

---

## Deploy

Proje iki parçaya ayrılır:

| Parça | Platform | Klasör |
|--------|----------|--------|
| Frontend | [Vercel](https://vercel.com) | `frontend/` |
| Backend | [Render](https://render.com) | `backend/` (Docker) |

### 1. GitHub

Repoyu kendiniz oluşturup push edin. `.env` dosyaları commit edilmemeli (`.gitignore` bunları hariç tutar).

### 2. Backend → Render

1. [render.com](https://render.com) → GitHub bağlayın
2. **New → Blueprint** → repo seçin (`render.yaml` otomatik okunur)
3. Ortam değişkenleri:

| Key | Açıklama |
|-----|----------|
| `CONTACT_TO_EMAIL` | Mailin gideceği adres |
| `SMTP_USER` | Gmail adresi |
| `SMTP_PASSWORD` | Gmail uygulama şifresi (16 hane) |
| `ALLOWED_ORIGINS` | Vercel URL + `http://localhost:3000` |

4. Deploy sonrası test: `https://API-URL/health` → `{"status":"ok"}`

### 3. Frontend → Vercel

1. [vercel.com/new](https://vercel.com/new) → repo import
2. **Root Directory:** `frontend`
3. Ortam değişkenleri:

| Key | Değer |
|-----|--------|
| `BACKEND_URL` | Render API URL'niz |
| `NEXT_PUBLIC_USE_MOCK_DATA` | `true` |

### 4. CORS

Vercel URL'niz belli olunca Render'da `ALLOWED_ORIGINS` güncelleyin:

```
https://siteniz.vercel.app,http://localhost:3000
```

### Sık karşılaşılan sorunlar

| Sorun | Kontrol |
|--------|---------|
| Form hata veriyor | Vercel'de `BACKEND_URL`, Render'da `/health` |
| Mail gelmiyor | Render'da `SMTP_*` değişkenleri |
| İlk istek çok yavaş | Render free tier uyku modundan uyanıyor (~1 dk) |

---

## Teknolojiler

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, MapLibre, Zustand
- **Backend:** FastAPI, Pydantic, Gmail SMTP
- **Tasarım:** CYCLION marka kimliği (açık tema, mavi → teal → yeşil)

---

## Lisans

Özel proje — CYCLION / MobiQ × RE-LITH.
