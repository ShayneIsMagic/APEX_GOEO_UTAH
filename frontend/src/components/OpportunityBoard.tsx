import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ViewColumn,
  ViewList,
  TableChart,
  DragIndicator,
  Visibility,
  Add,
  Block,
  Share,
  GetApp,
} from '@mui/icons-material';

// Types
export interface Opportunity {
  id: string;
  title: string;
  agency_name: string;
  estimated_value_min: number;
  estimated_value_max: number;
  response_deadline: Date;
  naics_codes: string[];
  set_aside_program?: string;
  contract_vehicle?: string;
  location: string;
  description: string;
  opportunity_type: string;
}

export interface ScoredOpportunity {
  opportunity: Opportunity;
  match_score: number;
  win_probability: number;
  category: OpportunityCategory;
  market_insights?: any;
  match_details: MatchDetail[];
  recommendations: string[];
}

export interface MatchDetail {
  type: string;
  score: number;
  description: string;
}

export enum OpportunityCategory {
  HOT_LEAD = 'hot_lead',
  GOOD_MATCH = 'good_match',
  POTENTIAL = 'potential',
  REVIEW_NEEDED = 'review_needed',
  LOW_PRIORITY = 'low_priority',
  EXCLUDE = 'exclude',
}

interface OpportunityBoardProps {
  opportunities: ScoredOpportunity[];
  onOpportunityMove?: (opportunityId: string, fromCategory: OpportunityCategory, toCategory: OpportunityCategory) => void;
  onOpportunityClick?: (opportunity: ScoredOpportunity) => void;
}

