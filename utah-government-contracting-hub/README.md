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
