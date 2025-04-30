FROM python:3.10-slim

# Install system libs needed by llama.cpp
RUN apt-get update && \
    apt-get install -y libgomp1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only Python requirements to install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#  Copy backend code, llama.cpp binary, and model weights
COPY . .


# Expose and set a sensible default command
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