const OpportunityBoard: React.FC<OpportunityBoardProps> = ({
  opportunities,
  onOpportunityMove,
  onOpportunityClick,
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'list' | 'table'>('board');
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<ScoredOpportunity | null>(null);

  const categorizedOpportunities = useMemo(() => {
    const grouped = opportunities.reduce((acc, opp) => {
      const category = opp.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(opp);
      return acc;
    }, {} as Record<OpportunityCategory, ScoredOpportunity[]>);

    // Ensure all categories exist
    Object.values(OpportunityCategory).forEach(category => {
      if (!grouped[category]) {
        grouped[category] = [];
      }
    });

    return grouped;
  }, [opportunities]);

  const handleOpportunityClick = (opportunity: ScoredOpportunity) => {
    setSelectedOpportunity(opportunity);
    setDetailDialogOpen(true);
    onOpportunityClick?.(opportunity);
  };

  const handleOpportunityMove = (opportunityId: string, fromCategory: OpportunityCategory, toCategory: OpportunityCategory) => {
    onOpportunityMove?.(opportunityId, fromCategory, toCategory);
  };

  const handleBulkAction = async (action: string) => {
    switch (action) {
      case 'add_to_pipeline':
        // TODO: Implement add to pipeline
        console.log('Adding to pipeline:', selectedOpportunities);
        break;
      case 'exclude':
        // TODO: Implement exclude
        console.log('Excluding:', selectedOpportunities);
        break;
      case 'export':
        // TODO: Implement export
        console.log('Exporting:', selectedOpportunities);
        break;
      case 'share':
        // TODO: Implement share
        console.log('Sharing:', selectedOpportunities);
        break;
    }
    setSelectedOpportunities([]);
  };

  const toggleOpportunitySelection = (opportunityId: string) => {
    setSelectedOpportunities(prev => 
      prev.includes(opportunityId)
        ? prev.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };

  const getCategoryColor = (category: OpportunityCategory) => {
    switch (category) {
      case OpportunityCategory.HOT_LEAD:
        return 'error.main';
      case OpportunityCategory.GOOD_MATCH:
        return 'warning.main';
      case OpportunityCategory.POTENTIAL:
        return 'info.main';
      case OpportunityCategory.REVIEW_NEEDED:
        return 'secondary.main';
      case OpportunityCategory.LOW_PRIORITY:
        return 'text.secondary';
      case OpportunityCategory.EXCLUDE:
        return 'grey.500';
      default:
        return 'primary.main';
    }
  };

  const getCategoryLabel = (category: OpportunityCategory) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* View Mode Toggle */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Opportunities ({opportunities.length})
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Bulk Actions */}
          {selectedOpportunities.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleBulkAction('add_to_pipeline')}
                startIcon={<Add />}
              >
                Add to Pipeline ({selectedOpportunities.length})
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleBulkAction('exclude')}
                startIcon={<Block />}
              >
                Exclude
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleBulkAction('export')}
                startIcon={<GetApp />}
              >
                Export
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleBulkAction('share')}
                startIcon={<Share />}
              >
                Share
              </Button>
            </Box>
          )}
          
          {/* View Mode Toggle */}
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="board">
              <Tooltip title="Board View">
                <ViewColumn />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="list">
              <Tooltip title="List View">
                <ViewList />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="table">
              <Tooltip title="Table View">
                <TableChart />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Board View */}
      {viewMode === 'board' && (
        <Box className="kanban-board" sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2 }}>
          {Object.entries(categorizedOpportunities).map(([category, opps]) => (
            <OpportunityColumn
              key={category}
              category={category as OpportunityCategory}
              opportunities={opps}
              onOpportunityClick={handleOpportunityClick}
              onOpportunityMove={handleOpportunityMove}
              selectedOpportunities={selectedOpportunities}
              onToggleSelection={toggleOpportunitySelection}
            />
          ))}
        </Box>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <OpportunityListView 
          opportunities={opportunities}
          selectedOpportunities={selectedOpportunities}
          onToggleSelection={toggleOpportunitySelection}
          onOpportunityClick={handleOpportunityClick}
        />
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <OpportunityTableView 
          opportunities={opportunities}
          selectedOpportunities={selectedOpportunities}
          onToggleSelection={toggleOpportunitySelection}
          onOpportunityClick={handleOpportunityClick}
        />
      )}

      {/* Opportunity Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedOpportunity && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{selectedOpportunity.opportunity.title}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={`${selectedOpportunity.match_score}% Match`}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={`${Math.round(selectedOpportunity.win_probability * 100)}% Win Probability`}
                    color="secondary"
                    size="small"
                  />
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Agency: {selectedOpportunity.opportunity.agency_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Value: {formatCurrency(selectedOpportunity.opportunity.estimated_value_min)} - {formatCurrency(selectedOpportunity.opportunity.estimated_value_max)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Due Date: {formatDate(selectedOpportunity.opportunity.response_deadline)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Location: {selectedOpportunity.opportunity.location}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    NAICS Codes
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedOpportunity.opportunity.naics_codes.map((code) => (
                      <Chip key={code} label={code} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body2">
                    {selectedOpportunity.opportunity.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Match Details
                  </Typography>
                  <Grid container spacing={1}>
                    {selectedOpportunity.match_details.map((detail) => (
                      <Grid item xs={12} sm={6} key={detail.type}>
                        <Card variant="outlined">
                          <CardContent sx={{ py: 1, px: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2">{detail.description}</Typography>
                              <Chip
                                label={`${detail.score}%`}
                                size="small"
                                color={detail.score >= 80 ? 'success' : detail.score >= 60 ? 'warning' : 'error'}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
              <Button variant="contained" color="primary">
                Add to Pipeline
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

// Opportunity Column Component
interface OpportunityColumnProps {
  category: OpportunityCategory;
  opportunities: ScoredOpportunity[];
  onOpportunityClick: (opportunity: ScoredOpportunity) => void;
  onOpportunityMove: (opportunityId: string, fromCategory: OpportunityCategory, toCategory: OpportunityCategory) => void;
  selectedOpportunities: string[];
  onToggleSelection: (opportunityId: string) => void;
}

const OpportunityColumn: React.FC<OpportunityColumnProps> = ({
  category,
  opportunities,
  onOpportunityClick,
  onOpportunityMove,
  selectedOpportunities,
  onToggleSelection,
}) => {
  const getCategoryColor = (category: OpportunityCategory) => {
    switch (category) {
      case OpportunityCategory.HOT_LEAD:
        return 'error.main';
      case OpportunityCategory.GOOD_MATCH:
        return 'warning.main';
      case OpportunityCategory.POTENTIAL:
        return 'info.main';
      case OpportunityCategory.REVIEW_NEEDED:
        return 'secondary.main';
      case OpportunityCategory.LOW_PRIORITY:
        return 'text.secondary';
      case OpportunityCategory.EXCLUDE:
        return 'grey.500';
      default:
        return 'primary.main';
    }
  };

  const getCategoryLabel = (category: OpportunityCategory) => {
    return category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Box
      sx={{
        minWidth: 320,
        maxWidth: 320,
        backgroundColor: 'grey.50',
        borderRadius: 2,
        p: 2,
        border: 1,
        borderColor: 'grey.200',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" color={getCategoryColor(category)}>
          {getCategoryLabel(category)}
        </Typography>
        <Badge badgeContent={opportunities.length} color="primary">
          <Box sx={{ width: 24, height: 24 }} />
        </Badge>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minHeight: 200 }}>
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.opportunity.id}
            opportunity={opportunity}
            onClick={() => onOpportunityClick(opportunity)}
            isSelected={selectedOpportunities.includes(opportunity.opportunity.id)}
            onToggleSelection={() => onToggleSelection(opportunity.opportunity.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

// Opportunity Card Component
interface OpportunityCardProps {
  opportunity: ScoredOpportunity;
  onClick: () => void;
  isSelected: boolean;
  onToggleSelection: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onClick,
  isSelected,
  onToggleSelection,
}) => {
  const { opp, match_score, win_probability, category } = opportunity;

  const getCategoryColor = (category: OpportunityCategory) => {
    switch (category) {
      case OpportunityCategory.HOT_LEAD:
        return 'error.main';
      case OpportunityCategory.GOOD_MATCH:
        return 'warning.main';
      case OpportunityCategory.POTENTIAL:
        return 'info.main';
      case OpportunityCategory.REVIEW_NEEDED:
        return 'secondary.main';
      case OpportunityCategory.LOW_PRIORITY:
        return 'text.secondary';
      case OpportunityCategory.EXCLUDE:
        return 'grey.500';
      default:
        return 'primary.main';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'grey.300',
        backgroundColor: isSelected ? 'primary.50' : 'white',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header with Score */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Chip
              label={`${match_score}%`}
              size="small"
              color="primary"
              sx={{ fontSize: '0.75rem' }}
            />
            <Chip
              label={`${Math.round(win_probability * 100)}%`}
              size="small"
              color="secondary"
              sx={{ fontSize: '0.75rem' }}
            />
          </Box>
          <Chip
            label={category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            size="small"
            sx={{ 
              backgroundColor: getCategoryColor(category),
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
        </Box>

        {/* Opportunity Details */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {opp.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {opp.agency_name}
        </Typography>
        <Typography variant="caption" color="primary" sx={{ display: 'block', mb: 1 }}>
          {formatCurrency(opp.estimated_value_min)} - {formatCurrency(opp.estimated_value_max)}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          Due: {formatDate(opp.response_deadline)}
        </Typography>

        {/* Quick Actions */}
        <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSelection();
            }}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            {isSelected ? 'Deselect' : 'Select'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// List View Component
interface OpportunityListViewProps {
  opportunities: ScoredOpportunity[];
  selectedOpportunities: string[];
  onToggleSelection: (opportunityId: string) => void;
  onOpportunityClick: (opportunity: ScoredOpportunity) => void;
}

const OpportunityListView: React.FC<OpportunityListViewProps> = ({
  opportunities,
  selectedOpportunities,
  onToggleSelection,
  onOpportunityClick,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {opportunities.map((opportunity) => (
        <Card
          key={opportunity.opportunity.id}
          sx={{
            cursor: 'pointer',
            border: selectedOpportunities.includes(opportunity.opportunity.id) ? 2 : 1,
            borderColor: selectedOpportunities.includes(opportunity.opportunity.id) ? 'primary.main' : 'grey.300',
            backgroundColor: selectedOpportunities.includes(opportunity.opportunity.id) ? 'primary.50' : 'white',
          }}
          onClick={() => onOpportunityClick(opportunity)}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <input
                  type="checkbox"
                  checked={selectedOpportunities.includes(opportunity.opportunity.id)}
                  onChange={() => onToggleSelection(opportunity.opportunity.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {opportunity.opportunity.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {opportunity.opportunity.agency_name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">
                  ${(opportunity.opportunity.estimated_value_min / 1000000).toFixed(1)}M - ${(opportunity.opportunity.estimated_value_max / 1000000).toFixed(1)}M
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">
                  {new Date(opportunity.opportunity.response_deadline).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`${opportunity.match_score}%`} size="small" color="primary" />
                  <Chip label={`${Math.round(opportunity.win_probability * 100)}%`} size="small" color="secondary" />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Chip
                  label={opportunity.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  size="small"
                  sx={{ backgroundColor: 'primary.main', color: 'white' }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

// Table View Component
interface OpportunityTableViewProps {
  opportunities: ScoredOpportunity[];
  selectedOpportunities: string[];
  onToggleSelection: (opportunityId: string) => void;
  onOpportunityClick: (opportunity: ScoredOpportunity) => void;
}

const OpportunityTableView: React.FC<OpportunityTableViewProps> = ({
  opportunities,
  selectedOpportunities,
  onToggleSelection,
  onOpportunityClick,
}) => {
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'grey.100' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>
              <input
                type="checkbox"
                checked={selectedOpportunities.length === opportunities.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    opportunities.forEach(opp => onToggleSelection(opp.opportunity.id));
                  } else {
                    opportunities.forEach(opp => onToggleSelection(opp.opportunity.id));
                  }
                }}
              />
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Title</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Agency</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Value</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Due Date</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Match Score</th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid grey.300' }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr
              key={opportunity.opportunity.id}
              style={{
                backgroundColor: selectedOpportunities.includes(opportunity.opportunity.id) ? 'primary.50' : 'white',
                cursor: 'pointer',
              }}
              onClick={() => onOpportunityClick(opportunity)}
            >
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                <input
                  type="checkbox"
                  checked={selectedOpportunities.includes(opportunity.opportunity.id)}
                  onChange={() => onToggleSelection(opportunity.opportunity.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                {opportunity.opportunity.title}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                {opportunity.opportunity.agency_name}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                ${(opportunity.opportunity.estimated_value_min / 1000000).toFixed(1)}M - ${(opportunity.opportunity.estimated_value_max / 1000000).toFixed(1)}M
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                {new Date(opportunity.opportunity.response_deadline).toLocaleDateString()}
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={`${opportunity.match_score}%`} size="small" color="primary" />
                  <Chip label={`${Math.round(opportunity.win_probability * 100)}%`} size="small" color="secondary" />
                </Box>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid grey.200' }}>
                <Chip
                  label={opportunity.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  size="small"
                  sx={{ backgroundColor: 'primary.main', color: 'white' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default OpportunityBoard; 