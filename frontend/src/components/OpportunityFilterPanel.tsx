import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore,
  FilterList,
  Save,
  Refresh,
  TrendingUp,
  Business,
  LocationOn,
  AttachMoney,
  Schedule,
} from '@mui/icons-material';

// Types
export interface OpportunityFilterPanel {
  // Core Filters
  naicsCodes: string[];
  opportunityTypes: string[];
  estimatedValueRange: { min: number; max: number };
  dueDateRange: { start: Date | null; end: Date | null };
  locationRadius: number;
  
  // Advanced Filters
  setAsidePrograms: string[];
  contractVehicles: string[];
  requiredCertifications: string[];
  securityClearances: string[];
  
  // Business-Specific Filters
  matchScoreRange: { min: number; max: number };
  winProbabilityRange: { min: number; max: number };
  competitionLevel: string[];
  
  // Custom Filters
  keywords: string[];
  excludeKeywords: string[];
  agencies: string[];
  excludeAgencies: string[];
}

export interface SavedFilter {
  id: string;
  name: string;
  description: string;
  filters: OpportunityFilterPanel;
  isDefault: boolean;
  createdBy: string;
  createdAt: Date;
  usageCount: number;
}

export interface QuickFilter {
  id: string;
  name: string;
  description: string;
  filters: Partial<OpportunityFilterPanel>;
}

// Default filters
const defaultFilters: OpportunityFilterPanel = {
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
};

// Quick filter presets
const quickFilters: QuickFilter[] = [
  {
    id: 'hot-leads',
    name: 'Hot Leads',
    description: 'High match score, high win probability',
    filters: {
      matchScoreRange: { min: 80, max: 100 },
      winProbabilityRange: { min: 70, max: 100 },
    },
  },
  {
    id: 'small-business',
    name: 'Small Business Set-Asides',
    description: 'Small business opportunities only',
    filters: {
      setAsidePrograms: ['Small Business Set-Aside', '8(a) Competitive', 'WOSB Set-Aside'],
    },
  },
  {
    id: 'high-value',
    name: 'High Value Contracts',
    description: 'Contracts over $1M',
    filters: {
      estimatedValueRange: { min: 1000000, max: 10000000 },
    },
  },
  {
    id: 'urgent',
    name: 'Urgent Deadlines',
    description: 'Due within 30 days',
    filters: {
      dueDateRange: { 
        start: new Date(), 
        end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
      },
    },
  },
];

interface OpportunityFilterPanelProps {
  onFiltersChange: (filters: OpportunityFilterPanel) => void;
  totalOpportunities: number;
  filteredCount: number;
}

