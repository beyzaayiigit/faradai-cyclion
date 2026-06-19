import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings
from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)


def send_contact_email(payload: ContactRequest) -> None:
    if not settings.smtp_configured:
        logger.warning(
            "SMTP ayarlanmadi; mesaj kaydedilmedi. SMTP_USER ve SMTP_PASSWORD .env dosyasina ekleyin."
        )
        logger.info(
            "Iletisim formu (SMTP yok): name=%s email=%s company=%s message=%s",
            payload.name,
            payload.email,
            payload.company,
            payload.message,
        )
        return

    company_line = f"\nŞirket: {payload.company}" if payload.company else ""
    body = (
        f"Ad Soyad: {payload.name}\n"
        f"E-posta: {payload.email}"
        f"{company_line}\n\n"
        f"Mesaj:\n{payload.message}"
    )

    msg = MIMEMultipart()
    msg["Subject"] = f"CycLion — Yeni iletişim: {payload.name}"
    msg["From"] = f"{settings.smtp_from_name} <{settings.smtp_user}>"
    msg["To"] = settings.contact_to_email
    msg["Reply-To"] = payload.email
    msg.attach(MIMEText(body, "plain", "utf-8"))

    with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
        server.starttls()
        try:
            server.login(settings.smtp_user, settings.smtp_password)
        except smtplib.SMTPAuthenticationError as exc:
            logger.error(
                "Gmail SMTP giris basarisiz (%s). Uygulama sifresi kullanin; normal Gmail sifresi calismaz.",
                settings.smtp_user,
            )
            raise exc
        server.sendmail(settings.smtp_user, [settings.contact_to_email], msg.as_string())

    logger.info("Iletisim e-postasi gonderildi: %s -> %s", payload.email, settings.contact_to_email)
