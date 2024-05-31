from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from gen_ai.scam_analysis_RAG import scam_analysis_RAG
from models import ScamRequestBody

from database.engine import SessionLocal, engine
from database import models, schemas, query

app = FastAPI()

# Create the database tables on startup
models.Base.metadata.create_all(bind=engine)

# CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

    # Add the response to the database
    with SessionLocal() as db:
        add_response_to_db(response, db)

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


def add_response_to_db(response: dict, db: Session):
    base_scam_record = schemas.BaseScamRecord(
        description=response["Description"],
        likelihood_of_scam=response["Likelihood_of_Scam"],
        score=response["Score"],
        explanation=response["Explanation"],
        type_of_scam=response["Type_of_Scam"],
        suggestions=response["Suggestions to combat against scams"],
    )

    query.create_scam_record(db, base_scam_record)
