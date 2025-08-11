# Advanced Opportunity Filtering & Prioritization System

## 🎯 **Smart Opportunity Filtering & Quick Identification**

### **1. Dynamic Filtering Dashboard**

#### **Real-Time Filter Panel**
```typescript
interface OpportunityFilterPanel {
  // Core Filters
  naicsCodes: string[];
  opportunityTypes: OpportunityType[];
  estimatedValueRange: { min: number; max: number };
  dueDateRange: { start: Date; end: Date };
  locationRadius: number; // miles from business location
  
  // Advanced Filters
  setAsidePrograms: SetAsideProgram[];
  contractVehicles: ContractVehicle[];
  requiredCertifications: string[];
  securityClearances: SecurityClearance[];
  
  // Business-Specific Filters
  matchScoreRange: { min: number; max: number };
  winProbabilityRange: { min: number; max: number };
  competitionLevel: CompetitionLevel[];
  
  // Custom Filters
  keywords: string[];
  excludeKeywords: string[];
  agencies: string[];
  excludeAgencies: string[];
  
  // Quick Actions
  savedFilters: SavedFilter[];
  quickFilters: QuickFilter[];
}
```

#### **Smart Filter Components**
```typescript
// React Component for Advanced Filtering
const OpportunityFilterPanel: React.FC = () => {
  const [filters, setFilters] = useState<OpportunityFilterPanel>(defaultFilters);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  
  // Real-time filtering
  useEffect(() => {
    const filtered = applyFilters(opportunities, filters);
    setFilteredOpportunities(filtered);
  }, [filters, opportunities]);
  
  return (
    <div className="filter-panel">
      {/* Quick Filter Buttons */}
      <QuickFilterButtons onFilterChange={handleQuickFilter} />
      
      {/* Advanced Filter Controls */}
      <AdvancedFilterControls filters={filters} onChange={setFilters} />
      
      {/* Saved Filters */}
      <SavedFiltersPanel onLoadFilter={loadSavedFilter} />
      
      {/* Results Summary */}
      <ResultsSummary 
        total={opportunities.length}
        filtered={filteredOpportunities.length}
        matchBreakdown={getMatchBreakdown(filteredOpportunities)}
      />
    </div>
  );
};
```

### **2. Quick Identification System**

#### **Opportunity Scoring & Categorization**
```python
class OpportunityScoringService:
    def __init__(self):
        self.matching_service = ComprehensiveMatchingEngine()
        self.market_service = MarketIntelligenceService()
    
    async def score_and_categorize_opportunities(self, business_id: UUID, opportunities: List[Opportunity]) -> List[ScoredOpportunity]:
        """Score and categorize opportunities for quick identification"""
        
        scored_opportunities = []
        
        for opportunity in opportunities:
            # Calculate comprehensive match score
            match_result = await self.matching_service.calculate_comprehensive_match_score(business_id, opportunity)
            
            # Get market intelligence
            market_insights = await self.market_service.get_market_insights(opportunity)
            
            # Calculate win probability
            win_probability = await self.predict_win_probability(business_id, opportunity, match_result)
            
            # Categorize opportunity
            category = self.categorize_opportunity(match_result.comprehensive_score, win_probability, market_insights)
            
            scored_opportunity = ScoredOpportunity(
                opportunity=opportunity,
                match_score=match_result.comprehensive_score,
                win_probability=win_probability,
                category=category,
                market_insights=market_insights,
                match_details=match_result.match_details,
                recommendations=match_result.recommendations
            )
            
            scored_opportunities.append(scored_opportunity)
        
        return scored_opportunities
    
    def categorize_opportunity(self, match_score: float, win_probability: float, market_insights: MarketInsights) -> OpportunityCategory:
        """Categorize opportunity for quick identification"""
        
        if match_score >= 85 and win_probability >= 0.7:
            return OpportunityCategory.HOT_LEAD
        elif match_score >= 70 and win_probability >= 0.5:
            return OpportunityCategory.GOOD_MATCH
        elif match_score >= 50 and win_probability >= 0.3:
            return OpportunityCategory.POTENTIAL
        elif match_score < 30 or win_probability < 0.2:
            return OpportunityCategory.LOW_PRIORITY
        else:
            return OpportunityCategory.REVIEW_NEEDED
```

