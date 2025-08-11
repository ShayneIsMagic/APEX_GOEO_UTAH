# Utah Government Contracting Hub - Frontend Wireframes

## Wireframe Overview

### Technology Stack Recommendation
- **Frontend Framework**: React.js with TypeScript
- **UI Library**: Material-UI (MUI) or Ant Design
- **State Management**: Redux Toolkit or Zustand
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom Utah theme
- **Charts**: Chart.js or Recharts
- **Forms**: React Hook Form with Yup validation

## Key Page Wireframes

### 🏠 **1. Home Page Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [Login] [Register]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎯 Connect Utah Businesses with Government Opportunities       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ [Search Icon] Search businesses, opportunities, or NAICS... │ │
│  │ [Search Button]                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ 1,250+      │ │ $2.5B+      │ │ 95%         │ │ 24/7        │ │
│  │ Businesses  │ │ Contracts   │ │ Success     │ │ Support     │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│  Recent Opportunities                                           │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ IT Services     │ │ Construction     │ │ Engineering     │   │
│  │ Hill AFB        │ │ State Building   │ │ Federal Project │   │
│  │ $500K - $1M     │ │ $2M - $5M       │ │ $1M - $2M       │   │
│  │ [View Details]  │ │ [View Details]  │ │ [View Details]  │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│  Government Officials                                           │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ Jessie Lobato   │ │ Chuck Spence    │ │ Jefferson Moss  │   │
│  │ GOEO Apex Dir   │ │ APEX Director   │ │ GOEO Exec Dir   │   │
│  │ [Contact]       │ │ [Contact]       │ │ [Contact]       │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│  [Get Started Today] [Learn More]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🔍 **2. Business Directory Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ Business Directory                                              │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Search Icon] Search companies...                           │ │
│ │ [Advanced Filters ▼]                                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Filters:                                                        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ NAICS Code  │ │ Location    │ │ Certifications│ Company Size│ │
│ │ [Select ▼]  │ │ [Select ▼]  │ │ [Select ▼]  │ │ [Select ▼]  │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ Results: 1,247 businesses found                                │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Company Logo] Tech Solutions Inc.                          │ │
│ │ ⭐⭐⭐⭐⭐ (4.8) | CAGE: 1A2B3 | Small Business              │ │
│ │ NAICS: 541511, 541512 | Location: Salt Lake City, UT        │ │
│ │ Services: Custom Software, IT Consulting, Cybersecurity     │ │
│ │ [View Profile] [Contact] [Save]                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Company Logo] Mountain Construction Co.                    │ │
│ │ ⭐⭐⭐⭐ (4.2) | CAGE: 4C5D6 | HUBZone Certified             │ │
│ │ NAICS: 236220, 237310 | Location: Ogden, UT                 │ │
│ │ Services: Federal Construction, Infrastructure Development  │ │
│ │ [View Profile] [Contact] [Save]                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Previous] 1 2 3 4 5 ... [Next]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 📊 **3. Dashboard Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ Dashboard                                                       │
│                                                                 │
│ Welcome back, John!                                             │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ Profile Score   │ │ Recent Matches  │ │ Documents Due   │   │
│ │ 85% Complete    │ │ 12 New Matches  │ │ 3 Expiring Soon │   │
│ │ [Complete Now]  │ │ [View All]      │ │ [Review]        │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ Quick Actions                                                    │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ [Icon]      │ │ [Icon]      │ │ [Icon]      │ │ [Icon]      │ │
│ │ Update      │ │ Upload      │ │ Search      │ │ Contact     │ │
│ │ Profile     │ │ Documents   │ │ Opportunities│ │ Officials   │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ Recent Opportunities                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ IT Support Services - Hill AFB                              │ │
│ │ Match Score: 92% | Deadline: Dec 15, 2024                   │ │
│ │ [View Details] [Apply Now] [Save]                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Construction Project - State Building                       │ │
│ │ Match Score: 78% | Deadline: Dec 20, 2024                   │ │
│ │ [View Details] [Apply Now] [Save]                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Performance Analytics                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Chart: Match Success Rate Over Time]                       │ │
│ │ Success Rate: 85% | Applications: 24 | Wins: 8              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🎯 **4. Opportunity Matching Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ Opportunity Matching                                            │
│                                                                 │
│ Match Criteria                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ NAICS Codes: [541511, 541512] [Edit]                        │ │
│ │ Location: Utah [Edit]                                        │ │
│ │ Contract Value: $100K - $5M [Edit]                          │ │
│ │ Set-Aside: Small Business [Edit]                             │ │
│ │ [Save Criteria] [Reset]                                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Matches Found: 47 opportunities                                │
│                                                                 │
│ Sort by: [Relevance ▼] [Deadline] [Value] [Match Score]        │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Perfect Match (95%)                                          │ │
│ │ Software Development Services - Department of Defense        │ │
│ │ Hill Air Force Base, UT | $750K - $1.2M                     │ │
│ │ NAICS: 541511 | Deadline: Dec 10, 2024                      │ │
│ │ Requirements: Custom Software, Security Clearance            │ │
│ │ [View Details] [Apply Now] [Save] [Share]                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Strong Match (87%)                                           │ │
│ │ IT Consulting Services - State of Utah                       │ │
│ │ Salt Lake City, UT | $500K - $800K                          │ │
│ │ NAICS: 541512 | Deadline: Dec 15, 2024                      │ │
│ │ Requirements: System Design, Project Management              │ │
│ │ [View Details] [Apply Now] [Save] [Share]                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Good Match (72%)                                             │ │
│ │ Cybersecurity Services - Federal Agency                      │ │
│ │ Remote/Utah | $300K - $600K                                  │ │
│ │ NAICS: 541519 | Deadline: Dec 20, 2024                      │ │
│ │ Requirements: Security Assessment, Compliance                │ │
│ │ [View Details] [Apply Now] [Save] [Share]                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Previous] 1 2 3 4 5 ... [Next]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 👤 **5. Business Profile Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ Business Profile                                                │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Company Logo] Tech Solutions Inc.                          │ │
│ │ ⭐⭐⭐⭐⭐ (4.8) | CAGE: 1A2B3 | Small Business              │ │
│ │ [Edit Profile] [Upload Logo]                                │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Profile Completeness: 85% [Complete Profile]                   │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ Basic Info      │ │ NAICS Codes     │ │ Certifications  │   │
│ │ [Edit]          │ │ [Edit]          │ │ [Edit]          │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ Services        │ │ Documents       │ │ Addresses       │   │
│ │ [Edit]          │ │ [Edit]          │ │ [Edit]          │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ Company Information                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Company Name: Tech Solutions Inc.                           │ │
│ │ DBA: TSI                                                     │ │
│ │ Website: www.techsolutions.com                              │ │
│ │ Description: Leading provider of custom software solutions  │ │
│ │ Employee Count: 25-50                                        │ │
│ │ Annual Revenue: $5M - $10M                                   │ │
│ │ Business Type: Corporation                                   │ │
│ │ [Edit]                                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Government Identifiers                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ CAGE Code: 1A2B3 [Verified ✓]                               │ │
│ │ DUNS Number: 123456789 [Verified ✓]                         │ │
│ │ UEI: ABC123DEF456 [Verified ✓]                              │ │
│ │ EIN: 12-3456789 [Verified ✓]                                │ │
│ │ State License: 987654321 [Verified ✓]                       │ │
│ │ [Edit]                                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ NAICS Codes                                                     │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Primary: 541511 - Custom Computer Programming Services      │ │
│ │ Secondary: 541512 - Computer Systems Design Services        │ │
│ │ Secondary: 541519 - Other Computer Related Services         │ │
│ │ [Add NAICS Code] [Edit]                                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 📄 **6. Document Management Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ Document Management                                             │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Upload Icon] Drag files here or [Browse Files]             │ │
│ │ Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Document Categories                                              │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ All (15)    │ │ Capability  │ │ Certifications│ Past Perf  │ │
│ │             │ │ (5)         │ │ (3)         │ │ (2)         │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Financial   │ │ Legal       │ │ Marketing   │ │ Other       │ │
│ │ (2)         │ │ (2)         │ │ (1)         │ │ (0)         │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ Documents                                                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [PDF Icon] Capability Statement 2024                        │ │
│ │ Category: Capability | Size: 2.3 MB | Uploaded: Nov 15      │ │
│ │ Status: Approved ✓ | [View] [Download] [Share] [Delete]     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [PDF Icon] 8(a) Certification                               │ │
│ │ Category: Certifications | Size: 1.8 MB | Uploaded: Nov 10  │ │
│ │ Status: Pending Review ⏳ | [View] [Download] [Share] [Delete]│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [DOC Icon] Past Performance Summary                         │ │
│ │ Category: Past Performance | Size: 3.1 MB | Uploaded: Nov 8 │ │
│ │ Status: Approved ✓ | [View] [Download] [Share] [Delete]     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [PDF Icon] Financial Statements 2023                        │ │
│ │ Category: Financial | Size: 4.2 MB | Uploaded: Nov 5        │ │
│ │ Status: Expiring Soon ⚠️ | [View] [Download] [Share] [Delete]│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Storage: 11.4 MB used of 100 MB (11%)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 📊 **7. Analytics Wireframe**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┘
│ Analytics                                                       │
│                                                                 │
│ Date Range: [Last 30 Days ▼] [Export Report]                   │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ Total Matches   │ │ Applications    │ │ Success Rate     │ │
│ │ 47              │ │ 12              │ │ 85%              │ │
│ │ +12% vs last    │ │ +3 vs last      │ │ +5% vs last      │ │
│ │ month           │ │ month           │ │ month            │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ Contract Value  │ │ Response Time   │ │ Profile Views    │ │
│ │ $2.4M           │ │ 2.3 days        │ │ 156              │ │
│ │ +18% vs last    │ │ -0.5 vs last    │ │ +23 vs last      │ │
│ │ month           │ │ month           │ │ month            │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ Performance Trends                                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Line Chart: Match Success Rate Over Time]                  │ │
│ │ Success Rate Trend (Last 6 Months)                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Opportunity Analysis                                             │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Bar Chart: Opportunities by NAICS Code]                    │ │
│ │ Top NAICS Codes for Matches                                  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Geographic Distribution                                          │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Map: Utah with opportunity density]                        │ │
│ │ Opportunity Distribution by Location                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Recent Activity                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Nov 15: Applied to IT Support Contract (Hill AFB)           │ │
│ │ Nov 14: Profile viewed by 3 government officials            │ │
│ │ Nov 13: New match: Construction Project (State Building)    │ │
│ │ Nov 12: Document approved: Capability Statement             │ │
│ │ Nov 11: Updated NAICS codes in profile                      │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Mobile Wireframes

