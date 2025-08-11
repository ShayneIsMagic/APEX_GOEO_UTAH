# CSV Import System Wireframes

## CSV Import Dashboard Wireframes

### 🏛️ **Government Admin CSV Import Dashboard**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ CSV Import Center - Government Organization                    │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Import Statistics                                           │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │ │
│ │ │ Total       │ │ Success     │ │ Failed      │ │ Pending │ │ │
│ │ │ Imports     │ │ Rate        │ │ Imports     │ │ Imports │ │ │
│ │ │ 156         │ │ 94.2%       │ │ 9           │ │ 2       │ │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Quick Import Actions                                            │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ [Upload Icon]   │ │ [Upload Icon]   │ │ [Upload Icon]   │   │
│ │ Import          │ │ Import          │ │ Import          │   │
│ │ Opportunities   │ │ Government      │ │ NAICS Codes     │   │
│ │ [Upload CSV]    │ │ Contacts        │ │ [Upload CSV]    │   │
│ └─────────────────┘ │ [Upload CSV]    │ └─────────────────┘   │
│                     └─────────────────┘                       │
│                                                                 │
│ Recent Imports                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Opportunity Import - Nov 15, 2024               │ │
│ │ Status: Completed ✓ | Rows: 45 | Success: 43 | Errors: 2   │ │
│ │ [View Details] [Download Report] [View Errors]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Contact Import - Nov 12, 2024                   │ │
│ │ Status: Completed ✓ | Rows: 23 | Success: 23 | Errors: 0   │ │
│ │ [View Details] [Download Report] [View Errors]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Opportunity Import - Nov 10, 2024               │ │
│ │ Status: Failed ❌ | Rows: 67 | Success: 0 | Errors: 67     │ │
│ │ [View Details] [Download Report] [View Errors] [Retry]     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [View All Imports] [Download Templates] [Import History]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 🏢 **Business Admin CSV Import Dashboard**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Utah Government Contracting Hub    [User] [Notifications]│
├─────────────────────────────────────────────────────────────────┤
│ CSV Import Center - Business Organization                      │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Import Statistics                                           │ │
│ │ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │ │
│ │ │ Total       │ │ Success     │ │ Failed      │ │ Pending │ │ │
│ │ │ Imports     │ │ Rate        │ │ Imports     │ │ Imports │ │ │
│ │ │ 89          │ │ 97.8%       │ │ 2           │ │ 0       │ │ │
│ │ └─────────────┘ └─────────────┘ └─────────────┘ └─────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Quick Import Actions                                            │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│ │ [Upload Icon]   │ │ [Upload Icon]   │ │ [Upload Icon]   │   │
│ │ Import          │ │ Import          │ │ Import          │   │
│ │ Business        │ │ Business        │ │ Business        │   │
│ │ Profiles        │ │ Certifications  │ │ Documents       │   │
│ │ [Upload CSV]    │ │ [Upload CSV]    │ │ [Upload CSV]    │   │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
│ Recent Imports                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Business Profile Import - Nov 15, 2024          │ │
│ │ Status: Completed ✓ | Rows: 12 | Success: 12 | Errors: 0   │ │
│ │ [View Details] [Download Report] [View Errors]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Certification Import - Nov 14, 2024             │ │
│ │ Status: Completed ✓ | Rows: 8 | Success: 7 | Errors: 1     │ │
│ │ [View Details] [Download Report] [View Errors]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [CSV Icon] Document Import - Nov 13, 2024                  │ │
│ │ Status: Processing ⏳ | Rows: 15 | Success: 0 | Errors: 0   │ │
│ │ [View Details] [Download Report] [View Errors]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [View All Imports] [Download Templates] [Import History]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## CSV Upload Interface Wireframes

### **CSV Upload Modal**

