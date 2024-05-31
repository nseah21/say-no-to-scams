from sqlalchemy import String, Column, Integer

from .engine import Base


class ScamRecord(Base):
    __tablename__ = "scam_records"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    likelihood_of_scam = Column(String)
    score = Column(String)
    explanation = Column(String)
    type_of_scam = Column(String)
    suggestions = Column(String)
