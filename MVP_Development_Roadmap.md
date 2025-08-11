# Utah Government Contracting Hub - MVP Development Roadmap

## 🎯 **Next Steps to Begin Building**

### **Phase 1: Pre-Development Setup (Week 1-2)**

#### **1.1 Technical Foundation Setup**
```bash
# Project Structure Setup
mkdir utah-government-contracting-hub
cd utah-government-contracting-hub

# Frontend Setup (React + TypeScript)
npx create-react-app frontend --template typescript
cd frontend
npm install @mui/material @emotion/react @emotion/styled
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
npm install axios
npm install @tailwindcss/postcss

# Backend Setup (FastAPI + Python)
mkdir backend
cd backend
python -m venv venv
pip install fastapi uvicorn sqlalchemy psycopg2-binary
pip install marshmallow python-jose[cryptography] passlib[bcrypt]
pip install redis celery python-multipart
pip install alembic

# Database Setup
# Install PostgreSQL 15+
# Install Redis for caching
```

#### **1.2 Development Environment Configuration**
```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: utah_contracting_hub
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://admin:secure_password@postgres:5432/utah_contracting_hub
      REDIS_URL: redis://redis:6379

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### **Phase 2: Core MVP Features (Week 3-8)**

## 📋 **MVP Feature Outline**

### **MVP Core Features (Must Have)**

#### **2.1 User Authentication & Authorization**
- [ ] **2FA Implementation** (TOTP-based)
- [ ] **User Registration** with business profile creation
- [ ] **Role-Based Access Control** (Super Admin, Government Admin, Business Admin, User)
- [ ] **Organization Management** (Government vs Business organizations)
- [ ] **Session Management** with JWT tokens

#### **2.2 Business Profile Management**
- [ ] **Business Registration Portal** with multi-step wizard
- [ ] **CAGE Code Integration** and validation
- [ ] **NAICS Code Selection** (comprehensive list from documentation)
- [ ] **Certification Management** (8(a), WOSB, SDVOSB, etc.)
- [ ] **Document Upload System** (capability statements, certifications)
- [ ] **Profile Completeness Scoring**

#### **2.3 Opportunity Management**
- [ ] **Opportunity Database** with basic CRUD operations
- [ ] **Basic Matching Algorithm** (NAICS, keywords, location)
- [ ] **Opportunity Categories** (Hot Lead, Good Match, Potential, Low Priority)
- [ ] **Simple Filtering** (NAICS, value range, due date, location)
- [ ] **Opportunity Details View**

#### **2.4 Basic Search & Filtering**
- [ ] **Simple Search Interface** (title, description, keywords)
- [ ] **Basic Filters** (NAICS codes, opportunity types, agencies)
- [ ] **Sorting Options** (date, value, relevance)
- [ ] **Results Display** (list and card views)

#### **2.5 CSV Import System**
- [ ] **Basic CSV Upload** for opportunities
- [ ] **Data Validation** and error reporting
- [ ] **Template Downloads** for different data types
- [ ] **Import Status Tracking**

### **MVP Enhanced Features (Should Have)**

#### **2.6 Advanced Matching**
- [ ] **Comprehensive Matching Algorithm** (technical, financial, geographic)
- [ ] **Match Score Calculation** with component breakdown
- [ ] **Win Probability Prediction** (basic ML model)
- [ ] **Opportunity Recommendations**

#### **2.7 Advanced Filtering**
- [ ] **MyBidMatch-Style Interface** with multi-column sorting
- [ ] **Advanced Filters** (FSG codes, set-aside programs, certifications)
- [ ] **Saved Filters** and quick access
- [ ] **Bulk Operations** (select, exclude, export)

#### **2.8 Notification System**
- [ ] **Email Notifications** for new opportunities
- [ ] **In-App Notifications** for high-priority matches
- [ ] **Alert Preferences** management

### **Post-MVP Features (Nice to Have)**

#### **2.9 Advanced Analytics**
- [ ] **Performance Dashboards** for businesses
- [ ] **Market Intelligence** reports
- [ ] **Competition Analysis**
- [ ] **Win Rate Tracking**

#### **2.10 Integration Features**
- [ ] **SAM.gov Integration** for opportunity feeds
- [ ] **Government Data Sources** integration
- [ ] **API for Third-Party Integrations**

## 🗄️ **Updated ERD Requirements**

### **Missing Tables for Advanced Features**

#### **Technology Stack Management**
```sql
-- Add to existing ERD
CREATE TABLE technology_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id UUID REFERENCES technology_categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    category_id UUID REFERENCES technology_categories(id),
    version VARCHAR(50),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE business_technologies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    technology_id UUID REFERENCES technologies(id),
    expertise_level VARCHAR(50),
    years_experience INTEGER,
    project_count INTEGER,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Past Performance Tracking**
