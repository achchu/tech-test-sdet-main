# Pull official image
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test files
COPY . .

# Install Playwright browsers
RUN npx playwright install --with-deps

# Command to run tests
CMD ["npm", "run", "test"]
