# Use the official Bun image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose port 3000 (default Bun port)
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
