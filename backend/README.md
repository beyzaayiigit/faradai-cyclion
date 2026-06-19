# CYCLION Backend

FastAPI ile istasyon listesi ve iletişim formu e-posta servisi.

---

## Kurulum

```powershell
uv sync
cp .env.example .env   # Windows: copy .env.example .env
uv run uvicorn app.main:app --reload --port 8000
```

| Adres | Açıklama |
|--------|----------|
| http://localhost:8000/docs | Swagger API dokümantasyonu |
| http://localhost:8000/health | Sağlık kontrolü |
| POST /api/v1/contact | İletişim formu |
| GET /api/v1/stations | İstasyon listesi (filtreli) |

---

## İletişim formu (Gmail SMTP)

Form mesajları `.env` içindeki `CONTACT_TO_EMAIL` adresine gider.

### 1. `.env` oluşturun

```powershell
copy .env.example .env
```

### 2. Gmail uygulama şifresi

1. [Google Hesabı → Güvenlik](https://myaccount.google.com/security)
2. **2 Adımlı Doğrulama** açık olmalı
3. [Uygulama şifreleri](https://myaccount.google.com/apppasswords) → yeni şifre oluşturun
4. 16 haneli şifreyi `SMTP_PASSWORD` olarak `.env`'e yazın

### 3. Örnek `.env`

```env
CONTACT_TO_EMAIL=ornek@gmail.com
SMTP_USER=ornek@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
SMTP_FROM_NAME=CYCLION İletişim
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

> Normal Gmail şifresi çalışmaz — yalnızca **uygulama şifresi** kullanın.

### 4. Frontend bağlantısı

`frontend/.env.local`:

```env
BACKEND_URL=http://127.0.0.1:8000
```

Frontend iletişim isteklerini `/api/contact` üzerinden bu adrese iletir.

---

## API uç noktaları

### `POST /api/v1/contact`

```json
{
  "name": "Ad Soyad",
  "email": "kisi@ornek.com",
  "company": "Şirket (opsiyonel)",
  "message": "Mesaj metni"
}
```

Başarılı yanıt: `{ "ok": true }`

E-posta konusu: `CYCLION — Yeni iletişim: [Ad Soyad]`

### `GET /api/v1/stations`

Query parametreleri: `province`, `district`, `power_type`, `status`

---

## Production (Render)

- `render.yaml` + `Dockerfile` ile deploy
- Zorunlu env: `CONTACT_TO_EMAIL`, `SMTP_USER`, `SMTP_PASSWORD`, `ALLOWED_ORIGINS`
- `ALLOWED_ORIGINS` içine Vercel site URL'nizi ekleyin (`https://...`)

Deploy rehberi → [`../README.md`](../README.md)

---

## Proje yapısı

```
app/
├── api/v1/       contact, stations route'ları
├── core/         config (SMTP, CORS)
├── services/     e-posta gönderimi
├── schemas/      Pydantic modelleri
└── data/         stations.json
```
