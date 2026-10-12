# Use official Node.js runtime image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose server port
EXPOSE 5000

# Start application
CMD ["npm", "start"]