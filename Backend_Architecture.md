# Utah Government Contracting Hub - Backend Architecture

## Technology Stack Overview

### **Core Backend Technologies**
- **Framework**: FastAPI (Python 3.11+)
- **Database ORM**: SQLAlchemy 2.0 with async support
- **Data Validation**: Marshmallow (Pydantic for FastAPI)
- **Database**: PostgreSQL 15+ with async driver
- **Authentication**: JWT with refresh tokens
- **Password Hashing**: bcrypt with salt rounds

### **Additional Technologies**
- **Caching**: Redis for session management and caching
- **Message Queue**: Celery with Redis/RabbitMQ
- **File Storage**: AWS S3 or MinIO
- **Search**: Elasticsearch or PostgreSQL full-text search
- **Monitoring**: Prometheus + Grafana
- **Logging**: Structured logging with JSON format

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py               # Configuration management
│   ├── database.py             # Database connection and session
│   ├── dependencies.py         # Dependency injection
│   ├── security.py             # Authentication and authorization
│   ├── api/
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py         # Authentication endpoints
│   │   │   ├── users.py        # User management
│   │   │   ├── businesses.py   # Business profile management
│   │   │   ├── opportunities.py # Opportunity management
│   │   │   ├── matching.py     # Opportunity matching
│   │   │   ├── documents.py    # Document management
│   │   │   ├── analytics.py    # Analytics and reporting
│   │   │   └── admin.py        # Admin endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User model
│   │   ├── business.py         # Business profile model
│   │   ├── opportunity.py      # Opportunity model
│   │   ├── naics.py            # NAICS code model
│   │   ├── certification.py    # Certification model
│   │   └── document.py         # Document model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py             # User schemas
│   │   ├── business.py         # Business schemas
│   │   ├── opportunity.py      # Opportunity schemas
│   │   └── common.py           # Common schemas
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py     # Authentication logic
│   │   ├── business_service.py # Business profile logic
│   │   ├── matching_service.py # Opportunity matching logic
│   │   ├── document_service.py # Document management
│   │   └── notification_service.py # Notification logic
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── security.py         # Security utilities
│   │   ├── validation.py       # Custom validation
│   │   └── helpers.py          # Helper functions
│   └── core/
│       ├── __init__.py
│       ├── config.py           # Core configuration
│       ├── security.py         # Core security
│       └── database.py         # Core database
├── alembic/                    # Database migrations
├── tests/                      # Test suite
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Container configuration
└── docker-compose.yml          # Development environment
```

## Database Design Implementation

### **SQLAlchemy Models**

#### **User Model**
```python
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, UUID
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from datetime import datetime
import uuid

