# backend/app/llama_client_local.py

import subprocess
from pathlib import Path
from app.schemas import GenerationRequest

# Resolve root of the project (BrandGPT/)
ROOT_DIR = Path(__file__).resolve().parents[2]

# Paths to llama.cpp binary and local model file
LLAMA_CLI_PATH = ROOT_DIR / "llama.cpp" / "build" / "bin" / "llama-cli"
MODEL_PATH = ROOT_DIR / "models" / "mistral-7b-instruct-v0.1.Q4_K_M.gguf"

def generate_with_mistral(req: GenerationRequest) -> str:
    """
    Runs local inference using llama.cpp with Mistral GGUF model on CPU.
    """
    prompt = req.prompt
    max_tokens = str(req.max_tokens)
    temperature = str(req.temperature)

    command = [
        str(LLAMA_CLI_PATH),
        "-m", str(MODEL_PATH),
        "-p", prompt,
        "--temp", temperature,
        "--n-predict", max_tokens
    ]

    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        output_text = result.stdout.strip()

        # Optional: clean output by removing performance stats and junk if needed
        if "[end of text]" in output_text:
            output_text = output_text.split("[end of text]")[0].strip()

        return output_text

    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"llama.cpp execution failed: {e.stderr.strip()}")
