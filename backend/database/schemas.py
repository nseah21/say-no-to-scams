from pydantic import BaseModel


class BaseScamRecord(BaseModel):
    description: str
    likelihood_of_scam: str
    score: int
    explanation: str
    type_of_scam: str
    suggestions: str

    class Config:
        from_attributes = True


class GetScamRecord(BaseScamRecord):
    id: int

    class Config:
        from_attributes = True
