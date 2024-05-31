from fastapi import FastAPI
from models import ScamRequestBody

app = FastAPI()


@app.post("/scam")
async def post_scam(body: ScamRequestBody):
    """
    Endpoint for frontend to call, takes in the same fields in the frontend form.
    The method should then query the vectordb for the model to predict the scam probability.
    """
    print(body.dict())
    # ToDO: Query the vectordb for the model to predict the scam probability
    return {"status": "success",
            "message": "Scam report received."}
