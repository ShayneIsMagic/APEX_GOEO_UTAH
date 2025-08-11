# Enhanced Opportunity Matching System - MyBidMatch Integration

## MyBidMatch-Inspired Features

### **Opportunity Classification System**

#### **Opportunity Types (Based on MyBidMatch)**
```python
class OpportunityType(str, Enum):
    PROCURE = "procure"          # Standard procurement opportunities
    AWARDS = "awards"            # Contract awards and results
    SPECIAL = "special"          # Special notices and announcements
    BT = "bt"                    # Bid tabulations
    BID = "bid"                  # Bid opportunities
    SMALL = "small"              # Small business opportunities
    GRANT = "grant"              # Grant opportunities
    RFI = "rfi"                  # Request for Information
    RFP = "rfp"                  # Request for Proposal
    RFQ = "rfq"                  # Request for Quote
    SOLE_SOURCE = "sole_source"  # Sole source opportunities
    SET_ASIDE = "set_aside"      # Set-aside opportunities
```

#### **Federal Supply Group (FSG) Codes**
```python
class FSGCode(str, Enum):
    # Major FSG Categories
    D = "D"      # Information Technology
    R = "R"      # Professional Services
    A = "A"      # Research & Development
    B = "B"      # Special Studies & Analysis
    C = "C"      # Architect & Engineering
    E = "E"      # Purchase of Structures & Facilities
    F = "F"      # Natural Resources & Conservation
    G = "G"      # Social Services
    H = "H"      # Quality Control, Testing & Inspection
    J = "J"      # Maintenance, Repair & Rebuilding
    K = "K"      # Modification of Equipment
    L = "L"      # Technical Representative Services
    M = "M"      # Operation of Government-Owned Facilities
    N = "N"      # Installation of Equipment
    P = "P"      # Salvage Services
    Q = "Q"      # Medical Services
    S = "S"      # Utilities & Housekeeping Services
    T = "T"      # Photographic, Mapping, Printing & Publication
    U = "U"      # Education & Training Services
    V = "V"      # Transportation, Travel & Relocation
    W = "W"      # Lease or Rental of Equipment
    X = "X"      # Lease or Rental of Facilities
    Y = "Y"      # Construction of Structures & Facilities
    Z = "Z"      # Maintenance, Repair or Alteration of Real Property
    
    # Special Categories
    SEVEN_A = "7A"   # 8(a) Program
    SEVEN_B = "7B"   # HUBZone Program
    SEVEN_E = "7E"   # Service-Disabled Veteran-Owned
    SEVEN_G = "7G"   # Women-Owned Small Business
    NINETY_NINE = "99"  # Miscellaneous
```

### **Enhanced Database Schema**

