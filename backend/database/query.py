from sqlalchemy.orm import Session

from . import models, schemas


def list_scam_records(db: Session):
    return db.query(models.ScamRecord).all()


def create_scam_record(db: Session, scam_record: schemas.BaseScamRecord):
    db_scam_record = models.ScamRecord(**scam_record.dict())
    db.add(db_scam_record)
    db.commit()
    db.refresh(db_scam_record)
    return db_scam_record