```
┌─────────────────────────────────────────────────────────────────┐
│ CSV Import - Opportunities                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Import Type: [Opportunities ▼]                                 │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ [Upload Icon] Drag and drop CSV file here                   │ │
│ │ or [Browse Files] to select                                 │ │
│ │                                                             │ │
│ │ Supported formats: CSV (Max 10MB)                          │ │
│ │                                                             │ │
│ │ [Download Template] [View Sample Data]                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Import Options                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ☑️ Update existing records (if CAGE code matches)          │ │
│ │ ☑️ Skip duplicate records                                   │ │
│ │ ☑️ Send email notification when complete                   │ │
│ │ ☑️ Validate data before import                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Cancel] [Upload and Validate]                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **CSV Validation Results**

```
┌─────────────────────────────────────────────────────────────────┐
│ CSV Validation Results                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ File: opportunities_import.csv                                 │
│ Total Rows: 45                                                 │
│ Valid Rows: 43                                                 │
│ Errors: 2                                                      │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Validation Summary                                           │ │
│ │ ✅ Required fields present: 45/45                           │ │
│ │ ✅ CAGE code format valid: 43/45                           │ │
│ │ ✅ Email format valid: 45/45                               │ │
│ │ ✅ NAICS code format valid: 43/45                          │ │
│ │ ⚠️ Duplicate records found: 2                              │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Errors Found                                                    │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Row 12: CAGE Code "ABC12" - Invalid format (must be 5 chars)│ │
│ │ Row 23: NAICS Code "12345" - Invalid format (must be 6 chars)│ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Download Error Report] [Edit and Re-upload] [Proceed with Import] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Real-time Import Progress Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ Import Progress - Business Profiles                            │
├─────────────────────────────────────────────────────────────────┘
│                                                                 │
│ File: business_profiles_import.csv                             │
│ Status: Processing ⏳                                           │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Progress Bar: ████████████████████░░░░ 80%                 │ │
│ │                                                             │ │
│ │ Processed: 36 of 45 rows                                    │ │
│ │ Success: 34 records                                         │ │
│ │ Errors: 2 records                                           │ │
│ │ Remaining: 9 rows                                           │ │
│ │ Estimated time: 2 minutes                                   │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Recent Processing Activity                                      │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ✅ Row 36: Tech Solutions Inc. - Imported successfully      │ │
│ │ ❌ Row 37: Mountain Construction - CAGE code validation failed │
│ │ ✅ Row 38: Valley Engineering - Imported successfully       │ │
│ │ ✅ Row 39: Desert Logistics - Imported successfully         │ │
│ │ ⏳ Row 40: Processing...                                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Cancel Import] [View Live Log]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Import History and Reports Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ Import History                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Filters: [All Types ▼] [All Status ▼] [Date Range ▼] [Search] │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Import History                                              │ │
│ │                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Nov 15, 2024 - Opportunity Import                       │ │
│ │ │ Status: Completed ✓ | Rows: 45 | Success: 43 | Errors: 2│ │
│ │ │ [View Details] [Download Report] [View Errors]         │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Nov 12, 2024 - Contact Import                           │ │
│ │ │ Status: Completed ✓ | Rows: 23 | Success: 23 | Errors: 0│ │
│ │ │ [View Details] [Download Report] [View Errors]         │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Nov 10, 2024 - Business Profile Import                 │ │
│ │ │ Status: Failed ❌ | Rows: 67 | Success: 0 | Errors: 67  │ │
│ │ │ [View Details] [Download Report] [View Errors] [Retry] │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Nov 8, 2024 - NAICS Code Import                        │ │
│ │ │ Status: Completed ✓ | Rows: 156 | Success: 156 | Errors: 0│ │
│ │ │ [View Details] [Download Report] [View Errors]         │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Previous] 1 2 3 4 5 ... [Next]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Template Download Center Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ CSV Templates                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Download templates to ensure proper CSV formatting             │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Business Profile Template                                   │ │
│ │                                                             │ │
│ │ [Download Icon] business_profile_template.csv              │ │
│ │                                                             │ │
│ │ Fields: Company Name, CAGE Code, DUNS Number, UEI Number,  │ │
│ │ EIN Number, Contact Email, Phone, Address, City, State,    │ │
│ │ Zip Code, NAICS Codes, Certifications, Services            │ │
│ │                                                             │ │
│ │ [Download] [View Sample] [Instructions]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Opportunity Template                                        │ │
│ │                                                             │ │
│ │ [Download Icon] opportunity_template.csv                    │ │
│ │                                                             │ │
│ │ Fields: Title, Description, Agency, Contracting Office,    │ │
│ │ Opportunity Type, Set-Aside Type, Estimated Value,         │ │
│ │ Posting Date, Response Deadline, Solicitation Number,      │ │
│ │ NAICS Code, Place of Performance                           │ │
│ │                                                             │ │
│ │ [Download] [View Sample] [Instructions]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Government Contact Template                                 │ │
│ │                                                             │ │
│ │ [Download Icon] government_contact_template.csv            │ │
│ │                                                             │ │
│ │ Fields: Name, Title, Agency, Department, Email, Phone,     │ │
│ │ Address, City, State, Zip Code, Contact Type               │ │
│ │                                                             │ │
│ │ [Download] [View Sample] [Instructions]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ NAICS Code Template                                         │ │
│ │                                                             │ │
│ │ [Download Icon] naics_code_template.csv                    │ │
│ │                                                             │ │
│ │ Fields: NAICS Code, Title, Description, Sector, Subsector, │ │
│ │ Industry Group, Industry, National Industry                │ │
│ │                                                             │ │
│ │ [Download] [View Sample] [Instructions]                    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Download All Templates] [View Import Guidelines]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Error Report Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ Import Error Report - business_profiles_import.csv            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Import Date: Nov 15, 2024                                      │
│ Total Rows: 45                                                 │
│ Successful: 43                                                 │
│ Errors: 2                                                      │
│                                                                 │
│ Error Details                                                   │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Row 12                                                       │ │
│ │ Field: CAGE Code                                             │ │
│ │ Value: "ABC12"                                               │ │
│ │ Error: Invalid format - must be exactly 5 alphanumeric      │ │
│ │ characters                                                   │ │
│ │                                                             │ │
│ │ Raw Data: "Tech Solutions Inc.","ABC12","123456789",...     │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Row 23                                                       │ │
│ │ Field: NAICS Code                                            │ │
│ │ Value: "12345"                                               │ │
│ │ Error: Invalid format - must be exactly 6 digits            │ │
│ │                                                             │ │
│ │ Raw Data: "Mountain Construction","4C5D6","987654321",...  │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Download Full Report] [Export Errors to CSV] [Fix and Re-import] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Mobile CSV Import Wireframes