```sql
CREATE TABLE past_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    project_name VARCHAR(200) NOT NULL,
    client_name VARCHAR(200),
    project_type VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE,
    contract_value DECIMAL(15,2),
    naics_codes TEXT[],
    technologies_used TEXT[],
    team_size INTEGER,
    role_in_project VARCHAR(100),
    performance_rating DECIMAL(3,2),
    reference_contact_name VARCHAR(100),
    reference_contact_email VARCHAR(200),
    reference_contact_phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE performance_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_profile_id UUID REFERENCES business_profiles(id) ON DELETE CASCADE,
    rating_type VARCHAR(50),
    rating_period_start DATE,
    rating_period_end DATE,
    technical_rating DECIMAL(3,2),
    cost_rating DECIMAL(3,2),
    schedule_rating DECIMAL(3,2),
    management_rating DECIMAL(3,2),
    overall_rating DECIMAL(3,2),
    rating_agency VARCHAR(200),
    contract_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Advanced Opportunity Features**
```sql
-- Enhanced opportunities table
ALTER TABLE opportunities ADD COLUMN opportunity_type_id UUID REFERENCES opportunity_types(id);
ALTER TABLE opportunities ADD COLUMN fsg_code_id UUID REFERENCES fsg_codes(id);
ALTER TABLE opportunities ADD COLUMN keywords TEXT[];
ALTER TABLE opportunities ADD COLUMN source_system VARCHAR(100);
ALTER TABLE opportunities ADD COLUMN source_url TEXT;

CREATE TABLE opportunity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fsg_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opportunity_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    keyword VARCHAR(200) NOT NULL,
    weight DECIMAL(3,2) DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Two-Factor Authentication**
```sql
CREATE TABLE two_factor_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    method VARCHAR(20) NOT NULL,
    secret TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(200),
    is_enabled BOOLEAN DEFAULT FALSE,
    setup_completed_at TIMESTAMP,
    last_used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE backup_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    code_hash VARCHAR(255) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 **Updated Wireframe Requirements**

### **New Wireframe Components Needed**

#### **1. Advanced Filtering Dashboard**
```typescript
// New wireframe component
const AdvancedFilteringDashboard: React.FC = () => {
  return (
    <div className="filtering-dashboard">
      {/* MyBidMatch-style filter panel */}
      <FilterPanel />
      
      {/* Multi-view opportunity display */}
      <OpportunityDisplay />
      
      {/* Bulk actions toolbar */}
      <BulkActionsToolbar />
    </div>
  );
};
```

#### **2. Opportunity Board View**
```typescript
// Kanban-style board view
const OpportunityBoard: React.FC = () => {
  return (
    <div className="opportunity-board">
      <OpportunityColumn category="hot_lead" title="Hot Leads" />
      <OpportunityColumn category="good_match" title="Good Matches" />
      <OpportunityColumn category="potential" title="Potential" />
      <OpportunityColumn category="review_needed" title="Review Needed" />
      <OpportunityColumn category="low_priority" title="Low Priority" />
    </div>
  );
};
```

#### **3. Enhanced Business Profile**
```typescript
// Comprehensive business profile with all new features
const EnhancedBusinessProfile: React.FC = () => {
  return (
    <div className="business-profile">
      <ProfileHeader />
      <TechnologyStackSection />
      <PastPerformanceSection />
      <FinancialCapacitySection />
      <TeamCapabilitiesSection />
      <ComplianceSection />
    </div>
  );
};
```

## 🚀 **Development Phases**

### **Phase 1: Foundation (Weeks 1-2)**
- [ ] Project setup and environment configuration
- [ ] Database schema implementation
- [ ] Basic authentication system
- [ ] User management foundation

### **Phase 2: Core Features (Weeks 3-6)**
- [ ] Business profile management
- [ ] Basic opportunity management
- [ ] Simple matching algorithm
- [ ] Basic search and filtering

### **Phase 3: Advanced Features (Weeks 7-10)**
- [ ] Advanced matching algorithm
- [ ] MyBidMatch-style interface
- [ ] CSV import system
- [ ] Notification system

### **Phase 4: Polish & Testing (Weeks 11-12)**
- [ ] UI/UX refinement
- [ ] Performance optimization
- [ ] Security testing
- [ ] User acceptance testing

## 📊 **Success Metrics for MVP**

### **Technical Metrics**
- [ ] Page load times < 3 seconds
- [ ] 99.9% uptime
- [ ] Successful 2FA implementation
- [ ] Zero critical security vulnerabilities

### **User Experience Metrics**
- [ ] User registration completion rate > 80%
- [ ] Opportunity match accuracy > 85%
- [ ] User session duration > 10 minutes
- [ ] Feature adoption rate > 70%

### **Business Metrics**
- [ ] 100+ registered businesses in first month
- [ ] 500+ opportunities in database
- [ ] 50+ successful matches
- [ ] 90% user satisfaction score

## 🔧 **Development Tools & Resources**

### **Recommended Development Stack**
- **Frontend**: React 18 + TypeScript + Material-UI + Tailwind CSS
- **Backend**: FastAPI + Python 3.11+ + SQLAlchemy + PostgreSQL
- **Authentication**: JWT + TOTP (2FA)
- **Caching**: Redis
- **Background Tasks**: Celery
- **File Storage**: AWS S3 or MinIO
- **Monitoring**: Prometheus + Grafana

### **Development Resources**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Redis Documentation](https://redis.io/documentation)

This roadmap provides a clear path from concept to MVP, ensuring all the advanced features we've discussed are properly planned and can be implemented systematically. The phased approach allows for iterative development and testing while maintaining focus on core functionality. 