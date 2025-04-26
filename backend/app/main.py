from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware #Allows Frontend & Backend to communicate
from app.schemas import GenerationRequest, GenerationResponse
from app.model_client import generate_text

app = FastAPI(title="BrandGPT Backend")

# Allow frontend to talk to backend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to BrandGPT API 🎨🧠"}

@app.post("/generate", response_model=GenerationResponse)
def generate(req: GenerationRequest):
    try:
        result = generate_text(req)
        return {"outputs": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