class User(Base):
    __tablename__ = "users"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String)
    company_name = Column(String)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)
    role_id = Column(PGUUID(as_uuid=True), ForeignKey("roles.id"))
    
    # Relationships
    role = relationship("Role", back_populates="users")
    business_profile = relationship("BusinessProfile", back_populates="user", uselist=False)
    notifications = relationship("Notification", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
```

#### **Business Profile Model**
```python
class BusinessProfile(Base):
    __tablename__ = "business_profiles"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(PGUUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    company_name = Column(String, unique=True, nullable=False)
    dba_name = Column(String)
    cage_code = Column(String, unique=True, index=True)
    duns_number = Column(String, index=True)
    uei_number = Column(String, index=True)
    ein_number = Column(String)
    state_license_number = Column(String)
    website_url = Column(String)
    description = Column(Text)
    employee_count = Column(Integer)
    annual_revenue = Column(Numeric(15, 2))
    business_type = Column(String)
    is_small_business = Column(Boolean, default=True)
    profile_completeness_score = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    verified_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="business_profile")
    addresses = relationship("BusinessAddress", back_populates="business_profile")
    naics_codes = relationship("BusinessNAICSCode", back_populates="business_profile")
    certifications = relationship("BusinessCertification", back_populates="business_profile")
    services = relationship("BusinessService", back_populates="business_profile")
    documents = relationship("Document", back_populates="business_profile")
```

## API Design

### **RESTful API Structure**

#### **Authentication Endpoints**
```python
# POST /api/v1/auth/register
# POST /api/v1/auth/login
# POST /api/v1/auth/refresh
# POST /api/v1/auth/logout
# POST /api/v1/auth/forgot-password
# POST /api/v1/auth/reset-password
# POST /api/v1/auth/verify-email
```

#### **User Management Endpoints**
```python
# GET /api/v1/users/me
# PUT /api/v1/users/me
# DELETE /api/v1/users/me
# GET /api/v1/users/{user_id} (admin only)
# PUT /api/v1/users/{user_id} (admin only)
# DELETE /api/v1/users/{user_id} (admin only)
```

#### **Business Profile Endpoints**
```python
# GET /api/v1/businesses
# POST /api/v1/businesses
# GET /api/v1/businesses/{business_id}
# PUT /api/v1/businesses/{business_id}
# DELETE /api/v1/businesses/{business_id}
# GET /api/v1/businesses/{business_id}/naics-codes
# POST /api/v1/businesses/{business_id}/naics-codes
# GET /api/v1/businesses/{business_id}/certifications
# POST /api/v1/businesses/{business_id}/certifications
```

#### **Opportunity Endpoints**
```python
# GET /api/v1/opportunities
# GET /api/v1/opportunities/{opportunity_id}
# POST /api/v1/opportunities (admin only)
# PUT /api/v1/opportunities/{opportunity_id} (admin only)
# DELETE /api/v1/opportunities/{opportunity_id} (admin only)
# GET /api/v1/opportunities/{opportunity_id}/matches
```

#### **Matching Endpoints**
```python
# GET /api/v1/matching/criteria
# PUT /api/v1/matching/criteria
# GET /api/v1/matching/opportunities
# POST /api/v1/matching/opportunities/{opportunity_id}/apply
# GET /api/v1/matching/applications
```

### **FastAPI Implementation Example**

#### **Main Application**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.api.v1 import auth, users, businesses, opportunities, matching
from app.core.config import settings

app = FastAPI(
    title="Utah Government Contracting Hub API",
    description="API for connecting Utah businesses with government opportunities",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
app.include_router(businesses.router, prefix="/api/v1/businesses", tags=["Businesses"])
app.include_router(opportunities.router, prefix="/api/v1/opportunities", tags=["Opportunities"])
app.include_router(matching.router, prefix="/api/v1/matching", tags=["Matching"])
```

#### **Authentication Router**
```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.schemas.user import UserCreate, UserLogin, UserResponse
from app.services.auth_service import AuthService
from app.dependencies import get_current_user

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate):
    """Register a new user"""
    auth_service = AuthService()
    return await auth_service.register_user(user_data)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login user and return access token"""
    auth_service = AuthService()
    return await auth_service.authenticate_user(form_data.username, form_data.password)

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user = Depends(get_current_user)):
    """Get current user information"""
    return current_user
```

## Security Implementation

### **Authentication & Authorization**

#### **JWT Token Management**
```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class SecurityService:
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    def create_refresh_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(days=7)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.REFRESH_SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)
```

#### **Role-Based Access Control**
```python
from enum import Enum
from fastapi import HTTPException, status

class UserRole(str, Enum):
    ADMIN = "admin"
    BUSINESS_OWNER = "business_owner"
    GOVERNMENT_OFFICIAL = "government_official"
    VIEWER = "viewer"

def require_role(required_role: UserRole):
    def role_checker(current_user = Depends(get_current_user)):
        if current_user.role.name != required_role and current_user.role.name != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Insufficient permissions"
            )
        return current_user
    return role_checker
```

### **Data Validation with Marshmallow**

#### **User Schema**
```python
from marshmallow import Schema, fields, validate, validates, ValidationError
from app.models.user import User

class UserCreateSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
    first_name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    last_name = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    phone = fields.Str(validate=validate.Length(max=20))
    company_name = fields.Str(validate=validate.Length(max=100))
    
    @validates('email')
    def validate_email(self, value):
        # Check if email already exists
        if User.query.filter_by(email=value).first():
            raise ValidationError('Email already registered')
        return value

class UserResponseSchema(Schema):
    id = fields.UUID(dump_only=True)
    email = fields.Email()
    first_name = fields.Str()
    last_name = fields.Str()
    phone = fields.Str()
    company_name = fields.Str()
    is_active = fields.Bool()
    is_verified = fields.Bool()
    created_at = fields.DateTime()
    role = fields.Nested('RoleSchema')
```

## Performance Optimization

### **Database Optimization**

#### **Connection Pooling**
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.pool import QueuePool

engine = create_async_engine(
    settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=20,
    max_overflow=30,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=settings.DEBUG
)
```

#### **Query Optimization**
```python
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy import and_, or_

class BusinessService:
    async def get_business_with_details(self, business_id: UUID):
        """Optimized query with eager loading"""
        async with self.db_session() as session:
            result = await session.execute(
                select(BusinessProfile)
                .options(
                    selectinload(BusinessProfile.addresses),
                    selectinload(BusinessProfile.naics_codes),
                    selectinload(BusinessProfile.certifications),
                    selectinload(BusinessProfile.services)
                )
                .where(BusinessProfile.id == business_id)
            )
            return result.scalar_one_or_none()
    
    async def search_businesses(self, filters: dict):
        """Optimized search with proper indexing"""
        query = select(BusinessProfile)
        
        if filters.get('naics_codes'):
            query = query.join(BusinessNAICSCode).where(
                BusinessNAICSCode.naics_code_id.in_(filters['naics_codes'])
            )
        
        if filters.get('location'):
            query = query.join(BusinessAddress).where(
                BusinessAddress.state == filters['location']
            )
        
        # Add pagination
        query = query.offset(filters.get('offset', 0)).limit(filters.get('limit', 20))
        
        async with self.db_session() as session:
            result = await session.execute(query)
            return result.scalars().all()
```

### **Caching Strategy**

#### **Redis Caching**
```python
import redis.asyncio as redis
from app.core.config import settings

class CacheService:
    def __init__(self):
        self.redis = redis.from_url(settings.REDIS_URL)
    
    async def get(self, key: str):
        """Get value from cache"""
        return await self.redis.get(key)
    
    async def set(self, key: str, value: str, expire: int = 3600):
        """Set value in cache with expiration"""
        await self.redis.set(key, value, ex=expire)
    
    async def delete(self, key: str):
        """Delete value from cache"""
        await self.redis.delete(key)
    
    async def get_business_profile(self, business_id: str):
        """Get business profile from cache or database"""
        cache_key = f"business_profile:{business_id}"
        cached_data = await self.get(cache_key)
        
        if cached_data:
            return json.loads(cached_data)
        
        # Get from database
        business = await self.business_service.get_business(business_id)
        if business:
            await self.set(cache_key, json.dumps(business.dict()), 1800)  # 30 minutes
        return business
```

## Background Tasks

### **Celery Task Queue**

#### **Task Configuration**
```python
from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "utah_contracting_hub",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=['app.tasks.matching', 'app.tasks.notifications', 'app.tasks.documents']
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
)
```

#### **Opportunity Matching Task**
```python
from celery import shared_task
from app.services.matching_service import MatchingService

