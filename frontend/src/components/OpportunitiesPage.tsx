import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import OpportunityFilterPanel, { OpportunityFilterPanel as FilterPanelType } from './OpportunityFilterPanel';
import OpportunityBoard, { ScoredOpportunity, OpportunityCategory } from './OpportunityBoard';

// Sample opportunity data
const sampleOpportunities = [
  {
    id: '1',
    title: 'IT Support Services for Federal Agency',
    agency_name: 'Department of Defense',
    estimated_value_min: 500000,
    estimated_value_max: 2000000,
    response_deadline: new Date('2024-03-15'),
    naics_codes: ['541511', '541512'],
    set_aside_program: 'Small Business Set-Aside',
    contract_vehicle: 'GSA Schedule',
    location: 'Salt Lake City, UT',
    description: 'Comprehensive IT support services including help desk, network administration, and cybersecurity support.',
    opportunity_type: 'Services',
  },
  {
    id: '2',
    title: 'Software Development for Healthcare System',
    agency_name: 'Department of Veterans Affairs',
    estimated_value_min: 1000000,
    estimated_value_max: 5000000,
    response_deadline: new Date('2024-04-20'),
    naics_codes: ['541511', '621111'],
    set_aside_program: '8(a) Competitive',
    contract_vehicle: 'OASIS',
    location: 'Denver, CO',
    description: 'Development of patient management software system with integration to existing VA infrastructure.',
    opportunity_type: 'Development',
  },
  {
    id: '3',
    title: 'Construction Services for Military Base',
    agency_name: 'U.S. Air Force',
    estimated_value_min: 2000000,
    estimated_value_max: 10000000,
    response_deadline: new Date('2024-02-28'),
    naics_codes: ['236220', '237310'],
    set_aside_program: 'VOSB Set-Aside',
    contract_vehicle: 'Multiple Award Schedule',
    location: 'Hill AFB, UT',
    description: 'Construction and renovation of administrative buildings and support facilities.',
    opportunity_type: 'Construction',
  },
  {
    id: '4',
    title: 'Cybersecurity Assessment Services',
    agency_name: 'Department of Homeland Security',
    estimated_value_min: 300000,
    estimated_value_max: 1500000,
    response_deadline: new Date('2024-05-10'),
    naics_codes: ['541512', '541519'],
    set_aside_program: 'WOSB Set-Aside',
    contract_vehicle: 'SEWP',
    location: 'Washington, DC',
    description: 'Comprehensive cybersecurity assessment and penetration testing for critical infrastructure.',
    opportunity_type: 'Services',
  },
  {
    id: '5',
    title: 'Training and Development Program',
    agency_name: 'Department of Labor',
    estimated_value_min: 200000,
    estimated_value_max: 800000,
    response_deadline: new Date('2024-06-15'),
    naics_codes: ['611513', '541611'],
    set_aside_program: 'HUBZone Set-Aside',
    contract_vehicle: 'GSA Schedule',
    location: 'Salt Lake City, UT',
    description: 'Workforce development and training program for federal employees.',
    opportunity_type: 'Training',
  },
  {
    id: '6',
    title: 'Data Analytics Platform Development',
    agency_name: 'National Institutes of Health',
    estimated_value_min: 800000,
    estimated_value_max: 3000000,
    response_deadline: new Date('2024-04-05'),
    naics_codes: ['541511', '541690'],
    set_aside_program: 'Small Business Set-Aside',
    contract_vehicle: 'CIO-SP3',
    location: 'Bethesda, MD',
    description: 'Development of data analytics platform for research data management and analysis.',
    opportunity_type: 'Development',
  },
  {
    id: '7',
    title: 'Facilities Maintenance Services',
    agency_name: 'General Services Administration',
    estimated_value_min: 500000,
    estimated_value_max: 2500000,
    response_deadline: new Date('2024-03-30'),
    naics_codes: ['561210', '238220'],
    set_aside_program: 'Small Business Set-Aside',
    contract_vehicle: 'GSA Schedule',
    location: 'Multiple Locations',
    description: 'Comprehensive facilities maintenance and management services for federal buildings.',
    opportunity_type: 'Services',
  },
  {
    id: '8',
    title: 'Environmental Consulting Services',
    agency_name: 'Environmental Protection Agency',
    estimated_value_min: 400000,
    estimated_value_max: 1800000,
    response_deadline: new Date('2024-05-25'),
    naics_codes: ['541620', '541370'],
    set_aside_program: 'SDVOSB Set-Aside',
    contract_vehicle: 'OASIS',
    location: 'Denver, CO',
    description: 'Environmental impact assessments and compliance consulting services.',
    opportunity_type: 'Consulting',
  },
];

