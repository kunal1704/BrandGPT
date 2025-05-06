FROM python:3.10  

RUN apt-get update && \
    apt-get install -y \
    libgomp1 \
    libcurl4 \
    build-essential \
    cmake \
    git \
    curl \
    wget && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend code, including llama.cpp
COPY . .

# Build llama.cpp and ensure llama-cli is executable
RUN cd llama.cpp && mkdir -p build && cd build && cmake .. && make -j && \
    chmod +x /app/llama.cpp/build/bin/llama-cli

ENV LD_LIBRARY_PATH="/app/llama.cpp/build/bin:${LD_LIBRARY_PATH}"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]