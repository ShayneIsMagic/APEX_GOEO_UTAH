from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from utah_goeo_events import utah_goeo_service, EventCategory, UtahGOEOEvent, SocialMediaPlatform

app = FastAPI(
    title="Utah Government Contracting Hub API",
    description="A comprehensive digital platform for government contracting opportunities with Utah GOEO integration",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Utah Government Contracting Hub API",
        "version": "1.0.0",
        "status": "running",
        "features": [
            "Government Contracting Opportunities",
            "Utah GOEO Events Integration",
            "Social Media Connectivity",
            "Capability Matching System"
        ]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "utah-government-contracting-hub"}

# Utah GOEO Events Endpoints
@app.get("/api/utah-goeo/events", response_model=List[dict])
async def get_utah_goeo_events(
    category: Optional[str] = Query(None, description="Filter by event category"),
    virtual_only: Optional[bool] = Query(None, description="Filter virtual events only"),
    days_ahead: Optional[int] = Query(30, description="Number of days ahead to look for events")
):
    """Get Utah GOEO events with optional filtering"""
    events = utah_goeo_service.get_upcoming_events(days_ahead)
    
    if category:
        try:
            event_category = EventCategory(category)
            events = [e for e in events if e.category == event_category]
        except ValueError:
            return {"error": f"Invalid category: {category}"}
    
    if virtual_only is not None:
        events = [e for e in events if e.is_virtual == virtual_only]
    
    return [
        {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "category": event.category.value,
            "start_date": event.start_date.isoformat(),
            "end_date": event.end_date.isoformat(),
            "location": event.location,
            "is_virtual": event.is_virtual,
            "registration_url": event.registration_url,
            "contact_info": event.contact_info,
            "tags": event.tags
        }
        for event in events
    ]

@app.get("/api/utah-goeo/events/search")
async def search_utah_goeo_events(query: str = Query(..., description="Search query")):
    """Search Utah GOEO events"""
    events = utah_goeo_service.search_events(query)
    return {
        "query": query,
        "results": [
            {
                "id": event.id,
                "title": event.title,
                "description": event.description,
                "category": event.category.value,
                "start_date": event.start_date.isoformat(),
                "end_date": event.end_date.isoformat(),
                "location": event.location,
                "is_virtual": event.is_virtual,
                "registration_url": event.registration_url,
                "contact_info": event.contact_info,
                "tags": event.tags
            }
            for event in events
        ]
    }

@app.get("/api/utah-goeo/events/categories")
async def get_event_categories():
    """Get all available event categories"""
    return {
        "categories": [
            {
                "value": category.value,
                "name": category.name,
                "description": f"Events in the {category.value} category"
            }
            for category in EventCategory
        ]
    }

# Social Media Endpoints
@app.get("/api/utah-goeo/social-media", response_model=List[dict])
async def get_social_media_platforms():
    """Get all Utah GOEO social media platforms"""
    platforms = utah_goeo_service.get_social_media_platforms()
    return [
        {
            "name": platform.name,
            "url": platform.url,
            "icon": platform.icon,
            "description": platform.description,
            "followers": platform.followers
        }
        for platform in platforms
    ]

@app.get("/api/utah-goeo/social-media/{platform_name}")
async def get_social_media_platform(platform_name: str):
    """Get specific social media platform"""
    platform = utah_goeo_service.get_social_media_by_platform(platform_name)
    if not platform:
        return {"error": f"Platform '{platform_name}' not found"}
    
    return {
        "name": platform.name,
        "url": platform.url,
        "icon": platform.icon,
        "description": platform.description,
        "followers": platform.followers
    }

# Original endpoints
@app.get("/api/opportunities")
async def get_opportunities():
    """Get sample opportunities"""
    return {
        "opportunities": [
            {
                "id": "opp-001",
                "title": "IT Services Contract",
                "agency": "Department of Defense",
                "value": "$500,000 - $1,000,000",
                "deadline": "2025-09-15",
                "match_score": 85
            },
            {
                "id": "opp-002", 
                "title": "Construction Services",
                "agency": "General Services Administration",
                "value": "$1,000,000 - $5,000,000",
                "deadline": "2025-10-01",
                "match_score": 72
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 