# Capability Matching System - Percentage Match Analysis

## 🎯 **Comprehensive Capability-to-Contract Matching**

### **1. Overall Match Score Calculation**

#### **Weighted Capability Matching Algorithm**
```python
class CapabilityMatchingEngine:
    def __init__(self):
        self.weights = {
            'naics_codes': 0.25,           # 25% - Industry classification
            'technical_capabilities': 0.20, # 20% - Technology stack & skills
            'past_performance': 0.15,       # 15% - Historical project experience
            'certifications': 0.15,         # 15% - Required certifications
            'geographic_location': 0.10,    # 10% - Location proximity
            'financial_capacity': 0.10,     # 10% - Financial capability
            'team_capabilities': 0.05       # 5% - Team size & expertise
        }
    
    async def calculate_overall_match_score(self, business_profile: BusinessProfile, opportunity: Opportunity) -> MatchScoreResult:
        """Calculate overall percentage match between business capabilities and opportunity requirements"""
        
        # Calculate individual component scores
        naics_score = await self.calculate_naics_match(business_profile, opportunity)
        technical_score = await self.calculate_technical_match(business_profile, opportunity)
        performance_score = await self.calculate_past_performance_match(business_profile, opportunity)
        certification_score = await self.calculate_certification_match(business_profile, opportunity)
        geographic_score = await self.calculate_geographic_match(business_profile, opportunity)
        financial_score = await self.calculate_financial_match(business_profile, opportunity)
        team_score = await self.calculate_team_match(business_profile, opportunity)
        
        # Calculate weighted overall score
        overall_score = (
            naics_score * self.weights['naics_codes'] +
            technical_score * self.weights['technical_capabilities'] +
            performance_score * self.weights['past_performance'] +
            certification_score * self.weights['certifications'] +
            geographic_score * self.weights['geographic_location'] +
            financial_score * self.weights['financial_capacity'] +
            team_score * self.weights['team_capabilities']
        )
        
        return MatchScoreResult(
            overall_score=overall_score,
            component_scores={
                'naics_codes': naics_score,
                'technical_capabilities': technical_score,
                'past_performance': performance_score,
                'certifications': certification_score,
                'geographic_location': geographic_score,
                'financial_capacity': financial_score,
                'team_capabilities': team_score
            },
            weights=self.weights,
            match_details=await self.generate_match_details(business_profile, opportunity),
            recommendations=await self.generate_recommendations(business_profile, opportunity, overall_score)
        )
```

### **2. Detailed Component Matching**

#### **NAICS Code Matching (25% Weight)**
```python
async def calculate_naics_match(self, business_profile: BusinessProfile, opportunity: Opportunity) -> float:
    """Calculate NAICS code matching percentage"""
    
    business_naics = set(bp.naics_code for bp in business_profile.naics_codes)
    opportunity_naics = set(op.naics_code for op in opportunity.naics_codes)
    
    if not opportunity_naics:
        return 50.0  # Neutral score if no NAICS specified
    
    # Exact matches
    exact_matches = business_naics.intersection(opportunity_naics)
    
    # Partial matches (same sector)
    business_sectors = set(self.get_naics_sector(code) for code in business_naics)
    opportunity_sectors = set(self.get_naics_sector(code) for code in opportunity_naics)
    sector_matches = business_sectors.intersection(opportunity_sectors)
    
    # Calculate scores
    exact_score = len(exact_matches) / len(opportunity_naics) * 100
    sector_score = len(sector_matches) / len(opportunity_sectors) * 50
    
    return min(exact_score + sector_score, 100.0)
```

#### **Technical Capability Matching (20% Weight)**
```python
async def calculate_technical_match(self, business_profile: BusinessProfile, opportunity: Opportunity) -> float:
    """Calculate technical capability matching percentage"""
    
    # Extract required technologies from opportunity
    required_tech = self.extract_required_technologies(opportunity.description)
    business_tech = set(bt.technology.name for bt in business_profile.technologies)
    
    if not required_tech:
        return 50.0  # Neutral score if no specific tech requirements
    
    matches = 0
    total_requirements = len(required_tech)
    
    for tech_requirement in required_tech:
        # Check for exact matches
        if tech_requirement.lower() in [t.lower() for t in business_tech]:
            matches += 1
        # Check for related technologies
        elif self.is_related_technology(tech_requirement, business_tech):
            matches += 0.7
    
    return (matches / total_requirements) * 100 if total_requirements > 0 else 0.0
```

