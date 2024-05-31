# Use Node.js
FROM node:20

# Set the working directory in the container
WORKDIR /frontend

# Copy the current directory contents into the container at /frontend
COPY . /frontend

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

RUN npx next build

# Run the frontend
CMD ["npm", "start"]
