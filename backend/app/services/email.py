import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import resend

from app.core.config import settings
from app.schemas.contact import ContactRequest

logger = logging.getLogger(__name__)


class EmailNotConfiguredError(RuntimeError):
    """RESEND_API_KEY veya SMTP bilgileri eksik."""


class EmailDeliveryError(RuntimeError):
    """E-posta gonderimi basarisiz."""


def _build_body(payload: ContactRequest) -> tuple[str, str]:
    company_line = f"\nŞirket: {payload.company}" if payload.company else ""
    body = (
        f"Ad Soyad: {payload.name}\n"
        f"E-posta: {payload.email}"
        f"{company_line}\n\n"
        f"Mesaj:\n{payload.message}"
    )
    subject = f"CYCLION — Yeni iletişim: {payload.name}"
    return subject, body


def _send_via_resend(subject: str, body: str, reply_to: str) -> None:
    resend.api_key = settings.resend_api_key
    try:
        response = resend.Emails.send(
            {
                "from": settings.resend_from_email,
                "to": [settings.contact_to_email],
                "reply_to": reply_to,
                "subject": subject,
                "text": body,
            }
        )
    except Exception as exc:
        logger.error("Resend API hatasi: %s", exc)
        raise EmailDeliveryError("Resend e-postasi gonderilemedi.") from exc

    logger.info("Resend e-postasi gonderildi: %s -> %s", response, settings.contact_to_email)


def _send_via_smtp(subject: str, body: str, reply_to: str) -> None:
    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = f"{settings.smtp_from_name} <{settings.smtp_user}>"
    msg["To"] = settings.contact_to_email
    msg["Reply-To"] = reply_to
    msg.attach(MIMEText(body, "plain", "utf-8"))

    raw = msg.as_string()
    timeout = settings.smtp_timeout
    host = settings.smtp_host
    port = settings.smtp_port

    try:
        if port == 465:
            with smtplib.SMTP_SSL(host, port, timeout=timeout) as server:
                server.login(settings.smtp_user, settings.smtp_password)
                server.sendmail(settings.smtp_user, [settings.contact_to_email], raw)
            return

        with smtplib.SMTP(host, port, timeout=timeout) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(settings.smtp_user, settings.smtp_password)
            server.sendmail(settings.smtp_user, [settings.contact_to_email], raw)
    except smtplib.SMTPAuthenticationError as exc:
        logger.error("Gmail SMTP giris basarisiz (%s). Uygulama sifresi kullanin.", settings.smtp_user)
        raise EmailDeliveryError("SMTP kimlik dogrulama basarisiz.") from exc
    except (TimeoutError, OSError) as exc:
        logger.error("SMTP baglanti hatasi: %s", exc)
        raise EmailDeliveryError("SMTP baglantisi kurulamadi.") from exc
    except smtplib.SMTPException as exc:
        logger.error("SMTP hatasi: %s", exc)
        raise EmailDeliveryError("SMTP e-postasi gonderilemedi.") from exc


def send_contact_email(payload: ContactRequest) -> None:
    if not settings.email_configured:
        logger.error(
            "E-posta ayarlanmadi. RESEND_API_KEY (production) veya SMTP (yerel) .env dosyasina ekleyin."
        )
        raise EmailNotConfiguredError("E-posta servisi yapilandirilmamis.")

    subject, body = _build_body(payload)

    if settings.resend_configured:
        logger.info("E-posta gonderimi: Resend -> %s", settings.contact_to_email)
        _send_via_resend(subject, body, payload.email)
        logger.info("Iletisim e-postasi (Resend): %s -> %s", payload.email, settings.contact_to_email)
        return

    logger.info("E-posta gonderimi: SMTP -> %s", settings.contact_to_email)
    _send_via_smtp(subject, body, payload.email)
    logger.info("Iletisim e-postasi (SMTP): %s -> %s", payload.email, settings.contact_to_email)
