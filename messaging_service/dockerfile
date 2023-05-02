# Use Node.js version 16 as base image
FROM node:16

# Set working directory to /app
WORKDIR /chat-microservice

# Copy package.json and package-lock.json to container for the frontend
COPY frontend/package*.json frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy package.json and package-lock.json to container for the backend
COPY backend/package*.json backend/

# Install backend dependencies
RUN cd backend && npm install

# Copy frontend code to container
COPY frontend .

# Set working directory to /app/server
WORKDIR /chat-microservice/backend

# Copy backend code to container
COPY backend .

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV MONGODB_URI mongodb://mongo:27017/Chat

# Build the Vue.js frontend
WORKDIR /chat-microservice/frontend
RUN npm run build

# Expose ports 8080 and 3000 for incoming requests
EXPOSE 8080
EXPOSE 3000

# Start the Node.js server
WORKDIR /chat-microservice/backend
CMD ["npm", "start"]
