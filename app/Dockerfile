# Use the official Node.js image as the base
FROM node:16.20.0

# Set the working directory inside the container
WORKDIR .

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the desired port for the frontend
EXPOSE 3000

# Set the command to start the frontend server
CMD [ "npm", "start" ]
