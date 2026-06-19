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

## İletişim formu — e-posta

Form mesajları `CONTACT_TO_EMAIL` adresine gider. İki yöntem desteklenir:

| Yöntem | Ne zaman? |
|--------|-----------|
| **Resend API** | Production (Render free tier) — `RESEND_API_KEY` varsa öncelikli |
| **Gmail SMTP** | Yerel geliştirme — Render free tier SMTP engeller |

### Production: Resend (önerilen)

1. [resend.com](https://resend.com) → kayıt (alıcı Gmail ile aynı hesap önerilir)
2. **API Keys** → yeni key → `RESEND_API_KEY`
3. Render Environment:

```env
CONTACT_TO_EMAIL=bbeyzaayigitt@gmail.com
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM_EMAIL=CYCLION İletişim <onboarding@resend.dev>
ALLOWED_ORIGINS=https://siteniz.vercel.app,http://localhost:3000
```

> Domain doğrulamadan `onboarding@resend.dev` gönderici olarak kullanılır; alıcı Resend hesabınızdaki e-posta olmalıdır.

### Yerel: Gmail SMTP

1. `.env` oluşturun: `copy .env.example .env`
2. [Uygulama şifresi](https://myaccount.google.com/apppasswords) alın
3. `RESEND_API_KEY` boş bırakın, SMTP alanlarını doldurun:

```env
CONTACT_TO_EMAIL=ornek@gmail.com
SMTP_USER=ornek@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
```

### Frontend bağlantısı

`frontend/.env.local`:

```env
BACKEND_URL=http://127.0.0.1:8000
```

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

---

## Production (Render)

- `render.yaml` + `Dockerfile` ile deploy
- Zorunlu env: `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, `ALLOWED_ORIGINS`
- Gmail SMTP Render free tier'da **çalışmaz**

Deploy rehberi → [`../README.md`](../README.md)

---

## Proje yapısı

```
app/
├── api/v1/       contact, stations route'ları
├── core/         config (Resend, SMTP, CORS)
├── services/     e-posta gönderimi
├── schemas/      Pydantic modelleri
└── data/         stations.json
```
