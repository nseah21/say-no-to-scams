from dotenv import load_dotenv
from langchain.schema.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

load_dotenv()


def scam_analysis(input_message: str):
    system_template = """
                    **Context** : You are a helpful and meticulous AI Assistant who will help citizens to detect
                    Scam Messages. Scammers send fake text messages mainly to trick citizens into giving them the 
                    personal information such as password, account number or any confidential information. 
                    
                    **Main Objective**: Your main objective will help in identifying Scam Messages given from the 
                    users. You should be able to identify Scam Messages from other Ham Messages or Informational
                    Messages. 
                    
                    You should also evaluates the conversations for Scam likeihood, generating an AI score between
                    0 to 100. With 100 being highly suspected Scam and 0 being not likely to be a Scam. 
                    
                    Your output should contain the following information in JSON format --> SMS_Message, Score, 
                    how likely is the message a Scam, and suggestion in how to combat against the Scam. 
                    For example: 
                    {
                        SMS_Message: "This is the SCAM Message",
                        Score: 20,
                        Is-it-a-scam: "Not a scam"
                        Suggestion: "Do not click on the hyperlink"
                    }

                    """

    messages = [
        SystemMessage(content=system_template),
        HumanMessage(content=input_message),
    ]

    """chat_template = ChatPromptTemplate.from_messages(
        [
            ("system", system_template),
            ("human", "{sms_messages}")
        ]
    )"""
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.1)

    result = llm.invoke(messages)

    print(result)


if __name__ == "__main__":
    input = "Congratulations! You've won a $1000 Walmart gift card. Go to http://bit.ly/123456 tp claim now."
    non_scam = "i am a stupid idiot person"
    output = scam_analysis(non_scam)