#### **Past Performance Matching (15% Weight)**
```python
async def calculate_past_performance_match(self, business_profile: BusinessProfile, opportunity: Opportunity) -> float:
    """Calculate past performance matching percentage"""
    
    past_projects = business_profile.past_projects
    opportunity_scope = self.extract_project_scope(opportunity.description)
    
    if not past_projects:
        return 0.0
    
    # Calculate similarity scores for each past project
    similarity_scores = []
    
    for project in past_projects:
        similarity = await self.calculate_project_similarity(project, opportunity_scope)
        # Weight by project recency and performance rating
        recency_weight = self.calculate_recency_weight(project.end_date)
        performance_weight = project.performance_rating / 5.0 if project.performance_rating else 0.5
        
        weighted_similarity = similarity * recency_weight * performance_weight
        similarity_scores.append(weighted_similarity)
    
    # Return highest weighted similarity score
    return max(similarity_scores) if similarity_scores else 0.0
```

#### **Certification Matching (15% Weight)**
```python
async def calculate_certification_match(self, business_profile: BusinessProfile, opportunity: Opportunity) -> float:
    """Calculate certification matching percentage"""
    
    required_certs = self.extract_required_certifications(opportunity.description)
    business_certs = set(bc.certification.name for bc in business_profile.certifications if bc.status == 'active')
    
    if not required_certs:
        return 100.0  # Perfect score if no certifications required
    
    matches = 0
    total_required = len(required_certs)
    
    for cert_requirement in required_certs:
        if cert_requirement.lower() in [c.lower() for c in business_certs]:
            matches += 1
        # Check for equivalent certifications
        elif self.is_equivalent_certification(cert_requirement, business_certs):
            matches += 0.8
    
    return (matches / total_required) * 100 if total_required > 0 else 0.0
```

### **3. Visual Match Score Display**

#### **Match Score Dashboard Component**
```typescript
interface MatchScoreDisplay {
  overallScore: number;
  componentScores: {
    naics_codes: number;
    technical_capabilities: number;
    past_performance: number;
    certifications: number;
    geographic_location: number;
    financial_capacity: number;
    team_capabilities: number;
  };
  weights: Record<string, number>;
  matchDetails: MatchDetail[];
  recommendations: string[];
}

const CapabilityMatchScore: React.FC<{ matchResult: MatchScoreDisplay }> = ({ matchResult }) => {
  const { overallScore, componentScores, weights, matchDetails, recommendations } = matchResult;
  
  return (
    <div className="capability-match-score">
      {/* Overall Score Display */}
      <div className="overall-score-section">
        <div className="score-circle">
          <div className="score-percentage">{Math.round(overallScore)}%</div>
          <div className="score-label">Overall Match</div>
        </div>
        <div className="score-category">
          <MatchCategoryBadge score={overallScore} />
        </div>
      </div>
      
      {/* Component Breakdown */}
      <div className="component-breakdown">
        <h3>Capability Match Breakdown</h3>
        {Object.entries(componentScores).map(([component, score]) => (
          <ComponentScoreBar
            key={component}
            component={component}
            score={score}
            weight={weights[component]}
            details={matchDetails.filter(d => d.component === component)}
          />
        ))}
      </div>
      
      {/* Detailed Analysis */}
      <div className="match-analysis">
        <MatchDetailsPanel details={matchDetails} />
        <RecommendationsPanel recommendations={recommendations} />
      </div>
    </div>
  );
};
```

