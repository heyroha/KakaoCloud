from fastapi import FastAPI
from fastapi import APIRouter
from todo import todo_router

app = FastAPI()

@app.get("/hello")
async def say_hello() -> dict:
    return {"message" : "Good Morning"}

@app.get("/")
async def welcom() -> dict:
    return {"message": "Hi", "status": "success"}

app.include_router(todo_router)