#### **Opportunity Classification Tables**
```sql
-- Opportunity Types
CREATE TABLE opportunity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Federal Supply Group Codes
CREATE TABLE fsg_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enhanced Opportunities Table
CREATE TABLE opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    opportunity_type_id UUID REFERENCES opportunity_types(id),
    fsg_code_id UUID REFERENCES fsg_codes(id),
    agency VARCHAR(200) NOT NULL,
    contracting_office VARCHAR(200),
    solicitation_number VARCHAR(100),
    set_aside_type VARCHAR(50),
    estimated_value_min DECIMAL(15,2),
    estimated_value_max DECIMAL(15,2),
    posting_date DATE,
    response_deadline DATE,
    award_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    place_of_performance VARCHAR(200),
    keywords TEXT[],
    requirements JSONB,
    source_system VARCHAR(50), -- 'sam.gov', 'mybidmatch', 'state', etc.
    source_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Opportunity Keywords for Advanced Search
CREATE TABLE opportunity_keywords (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    keyword VARCHAR(200) NOT NULL,
    keyword_type VARCHAR(50), -- 'primary', 'secondary', 'excluded'
    weight DECIMAL(3,2) DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Advanced Matching Algorithm**

#### **MyBidMatch-Style Matching Engine**
```python
class EnhancedMatchingService:
    def __init__(self):
        self.naics_service = NAICSService()
        self.keyword_service = KeywordService()
        self.fsg_service = FSGService()
    
    async def match_opportunities_for_business(self, business_id: UUID, filters: dict = None) -> List[OpportunityMatch]:
        """Enhanced opportunity matching with MyBidMatch-style algorithms"""
        
        business = await self.get_business_profile(business_id)
        opportunities = await self.get_active_opportunities(filters)
        matches = []
        
        for opportunity in opportunities:
            match_score = await self.calculate_match_score(business, opportunity)
            
            if match_score >= 50:  # Minimum match threshold
                match = OpportunityMatch(
                    opportunity_id=opportunity.id,
                    business_id=business_id,
                    match_score=match_score,
                    match_criteria=await self.get_match_criteria(business, opportunity),
                    match_status="matched"
                )
                matches.append(match)
        
        # Sort by match score (highest first)
        matches.sort(key=lambda x: x.match_score, reverse=True)
        return matches
    
    async def calculate_match_score(self, business: BusinessProfile, opportunity: Opportunity) -> float:
        """Calculate comprehensive match score using multiple criteria"""
        
        score = 0.0
        max_score = 100.0
        
        # 1. NAICS Code Matching (30 points)
        naics_score = await self.calculate_naics_match(business, opportunity)
        score += naics_score * 0.30
        
        # 2. FSG Code Matching (15 points)
        fsg_score = await self.calculate_fsg_match(business, opportunity)
        score += fsg_score * 0.15
        
        # 3. Keyword Matching (20 points)
        keyword_score = await self.calculate_keyword_match(business, opportunity)
        score += keyword_score * 0.20
        
        # 4. Geographic Matching (15 points)
        geo_score = await self.calculate_geographic_match(business, opportunity)
        score += geo_score * 0.15
        
        # 5. Certification Matching (10 points)
        cert_score = await self.calculate_certification_match(business, opportunity)
        score += cert_score * 0.10
        
        # 6. Company Size Matching (10 points)
        size_score = await self.calculate_size_match(business, opportunity)
        score += size_score * 0.10
        
        return min(score, max_score)
    
    async def calculate_naics_match(self, business: BusinessProfile, opportunity: Opportunity) -> float:
        """Calculate NAICS code matching score"""
        
        business_naics = {code.code for code in business.naics_codes}
        opportunity_naics = {code.code for code in opportunity.naics_codes}
        
        if not business_naics or not opportunity_naics:
            return 0.0
        
        # Exact match
        if business_naics.intersection(opportunity_naics):
            return 100.0
        
        # Partial match (same sector)
        business_sectors = {code[:2] for code in business_naics}
        opportunity_sectors = {code[:2] for code in opportunity_naics}
        
        if business_sectors.intersection(opportunity_sectors):
            return 75.0
        
        # Related sectors
        related_sectors = self.get_related_naics_sectors(business_sectors)
        if opportunity_sectors.intersection(related_sectors):
            return 50.0
        
        return 0.0
    
    async def calculate_keyword_match(self, business: BusinessProfile, opportunity: Opportunity) -> float:
        """Calculate keyword matching score using MyBidMatch-style algorithms"""
        
        business_keywords = set()
        
        # Extract keywords from business profile
        business_keywords.update(business.company_name.lower().split())
        business_keywords.update(business.description.lower().split())
        
        for service in business.services:
            business_keywords.update(service.description.lower().split())
        
        # Clean and normalize keywords
        business_keywords = self.normalize_keywords(business_keywords)
        
        # Get opportunity keywords
        opportunity_keywords = set()
        opportunity_keywords.update(opportunity.title.lower().split())
        opportunity_keywords.update(opportunity.description.lower().split())
        opportunity_keywords.update(opportunity.keywords or [])
        
        opportunity_keywords = self.normalize_keywords(opportunity_keywords)
        
        if not business_keywords or not opportunity_keywords:
            return 0.0
        
        # Calculate keyword overlap
        intersection = business_keywords.intersection(opportunity_keywords)
        union = business_keywords.union(opportunity_keywords)
        
        if not union:
            return 0.0
        
        # Jaccard similarity
        jaccard_similarity = len(intersection) / len(union)
        
        # Weight by keyword importance
        weighted_score = 0.0
        for keyword in intersection:
            weight = self.get_keyword_weight(keyword)
            weighted_score += weight
        
        return min(weighted_score * 100, 100.0)
    
    def normalize_keywords(self, keywords: Set[str]) -> Set[str]:
        """Normalize keywords for better matching"""
        
        normalized = set()
        
        for keyword in keywords:
            # Remove common stop words
            if keyword.lower() in self.stop_words:
                continue
            
            # Remove punctuation and numbers
            cleaned = re.sub(r'[^\w\s]', '', keyword)
            cleaned = re.sub(r'\d+', '', cleaned)
            
            # Stem the word
            stemmed = self.stemmer.stem(cleaned.lower())
            
            if len(stemmed) > 2:  # Only keep meaningful words
                normalized.add(stemmed)
        
        return normalized