#### **Component Score Bar**
```typescript
const ComponentScoreBar: React.FC<{
  component: string;
  score: number;
  weight: number;
  details: MatchDetail[];
}> = ({ component, score, weight, details }) => {
  const componentLabels = {
    naics_codes: 'Industry Classification',
    technical_capabilities: 'Technical Capabilities',
    past_performance: 'Past Performance',
    certifications: 'Certifications',
    geographic_location: 'Geographic Location',
    financial_capacity: 'Financial Capacity',
    team_capabilities: 'Team Capabilities'
  };
  
  return (
    <div className="component-score-bar">
      <div className="component-header">
        <span className="component-name">{componentLabels[component]}</span>
        <span className="component-weight">({Math.round(weight * 100)}%)</span>
        <span className="component-score">{Math.round(score)}%</span>
      </div>
      
      <div className="score-bar-container">
        <div 
          className="score-bar-fill"
          style={{ 
            width: `${score}%`,
            backgroundColor: getScoreColor(score)
          }}
        />
      </div>
      
      {/* Component Details */}
      <div className="component-details">
        {details.map((detail, index) => (
          <div key={index} className="detail-item">
            <span className="detail-label">{detail.label}:</span>
            <span className="detail-value">{detail.value}</span>
            <span className="detail-score">+{detail.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### **4. Match Score Categories**

#### **Score Classification System**
```python
class MatchScoreClassifier:
    def classify_match_score(self, score: float) -> MatchCategory:
        """Classify match score into categories"""
        
        if score >= 90:
            return MatchCategory.EXCELLENT_MATCH
        elif score >= 80:
            return MatchCategory.STRONG_MATCH
        elif score >= 70:
            return MatchCategory.GOOD_MATCH
        elif score >= 50:
            return MatchCategory.FAIR_MATCH
        elif score >= 30:
            return MatchCategory.WEAK_MATCH
        else:
            return MatchCategory.POOR_MATCH
    
    def get_category_color(self, category: MatchCategory) -> str:
        """Get color for match category"""
        
        colors = {
            MatchCategory.EXCELLENT_MATCH: '#28a745',  # Green
            MatchCategory.STRONG_MATCH: '#17a2b8',    # Blue
            MatchCategory.GOOD_MATCH: '#ffc107',      # Yellow
            MatchCategory.FAIR_MATCH: '#fd7e14',      # Orange
            MatchCategory.WEAK_MATCH: '#dc3545',      # Red
            MatchCategory.POOR_MATCH: '#6c757d'       # Gray
        }
        
        return colors.get(category, '#6c757d')
```

### **5. Detailed Match Analysis**

#### **Match Details Generation**
```python
async def generate_match_details(self, business_profile: BusinessProfile, opportunity: Opportunity) -> List[MatchDetail]:
    """Generate detailed match analysis"""
    
    details = []
    
    # NAICS Code Analysis
    naics_details = await self.analyze_naics_match(business_profile, opportunity)
    details.extend(naics_details)
    
    # Technical Capability Analysis
    tech_details = await self.analyze_technical_match(business_profile, opportunity)
    details.extend(tech_details)
    
    # Past Performance Analysis
    performance_details = await self.analyze_past_performance(business_profile, opportunity)
    details.extend(performance_details)
    
    # Certification Analysis
    cert_details = await self.analyze_certification_match(business_profile, opportunity)
    details.extend(cert_details)
    
    # Geographic Analysis
    geo_details = await self.analyze_geographic_match(business_profile, opportunity)
    details.extend(geo_details)
    
    # Financial Analysis
    financial_details = await self.analyze_financial_match(business_profile, opportunity)
    details.extend(financial_details)
    
    # Team Analysis
    team_details = await self.analyze_team_match(business_profile, opportunity)
    details.extend(team_details)
    
    return details

async def analyze_naics_match(self, business_profile: BusinessProfile, opportunity: Opportunity) -> List[MatchDetail]:
    """Analyze NAICS code matching"""
    
    details = []
    business_naics = set(bp.naics_code for bp in business_profile.naics_codes)
    opportunity_naics = set(op.naics_code for op in opportunity.naics_codes)
    
    # Exact matches
    exact_matches = business_naics.intersection(opportunity_naics)
    if exact_matches:
        details.append(MatchDetail(
            component='naics_codes',
            label='Exact NAICS Matches',
            value=f"{len(exact_matches)} codes",
            score=len(exact_matches) * 20,
            type='positive'
        ))
    
    # Missing required NAICS
    missing_naics = opportunity_naics - business_naics
    if missing_naics:
        details.append(MatchDetail(
            component='naics_codes',
            label='Missing Required NAICS',
            value=f"{len(missing_naics)} codes",
            score=-len(missing_naics) * 15,
            type='negative'
        ))
    
    return details
