import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

load_dotenv()
#openai_api_key = os.getenv("OPENAI_API_KEY")
#print(openai_api_key)

class Classification(BaseModel):
    classification: str = Field(..., enum=["Scam","Ham"])
    score: int = Field(
        ...,
        description = "Describes how accurate is your classification on the scale of 1 to 10, the higher the number the more accurate it is",
        enum = [1,2,3,4,5,6,7,8,9,10]
    )

def tagging(input:str):
    tagging_prompt = ChatPromptTemplate.from_template(
         """
        You are an expert linguist, who is good at classifying scam messages into Scams or Ham Labels.
        Help me classify the SMS Message into Scams, or Ham labels. 
        
        Only extract the properties mentioned in the 'Classification' function. 
        
        Passage:
        {input}
        """
    )
    
    llm = ChatOpenAI(temperature = 0, model = "gpt-3.5-turbo-0125").with_structured_output(
        Classification
    )
    
    tagging_chain = tagging_prompt | llm
    
    res = tagging_chain.invoke({"input": input})
    print(res.dict())
    return res.dict()

if __name__ == "__main__":
    tagging("""ASKED 3MOBILE IF 0870 CHATLINES INCLU IN FREE MINS. INDIA CUST SERVs SED YES. L8ER GOT MEGA BILL. 3 DONT GIV A SHIT. BAILIFF DUE IN DAYS. I O å£250 3 WANT å£800""")
    
    
    
