import logging

from fastapi import APIRouter, HTTPException

from app.schemas.contact import ContactRequest, ContactResponse
from app.services.email import send_contact_email

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse)
def submit_contact(payload: ContactRequest) -> ContactResponse:
    logger.info("Iletisim formu alindi: %s <%s>", payload.name, payload.email)
    try:
        send_contact_email(payload)
    except Exception:
        logger.exception("Iletisim e-postasi gonderilemedi")
        raise HTTPException(status_code=502, detail="E-posta gonderilemedi. Lutfen daha sonra tekrar deneyin.")
    return ContactResponse(ok=True)
