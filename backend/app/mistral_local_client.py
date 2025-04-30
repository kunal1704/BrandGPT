# backend/app/mistral_local_client.py

import subprocess
from pathlib import Path
from app.schemas import GenerationRequest

# Resolve root of the project (BrandGPT/)
ROOT_DIR = Path(__file__).resolve().parents[2]

LLAMA_CLI_PATH = ROOT_DIR / "llama.cpp" / "build" / "bin" / "llama-cli"
MODEL_PATH     = ROOT_DIR / "models"   / "mistral-7b-instruct-v0.1.Q4_K_M.gguf"

def generate_with_mistral(req: GenerationRequest) -> str:
    """
    Runs local inference using llama.cpp with Mistral GGUF model on CPU.
    """
    command = [
        str(LLAMA_CLI_PATH),
        "-m", str(MODEL_PATH),
        "-p", req.prompt,
        "--temp", str(req.temperature),
        "--n-predict", str(req.max_tokens)
    ]
    try:
        out = subprocess.run(command, capture_output=True, text=True, check=True)
        text = out.stdout.split("[end of text]")[0].strip() if "[end of text]" in out.stdout else out.stdout.strip()
        return text
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Mistral inference failed: {e.stderr.strip()}")