### 📱 **Mobile Home Page**

```
┌─────────────────────────────────────┐
│ [Logo] Utah Gov Contracting Hub     │
│                                     │
│ 🎯 Connect Utah Businesses with     │
│ Government Opportunities            │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Search businesses...         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ │1,250│ │$2.5B│ │95%  │ │24/7 │     │
│ │Biz  │ │Cont │ │Succ │ │Supp │     │
│ └─────┘ └─────┘ └─────┘ └─────┘     │
│                                     │
│ Recent Opportunities                │
│ ┌─────────────────────────────────┐ │
│ │ IT Services - Hill AFB          │ │
│ │ $500K - $1M                     │ │
│ │ [View]                          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Construction - State Building   │ │
│ │ $2M - $5M                       │ │
│ │ [View]                          │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Get Started] [Learn More]          │
│                                     │
│ ☰ [Search] [Directory] [Opportunities] │
└─────────────────────────────────────┘
```

### 📱 **Mobile Dashboard**

```
┌─────────────────────────────────────┐
│ [Logo] Utah Gov Contracting Hub     │
│                                     │
│ Welcome back, John!                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Profile Score: 85% Complete     │ │
│ │ [Complete Now]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Recent Matches: 12 New          │ │
│ │ [View All]                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Quick Actions                       │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ │📝   │ │📄   │ │🔍   │ │📞   │     │
│ │Update│ │Upload│ │Search│ │Contact│     │
│ │Profile│ │Docs │ │Opps │ │Officials│     │
│ └─────┘ └─────┘ └─────┘ └─────┘     │
│                                     │
│ Recent Opportunities                │
│ ┌─────────────────────────────────┐ │
│ │ IT Support - Hill AFB           │ │
│ │ Match: 92% | Dec 15             │ │
│ │ [View] [Apply]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Construction - State Building   │ │
│ │ Match: 78% | Dec 20             │ │
│ │ [View] [Apply]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📊 [Dashboard] [Profile] [Matching] [Docs] │
└─────────────────────────────────────┘
```

