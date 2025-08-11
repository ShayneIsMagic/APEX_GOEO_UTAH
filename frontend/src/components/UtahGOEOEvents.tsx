import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Computer as VirtualIcon,
  Search as SearchIcon,
  Facebook,
  Instagram,
  Twitter,
  LinkedIn,
  YouTube,
  OpenInNew as OpenIcon
} from '@mui/icons-material';

interface UtahGOEOEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  location: string;
  is_virtual: boolean;
  registration_url?: string;
  contact_info?: string;
  tags: string[];
}

interface SocialMediaPlatform {
  name: string;
  url: string;
  icon: string;
  description: string;
  followers?: number;
}

const UtahGOEOEvents: React.FC = () => {
  const [events, setEvents] = useState<UtahGOEOEvent[]>([]);
  const [socialMedia, setSocialMedia] = useState<SocialMediaPlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [virtualOnly, setVirtualOnly] = useState<boolean | null>(null);

  useEffect(() => {
    fetchEvents();
    fetchSocialMedia();
  }, [selectedCategory, virtualOnly]);

  const fetchEvents = async () => {
    try {
      let url = 'http://localhost:8000/api/utah-goeo/events';
      const params = new URLSearchParams();
      
      if (selectedCategory) params.append('category', selectedCategory);
      if (virtualOnly !== null) params.append('virtual_only', virtualOnly.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialMedia = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/utah-goeo/social-media');
      const data = await response.json();
      setSocialMedia(data);
    } catch (error) {
      console.error('Error fetching social media:', error);
    }
  };

  const searchEvents = async () => {
    if (!searchQuery.trim()) {
      fetchEvents();
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8000/api/utah-goeo/events/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setEvents(data.results);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const getSocialMediaIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'facebook': return <Facebook />;
      case 'instagram': return <Instagram />;
      case 'twitter': return <Twitter />;
      case 'linkedin': return <LinkedIn />;
      case 'youtube': return <YouTube />;
      default: return <OpenIcon />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'APEX Webinar': return 'primary';
      case 'Tourism': return 'success';
      case 'Manufacturing': return 'warning';
      case 'Workshop': return 'info';
      case 'Symposium': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Utah GOEO Events & Social Media
      </Typography>
      
      {/* Social Media Section */}
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Connect with Utah GOEO" />
        <CardContent>
          <Grid container spacing={2}>
            {socialMedia.map((platform) => (
              <Grid item xs={12} sm={6} md={4} key={platform.name}>
                <Card variant="outlined">
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      {getSocialMediaIcon(platform.icon)}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {platform.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {platform.description}
                    </Typography>
                    {platform.followers && (
                      <Typography variant="caption" color="text.secondary">
                        {platform.followers.toLocaleString()} followers
                      </Typography>
                    )}
                    <Box mt={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenIcon />}
                      >
                        Follow
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Events Section */}
      <Card>
        <CardHeader title="Upcoming Events" />
        <CardContent>
          {/* Search and Filter Controls */}
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search Events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchEvents()}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={searchEvents}>
                        <SearchIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="APEX Webinar">APEX Webinar</MenuItem>
                    <MenuItem value="Tourism">Tourism</MenuItem>
                    <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
                    <MenuItem value="Symposium">Symposium</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={virtualOnly === null ? '' : virtualOnly.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      setVirtualOnly(value === '' ? null : value === 'true');
                    }}
                    label="Event Type"
                  >
                    <MenuItem value="">All Events</MenuItem>
                    <MenuItem value="true">Virtual Only</MenuItem>
                    <MenuItem value="false">In-Person Only</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setVirtualOnly(null);
                    fetchEvents();
                  }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Events List */}
          {loading ? (
            <Typography>Loading events...</Typography>
          ) : events.length === 0 ? (
            <Typography color="text.secondary">No events found.</Typography>
          ) : (
            <Grid container spacing={2}>
              {events.map((event) => (
                <Grid item xs={12} key={event.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box flex={1}>
                          <Typography variant="h6" gutterBottom>
                            {event.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {event.description}
                          </Typography>
                        </Box>
                        <Chip
                          label={event.category}
                          color={getCategoryColor(event.category) as any}
                          size="small"
                        />
                      </Box>
                      
                      <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            <TimeIcon sx={{ mr: 1, fontSize: 'small' }} />
                            <Typography variant="body2">
                              {formatDate(event.start_date)} - {formatDate(event.end_date)}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box display="flex" alignItems="center" mb={1}>
                            {event.is_virtual ? (
                              <VirtualIcon sx={{ mr: 1, fontSize: 'small' }} />
                            ) : (
                              <LocationIcon sx={{ mr: 1, fontSize: 'small' }} />
                            )}
                            <Typography variant="body2">
                              {event.location}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      {event.tags.length > 0 && (
                        <Box mb={2}>
                          {event.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      )}

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          {event.contact_info && (
                            <Typography variant="caption" color="text.secondary">
                              Contact: {event.contact_info}
                            </Typography>
                          )}
                        </Box>
                        <Box>
                          {event.registration_url && (
                            <Button
                              variant="contained"
                              size="small"
                              href={event.registration_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              endIcon={<OpenIcon />}
                            >
                              Register
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UtahGOEOEvents; 