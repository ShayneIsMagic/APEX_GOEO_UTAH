# User Roles and CSV Import System

## User Role Hierarchy

### **Role Types and Permissions**

#### **1. Super Admin**
- **Description**: Platform-wide administrator with full system access
- **Permissions**:
  - Create and manage all organizations
  - Assign admin roles to users
  - Access all system data and analytics
  - Manage platform configuration
  - View and manage all CSV imports
  - System-wide user management
  - Access to all audit logs
  - Platform maintenance and updates

#### **2. Government Organization Admin**
- **Description**: Administrator for government agencies and entities
- **Permissions**:
  - Manage users within their organization
  - Create and manage opportunities for their organization
  - Upload and manage CSV data for their organization
  - View analytics for their organization's opportunities
  - Manage government contacts within their organization
  - Access to organization-specific audit logs
  - Approve/reject business applications for their opportunities

#### **3. Business Organization Admin**
- **Description**: Administrator for business entities
- **Permissions**:
  - Manage users within their business organization
  - Upload and manage CSV data for their business profiles
  - View analytics for their business performance
  - Manage business certifications and documents
  - Access to organization-specific audit logs
  - Manage business profile information

#### **4. Government User**
- **Description**: Standard user within government organizations
- **Permissions**:
  - View opportunities within their organization
  - Create and edit opportunities (if assigned)
  - Upload CSV data (if authorized)
  - View organization analytics
  - Manage assigned government contacts

#### **5. Business User**
- **Description**: Standard user within business organizations
- **Permissions**:
  - View and manage business profile
  - Search and apply for opportunities
  - Upload documents and certifications
  - View business analytics
  - Manage personal account settings

#### **6. Viewer**
- **Description**: Read-only access for external stakeholders
- **Permissions**:
  - View public business directory
  - View public opportunities
  - Access public resources
  - No data modification capabilities

## Organization Management

### **Government Organizations**
```python
class GovernmentOrganization(Base):
    __tablename__ = "government_organizations"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    organization_type = Column(String)  # Federal, State, Local, Military
    agency_code = Column(String, unique=True)  # Government agency identifier
    parent_organization_id = Column(PGUUID(as_uuid=True), ForeignKey("government_organizations.id"))
    contact_email = Column(String)
    contact_phone = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    parent_organization = relationship("GovernmentOrganization", remote_side=[id])
    child_organizations = relationship("GovernmentOrganization")
    users = relationship("UserOrganization", back_populates="organization")
    opportunities = relationship("Opportunity", back_populates="publishing_organization")
```

### **Business Organizations**
```python
class BusinessOrganization(Base):
    __tablename__ = "business_organizations"
    
    id = Column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)
    organization_type = Column(String)  # Corporation, LLC, Partnership, etc.
    cage_code = Column(String, unique=True, index=True)
    duns_number = Column(String, index=True)
    uei_number = Column(String, index=True)
    ein_number = Column(String)
    website_url = Column(String)
    contact_email = Column(String)
    contact_phone = Column(String)
    address = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    users = relationship("UserOrganization", back_populates="organization")
    business_profiles = relationship("BusinessProfile", back_populates="organization")
```

## CSV Import System

### **Supported Import Types**

#### **1. Business Profile Import**
- **Purpose**: Bulk import business profiles and information
- **Required Fields**:
  - Company Name
  - CAGE Code
  - DUNS Number
  - UEI Number
  - EIN Number
  - Contact Email
  - Contact Phone
  - Address
  - City
  - State
  - Zip Code
  - NAICS Codes (comma-separated)
  - Certifications (comma-separated)
  - Services (comma-separated)

#### **2. Opportunity Import**
- **Purpose**: Bulk import government contract opportunities
- **Required Fields**:
  - Opportunity Title
  - Description
  - Agency
  - Contracting Office
  - Opportunity Type
  - Set-Aside Type
  - Estimated Value
  - Posting Date
  - Response Deadline
  - Solicitation Number
  - NAICS Code
  - Place of Performance
  - Requirements (JSON format)

#### **3. Government Contact Import**
- **Purpose**: Bulk import government official contacts
- **Required Fields**:
  - Name
  - Title
  - Agency
  - Department
  - Email
  - Phone
  - Address
  - City
  - State
  - Zip Code
  - Contact Type

#### **4. NAICS Code Import**
- **Purpose**: Import or update NAICS code classifications
- **Required Fields**:
  - NAICS Code
  - Title
  - Description
  - Sector
  - Subsector
  - Industry Group
  - Industry
  - National Industry

### **CSV Import Process**