```

### **Advanced Search Interface**

#### **MyBidMatch-Style Search Filters**
```python
class AdvancedSearchFilters(BaseModel):
    # Basic Filters
    keywords: Optional[str] = None
    opportunity_types: Optional[List[str]] = None
    agencies: Optional[List[str]] = None
    fsg_codes: Optional[List[str]] = None
    naics_codes: Optional[List[str]] = None
    
    # Date Filters
    posting_date_from: Optional[date] = None
    posting_date_to: Optional[date] = None
    response_deadline_from: Optional[date] = None
    response_deadline_to: Optional[date] = None
    
    # Value Filters
    estimated_value_min: Optional[float] = None
    estimated_value_max: Optional[float] = None
    
    # Location Filters
    states: Optional[List[str]] = None
    cities: Optional[List[str]] = None
    
    # Set-Aside Filters
    set_aside_types: Optional[List[str]] = None
    
    # Source Filters
    source_systems: Optional[List[str]] = None
    
    # Advanced Filters
    exclude_keywords: Optional[List[str]] = None
    require_keywords: Optional[List[str]] = None
    keyword_operator: str = "OR"  # "AND", "OR", "NOT"
    
    # Pagination
    page: int = 1
    limit: int = 20
    sort_by: str = "posting_date"
    sort_order: str = "desc"
```

#### **Advanced Search API**
```python
@router.post("/opportunities/search")
async def advanced_opportunity_search(
    filters: AdvancedSearchFilters,
    current_user = Depends(get_current_user)
):
    """Advanced opportunity search with MyBidMatch-style functionality"""
    
    # Build search query
    query = select(Opportunity)
    
    # Apply filters
    if filters.keywords:
        query = self.apply_keyword_filter(query, filters.keywords, filters.keyword_operator)
    
    if filters.opportunity_types:
        query = query.where(Opportunity.opportunity_type_id.in_(filters.opportunity_types))
    
    if filters.agencies:
        query = query.where(Opportunity.agency.in_(filters.agencies))
    
    if filters.fsg_codes:
        query = query.join(OpportunityFSGCode).where(
            OpportunityFSGCode.fsg_code_id.in_(filters.fsg_codes)
        )
    
    if filters.naics_codes:
        query = query.join(OpportunityNAICSCode).where(
            OpportunityNAICSCode.naics_code_id.in_(filters.naics_codes)
        )
    
    if filters.posting_date_from:
        query = query.where(Opportunity.posting_date >= filters.posting_date_from)
    
    if filters.posting_date_to:
        query = query.where(Opportunity.posting_date <= filters.posting_date_to)
    
    if filters.estimated_value_min:
        query = query.where(Opportunity.estimated_value_max >= filters.estimated_value_min)
    
    if filters.estimated_value_max:
        query = query.where(Opportunity.estimated_value_min <= filters.estimated_value_max)
    
    if filters.states:
        query = query.where(Opportunity.place_of_performance.contains(filters.states))
    
    if filters.set_aside_types:
        query = query.where(Opportunity.set_aside_type.in_(filters.set_aside_types))
    
    if filters.source_systems:
        query = query.where(Opportunity.source_system.in_(filters.source_systems))
    
    # Apply sorting
    if filters.sort_by == "posting_date":
        if filters.sort_order == "desc":
            query = query.order_by(Opportunity.posting_date.desc())
        else:
            query = query.order_by(Opportunity.posting_date.asc())
    elif filters.sort_by == "estimated_value":
        if filters.sort_order == "desc":
            query = query.order_by(Opportunity.estimated_value_max.desc())
        else:
            query = query.order_by(Opportunity.estimated_value_min.asc())
    
    # Apply pagination
    offset = (filters.page - 1) * filters.limit
    query = query.offset(offset).limit(filters.limit)
    
    # Execute query
    async with get_db_session() as session:
        result = await session.execute(query)
        opportunities = result.scalars().all()
        
        # Get total count
        count_query = select(func.count()).select_from(query.subquery())
        total_result = await session.execute(count_query)
        total = total_result.scalar()
    
    return {
        "opportunities": opportunities,
        "total": total,
        "page": filters.page,
        "limit": filters.limit,
        "pages": (total + filters.limit - 1) // filters.limit
    }
