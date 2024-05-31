# This file will contain function to perform Indexing --> which is a pipeline for ingesting data from a source and indexing it. 
from langchain_community.document_loaders.csv_loader import CSVLoader
from langchain_chroma import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

def vector_stores():
    # 1. Load our data using Document Loaders (CSVLoader)
    loader = CSVLoader(file_path = "./datasets/stories.csv",
                       csv_args = {
                           "delimiter" : ",",
                           "quotechar": '"',
                           "fieldnames": ["Victim","Date","Category","Description","Scam Alias", "Scam Source"]
                       })
    docs = loader.load()
    #print(docs)
    
    # 2. Split: Text splitters break large Documents into smaller chunks. Useful both for indexing data and for passing it into a model, since large chunks are harder to search over. 
    text_splitter = RecursiveCharacterTextSplitter(chunk_size = 1000, chunk_overlap = 200)
    splits = text_splitter.split_documents(docs)
    
    # 3. Store it in Chroma VectorStores and Saves it to disk
    embedding_function = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(documents=splits, embedding=embedding_function, persist_directory = "./chorma_db")
    
    return vectorstore

if __name__ == "__main__":
    vector_stores()