#!/bin/bash
#
# Deployment Script for Node.js Accounting System
# Supports: Docker local deployment, with optional push to registry
#
# Usage:
#   ./deploy.sh [OPTIONS]
#
# Options:
#   --build-only    Build the Docker image without running
#   --tag TAG       Custom image tag (default: latest + git SHA)
#   --registry URL  Push to a container registry
#   --rollback      Rollback to previous version
#   --help          Show this help message

set -euo pipefail

# Configuration
APP_NAME="accounting-app"
IMAGE_NAME="accounting-app"
CONTAINER_NAME="accounting-app"
DOCKERFILE_PATH="./Dockerfile"
BUILD_CONTEXT="../node-app"
GIT_SHA=$(cd .. && git rev-parse --short HEAD 2>/dev/null || echo "unknown")
VERSION_TAG="${GIT_SHA}"
REGISTRY=""
BUILD_ONLY=false
ROLLBACK=false

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

show_help() {
    head -17 "$0" | tail -14
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --build-only) BUILD_ONLY=true; shift ;;
        --tag) VERSION_TAG="$2"; shift 2 ;;
        --registry) REGISTRY="$2"; shift 2 ;;
        --rollback) ROLLBACK=true; shift ;;
        --help) show_help ;;
        *) log_error "Unknown option: $1"; show_help ;;
    esac
done

# Rollback procedure
if [ "$ROLLBACK" = true ]; then
    log_info "Rolling back to previous version..."
    PREVIOUS_IMAGE=$(docker ps -a --filter "name=${CONTAINER_NAME}-prev" --format "{{.Image}}" | head -1)
    if [ -z "$PREVIOUS_IMAGE" ]; then
        log_error "No previous version found for rollback"
        exit 1
    fi
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    docker rename "${CONTAINER_NAME}-prev" "$CONTAINER_NAME" 2>/dev/null || true
    docker start "$CONTAINER_NAME"
    log_success "Rolled back to: $PREVIOUS_IMAGE"
    exit 0
fi

# Step 1: Build Docker image
log_info "Building Docker image: ${IMAGE_NAME}:${VERSION_TAG}"
docker build \
    -t "${IMAGE_NAME}:${VERSION_TAG}" \
    -t "${IMAGE_NAME}:latest" \
    -f "$DOCKERFILE_PATH" \
    "$BUILD_CONTEXT"
log_success "Image built: ${IMAGE_NAME}:${VERSION_TAG}"

if [ "$BUILD_ONLY" = true ]; then
    log_info "Build-only mode. Skipping deployment."
    docker images "${IMAGE_NAME}" --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}"
    exit 0
fi

# Step 2: Push to registry (if specified)
if [ -n "$REGISTRY" ]; then
    log_info "Pushing to registry: ${REGISTRY}"
    docker tag "${IMAGE_NAME}:${VERSION_TAG}" "${REGISTRY}/${IMAGE_NAME}:${VERSION_TAG}"
    docker tag "${IMAGE_NAME}:latest" "${REGISTRY}/${IMAGE_NAME}:latest"
    docker push "${REGISTRY}/${IMAGE_NAME}:${VERSION_TAG}"
    docker push "${REGISTRY}/${IMAGE_NAME}:latest"
    log_success "Pushed to ${REGISTRY}"
fi

# Step 3: Stop existing container (preserve for rollback)
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    log_info "Stopping existing container..."
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rename "$CONTAINER_NAME" "${CONTAINER_NAME}-prev" 2>/dev/null || true
    log_info "Previous container preserved as ${CONTAINER_NAME}-prev"
fi

# Step 4: Start new container
log_info "Starting new container..."
docker run -d \
    --name "$CONTAINER_NAME" \
    --restart unless-stopped \
    -e NODE_ENV=production \
    -e INITIAL_BALANCE=1000.00 \
    -it \
    "${IMAGE_NAME}:${VERSION_TAG}"
log_success "Container started: ${CONTAINER_NAME}"

# Step 5: Health check
log_info "Running health check..."
RETRIES=5
DELAY=3
for i in $(seq 1 $RETRIES); do
    STATUS=$(docker inspect --format='{{.State.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "not found")
    if [ "$STATUS" = "running" ]; then
        log_success "Health check passed (attempt $i/$RETRIES)"
        break
    fi
    if [ "$i" -eq "$RETRIES" ]; then
        log_error "Health check failed after $RETRIES attempts"
        log_warn "Rolling back..."
        docker stop "$CONTAINER_NAME" 2>/dev/null || true
        docker rm "$CONTAINER_NAME" 2>/dev/null || true
        if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-prev$"; then
            docker rename "${CONTAINER_NAME}-prev" "$CONTAINER_NAME"
            docker start "$CONTAINER_NAME"
            log_warn "Rolled back to previous version"
        fi
        exit 1
    fi
    log_info "Waiting for container... (attempt $i/$RETRIES)"
    sleep $DELAY
done

# Step 6: Cleanup old backup
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}-prev$"; then
    log_info "Removing old backup container..."
    docker rm -f "${CONTAINER_NAME}-prev" 2>/dev/null || true
fi

# Summary
echo ""
log_success "═══════════════════════════════════════════"
log_success "  Deployment Complete!"
log_success "═══════════════════════════════════════════"
echo ""
log_info "  Image:     ${IMAGE_NAME}:${VERSION_TAG}"
log_info "  Container: ${CONTAINER_NAME}"
log_info "  Status:    $(docker inspect --format='{{.State.Status}}' "$CONTAINER_NAME")"
echo ""
log_info "Commands:"
log_info "  docker logs -f ${CONTAINER_NAME}    # View logs"
log_info "  docker exec -it ${CONTAINER_NAME} sh  # Shell access"
log_info "  ./deploy.sh --rollback              # Rollback"
echo ""
