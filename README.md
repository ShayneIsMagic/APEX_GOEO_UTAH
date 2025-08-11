# Utah Government Contracting Hub - APEX GOEO Project

## 🎯 **Project Overview**

The Utah Government Contracting Hub is a comprehensive platform designed to connect Utah businesses with government contracting opportunities. Built as part of the APEX GOEO initiative, this platform provides advanced opportunity filtering, business networking, and government contact management.

## 🚀 **Current Status**

### **✅ Completed Features**

#### **1. B2B Networking Hub (HTML Application)**
- **Location**: `b2b_networking_hub.html`
- **Features**:
  - Government contacts database (State, Federal, Military)
  - Business contractor network with 10+ verified companies
  - Advanced search and filtering by NAICS codes, certifications, services
  - Resource library (SAM.gov, PTAC, SCORE, SBIR/STTR)
  - Mobile-responsive design with Utah branding
  - Interactive company profiles and contact management

#### **2. Advanced Opportunity Filtering System (React)**
- **Location**: `frontend/src/components/`
- **Features**:
  - Real-time filtering with comprehensive criteria
  - Smart opportunity categorization (Hot Lead, Good Match, Potential, etc.)
  - Kanban-style board view with drag-and-drop capabilities
  - Multiple view modes (Board, List, Table)
  - Advanced filters: NAICS codes, set-aside programs, contract vehicles
  - Bulk operations and opportunity management
  - Saved filters and quick access presets

#### **3. Core Components Built**
- `OpportunityFilterPanel.tsx` - Advanced filtering interface
- `OpportunityBoard.tsx` - Multi-view opportunity display
- `OpportunitiesPage.tsx` - Main opportunities page with sample data
- `App.tsx` - Application entry point with Utah-themed Material-UI

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** with TypeScript
- **Material-UI (MUI)** for component library
- **Custom Utah-themed design system**
- **Responsive design** for all devices

### **Backend (Planned)**
- **FastAPI** with Python
- **PostgreSQL** for data storage
- **Redis** for caching
- **Comprehensive API** for opportunity management

### **Data & Integration**
- **NAICS code system** for industry classification
- **Government certification programs** (8(a), WOSB, VOSB, etc.)
- **Contract vehicle integration** (GSA Schedules, OASIS, SEWP)
- **Set-aside program support** for small business preferences

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 16+ and npm
- Python 3.8+ (for backend)
- PostgreSQL 15+ (for backend)
- Redis (for backend)

### **Frontend Development**

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open application**:
   - Frontend: http://localhost:3000
   - B2B Hub: http://localhost:3000/b2b_networking_hub.html

### **Backend Development (Coming Soon)**

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start backend server**:
   ```bash
   uvicorn main:app --reload
   ```

## 📋 **MVP Development Roadmap**

### **Phase 1: Core Foundation ✅**
- [x] Project structure setup
- [x] Frontend React application
- [x] B2B networking hub
- [x] Opportunity filtering system

### **Phase 2: Core MVP Features (In Progress)**
- [ ] User authentication & authorization
- [ ] Business profile management
- [ ] Opportunity database integration
- [ ] Basic matching algorithm
- [ ] CSV import system

### **Phase 3: Advanced Features (Planned)**
- [ ] Comprehensive matching engine
- [ ] Win probability prediction
- [ ] Market intelligence integration
- [ ] Notification system
- [ ] Analytics dashboard

### **Phase 4: Integration & Deployment**
- [ ] SAM.gov integration
- [ ] Government data sources
- [ ] Production deployment
- [ ] Performance optimization

## 🎨 **Design System**

### **Utah Branding**
- **Primary Blue**: #071D49 (Utah Blue)
- **Secondary Red**: #AA0200 (Utah Red)
- **Accent Gold**: #FFB81D (Utah Gold)
- **Typography**: Segoe UI family
- **Design Philosophy**: Professional, accessible, government-focused

### **Component Library**
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Non-caps, medium weight, rounded
- **Chips**: Rounded, color-coded for categories
- **Layout**: Grid-based, responsive, mobile-first

## 🔍 **Key Features**

### **Smart Opportunity Filtering**
- **Real-time filtering** as you adjust criteria
- **Multi-criteria matching** (NAICS, location, value, certifications)
- **Quick filter presets** (Hot Leads, Small Business, High Value)
- **Saved filter combinations** for repeated use

### **Opportunity Management**
- **Automatic categorization** based on match score and win probability
- **Multiple view modes** (Kanban board, list, table)
- **Bulk operations** (select, exclude, export, share)
- **Detailed opportunity profiles** with match breakdown

### **Business Network**
- **Verified contractor profiles** with comprehensive data
- **Advanced search** by industry, location, certifications
- **Contact management** with government officials
- **Resource library** for government contracting

## 📊 **Sample Data**

The application includes sample opportunities across various categories:
- **IT Services**: Software development, cybersecurity, IT support
- **Construction**: Military base construction, facilities maintenance
- **Healthcare**: VA system development, medical consulting
- **Professional Services**: Engineering, environmental consulting, training

## 🤝 **Contributing**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Material-UI components consistently
- Maintain Utah branding and design system
- Write comprehensive component documentation
- Test on multiple devices and screen sizes

### **Code Structure**
- **Components**: Reusable UI components in `src/components/`
- **Types**: TypeScript interfaces and enums
- **Services**: Business logic and API calls
- **Utils**: Helper functions and constants

## 📚 **Documentation**

### **Technical Documentation**
- `MVP_Development_Roadmap.md` - Development phases and milestones
- `Opportunity_Filtering_System.md` - Detailed system design
- `Capability_Matching_System.md` - Matching algorithm specifications
- `Backend_Architecture.md` - Backend system design
- `Frontend_Wireframes.md` - UI/UX design specifications

### **Business Documentation**
- `UTAH_GOVERNMENT_CONTRACTING_HUB.md` - Business requirements
- `ERD_Database_Design.md` - Database schema design
- `User_Roles_and_CSV_Import.md` - User management specifications

## 🚀 **Next Steps**

1. **Complete backend API development**
2. **Integrate real opportunity data sources**
3. **Implement user authentication system**
4. **Add business profile management**
5. **Deploy to staging environment**
6. **User testing and feedback collection**

## 📞 **Contact & Support**

- **Project Lead**: APEX GOEO Team
- **Technical Questions**: Development Team
- **Business Requirements**: Utah GOEO Office

## 📄 **License**

This project is developed for the Utah Governor's Office of Economic Opportunity (GOEO) as part of the APEX initiative.

---

**Last Updated**: January 2025  
**Version**: MVP v0.1.0  
**Status**: Active Development 