// Mock scoring service
const mockScoringService = {
  calculateMatchScore: (opportunity: any): number => {
    // Simple mock scoring based on opportunity characteristics
    let score = 50; // Base score
    
    // Boost for Utah location
    if (opportunity.location.includes('UT')) score += 20;
    
    // Boost for small business set-asides
    if (opportunity.set_aside_program?.includes('Small Business')) score += 15;
    
    // Boost for IT/Software opportunities
    if (opportunity.naics_codes.some((code: string) => code.startsWith('5415'))) score += 10;
    
    // Boost for moderate value range
    if (opportunity.estimated_value_min >= 500000 && opportunity.estimated_value_max <= 5000000) score += 10;
    
    return Math.min(100, Math.max(0, score));
  },
  
  calculateWinProbability: (opportunity: any): number => {
    // Simple mock win probability calculation
    let probability = 0.3; // Base probability
    
    // Higher probability for smaller contracts
    if (opportunity.estimated_value_max <= 1000000) probability += 0.2;
    
    // Higher probability for set-aside programs
    if (opportunity.set_aside_program) probability += 0.15;
    
    // Higher probability for Utah location
    if (opportunity.location.includes('UT')) probability += 0.1;
    
    return Math.min(0.95, Math.max(0.05, probability));
  },
  
  categorizeOpportunity: (matchScore: number, winProbability: number): OpportunityCategory => {
    if (matchScore >= 85 && winProbability >= 0.7) {
      return OpportunityCategory.HOT_LEAD;
    } else if (matchScore >= 70 && winProbability >= 0.5) {
      return OpportunityCategory.GOOD_MATCH;
    } else if (matchScore >= 50 && winProbability >= 0.3) {
      return OpportunityCategory.POTENTIAL;
    } else if (matchScore < 30 || winProbability < 0.2) {
      return OpportunityCategory.LOW_PRIORITY;
    } else {
      return OpportunityCategory.REVIEW_NEEDED;
    }
  },
  
  generateMatchDetails: (opportunity: any, matchScore: number): any[] => {
    const details = [];
    
    // NAICS Code Match
    if (opportunity.naics_codes.some((code: string) => code.startsWith('5415'))) {
      details.push({
        type: 'NAICS Code Match',
        score: 85,
        description: 'Strong match with IT services NAICS codes',
      });
    }
    
    // Location Match
    if (opportunity.location.includes('UT')) {
      details.push({
        type: 'Location Match',
        score: 90,
        description: 'Opportunity located in Utah',
      });
    }
    
    // Set-Aside Match
    if (opportunity.set_aside_program) {
      details.push({
        type: 'Set-Aside Program',
        score: 75,
        description: `Eligible for ${opportunity.set_aside_program}`,
      });
    }
    
    // Contract Vehicle Match
    if (opportunity.contract_vehicle) {
      details.push({
        type: 'Contract Vehicle',
        score: 70,
        description: `Available through ${opportunity.contract_vehicle}`,
      });
    }
    
    return details;
  },
  
  generateRecommendations: (opportunity: any, matchScore: number): string[] => {
    const recommendations = [];
    
    if (matchScore >= 80) {
      recommendations.push('High priority - Consider immediate response');
      recommendations.push('Review requirements and prepare detailed proposal');
    } else if (matchScore >= 60) {
      recommendations.push('Good match - Worth investigating further');
      recommendations.push('Check team availability and past performance');
    } else if (matchScore >= 40) {
      recommendations.push('Moderate match - Review if resources available');
      recommendations.push('Consider teaming with other companies');
    } else {
      recommendations.push('Low match - Focus on higher priority opportunities');
    }
    
    return recommendations;
  },
};

const OpportunitiesPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterPanelType>({
    naicsCodes: [],
    opportunityTypes: [],
    estimatedValueRange: { min: 0, max: 10000000 },
    dueDateRange: { start: null, end: null },
    locationRadius: 100,
    setAsidePrograms: [],
    contractVehicles: [],
    requiredCertifications: [],
    securityClearances: [],
    matchScoreRange: { min: 0, max: 100 },
    winProbabilityRange: { min: 0, max: 100 },
    competitionLevel: [],
    keywords: [],
    excludeKeywords: [],
    agencies: [],
    excludeAgencies: [],
  });
  
  const [scoredOpportunities, setScoredOpportunities] = useState<ScoredOpportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<ScoredOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Score and categorize opportunities on component mount
  useEffect(() => {
    const scoreOpportunities = () => {
      const scored = sampleOpportunities.map(opportunity => {
        const matchScore = mockScoringService.calculateMatchScore(opportunity);
        const winProbability = mockScoringService.calculateWinProbability(opportunity);
        const category = mockScoringService.categorizeOpportunity(matchScore, winProbability);
        const matchDetails = mockScoringService.generateMatchDetails(opportunity, matchScore);
        const recommendations = mockScoringService.generateRecommendations(opportunity, matchScore);
        
        return {
          opportunity,
          match_score: matchScore,
          win_probability: winProbability,
          category,
          match_details: matchDetails,
          recommendations,
        };
      });
      
      setScoredOpportunities(scored);
      setLoading(false);
    };
    
    // Simulate loading delay
    setTimeout(scoreOpportunities, 1000);
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    if (scoredOpportunities.length === 0) return;
    
    const filtered = applyFilters(scoredOpportunities, filters);
    setFilteredOpportunities(filtered);
  }, [filters, scoredOpportunities]);

  const applyFilters = (opportunities: ScoredOpportunity[], filters: FilterPanelType): ScoredOpportunity[] => {
    let filtered = [...opportunities];
    
    // Apply NAICS code filter
    if (filters.naicsCodes.length > 0) {
      filtered = filtered.filter(opp =>
        opp.opportunity.naics_codes.some(code =>
          filters.naicsCodes.some(filterCode =>
            code.startsWith(filterCode) || filterCode.startsWith(code.substring(0, 2))
          )
        )
      );
    }
    
    // Apply value range filter
    if (filters.estimatedValueRange) {
      filtered = filtered.filter(opp =>
        opp.opportunity.estimated_value_min >= filters.estimatedValueRange.min &&
        opp.opportunity.estimated_value_max <= filters.estimatedValueRange.max
      );
    }
    
    // Apply set-aside program filter
    if (filters.setAsidePrograms.length > 0) {
      filtered = filtered.filter(opp =>
        opp.opportunity.set_aside_program &&
        filters.setAsidePrograms.includes(opp.opportunity.set_aside_program)
      );
    }
    
    // Apply contract vehicle filter
    if (filters.contractVehicles.length > 0) {
      filtered = filtered.filter(opp =>
        opp.opportunity.contract_vehicle &&
        filters.contractVehicles.includes(opp.opportunity.contract_vehicle)
      );
    }
    
    // Apply match score filter
    if (filters.matchScoreRange) {
      filtered = filtered.filter(opp =>
        opp.match_score >= filters.matchScoreRange.min &&
        opp.match_score <= filters.matchScoreRange.max
      );
    }
    
    // Apply win probability filter
    if (filters.winProbabilityRange) {
      filtered = filtered.filter(opp =>
        opp.win_probability * 100 >= filters.winProbabilityRange.min &&
        opp.win_probability * 100 <= filters.winProbabilityRange.max
      );
    }
    
    // Apply keyword filter
    if (filters.keywords.length > 0) {
      filtered = filtered.filter(opp =>
        filters.keywords.some(keyword =>
          opp.opportunity.title.toLowerCase().includes(keyword.toLowerCase()) ||
          opp.opportunity.description.toLowerCase().includes(keyword.toLowerCase()) ||
          opp.opportunity.agency_name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    // Apply exclude keyword filter
    if (filters.excludeKeywords.length > 0) {
      filtered = filtered.filter(opp =>
        !filters.excludeKeywords.some(keyword =>
          opp.opportunity.title.toLowerCase().includes(keyword.toLowerCase()) ||
          opp.opportunity.description.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
    
    return filtered;
  };

  const handleFiltersChange = (newFilters: FilterPanelType) => {
    setFilters(newFilters);
  };

  const handleOpportunityMove = (opportunityId: string, fromCategory: OpportunityCategory, toCategory: OpportunityCategory) => {
    setScoredOpportunities(prev =>
      prev.map(opp =>
        opp.opportunity.id === opportunityId
          ? { ...opp, category: toCategory }
          : opp
      )
    );
  };

  const handleOpportunityClick = (opportunity: ScoredOpportunity) => {
    console.log('Opportunity clicked:', opportunity);
    // TODO: Implement opportunity detail view or navigation
  };

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Government Contracting Opportunities
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        This page displays government contracting opportunities with smart filtering and prioritization. 
        Opportunities are automatically scored and categorized based on your business profile and preferences.
      </Alert>

      <Grid container spacing={3}>
        {/* Filter Panel */}
        <Grid item xs={12} md={3}>
          <OpportunityFilterPanel
            onFiltersChange={handleFiltersChange}
            totalOpportunities={scoredOpportunities.length}
            filteredCount={filteredOpportunities.length}
          />
        </Grid>

        {/* Opportunity Board */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <OpportunityBoard
              opportunities={filteredOpportunities}
              onOpportunityMove={handleOpportunityMove}
              onOpportunityClick={handleOpportunityClick}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OpportunitiesPage; 