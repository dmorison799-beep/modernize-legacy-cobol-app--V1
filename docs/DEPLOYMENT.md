# Deployment Guide

This guide covers deploying the Node.js Accounting System using Docker, PM2, or cloud services.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Docker Deployment](#docker-deployment)
- [PM2 Deployment](#pm2-deployment)
- [AWS Deployment](#aws-deployment)
- [Environment Variables](#environment-variables)
- [Health Checks](#health-checks)
- [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

- Node.js 18+ (LTS recommended)
- Docker 20+ (for containerized deployment)
- AWS CLI (for cloud deployment)
- PM2 (`npm install -g pm2`) for process management

---

## Docker Deployment

### Build

```bash
cd deploy
docker build -t accounting-app:latest -f Dockerfile ../node-app
```

### Run Locally

```bash
docker run -it --name accounting-app accounting-app:latest
```

### Using Docker Compose

```bash
cd deploy
docker-compose up -d
```

### Automated Deployment Script

```bash
cd deploy
chmod +x deploy.sh
./deploy.sh
```

The `deploy.sh` script handles:
1. Building the Docker image with version tags
2. Stopping any existing container
3. Starting a new container with restart policies
4. Running health checks
5. Reporting deployment status

---

## PM2 Deployment

PM2 provides process management, monitoring, and auto-restart capabilities.

### Setup

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
cd node-app
pm2 start ecosystem.config.js

# Save the process list for auto-restart on reboot
pm2 save
pm2 startup
```

### Management Commands

```bash
pm2 status          # View running processes
pm2 logs accounting # View application logs
pm2 restart accounting  # Restart the application
pm2 stop accounting     # Stop the application
pm2 delete accounting   # Remove from process list
```

---

## AWS Deployment

### Option 1: AWS ECS with Fargate

```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

docker tag accounting-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/accounting-app:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/accounting-app:latest
```

### Option 2: AWS EC2

```bash
# On the EC2 instance
git clone <repository-url>
cd modernize-legacy-cobol-app--V1/node-app
npm install --production
pm2 start ecosystem.config.js --env production
```

### Option 3: AWS Elastic Beanstalk

```bash
# Initialize EB
cd node-app
eb init accounting-app --platform node.js --region us-east-1

# Create environment and deploy
eb create production
eb deploy
```

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `development` | Environment mode |
| `INITIAL_BALANCE` | `1000.00` | Starting account balance |
| `LOG_LEVEL` | `info` | Logging verbosity |
| `PORT` | `3000` | (For future REST API) |

---

## Health Checks

The deployment script includes built-in health verification:

```bash
# Docker health check
docker inspect --format='{{.State.Health.Status}}' accounting-app

# Manual verification
docker exec accounting-app node -e "const DataStore = require('./src/data'); const d = new DataStore(); console.log('Health OK:', d.read() >= 0)"
```

---

## Rollback Procedures

### Docker Rollback

```bash
# List available image versions
docker images accounting-app

# Stop current container
docker stop accounting-app
docker rm accounting-app

# Start previous version
docker run -it --name accounting-app accounting-app:<previous-tag>
```

### PM2 Rollback

```bash
# If using versioned deployments
pm2 deploy production revert 1
```

### Manual Rollback

```bash
# Checkout previous version
git log --oneline -5
git checkout <previous-commit>
npm install
pm2 restart accounting
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: cd node-app && npm ci
      - run: cd node-app && npm test
      - run: cd deploy && docker build -t accounting-app .
      # Add deployment steps for your target platform
```

---

## Monitoring

### PM2 Monitoring

```bash
pm2 monit       # Real-time dashboard
pm2 plus        # Web-based monitoring (requires account)
```

### Docker Logs

```bash
docker logs -f accounting-app
```

### Application Metrics

For production use, consider adding:
- Winston/Pino for structured logging
- Prometheus metrics endpoint
- Datadog/New Relic APM integration
