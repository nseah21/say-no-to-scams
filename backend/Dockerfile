# Use Python 3.10
FROM python:3.10

# Set the working directory in the container
WORKDIR /backend

COPY requirements.txt .

RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /backend
COPY . /backend

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run fastapi
CMD ["fastapi", "run", "main.py"]