```

### **Real-time Opportunity Feed**

#### **MyBidMatch-Style Opportunity Feed**
```python
class OpportunityFeedService:
    async def get_opportunity_feed(self, user_id: UUID, filters: dict = None) -> List[Opportunity]:
        """Get personalized opportunity feed for user"""
        
        user = await self.get_user(user_id)
        business = await self.get_business_profile_by_user(user_id)
        
        # Get user preferences
        preferences = await self.get_user_preferences(user_id)
        
        # Build feed query
        query = select(Opportunity).where(Opportunity.status == "active")
        
        # Apply user preferences
        if preferences.get("opportunity_types"):
            query = query.where(Opportunity.opportunity_type_id.in_(preferences["opportunity_types"]))
        
        if preferences.get("agencies"):
            query = query.where(Opportunity.agency.in_(preferences["agencies"]))
        
        if preferences.get("fsg_codes"):
            query = query.join(OpportunityFSGCode).where(
                OpportunityFSGCode.fsg_code_id.in_(preferences["fsg_codes"])
            )
        
        if preferences.get("naics_codes") and business:
            query = query.join(OpportunityNAICSCode).where(
                OpportunityNAICSCode.naics_code_id.in_(preferences["naics_codes"])
            )
        
        # Apply date filters (recent opportunities)
        days_back = preferences.get("days_back", 30)
        cutoff_date = datetime.now() - timedelta(days=days_back)
        query = query.where(Opportunity.posting_date >= cutoff_date)
        
        # Sort by relevance and date
        query = query.order_by(Opportunity.posting_date.desc())
        
        # Execute query
        async with get_db_session() as session:
            result = await session.execute(query)
            opportunities = result.scalars().all()
        
        return opportunities
