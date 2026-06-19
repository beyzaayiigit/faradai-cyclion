from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    message: str = Field(min_length=1, max_length=2000)


class ContactResponse(BaseModel):
    ok: bool = True
