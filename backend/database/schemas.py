from pydantic import Field, BaseModel


class BaseScamRecord(BaseModel):
    description: str
    likelihood_of_scam: str
    score: str
    explanation: str
    type_of_scam: str
    suggestions: str

    class Config:
        orm_mode = True


class GetScamRecord(BaseScamRecord):
    id: int

    class Config:
        orm_mode = True