#### **Opportunity Categories**
```python
class OpportunityCategory(Enum):
    HOT_LEAD = "hot_lead"           # High match, high win probability
    GOOD_MATCH = "good_match"       # Good match, reasonable win probability
    POTENTIAL = "potential"         # Moderate match, worth investigating
    REVIEW_NEEDED = "review_needed" # Requires manual review
    LOW_PRIORITY = "low_priority"   # Low match or low win probability
    EXCLUDE = "exclude"             # Outside criteria, should be filtered out
```

### **3. Visual Opportunity Dashboard**

#### **Kanban-Style Board View**
```typescript
const OpportunityBoard: React.FC = () => {
  const [opportunities, setOpportunities] = useState<ScoredOpportunity[]>([]);
  const [viewMode, setViewMode] = useState<'board' | 'list' | 'table'>('board');
  
  const categorizedOpportunities = useMemo(() => {
    return groupByCategory(opportunities);
  }, [opportunities]);
  
  return (
    <div className="opportunity-board">
      {/* View Mode Toggle */}
      <ViewModeToggle value={viewMode} onChange={setViewMode} />
      
      {/* Board View */}
      {viewMode === 'board' && (
        <div className="kanban-board">
          {Object.entries(categorizedOpportunities).map(([category, opps]) => (
            <OpportunityColumn
              key={category}
              category={category}
              opportunities={opps}
              onOpportunityMove={handleOpportunityMove}
              onOpportunityClick={handleOpportunityClick}
            />
          ))}
        </div>
      )}
      
      {/* List View */}
      {viewMode === 'list' && (
        <OpportunityListView 
          opportunities={opportunities}
          onSort={handleSort}
          onFilter={handleFilter}
        />
      )}
      
      {/* Table View */}
      {viewMode === 'table' && (
        <OpportunityTableView 
          opportunities={opportunities}
          columns={getTableColumns()}
          onSort={handleSort}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
};
```

#### **Opportunity Card Component**
```typescript
const OpportunityCard: React.FC<{ opportunity: ScoredOpportunity }> = ({ opportunity }) => {
  const { opp, match_score, win_probability, category, market_insights } = opportunity;
  
  return (
    <div className={`opportunity-card category-${category}`}>
      {/* Header with Score */}
      <div className="card-header">
        <div className="score-indicator">
          <span className="match-score">{match_score}%</span>
          <span className="win-probability">{Math.round(win_probability * 100)}%</span>
        </div>
        <OpportunityCategoryBadge category={category} />
      </div>
      
      {/* Opportunity Details */}
      <div className="card-content">
        <h3>{opp.title}</h3>
        <p className="agency">{opp.agency_name}</p>
        <p className="value">${formatCurrency(opp.estimated_value_min)} - ${formatCurrency(opp.estimated_value_max)}</p>
        <p className="due-date">Due: {formatDate(opp.response_deadline)}</p>
      </div>
      
      {/* Quick Actions */}
      <div className="card-actions">
        <button onClick={() => handleViewDetails(opp.id)}>View Details</button>
        <button onClick={() => handleAddToPipeline(opp.id)}>Add to Pipeline</button>
        <button onClick={() => handleExclude(opp.id)}>Exclude</button>
      </div>
      
      {/* Match Indicators */}
      <div className="match-indicators">
        {opportunity.match_details.map(detail => (
          <MatchIndicator key={detail.type} type={detail.type} score={detail.score} />
        ))}
      </div>
    </div>
  );
};
```

### **4. Smart Filtering Algorithms**