#### **1. File Upload and Validation**
```python
class CSVImportService:
    async def upload_csv(self, file: UploadFile, import_type: str, organization_id: UUID, user_id: UUID):
        """Upload and validate CSV file"""
        
        # Validate file type
        if not file.filename.endswith('.csv'):
            raise ValueError("File must be a CSV")
        
        # Create import record
        import_record = CSVImport(
            uploaded_by=user_id,
            organization_id=organization_id,
            import_type=import_type,
            filename=f"{uuid.uuid4()}.csv",
            original_filename=file.filename,
            status="uploaded"
        )
        
        # Save file
        file_path = f"uploads/csv/{import_record.filename}"
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        import_record.file_path = file_path
        await self.save_import_record(import_record)
        
        # Start validation process
        await self.validate_csv(import_record.id)
        
        return import_record
```

#### **2. Data Validation**
```python
    async def validate_csv(self, import_id: UUID):
        """Validate CSV data and check for errors"""
        
        import_record = await self.get_import_record(import_id)
        
        # Read CSV file
        df = pd.read_csv(import_record.file_path)
        total_rows = len(df)
        
        validation_errors = []
        
        # Validate based on import type
        if import_record.import_type == "business_profile":
            validation_errors = await self.validate_business_profile_csv(df)
        elif import_record.import_type == "opportunity":
            validation_errors = await self.validate_opportunity_csv(df)
        elif import_record.import_type == "government_contact":
            validation_errors = await self.validate_government_contact_csv(df)
        
        # Update import record
        import_record.total_rows = total_rows
        import_record.error_count = len(validation_errors)
        import_record.validation_errors = validation_errors
        import_record.status = "validated" if not validation_errors else "validation_failed"
        
        await self.update_import_record(import_record)
        
        # Store validation errors
        for error in validation_errors:
            await self.save_import_error(import_id, error)
```

#### **3. Data Processing**
```python
    async def process_csv(self, import_id: UUID):
        """Process validated CSV data"""
        
        import_record = await self.get_import_record(import_id)
        
        if import_record.status != "validated":
            raise ValueError("CSV must be validated before processing")
        
        # Read CSV file
        df = pd.read_csv(import_record.file_path)
        
        success_count = 0
        processing_log = []
        
        # Process based on import type
        if import_record.import_type == "business_profile":
            success_count, processing_log = await self.process_business_profile_csv(df, import_record.organization_id)
        elif import_record.import_type == "opportunity":
            success_count, processing_log = await self.process_opportunity_csv(df, import_record.organization_id)
        elif import_record.import_type == "government_contact":
            success_count, processing_log = await self.process_government_contact_csv(df, import_record.organization_id)
        
        # Update import record
        import_record.processed_rows = len(df)
        import_record.success_count = success_count
        import_record.processing_log = processing_log
        import_record.status = "completed"
        import_record.completed_at = datetime.utcnow()
        
        await self.update_import_record(import_record)
```

### **CSV Template System**

#### **Template Download**
```python
@router.get("/templates/{import_type}")
async def download_csv_template(import_type: str):
    """Download CSV template for specific import type"""
    
    templates = {
        "business_profile": {
            "filename": "business_profile_template.csv",
            "headers": [
                "Company Name", "CAGE Code", "DUNS Number", "UEI Number", "EIN Number",
                "Contact Email", "Contact Phone", "Address", "City", "State", "Zip Code",
                "NAICS Codes", "Certifications", "Services", "Employee Count", "Annual Revenue"
            ],
            "sample_data": [
                "Tech Solutions Inc.", "1A2B3", "123456789", "ABC123DEF456", "12-3456789",
                "contact@techsolutions.com", "(801) 555-0123", "123 Main St", "Salt Lake City", "UT", "84101",
                "541511,541512", "8(a),WOSB", "Custom Software,IT Consulting", "25-50", "5000000-10000000"
            ]
        },
        "opportunity": {
            "filename": "opportunity_template.csv",
            "headers": [
                "Opportunity Title", "Description", "Agency", "Contracting Office",
                "Opportunity Type", "Set-Aside Type", "Estimated Value", "Posting Date",
                "Response Deadline", "Solicitation Number", "NAICS Code", "Place of Performance"
            ],
            "sample_data": [
                "IT Support Services", "Provide IT support for Hill AFB", "Department of Defense", "Hill AFB",
                "Services", "Small Business", "500000-1000000", "2024-01-15", "2024-02-15",
                "FA8217-24-R-0001", "541511", "Hill AFB, UT"
            ]
        }
    }
    
    if import_type not in templates:
        raise HTTPException(status_code=404, detail="Template not found")
    
    template = templates[import_type]
    
    # Create CSV content
    csv_content = io.StringIO()
    writer = csv.writer(csv_content)
    writer.writerow(template["headers"])
    writer.writerow(template["sample_data"])
    
    return StreamingResponse(
        io.BytesIO(csv_content.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={template['filename']}"}
    )
```

### **Error Handling and Reporting**

