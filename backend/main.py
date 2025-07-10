from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "LawnCare CRM Backend is live!"}