@shared_task
def match_opportunities_for_business(business_id: str):
    """Background task to match opportunities for a business"""
    matching_service = MatchingService()
    return matching_service.match_opportunities_for_business(business_id)

@shared_task
def update_all_matches():
    """Background task to update all opportunity matches"""
    matching_service = MatchingService()
    return matching_service.update_all_matches()
```

## Monitoring and Logging

### **Structured Logging**
```python
import logging
import json
from datetime import datetime
from app.core.config import settings

class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno
        }
        
        if hasattr(record, 'user_id'):
            log_entry['user_id'] = record.user_id
        
        if hasattr(record, 'business_id'):
            log_entry['business_id'] = record.business_id
        
        return json.dumps(log_entry)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log')
    ]
)

logger = logging.getLogger(__name__)
logger.handlers[0].setFormatter(JSONFormatter())
```

### **Health Checks**
```python
from fastapi import APIRouter
from app.database import get_db
from app.cache import get_cache

router = APIRouter()

@router.get("/health")
async def health_check():
    """Basic health check"""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

@router.get("/health/detailed")
async def detailed_health_check():
    """Detailed health check with database and cache"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "services": {}
    }
    
    # Check database
    try:
        db = get_db()
        await db.execute("SELECT 1")
        health_status["services"]["database"] = "healthy"
    except Exception as e:
        health_status["services"]["database"] = f"unhealthy: {str(e)}"
        health_status["status"] = "unhealthy"
    
    # Check cache
    try:
        cache = get_cache()
        await cache.ping()
        health_status["services"]["cache"] = "healthy"
    except Exception as e:
        health_status["services"]["cache"] = f"unhealthy: {str(e)}"
        health_status["status"] = "unhealthy"
    
    return health_status
```

## Deployment Configuration

### **Docker Configuration**
```dockerfile
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

# Create non-root user
RUN useradd --create-home --shell /bin/bash app
RUN chown -R app:app /app
USER app

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Docker Compose**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:password@db:5432/utah_contracting
      - REDIS_URL=redis://redis:6379
      - SECRET_KEY=${SECRET_KEY}
    depends_on:
      - db
      - redis
    volumes:
      - ./logs:/app/logs

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=utah_contracting
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  celery:
    build: .
    command: celery -A app.celery_app worker --loglevel=info
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:password@db:5432/utah_contracting
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
  redis_data:
```

This backend architecture provides a robust, scalable, and secure foundation for the Utah Government Contracting Hub, with comprehensive security measures, performance optimizations, and monitoring capabilities. 