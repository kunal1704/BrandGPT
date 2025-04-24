"""
Schemas for request and response models for the API.
These models are used to validate the data sent to and from the API endpoints.
They are built using Pydantic, which provides data validation and settings management using Python type annotations.

BaseModel: Base class for creating data models in Pydantic.
"""
from pydantic import BaseModel


class GenerationRequest(BaseModel):
    """
    When someone POSTs to the /generate endpoint, this is the data we expect.
    i.e. their JSON will be validated using this.
    """
    prompt: str
    temperature: float = 0.7
    max_tokens: int = 300
    model: str = "mistral"  # User can specify "llama3" or "mistral"

class GenerationResponse(BaseModel):
    """
    When we respond to the /generate endpoint, this is the data we will send back.
    i.e. the JSON we send back will be validated using this.
    """
    outputs: str
