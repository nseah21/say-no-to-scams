from fastapi import FastAPI
from models import ScamRequestBody
from gen_ai.scam_analysis_RAG import scam_analysis_RAG

app = FastAPI()


@app.post("/scam")
async def post_scam(body: ScamRequestBody):
    """
    Endpoint for frontend to call, takes in the same fields in the frontend form.
    Then, call the scam_analysis_RAG function to get the response.
    """
    prompt = format_input_prompt(body)
    response = scam_analysis_RAG(prompt)
    return {"status": "success", "message": response}


#  Utility functions
def format_input_prompt(body: ScamRequestBody) -> str:
    return f"I received a {body.medium.value} message from {body.source}. The message reads: {body.description}"
