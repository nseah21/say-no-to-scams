import json
from .visual_analysis import visual_analysis
from .scam_analysis_RAG import scam_analysis_RAG


def image_analysis(image_file_path: str):
    
    message_json = visual_analysis(image_file_path)
    #formatted_message = json.loads(message_json)
    
    input_message = message_json["message"]
    #print(input_message)
    
    result = scam_analysis_RAG(input_message)
    return result

if __name__ == "__main__":
    image_file_path = "./assets/conversation.jpg"
    print(image_analysis(image_file_path))
