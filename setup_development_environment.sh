#!/bin/bash

# Utah Government Contracting Hub - Development Environment Setup
# This script sets up all required tools and dependencies

echo "🚀 Setting up development environment for Utah Government Contracting Hub..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    print_error "Homebrew is not installed. Please install it first:"
    echo "  /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

print_success "Homebrew is installed"

# Update Homebrew
print_status "Updating Homebrew..."
brew update

# Install/Upgrade Python 3.11
print_status "Installing Python 3.11..."
brew install python@3.11

# Add Python 3.11 to PATH
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify Python installation
PYTHON_VERSION=$(python3.11 --version 2>&1)
print_success "Python installed: $PYTHON_VERSION"

# Install Docker Desktop
print_status "Installing Docker Desktop..."
brew install --cask docker

print_warning "Docker Desktop installed. Please start it manually:"
echo "  open /Applications/Docker.app"

# Install PostgreSQL 15
print_status "Installing PostgreSQL 15..."
brew install postgresql@15

# Start PostgreSQL service
print_status "Starting PostgreSQL service..."
brew services start postgresql@15

# Create PostgreSQL user
print_status "Setting up PostgreSQL user..."
createuser -s postgres 2>/dev/null || print_warning "PostgreSQL user 'postgres' may already exist"

# Install Redis
print_status "Installing Redis..."
brew install redis

# Start Redis service
print_status "Starting Redis service..."
brew services start redis

# Install additional development tools
print_status "Installing additional development tools..."

# Upgrade pip
python3.11 -m pip install --upgrade pip

# Install Python virtual environment tool
python3.11 -m pip install virtualenv

# Install Node.js development tools
npm install -g @types/node typescript ts-node nodemon

# Create project directory structure
print_status "Creating project directory structure..."
mkdir -p utah-government-contracting-hub/{frontend,backend,docs,scripts}
cd utah-government-contracting-hub

# Create backend requirements file
cat > backend/requirements.txt << 'EOF'
# FastAPI and ASGI
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6

# Database
sqlalchemy==2.0.23
alembic==1.12.1
psycopg2-binary==2.9.9
asyncpg==0.29.0

# Authentication and Security
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# Data Validation
marshmallow==3.20.1
pydantic==2.5.0

# Caching and Background Tasks
redis==5.0.1
celery==5.3.4

# File Storage
boto3==1.34.0
minio==7.2.0

# Monitoring and Logging
prometheus-client==0.19.0
structlog==23.2.0

# Development Tools
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
flake8==6.1.0
mypy==1.7.1

# Environment Management
python-dotenv==1.0.0
EOF

# Create frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "utah-government-contracting-hub-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.19",
    "@mui/material": "^5.14.20",
    "@reduxjs/toolkit": "^1.9.7",
    "@tailwindcss/postcss": "^3.3.0",
    "@types/node": "^20.10.4",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.48.2",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "recharts": "^2.8.0",
    "typescript": "^4.9.5",
    "web-vitals": "^3.5.0",
    "yup": "^1.3.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/jest": "^27.5.2",
    "tailwindcss": "^3.3.6"
  }
}
EOF

# Create Docker Compose file
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: utah_contracting_hub
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: development_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://postgres:development_password@postgres:5432/utah_contracting_hub
      REDIS_URL: redis://redis:6379
      SECRET_KEY: your-secret-key-here
      ENVIRONMENT: development
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm start

volumes:
  postgres_data:
  redis_data:
EOF

# Create backend Dockerfile
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# Create frontend Dockerfile
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
EOF

# Create .env file for backend
cat > backend/.env << 'EOF'
# Database Configuration
DATABASE_URL=postgresql://postgres:development_password@localhost:5432/utah_contracting_hub
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Environment
ENVIRONMENT=development
DEBUG=True

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-west-2
S3_BUCKET=utah-contracting-hub

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
.venv/
pip-log.txt
pip-delete-this-directory.txt

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Database
*.db
*.sqlite3

# Docker
.dockerignore

# Testing
coverage/
.coverage
.pytest_cache/
EOF

# Create README
cat > README.md << 'EOF'
# Utah Government Contracting Hub

A comprehensive digital platform designed to connect businesses with government contracting opportunities across Utah and the Mountain West region.

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker Desktop
- PostgreSQL 15
- Redis

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd utah-government-contracting-hub
   ```

2. **Start services with Docker**
   ```bash
   docker-compose up -d
   ```

3. **Set up backend**
   ```bash
   cd backend
   python3.11 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Set up frontend**
   ```bash
   cd frontend
   npm install
   ```

5. **Run the application**
   ```bash
   # Backend (from backend directory)
   uvicorn main:app --reload
   
   # Frontend (from frontend directory)
   npm start
   ```

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Project Structure
```
utah-government-contracting-hub/
├── frontend/          # React TypeScript application
├── backend/           # FastAPI Python application
├── docs/             # Project documentation
├── scripts/          # Utility scripts
└── docker-compose.yml # Development environment
```
EOF

print_success "Development environment setup complete!"
print_status "Next steps:"
echo "  1. Start Docker Desktop: open /Applications/Docker.app"
echo "  2. Navigate to project: cd utah-government-contracting-hub"
echo "  3. Start services: docker-compose up -d"
echo "  4. Set up backend: cd backend && python3.11 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
echo "  5. Set up frontend: cd frontend && npm install"
echo "  6. Start development: npm start (frontend) and uvicorn main:app --reload (backend)"

print_warning "Remember to:"
echo "  - Update .env files with your actual credentials"
echo "  - Install VS Code extensions for better development experience"
echo "  - Set up your Git repository and push the initial code" 