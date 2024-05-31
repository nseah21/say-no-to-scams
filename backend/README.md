# FastAPI Backend

## Setup Instructions

### 1. Change Directory to Backend
```bash
cd backend
```

### 2. Create and Activate Virtual Environment (Optional)
Good practice but not necessary.
```bash
python3 -m venv venv
```
Windows:
```bash
venv\Scripts\activate
```
Linux:
```bash
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run FastAPI Server
```bash
fastapi dev main.py
```

### 5. Open Browser
Open [Swagger Page](http://localhost:8000/docs) in browser to view the API documentation.


### 6. Database Setup
- Run docker-compose to start the database
```bash
docker-compose up -d --build
```
