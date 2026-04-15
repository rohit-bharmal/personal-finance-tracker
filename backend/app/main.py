from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import expenses
from app.models import Base
from app.database import engine
from app.routes import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expenses.router)
app.include_router(auth.router)
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Finance Tracker API is running"}
