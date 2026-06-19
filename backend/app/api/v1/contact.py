import logging

from fastapi import APIRouter, HTTPException

from app.schemas.contact import ContactRequest, ContactResponse
from app.services.email import EmailDeliveryError, EmailNotConfiguredError, send_contact_email

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse)
def submit_contact(payload: ContactRequest) -> ContactResponse:
    logger.info("Iletisim formu alindi: %s <%s>", payload.name, payload.email)
    try:
        send_contact_email(payload)
    except EmailNotConfiguredError:
        logger.exception("E-posta servisi yapilandirilmamis")
        raise HTTPException(
            status_code=503,
            detail="E-posta servisi yapilandirilmamis. RESEND_API_KEY kontrol edin.",
        )
    except EmailDeliveryError:
        logger.exception("Iletisim e-postasi gonderilemedi")
        raise HTTPException(
            status_code=502,
            detail="E-posta gonderilemedi. Lutfen daha sonra tekrar deneyin.",
        )
    except Exception:
        logger.exception("Beklenmeyen e-posta hatasi")
        raise HTTPException(
            status_code=502,
            detail="E-posta gonderilemedi. Lutfen daha sonra tekrar deneyin.",
        )
    return ContactResponse(ok=True)
