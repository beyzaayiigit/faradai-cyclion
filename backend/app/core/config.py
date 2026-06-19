from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    contact_to_email: str = "bbeyzaayigitt@gmail.com"
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
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

    @field_validator("smtp_password", mode="before")
    @classmethod
    def normalize_app_password(cls, value: object) -> object:
        if isinstance(value, str):
            # Gmail uygulama sifresi "abcd efgh ijkl mnop" seklinde gelir; bosluklari kaldir.
            return value.strip().strip('"').strip("'").replace(" ", "")
        return value

    @property
    def smtp_configured(self) -> bool:
        return bool(self.smtp_user and self.smtp_password)

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()
