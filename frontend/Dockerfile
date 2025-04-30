# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# copy and build
COPY . .
RUN npm run build

# For dev you could replace CMD with `npm run dev`
EXPOSE 3000
CMD ["npm", "run", "start"]
