# backend/app/llama_client.py

from app.schemas import GenerationRequest
import requests

# Lazy global for llama model
# cache the model and tokenizer to avoid reloading them every time

llama_tokenizer = None
llama_model = None

def load_llama3_gptq():
    '''
    Load the LLaMA 3 8B GPTQ model and tokenizer from Hugging Face.
    '''

    from transformers import AutoTokenizer, AutoModelForCausalLM
    import torch

    global llama_tokenizer, llama_model
    if llama_model is None:  # Ensure model is loaded only once
        model_name = "kunal1704/Meta-Llama-3-8B-GPTQ"
        print("Loading LLaMA 3 ...")
        llama_tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
        llama_model = AutoModelForCausalLM.from_pretrained(
            model_name,
            device_map="auto",
            torch_dtype=torch.float16,
            trust_remote_code=True
        )
        llama_model.eval()

def generate_text(req: GenerationRequest) -> str:
    model_name = req.model.strip().lower()

    if model_name == "mistral":
        payload = {
            "prompt": req.prompt,
            "temperature": req.temperature,
            "max_tokens": req.max_tokens,
            "model": req.model
        }
        response = requests.post("http://inference:80/generate", json=payload)
        response.raise_for_status()
        return response.json()["response"]

    elif model_name == "llama3":
        load_llama3_gptq()
        inputs = llama_tokenizer(req.prompt, return_tensors="pt").to(llama_model.device)
        outputs = llama_model.generate(**inputs, max_new_tokens=req.max_tokens)
        return llama_tokenizer.decode(outputs[0], skip_special_tokens=True)

    else:
        raise ValueError(f"Unknown model '{model_name}'. Choose 'mistral' or 'llama3'.")
