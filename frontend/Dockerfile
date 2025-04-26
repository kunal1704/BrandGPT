FROM node:18

WORKDIR /app
# For better layer caching
COPY package.json package-lock.json ./ 

RUN npm install
RUN npm install @next/swc-linux-x64-gnu
COPY . .
EXPOSE 3000