## Component Library

### **Common Components**

#### **Navigation Components**
- Header with logo and user menu
- Sidebar navigation for authenticated users
- Bottom navigation for mobile
- Breadcrumb navigation
- Pagination controls

#### **Form Components**
- Search input with autocomplete
- Multi-step form wizard
- File upload with drag-and-drop
- Filter panels with checkboxes/radio buttons
- Date range picker

#### **Data Display Components**
- Business cards with company information
- Opportunity cards with match scores
- Document cards with status indicators
- Notification cards with actions
- Progress bars and completion indicators

#### **Interactive Components**
- Match score indicators with color coding
- Status badges (Approved, Pending, Expired)
- Action buttons with icons
- Modal dialogs for detailed views
- Tooltips for additional information

### **Responsive Design Patterns**

#### **Desktop (≥1024px)**
- Multi-column layouts
- Sidebar navigation
- Hover interactions
- Detailed information display

#### **Tablet (768px - 1023px)**
- Two-column layouts
- Touch-optimized interactions
- Collapsible sections
- Adaptive content organization

#### **Mobile (≤767px)**
- Single-column layouts
- Bottom navigation
- Swipe gestures
- Full-screen modals
- Large touch targets

## Accessibility Features

### **Visual Design**
- High contrast color scheme
- Clear typography hierarchy
- Consistent spacing and alignment
- Focus indicators for keyboard navigation

### **Interactive Elements**
- Minimum 44px touch targets
- Clear button and link states
- Descriptive alt text for images
- ARIA labels for screen readers

### **Content Structure**
- Semantic HTML elements
- Proper heading hierarchy
- Logical tab order
- Skip navigation links 