#### **Multi-Criteria Filtering**
```python
class SmartFilteringService:
    def __init__(self):
        self.geo_service = GeographicService()
        self.financial_service = FinancialService()
    
    async def apply_smart_filters(self, opportunities: List[ScoredOpportunity], filters: OpportunityFilterPanel) -> List[ScoredOpportunity]:
        """Apply smart filters to opportunities"""
        
        filtered_opportunities = opportunities
        
        # 1. Basic Filters
        filtered_opportunities = self.apply_basic_filters(filtered_opportunities, filters)
        
        # 2. Geographic Filters
        filtered_opportunities = await self.apply_geographic_filters(filtered_opportunities, filters)
        
        # 3. Financial Filters
        filtered_opportunities = await self.apply_financial_filters(filtered_opportunities, filters)
        
        # 4. Technical Filters
        filtered_opportunities = self.apply_technical_filters(filtered_opportunities, filters)
        
        # 5. Market Intelligence Filters
        filtered_opportunities = await self.apply_market_filters(filtered_opportunities, filters)
        
        # 6. Custom Business Rules
        filtered_opportunities = self.apply_business_rules(filtered_opportunities, filters)
        
        return filtered_opportunities
    
    def apply_basic_filters(self, opportunities: List[ScoredOpportunity], filters: OpportunityFilterPanel) -> List[ScoredOpportunity]:
        """Apply basic filters (NAICS, type, value, date)"""
        
        filtered = []
        
        for opp in opportunities:
            # NAICS Code Filter
            if filters.naicsCodes and not any(naics in opp.opportunity.naics_codes for naics in filters.naicsCodes):
                continue
            
            # Opportunity Type Filter
            if filters.opportunityTypes and opp.opportunity.opportunity_type not in filters.opportunityTypes:
                continue
            
            # Value Range Filter
            if filters.estimatedValueRange:
                min_val = filters.estimatedValueRange.min
                max_val = filters.estimatedValueRange.max
                opp_val = opp.opportunity.estimated_value_min or 0
                
                if opp_val < min_val or opp_val > max_val:
                    continue
            
            # Due Date Filter
            if filters.dueDateRange:
                due_date = opp.opportunity.response_deadline
                if due_date < filters.dueDateRange.start or due_date > filters.dueDateRange.end:
                    continue
            
            filtered.append(opp)
        
        return filtered
    
    async def apply_geographic_filters(self, opportunities: List[ScoredOpportunity], filters: OpportunityFilterPanel) -> List[ScoredOpportunity]:
        """Apply geographic filters"""
        
        if not filters.locationRadius:
            return opportunities
        
        business_location = await self.get_business_location(filters.businessId)
        filtered = []
        
        for opp in opportunities:
            opp_location = self.extract_opportunity_location(opp.opportunity)
            distance = self.calculate_distance(business_location, opp_location)
            
            if distance <= filters.locationRadius:
                filtered.append(opp)
        
        return filtered
```

### **5. Quick Actions & Bulk Operations**

#### **Bulk Opportunity Management**
```typescript
const BulkActionsPanel: React.FC = () => {
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  
  const handleBulkAction = async (action: string) => {
    switch (action) {
      case 'add_to_pipeline':
        await addOpportunitiesToPipeline(selectedOpportunities);
        break;
      case 'exclude':
        await excludeOpportunities(selectedOpportunities);
        break;
      case 'export':
        await exportOpportunities(selectedOpportunities);
        break;
      case 'share':
        await shareOpportunities(selectedOpportunities);
        break;
    }
  };
  
  return (
    <div className="bulk-actions-panel">
      <div className="selection-summary">
        {selectedOpportunities.length} opportunities selected
      </div>
      
      <div className="bulk-actions">
        <button onClick={() => handleBulkAction('add_to_pipeline')}>
          Add to Pipeline
        </button>
        <button onClick={() => handleBulkAction('exclude')}>
          Exclude
        </button>
        <button onClick={() => handleBulkAction('export')}>
          Export
        </button>
        <button onClick={() => handleBulkAction('share')}>
          Share
        </button>
      </div>
    </div>
  );
};
```

### **6. Saved Filters & Quick Access**

#### **Filter Management System**
```typescript
interface SavedFilter {
  id: string;
  name: string;
  description: string;
  filters: OpportunityFilterPanel;
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
  usageCount: number;
}

const SavedFiltersManager: React.FC = () => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  
  const saveCurrentFilter = async (name: string, description: string) => {
    const newFilter: SavedFilter = {
      id: generateId(),
      name,
      description,
      filters: currentFilters,
      isDefault: false,
      createdBy: currentUser.id,
      createdAt: new Date(),
      usageCount: 0
    };
    
    await saveFilter(newFilter);
    setSavedFilters([...savedFilters, newFilter]);
  };
  
  const loadFilter = async (filterId: string) => {
    const filter = savedFilters.find(f => f.id === filterId);
    if (filter) {
      setCurrentFilters(filter.filters);
      await updateFilterUsage(filterId);
    }
  };
  
  return (
    <div className="saved-filters-manager">
      <h3>Saved Filters</h3>
      
      <div className="filter-list">
        {savedFilters.map(filter => (
          <SavedFilterItem
            key={filter.id}
            filter={filter}
            onLoad={() => loadFilter(filter.id)}
            onDelete={() => deleteFilter(filter.id)}
            onEdit={() => editFilter(filter.id)}
          />
        ))}
      </div>
      
      <button onClick={() => showSaveFilterModal()}>
        Save Current Filter
      </button>
    </div>
  );
};
```