```

### **Enhanced Frontend Interface**

#### **MyBidMatch-Style Search Interface**
```typescript
interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onSaveSearch: (searchName: string, filters: SearchFilters) => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onSearch, onSaveSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: '',
    opportunityTypes: [],
    agencies: [],
    fsgCodes: [],
    naicsCodes: [],
    dateRange: null,
    valueRange: null,
    locations: [],
    setAsideTypes: [],
    sourceSystems: []
  });

  return (
    <div className="advanced-search-panel">
      <div className="search-header">
        <h3>Advanced Opportunity Search</h3>
        <div className="search-actions">
          <button onClick={() => onSearch(filters)}>Search</button>
          <button onClick={() => setFilters({})}>Clear</button>
          <button onClick={() => setShowSaveDialog(true)}>Save Search</button>
        </div>
      </div>

      <div className="search-filters">
        {/* Keyword Search */}
        <div className="filter-group">
          <label>Keywords</label>
          <input
            type="text"
            placeholder="Enter keywords (use * for wildcards)"
            value={filters.keywords}
            onChange={(e) => setFilters({...filters, keywords: e.target.value})}
          />
          <div className="keyword-help">
            Examples: software*, develop*, naics!541511, da10
          </div>
        </div>

        {/* Opportunity Types */}
        <div className="filter-group">
          <label>Opportunity Types</label>
          <MultiSelect
            options={opportunityTypes}
            value={filters.opportunityTypes}
            onChange={(value) => setFilters({...filters, opportunityTypes: value})}
            placeholder="Select opportunity types"
          />
        </div>

        {/* Agencies */}
        <div className="filter-group">
          <label>Agencies</label>
          <MultiSelect
            options={agencies}
            value={filters.agencies}
            onChange={(value) => setFilters({...filters, agencies: value})}
            placeholder="Select agencies"
          />
        </div>

        {/* FSG Codes */}
        <div className="filter-group">
          <label>Federal Supply Group (FSG)</label>
          <MultiSelect
            options={fsgCodes}
            value={filters.fsgCodes}
            onChange={(value) => setFilters({...filters, fsgCodes: value})}
            placeholder="Select FSG codes"
          />
        </div>

        {/* NAICS Codes */}
        <div className="filter-group">
          <label>NAICS Codes</label>
          <NAICSSearch
            value={filters.naicsCodes}
            onChange={(value) => setFilters({...filters, naicsCodes: value})}
            placeholder="Search NAICS codes"
          />
        </div>

        {/* Date Range */}
        <div className="filter-group">
          <label>Posting Date Range</label>
          <DateRangePicker
            value={filters.dateRange}
            onChange={(value) => setFilters({...filters, dateRange: value})}
          />
        </div>

        {/* Value Range */}
        <div className="filter-group">
          <label>Estimated Value Range</label>
          <RangeSlider
            min={0}
            max={10000000}
            value={filters.valueRange}
            onChange={(value) => setFilters({...filters, valueRange: value})}
            formatLabel={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
        </div>

        {/* Set-Aside Types */}
        <div className="filter-group">
          <label>Set-Aside Types</label>
          <MultiSelect
            options={setAsideTypes}
            value={filters.setAsideTypes}
            onChange={(value) => setFilters({...filters, setAsideTypes: value})}
            placeholder="Select set-aside types"
          />
        </div>
      </div>
    </div>
  );
};
```

### **Opportunity Feed Component**
```typescript
const OpportunityFeed: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FeedFilters>({});

  useEffect(() => {
    loadOpportunities();
  }, [filters]);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const response = await api.get('/opportunities/feed', { params: filters });
      setOpportunities(response.data.opportunities);
    } catch (error) {
      console.error('Error loading opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opportunity-feed">
      <div className="feed-header">
        <h2>Opportunity Feed</h2>
        <div className="feed-controls">
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
          <button onClick={loadOpportunities}>Refresh</button>
        </div>
      </div>

      {showFilters && (
        <AdvancedSearch
          onSearch={setFilters}
          onSaveSearch={saveSearch}
        />
      )}

      <div className="opportunities-list">
        {loading ? (
          <div className="loading">Loading opportunities...</div>
        ) : (
          opportunities.map(opportunity => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              onApply={handleApply}
              onSave={handleSave}
              onShare={handleShare}
            />
          ))
        )}
      </div>

      {opportunities.length === 0 && !loading && (
        <div className="no-opportunities">
          <p>No opportunities match your current filters.</p>
          <button onClick={() => setFilters({})}>Clear Filters</button>
        </div>
      )}
    </div>
  );
};
```

This enhanced opportunity matching system incorporates the key features from MyBidMatch while maintaining the Utah-specific focus and user-friendly interface. The system provides:

1. **Advanced filtering** with MyBidMatch-style keyword search
2. **FSG code integration** for better categorization
3. **Real-time opportunity feeds** personalized to user preferences
4. **Comprehensive matching algorithms** using multiple criteria
5. **User-friendly interface** with advanced search capabilities
6. **Integration with multiple data sources** for comprehensive opportunity coverage

The system maintains the focus on Utah businesses while providing the sophisticated matching capabilities that make MyBidMatch effective for government contracting opportunities. 