### **Mobile Upload Interface**

```
┌─────────────────────────────────────┐
│ CSV Import                          │
│                                     │
│ Import Type: [Opportunities ▼]      │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [Upload Icon]                   │ │
│ │ Tap to select CSV file          │ │
│ │                                 │ │
│ │ or drag and drop here           │ │
│ │                                 │ │
│ │ [Browse Files]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Import Options                      │
│ ☑️ Update existing records         │
│ ☑️ Skip duplicates                 │
│ ☑️ Email notification              │
│ ☑️ Validate data                   │
│                                     │
│ [Download Template] [View Sample]   │
│                                     │
│ [Cancel] [Upload]                   │
│                                     │
│ 📊 [Dashboard] [Imports] [History] │
└─────────────────────────────────────┘
```

### **Mobile Progress View**

```
┌─────────────────────────────────────┐
│ Import Progress                     │
│                                     │
│ File: opportunities.csv             │
│ Status: Processing ⏳                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ████████████████░░░░ 80%       │ │
│ │                                 │ │
│ │ 36 of 45 rows processed         │ │
│ │ 34 successful, 2 errors         │ │
│ │ ~2 minutes remaining            │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Recent Activity                     │
│ ✅ Row 36: Tech Solutions Inc.      │
│ ❌ Row 37: CAGE code error          │
│ ✅ Row 38: Valley Engineering       │
│ ⏳ Row 39: Processing...            │
│                                     │
│ [Cancel] [View Log]                 │
│                                     │
│ 📊 [Dashboard] [Imports] [History] │
└─────────────────────────────────────┘
```

## Key Features of CSV Import System

### **Error Prevention Features**
1. **Template Downloads**: Pre-formatted CSV templates with correct headers
2. **Real-time Validation**: Immediate feedback on data format issues
3. **Sample Data**: Example rows showing proper data format
4. **Field Validation**: Automatic checking of required fields and formats
5. **Duplicate Detection**: Identification of existing records before import

### **User Experience Features**
1. **Drag-and-Drop Upload**: Easy file selection interface
2. **Progress Tracking**: Real-time import progress with estimated completion time
3. **Error Reporting**: Detailed error messages with row and field information
4. **Import History**: Complete record of all import operations
5. **Retry Functionality**: Ability to fix errors and re-import

### **Data Integrity Features**
1. **Pre-import Validation**: Comprehensive data checking before processing
2. **Transaction Safety**: Rollback capability if import fails
3. **Audit Trail**: Complete logging of all import operations
4. **Data Mapping**: Flexible field mapping for different CSV formats
5. **Batch Processing**: Efficient handling of large datasets

This comprehensive CSV import system provides an efficient, error-resistant way for both government and business organizations to manage bulk data operations while maintaining data integrity and providing excellent user experience. 