### **7. Real-Time Notifications & Alerts**

#### **Opportunity Alert System**
```python
class OpportunityAlertService:
    def __init__(self):
        self.notification_service = NotificationService()
        self.matching_service = ComprehensiveMatchingEngine()
    
    async def check_for_new_opportunities(self, business_id: UUID):
        """Check for new opportunities matching business criteria"""
        
        # Get business preferences
        preferences = await self.get_business_preferences(business_id)
        
        # Get new opportunities
        new_opportunities = await self.get_new_opportunities_since_last_check(business_id)
        
        # Score and filter opportunities
        scored_opportunities = await self.matching_service.score_and_categorize_opportunities(
            business_id, new_opportunities
        )
        
        # Filter based on preferences
        matching_opportunities = self.filter_by_preferences(scored_opportunities, preferences)
        
        # Send notifications for high-priority opportunities
        for opp in matching_opportunities:
            if opp.category in [OpportunityCategory.HOT_LEAD, OpportunityCategory.GOOD_MATCH]:
                await self.send_opportunity_alert(business_id, opp)
    
    async def send_opportunity_alert(self, business_id: UUID, opportunity: ScoredOpportunity):
        """Send alert for high-priority opportunity"""
        
        notification = OpportunityAlert(
            business_id=business_id,
            opportunity_id=opportunity.opportunity.id,
            title=f"New {opportunity.category.value.replace('_', ' ').title()} Opportunity",
            message=f"Match Score: {opportunity.match_score}% | Win Probability: {opportunity.win_probability:.1%}",
            priority="high" if opportunity.category == OpportunityCategory.HOT_LEAD else "medium",
            action_url=f"/opportunities/{opportunity.opportunity.id}"
        )
        
        await self.notification_service.send_notification(notification)
```

### **8. Performance Optimization**

#### **Efficient Filtering & Caching**
```python
class OpportunityCacheService:
    def __init__(self):
        self.redis_client = Redis()
        self.cache_ttl = 300  # 5 minutes
    
    async def get_cached_opportunities(self, business_id: UUID, filters: OpportunityFilterPanel) -> List[ScoredOpportunity]:
        """Get cached opportunities or fetch and cache"""
        
        cache_key = self.generate_cache_key(business_id, filters)
        cached_data = await self.redis_client.get(cache_key)
        
        if cached_data:
            return json.loads(cached_data)
        
        # Fetch and cache
        opportunities = await self.fetch_opportunities(business_id, filters)
        await self.redis_client.setex(cache_key, self.cache_ttl, json.dumps(opportunities))
        
        return opportunities
    
    def generate_cache_key(self, business_id: UUID, filters: OpportunityFilterPanel) -> str:
        """Generate cache key based on business and filters"""
        
        filter_hash = hashlib.md5(json.dumps(filters.dict(), sort_keys=True).encode()).hexdigest()
        return f"opportunities:{business_id}:{filter_hash}"
```

This comprehensive filtering system provides:

1. **Real-Time Filtering**: Instant filtering as you adjust criteria
2. **Smart Categorization**: Automatic categorization of opportunities
3. **Visual Dashboard**: Multiple view modes (board, list, table)
4. **Bulk Operations**: Efficient management of multiple opportunities
5. **Saved Filters**: Quick access to frequently used filter combinations
6. **Smart Alerts**: Real-time notifications for high-priority opportunities
7. **Performance Optimization**: Caching and efficient algorithms

You can quickly identify the best opportunities and efficiently filter out those that don't match your criteria, making the opportunity discovery process much more efficient and effective. 