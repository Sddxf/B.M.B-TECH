FROM node:lts-buster

   # Install system dependencies
   RUN apt-get update && \
     apt-get install -y ffmpeg imagemagick webp git && \
     apt-get clean && \
     rm -rf /var/lib/apt/lists/*

   # Set working directory
   WORKDIR /app

   # Copy package.json and install dependencies
   COPY package.json /app/
   RUN npm install

   # Copy all other source code
   COPY. /app/

   # Expose the port your app uses
   EXPOSE 8080

   # Start the app
   CMD ["node", "bmbtech.js"]
