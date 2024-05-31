from pydantic import BaseModel
from enum import Enum


class Medium(Enum):
    """
    Enum for the medium dropdown in the frontend form.
    """

    PHONE = "phone"
    SMS = "sms"
    WEBSITE = "website"
    SOCIAL_MEDIA = "social_media"
    EMAIL = "email"
    ECOMMERCE = "ecommerce"
    OTHER = "other"


class ScamRequestBody(BaseModel):
    """
    The request body for the scam endpoint. Same fields as the frontend form.
    """

    source: str
    medium: Medium
    description: str
    consent: bool