#### **Validation Error Types**
```python
class ValidationError:
    def __init__(self, row_number: int, field_name: str, error_message: str, raw_data: str):
        self.row_number = row_number
        self.field_name = field_name
        self.error_message = error_message
        self.raw_data = raw_data

class CSVValidationService:
    async def validate_business_profile_csv(self, df: pd.DataFrame) -> List[ValidationError]:
        """Validate business profile CSV data"""
        errors = []
        
        for index, row in df.iterrows():
            row_number = index + 2  # Account for header row
            
            # Validate required fields
            if pd.isna(row['Company Name']):
                errors.append(ValidationError(
                    row_number, "Company Name", "Company name is required", str(row['Company Name'])
                ))
            
            # Validate CAGE code format
            if not pd.isna(row['CAGE Code']):
                if not re.match(r'^[A-Z0-9]{5}$', str(row['CAGE Code'])):
                    errors.append(ValidationError(
                        row_number, "CAGE Code", "CAGE code must be 5 alphanumeric characters", str(row['CAGE Code'])
                    ))
            
            # Validate email format
            if not pd.isna(row['Contact Email']):
                if not re.match(r'^[^@]+@[^@]+\.[^@]+$', str(row['Contact Email'])):
                    errors.append(ValidationError(
                        row_number, "Contact Email", "Invalid email format", str(row['Contact Email'])
                    ))
            
            # Validate NAICS codes
            if not pd.isna(row['NAICS Codes']):
                naics_codes = str(row['NAICS Codes']).split(',')
                for code in naics_codes:
                    if not re.match(r'^\d{6}$', code.strip()):
                        errors.append(ValidationError(
                            row_number, "NAICS Codes", f"Invalid NAICS code format: {code}", str(row['NAICS Codes'])
                        ))
        
        return errors
```

### **Import Dashboard**

#### **Import Management Interface**
```python
@router.get("/imports")
async def get_imports(
    organization_id: UUID,
    status: Optional[str] = None,
    import_type: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
    current_user = Depends(get_current_user)
):
    """Get CSV imports for organization"""
    
    # Check permissions
    if not await has_organization_access(current_user.id, organization_id):
        raise HTTPException(status_code=403, detail="Access denied")
    
    filters = {"organization_id": organization_id}
    if status:
        filters["status"] = status
    if import_type:
        filters["import_type"] = import_type
    
    imports = await csv_import_service.get_imports(filters, page, limit)
    total = await csv_import_service.get_imports_count(filters)
    
    return {
        "imports": imports,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }
```

### **Real-time Import Status**

#### **WebSocket Updates**
```python
@router.websocket("/imports/{import_id}/status")
async def import_status_websocket(
    websocket: WebSocket,
    import_id: UUID,
    current_user = Depends(get_current_user_ws)
):
    """WebSocket for real-time import status updates"""
    
    await websocket.accept()
    
    try:
        while True:
            # Get current import status
            import_record = await csv_import_service.get_import_record(import_id)
            
            if not import_record:
                await websocket.send_text(json.dumps({"error": "Import not found"}))
                break
            
            # Send status update
            status_update = {
                "import_id": str(import_record.id),
                "status": import_record.status,
                "total_rows": import_record.total_rows,
                "processed_rows": import_record.processed_rows,
                "success_count": import_record.success_count,
                "error_count": import_record.error_count,
                "progress": (import_record.processed_rows / import_record.total_rows * 100) if import_record.total_rows > 0 else 0
            }
            
            await websocket.send_text(json.dumps(status_update))
            
            # Check if import is complete
            if import_record.status in ["completed", "failed"]:
                break
            
            # Wait before next update
            await asyncio.sleep(2)
    
    except WebSocketDisconnect:
        pass
```

## User Management Interface

### **Organization User Management**
```python
@router.get("/organizations/{organization_id}/users")
async def get_organization_users(
    organization_id: UUID,
    role: Optional[str] = None,
    page: int = 1,
    limit: int = 20,
    current_user = Depends(get_current_user)
):
    """Get users for organization"""
    
    # Check admin permissions
    if not await is_organization_admin(current_user.id, organization_id):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    filters = {"organization_id": organization_id}
    if role:
        filters["role"] = role
    
    users = await user_service.get_organization_users(filters, page, limit)
    total = await user_service.get_organization_users_count(filters)
    
    return {
        "users": users,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit
    }
```

### **Bulk User Import**
```python
@router.post("/organizations/{organization_id}/users/bulk")
async def bulk_import_users(
    organization_id: UUID,
    file: UploadFile,
    current_user = Depends(get_current_user)
):
    """Bulk import users for organization"""
    
    # Check admin permissions
    if not await is_organization_admin(current_user.id, organization_id):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    # Process user import
    import_record = await csv_import_service.upload_csv(
        file, "user_import", organization_id, current_user.id
    )
    
    return {"import_id": str(import_record.id), "status": "uploaded"}
```

This comprehensive system provides:

1. **Clear role hierarchy** with specific permissions for each user type
2. **Organization-based access control** for government and business entities
3. **Comprehensive CSV import system** with validation and error handling
4. **Template system** to reduce human error in data entry
5. **Real-time import status tracking** for better user experience
6. **Bulk user management** for efficient organization administration

The system ensures data integrity while providing efficient bulk data management capabilities for both government and business organizations. 