const OpportunityFilterPanel: React.FC<OpportunityFilterPanelProps> = ({
  onFiltersChange,
  totalOpportunities,
  filteredCount,
}) => {
  const [filters, setFilters] = useState<OpportunityFilterPanel>(defaultFilters);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>(['core']);

  // Real-time filtering
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof OpportunityFilterPanel, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleQuickFilter = (quickFilter: QuickFilter) => {
    setFilters(prev => ({
      ...prev,
      ...quickFilter.filters,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const saveCurrentFilter = async (name: string, description: string) => {
    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name,
      description,
      filters: { ...filters },
      isDefault: false,
      createdBy: 'current-user', // TODO: Get from auth context
      createdAt: new Date(),
      usageCount: 0,
    };
    
    setSavedFilters(prev => [...prev, newFilter]);
    // TODO: Save to backend
  };

  const loadSavedFilter = (filter: SavedFilter) => {
    setFilters(filter.filters);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const matchBreakdown = useMemo(() => {
    // Calculate match breakdown based on current filters
    return {
      hotLeads: Math.floor(filteredCount * 0.2),
      goodMatches: Math.floor(filteredCount * 0.4),
      potential: Math.floor(filteredCount * 0.3),
      lowPriority: Math.floor(filteredCount * 0.1),
    };
  }, [filteredCount]);

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      {/* Quick Filter Buttons */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Filters
          </Typography>
          <Grid container spacing={1}>
            {quickFilters.map((filter) => (
              <Grid item key={filter.id}>
                <Chip
                  label={filter.name}
                  onClick={() => handleQuickFilter(filter)}
                  variant="outlined"
                  size="small"
                  icon={<TrendingUp />}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Results Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Total Opportunities
              </Typography>
              <Typography variant="h6" color="primary">
                {totalOpportunities}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Filtered Results
              </Typography>
              <Typography variant="h6" color="success.main">
                {filteredCount}
              </Typography>
            </Grid>
          </Grid>
          
          {/* Match Breakdown */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Match Breakdown
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="error.main">
                    {matchBreakdown.hotLeads}
                  </Typography>
                  <Typography variant="caption">Hot Leads</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">
                    {matchBreakdown.goodMatches}
                  </Typography>
                  <Typography variant="caption">Good Matches</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="info.main">
                    {matchBreakdown.potential}
                  </Typography>
                  <Typography variant="caption">Potential</Typography>
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">
                    {matchBreakdown.lowPriority}
                  </Typography>
                  <Typography variant="caption">Low Priority</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Advanced Filter Controls */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Advanced Filters
            </Typography>
            <Box>
              <Tooltip title="Save Filter">
                <IconButton size="small" onClick={() => saveCurrentFilter('My Filter', 'Description')}>
                  <Save />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset Filters">
                <IconButton size="small" onClick={resetFilters}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Core Filters */}
          <Accordion 
            expanded={expandedSections.includes('core')}
            onChange={() => toggleSection('core')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <FilterList sx={{ mr: 1 }} />
              <Typography>Core Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* NAICS Codes */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="NAICS Codes"
                    placeholder="Enter NAICS codes separated by commas"
                    value={filters.naicsCodes.join(', ')}
                    onChange={(e) => handleFilterChange('naicsCodes', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    size="small"
                  />
                </Grid>

                {/* Value Range */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Estimated Value Range</Typography>
                  <Slider
                    value={[filters.estimatedValueRange.min, filters.estimatedValueRange.max]}
                    onChange={(_, value) => handleFilterChange('estimatedValueRange', { 
                      min: value[0], 
                      max: value[1] 
                    })}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000000}
                    step={100000}
                    valueLabelFormat={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                </Grid>

                {/* Location Radius */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Location Radius: {filters.locationRadius} miles</Typography>
                  <Slider
                    value={filters.locationRadius}
                    onChange={(_, value) => handleFilterChange('locationRadius', value)}
                    min={0}
                    max={500}
                    step={10}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 100, label: '100' },
                      { value: 500, label: '500' },
                    ]}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Advanced Filters */}
          <Accordion 
            expanded={expandedSections.includes('advanced')}
            onChange={() => toggleSection('advanced')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Business sx={{ mr: 1 }} />
              <Typography>Advanced Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Set-Aside Programs */}
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Set-Aside Programs</InputLabel>
                    <Select
                      multiple
                      value={filters.setAsidePrograms}
                      onChange={(e) => handleFilterChange('setAsidePrograms', e.target.value)}
                      label="Set-Aside Programs"
                    >
                      <MenuItem value="Small Business Set-Aside">Small Business Set-Aside</MenuItem>
                      <MenuItem value="8(a) Sole Source">8(a) Sole Source</MenuItem>
                      <MenuItem value="8(a) Competitive">8(a) Competitive</MenuItem>
                      <MenuItem value="WOSB Set-Aside">WOSB Set-Aside</MenuItem>
                      <MenuItem value="EDWOSB Set-Aside">EDWOSB Set-Aside</MenuItem>
                      <MenuItem value="VOSB Set-Aside">VOSB Set-Aside</MenuItem>
                      <MenuItem value="SDVOSB Set-Aside">SDVOSB Set-Aside</MenuItem>
                      <MenuItem value="HUBZone Set-Aside">HUBZone Set-Aside</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Contract Vehicles */}
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Contract Vehicles</InputLabel>
                    <Select
                      multiple
                      value={filters.contractVehicles}
                      onChange={(e) => handleFilterChange('contractVehicles', e.target.value)}
                      label="Contract Vehicles"
                    >
                      <MenuItem value="GSA Schedule">GSA Schedule</MenuItem>
                      <MenuItem value="SEWP">SEWP (NASA)</MenuItem>
                      <MenuItem value="CIO-SP3">CIO-SP3 (NIH)</MenuItem>
                      <MenuItem value="OASIS">OASIS (GSA)</MenuItem>
                      <MenuItem value="Alliant 2">Alliant 2 (GSA)</MenuItem>
                      <MenuItem value="STARS III">STARS III (GSA)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Business-Specific Filters */}
          <Accordion 
            expanded={expandedSections.includes('business')}
            onChange={() => toggleSection('business')}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography>Business Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Match Score Range */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Match Score Range: {filters.matchScoreRange.min}% - {filters.matchScoreRange.max}%</Typography>
                  <Slider
                    value={[filters.matchScoreRange.min, filters.matchScoreRange.max]}
                    onChange={(_, value) => handleFilterChange('matchScoreRange', { 
                      min: value[0], 
                      max: value[1] 
                    })}
                    min={0}
                    max={100}
                    step={5}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 50, label: '50%' },
                      { value: 100, label: '100%' },
                    ]}
                  />
                </Grid>

                {/* Win Probability Range */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Win Probability: {filters.winProbabilityRange.min}% - {filters.winProbabilityRange.max}%</Typography>
                  <Slider
                    value={[filters.winProbabilityRange.min, filters.winProbabilityRange.max]}
                    onChange={(_, value) => handleFilterChange('winProbabilityRange', { 
                      min: value[0], 
                      max: value[1] 
                    })}
                    min={0}
                    max={100}
                    step={5}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 50, label: '50%' },
                      { value: 100, label: '100%' },
                    ]}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Saved Filters */}
          {savedFilters.length > 0 && (
            <Accordion 
              expanded={expandedSections.includes('saved')}
              onChange={() => toggleSection('saved')}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Save sx={{ mr: 1 }} />
                <Typography>Saved Filters ({savedFilters.length})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {savedFilters.map((filter) => (
                    <Grid item xs={12} key={filter.id}>
                      <Chip
                        label={filter.name}
                        onClick={() => loadSavedFilter(filter)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OpportunityFilterPanel; 