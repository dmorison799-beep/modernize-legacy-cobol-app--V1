# Stage 1: Install dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY src/ ./src/
COPY package.json ./

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "const DataStore = require('./src/data'); const d = new DataStore(); process.exit(d.read() >= 0 ? 0 : 1)"

ENTRYPOINT ["node", "src/main.js"]
