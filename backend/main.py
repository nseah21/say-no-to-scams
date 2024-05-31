from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from models import ScamRequestBody
from gen_ai.scam_analysis_RAG import scam_analysis_RAG

from database.engine import SessionLocal, engine
from database import models, schemas, query

app = FastAPI()

# Create the database tables on startup
models.Base.metadata.create_all(bind=engine)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/analyse")
async def analyse_scam(body: ScamRequestBody):
    """
    Endpoint for frontend to call, takes in the same fields in the frontend form.
    Then, call the scam_analysis_RAG function to get the response.
    """
    prompt = format_input_prompt(body)
    response = scam_analysis_RAG(prompt)
    return {"status": "success", "message": response}


@app.get("/scam", response_model=list[schemas.GetScamRecord])
def list_scam_records(db: Session = Depends(get_db)):
    """
    Endpoint to list all scam records in the database.
    """
    return query.list_scam_records(db)


@app.post("/scam", response_model=schemas.BaseScamRecord)
def create_scam_record(
    scam_record: schemas.BaseScamRecord, db: Session = Depends(get_db)
):
    """
    Endpoint to create a scam record in the database.
    """
    return query.create_scam_record(db, scam_record)


#  Utility functions
def format_input_prompt(body: ScamRequestBody) -> str:
    return f"I received a {body.medium.value} message from {body.source}. The message reads: {body.description}"
