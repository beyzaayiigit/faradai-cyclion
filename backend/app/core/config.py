from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    contact_to_email: str = "bbeyzaayigitt@gmail.com"

    # Resend — production (Render free tier). RESEND_API_KEY doluysa oncelikli kullanilir.
    resend_api_key: str = ""
    resend_from_email: str = "CYCLION İletişim <onboarding@resend.dev>"

    # Gmail SMTP — yerel gelistirme (Render free tier SMTP engeller)
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_timeout: int = 20
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from_name: str = "CYCLION İletişim"

    allowed_origins: str = "http://localhost:3000,http://127.0.0.1:3000"

    @field_validator("smtp_user", "contact_to_email", mode="before")
    @classmethod
    def strip_email(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("resend_api_key", mode="before")
    @classmethod
    def strip_api_key(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("smtp_password", mode="before")
    @classmethod
    def normalize_app_password(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip().strip('"').strip("'").replace(" ", "")
        return value

    @property
    def resend_configured(self) -> bool:
        return bool(self.resend_api_key)

    @property
    def smtp_configured(self) -> bool:
        return bool(self.smtp_user and self.smtp_password)

    @property
    def email_configured(self) -> bool:
        return self.resend_configured or self.smtp_configured

    @property
    def email_provider(self) -> str:
        if self.resend_configured:
            return "resend"
        if self.smtp_configured:
            return "smtp"
        return "none"

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