```

### **6. Recommendations Engine**

#### **Smart Recommendations**
```python
async def generate_recommendations(self, business_profile: BusinessProfile, opportunity: Opportunity, overall_score: float) -> List[str]:
    """Generate actionable recommendations to improve match score"""
    
    recommendations = []
    
    # Analyze each component and provide specific recommendations
    naics_recommendations = await self.get_naics_recommendations(business_profile, opportunity)
    recommendations.extend(naics_recommendations)
    
    tech_recommendations = await self.get_technical_recommendations(business_profile, opportunity)
    recommendations.extend(tech_recommendations)
    
    cert_recommendations = await self.get_certification_recommendations(business_profile, opportunity)
    recommendations.extend(cert_recommendations)
    
    # Overall recommendations based on score
    if overall_score < 50:
        recommendations.append("Consider focusing on opportunities that better align with your current capabilities")
    elif overall_score < 70:
        recommendations.append("This opportunity shows potential - consider expanding capabilities in key areas")
    else:
        recommendations.append("Excellent match! This opportunity aligns well with your capabilities")
    
    return recommendations

async def get_naics_recommendations(self, business_profile: BusinessProfile, opportunity: Opportunity) -> List[str]:
    """Get NAICS-specific recommendations"""
    
    recommendations = []
    business_naics = set(bp.naics_code for bp in business_profile.naics_codes)
    opportunity_naics = set(op.naics_code for op in opportunity.naics_codes)
    
    missing_naics = opportunity_naics - business_naics
    
    if missing_naics:
        recommendations.append(f"Consider adding NAICS codes: {', '.join(missing_naics)}")
    
    return recommendations
```

### **7. Match Score API Endpoints**

#### **Capability Matching API**
```python
@router.get("/opportunities/{opportunity_id}/match-score/{business_id}")
async def get_capability_match_score(
    opportunity_id: UUID,
    business_id: UUID,
    current_user: User = Depends(get_current_user)
) -> MatchScoreResponse:
    """Get detailed capability match score for a business and opportunity"""
    
    # Verify user has access to business profile
    business_profile = await verify_business_access(business_id, current_user)
    opportunity = await get_opportunity(opportunity_id)
    
    # Calculate match score
    matching_engine = CapabilityMatchingEngine()
    match_result = await matching_engine.calculate_overall_match_score(business_profile, opportunity)
    
    return MatchScoreResponse(
        business_id=business_id,
        opportunity_id=opportunity_id,
        overall_score=match_result.overall_score,
        component_scores=match_result.component_scores,
        weights=match_result.weights,
        match_details=match_result.match_details,
        recommendations=match_result.recommendations,
        category=MatchScoreClassifier().classify_match_score(match_result.overall_score)
    )

@router.get("/businesses/{business_id}/opportunity-matches")
async def get_business_opportunity_matches(
    business_id: UUID,
    min_score: float = 0.0,
    max_score: float = 100.0,
    category: Optional[str] = None,
    current_user: User = Depends(get_current_user)
) -> List[OpportunityMatchSummary]:
    """Get all opportunity matches for a business with filtering"""
    
    # Verify access and get matches
    business_profile = await verify_business_access(business_id, current_user)
    matches = await get_opportunity_matches(business_id, min_score, max_score, category)
    
    return matches
```

### **8. Real-Time Match Updates**

#### **Live Match Score Updates**
```typescript
const LiveMatchScore: React.FC<{ businessId: string; opportunityId: string }> = ({ businessId, opportunityId }) => {
  const [matchScore, setMatchScore] = useState<MatchScoreDisplay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMatchScore = async () => {
      try {
        const response = await api.get(`/opportunities/${opportunityId}/match-score/${businessId}`);
        setMatchScore(response.data);
      } catch (error) {
        console.error('Error fetching match score:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMatchScore();
    
    // Set up real-time updates
    const interval = setInterval(fetchMatchScore, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [businessId, opportunityId]);
  
  if (isLoading) {
    return <MatchScoreSkeleton />;
  }
  
  if (!matchScore) {
    return <div>Unable to calculate match score</div>;
  }
  
  return <CapabilityMatchScore matchResult={matchScore} />;
};
```

This comprehensive capability matching system provides:

1. **Overall Percentage Score**: Weighted calculation across all capability areas
2. **Component Breakdown**: Detailed scores for each capability area (NAICS, technical, certifications, etc.)
3. **Visual Indicators**: Color-coded progress bars and category badges
4. **Detailed Analysis**: Specific reasons for scores with actionable insights
5. **Smart Recommendations**: Suggestions to improve match scores
6. **Real-Time Updates**: Live score updates as profiles and opportunities change

The system gives you a clear, percentage-based view of how well your capabilities align with each government contract opportunity, helping you make informed decisions about which opportunities to pursue. 