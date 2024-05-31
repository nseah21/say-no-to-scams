from openai import OpenAI
from dotenv import load_dotenv
import base64
import json

load_dotenv()

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

def visual_analysis(image_file_path: str):
    # Instantiate the model - using GPT-4o for the vision
    model = OpenAI()
    current_image = encode_image(image_file_path)
    
    messages = [
        {
            "role":"system",
            "content":"""
            You function as an intelligent web scraping tool. Users will supply a screenshot that may contains messages, description or conversation messages. You are to extract all the important message from the image and format it in a JSON Format. 

            Your output will be a JSON String containing the message from the image. The key should be "message" and the value should be formatted strictly in String format. 
            For example: 
            {
                "message": "This is the message extracted from the image."
            }

            If the image does not contain any messages, your response should be 'none' and you should not make up any messages. 
                      """.replace("\n"," ")
        },
        {
            "role": "user",
            "content" : [
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{current_image}"},
                },
                {
                    "type":"text",
                    "text":"Identify and extract all message from the image. DO NOT try to rephrase the messages from the image."
                }
            ]
        }
    ]
    
    response = model.chat.completions.create(
        model = "gpt-4o",
        messages = messages,
        max_tokens = 1024
    )
    
    message = response.choices[0].message
    message_text = message.content
    print(message_text)
    
    if "none" in message_text.lower():
        return "No message is found in the image."
    
    try:
        result = json.loads(message_text[message_text.find("{"):message_text.find("}")+1])
        #print(result)
        
    except json.decoder.JSONDecodeError:
        return message_text + "Error, unable to find JSON object"
    
    return result

if __name__ == "__main__":
    image_file_path = "./assets/conversation.jpg"
    visual_analysis(image_file_path)
    
    