# Use the official Node.js image
FROM node:18-alpine

# Set the working directory for the app
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build  # Make sure you run the build here

# Expose the default Next.js port
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "start"]
