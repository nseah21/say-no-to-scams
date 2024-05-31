from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings

load_dotenv()


class standard_output(BaseModel):
    description: str = Field(
        description="description of the message provided from users"
    )
    likelihood_of_scam: str = Field(
        description="how likely is the message to be a Scam, e.g. not likely a scam, likely a scam, highly likely a scam"
    )
    score: str = Field(
        description="generated AI score between 0 to 100, with 100 being highly suspected Scam and 0 being not likely to be a Scam. "
    )
    explanation: str = Field(
        description="short explanation of why the score was given, any characteristics of scam messages"
    )
    type_of_scam: str = Field(
        description="Based on the knowledge, categorise the scam message based on the list of category"
    )
    suggestions: str = Field(
        description="short description of any suggestions to combat against scam messages."
    )


def scam_analysis_RAG(input_message: str):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.1)
    embedding_function = OpenAIEmbeddings()
    # Load from disk
    vectorstores = Chroma(
        persist_directory="./chroma_db", embedding_function=embedding_function
    )

    """Output from LLM:
    - Description (Required)
    - Is it a SCAM? (Required)
    - Score (Required)
    - Explanation (Required)

    - Type of scam
    - Suggestions"""

    system_template = """
                    **Context** : You are a helpful and meticulous AI Assistant who will help citizens to detect
                    Scam Messages. Scammers send fake text messages mainly to trick citizens into giving them the 
                    personal information such as password, account number or any confidential information. 
                    
                    **Main Objective**: Your main objective will help in identifying Scam Messages given the description from the 
                    users. Based on all the following pieces of retrieved context, you have the ability to differentiate
                    and identify Scam Messages from other messages. 
                    
                    Context: {context}
                    
                    You should also evaluates the conversations for Scam likelihood, generating an AI score between
                    0 to 100. With 100 being highly suspected Scam and 0 being not likely to be a Scam. 
                    
                    Your output should contain the following information in JSON format --> Description, Likelihood_of_Scam, 
                    Score, Explanation, Type_of_Scam, Suggestions to combat against scams. If the description have a low likelihood
                    of being a scam (low score), the default answer of type of scam should be N/A.
                    
                    Description : {description}

                    """
    parser = JsonOutputParser(pydantic_object=standard_output)

    retriever = vectorstores.as_retriever(search_type="similarity")
    prompt = ChatPromptTemplate.from_messages(["human", system_template])
    rag_chain = (
        {"context": retriever, "description": RunnablePassthrough()}
        | prompt
        | llm
        | parser
    )
    return rag_chain.invoke(input_message)


if __name__ == "__main__":
    not_spam_message = "Hello, I am feeling very tired today"
    input = "Congratulations! You've won a $1000 Walmart gift card. Go to http://bit.ly/123456 tp claim now."
    another_try = "Hotel Line? Assisting booking.com, trip.com, etc. It's a scam. I didn’t lose anything, but the company is non-existent. Remember, if it's an entity, there must be a legitimate office and website that you can easily track.Their trick is the same: high base pay plus commission for processing hotel orders. What will happen is they will ask you to wire money for the process to go through."
    try_again = "Hi Sara! It's Malcolm. Sharing my new number with you.\nHey! Got it, thanks for sharing. What’s up?\nI got into an accident on my bicycle going to work today. Can you help me cover some of my aftercare medication costs? I need 150$ right now.\n😧😧 Omg, M! where are you? Yes, I can send some money in the next hour."
    print(scam_analysis_RAG(try_again))
