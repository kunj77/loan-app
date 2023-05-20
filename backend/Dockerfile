# Use the official Node.js image as the base
FROM node:16.20.0

# Set the working directory inside the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code to the working directory
COPY . .

# Expose the desired port for the backend
EXPOSE 4000

# Set the command to start the backend server
CMD ["npm", "run", "dev"]
