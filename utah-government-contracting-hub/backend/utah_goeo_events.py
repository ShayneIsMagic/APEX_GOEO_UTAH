"""
Utah GOEO Events and Social Media Integration
Handles events from business.utah.gov and social media connections
"""

from datetime import datetime, timedelta
from typing import List, Dict, Optional
from dataclasses import dataclass
from enum import Enum

class EventCategory(Enum):
    APEX_WEBINAR = "APEX Webinar"
    TOURISM = "Tourism"
    MANUFACTURING = "Manufacturing"
    NETWORKING = "Networking"
    WORKSHOP = "Workshop"
    SYMPOSIUM = "Symposium"
    VIRTUAL = "Virtual Event"

@dataclass
class UtahGOEOEvent:
    id: str
    title: str
    description: str
    category: EventCategory
    start_date: datetime
    end_date: datetime
    location: str
    is_virtual: bool
    registration_url: Optional[str]
    contact_info: Optional[str]
    tags: List[str]

@dataclass
class SocialMediaPlatform:
    name: str
    url: str
    icon: str
    description: str
    followers: Optional[int] = None

class UtahGOEOEventsService:
    """Service to manage Utah GOEO events and social media integration"""
    
    def __init__(self):
        self.events: List[UtahGOEOEvent] = []
        self.social_media_platforms: List[SocialMediaPlatform] = []
        self._initialize_events()
        self._initialize_social_media()
    
    def _initialize_events(self):
        """Initialize with current Utah GOEO events"""
        current_date = datetime.now()
        
        self.events = [
            UtahGOEOEvent(
                id="apex-2025-08-12",
                title="APEX Webinar: Navigating the Valley of Death: A Survival Guide for Startups",
                description="These webinars are offered free of charge to APEX clients. Contact your APEX Regional Manager for the access code.",
                category=EventCategory.APEX_WEBINAR,
                start_date=datetime(2025, 8, 12, 11, 0),
                end_date=datetime(2025, 8, 12, 12, 30),
                location="Virtual",
                is_virtual=True,
                registration_url="https://business.utah.gov/apex",
                contact_info="Contact APEX Regional Manager",
                tags=["startup", "survival", "business development"]
            ),
            UtahGOEOEvent(
                id="physna-2025-08-12",
                title="Physna Webinar | Free Government Contracting Resource for Manufacturers and Suppliers",
                description="Join UT APEX Accelerator and Physna to learn more about Physna's technology and how it impacts Department of Defense (DOD) procurement and sustainment initiatives.",
                category=EventCategory.MANUFACTURING,
                start_date=datetime(2025, 8, 12, 12, 0),
                end_date=datetime(2025, 8, 12, 13, 30),
                location="Virtual",
                is_virtual=True,
                registration_url=None,
                contact_info="UT APEX Accelerator",
                tags=["manufacturing", "DOD", "procurement", "3D technology"]
            ),
            UtahGOEOEvent(
                id="tourism-2025-08-11",
                title="Tourism Business Development Workshop",
                description="The Tourism Business Development Workshop is offered at no cost to participants thanks to one-time funding from the American Rescue Plan Act (ARPA).",
                category=EventCategory.TOURISM,
                start_date=datetime(2025, 8, 11, 9, 0),
                end_date=datetime(2025, 8, 12, 17, 0),
                location="Cedar City, UT",
                is_virtual=False,
                registration_url=None,
                contact_info="Economic Development Administration (EDA)",
                tags=["tourism", "business development", "ARPA funding"]
            ),
            UtahGOEOEvent(
                id="apex-2025-08-14",
                title="APEX Webinar: Proposal Framing – Structuring Your Proposal for Maximum Impact",
                description="Learn how to structure your government contract proposals for maximum impact and success.",
                category=EventCategory.APEX_WEBINAR,
                start_date=datetime(2025, 8, 14, 11, 0),
                end_date=datetime(2025, 8, 14, 12, 30),
                location="Virtual",
                is_virtual=True,
                registration_url="https://business.utah.gov/apex",
                contact_info="Contact APEX Regional Manager",
                tags=["proposal writing", "government contracts", "business development"]
            ),
            UtahGOEOEvent(
                id="apex-2025-08-19",
                title="APEX Webinar: Advanced Teaming Strategies to Accelerate Small Business Government Revenue (2025 Update)",
                description="Updated strategies for small businesses to accelerate government revenue through effective teaming.",
                category=EventCategory.APEX_WEBINAR,
                start_date=datetime(2025, 8, 19, 11, 0),
                end_date=datetime(2025, 8, 19, 12, 30),
                location="Virtual",
                is_virtual=True,
                registration_url="https://business.utah.gov/apex",
                contact_info="Contact APEX Regional Manager",
                tags=["teaming", "small business", "government revenue"]
            ),
            UtahGOEOEvent(
                id="dibbs-2025-08-21",
                title="Introduction to DIBBS Webinar",
                description="Discover what the DLA Internet Bid Board System (DIBBS) can do for your business. Learn how to use this web-based application, view and submit secure quotes.",
                category=EventCategory.WORKSHOP,
                start_date=datetime(2025, 8, 21, 9, 0),
                end_date=datetime(2025, 8, 21, 10, 30),
                location="Virtual",
                is_virtual=True,
                registration_url=None,
                contact_info="DLA",
                tags=["DIBBS", "DLA", "bidding", "procurement"]
            ),
            UtahGOEOEvent(
                id="apex-2025-08-21",
                title="APEX Webinar: Indirect Costs and Rates",
                description="Understanding indirect costs and rates for government contracting.",
                category=EventCategory.APEX_WEBINAR,
                start_date=datetime(2025, 8, 21, 11, 0),
                end_date=datetime(2025, 8, 21, 12, 30),
                location="Virtual",
                is_virtual=True,
                registration_url="https://business.utah.gov/apex",
                contact_info="Contact APEX Regional Manager",
                tags=["indirect costs", "rates", "accounting"]
            ),
            UtahGOEOEvent(
                id="apex-2025-08-26",
                title="APEX Webinar: Leveraging FOIA to Win Government Contracts",
                description="Learn how to use the Freedom of Information Act (FOIA) to gain competitive advantages in government contracting.",
                category=EventCategory.APEX_WEBINAR,
                start_date=datetime(2025, 8, 26, 11, 0),
                end_date=datetime(2025, 8, 26, 12, 30),
                location="Virtual",
                is_virtual=True,
                registration_url="https://business.utah.gov/apex",
                contact_info="Contact APEX Regional Manager",
                tags=["FOIA", "government contracts", "competitive intelligence"]
            ),
            UtahGOEOEvent(
                id="manufacturing-2025-09-09",
                title="Casting, Forging, and Machining: Insights from DOD Industry Experts",
                description="Join the APEX Accelerators for an informative afternoon featuring industry experts from the Department of Defense's casting, forging, and machining programs.",
                category=EventCategory.MANUFACTURING,
                start_date=datetime(2025, 9, 9, 11, 0),
                end_date=datetime(2025, 9, 9, 14, 0),
                location="TBD",
                is_virtual=False,
                registration_url=None,
                contact_info="APEX Accelerators",
                tags=["manufacturing", "DOD", "casting", "forging", "machining"]
            ),
            UtahGOEOEvent(
                id="symposium-2025-10-16",
                title="APEX Accelerator Annual 2025 Symposium",
                description="Join us for an exciting day of speakers, breakout sessions, exhibitors, matchmaking, and business-to-business networking.",
                category=EventCategory.SYMPOSIUM,
                start_date=datetime(2025, 10, 16, 8, 30),
                end_date=datetime(2025, 10, 16, 15, 0),
                location="Salt Lake Community College Miller Campus, 9750 S. 300 W., Sandy, UT",
                is_virtual=False,
                registration_url=None,
                contact_info="APEX Accelerator",
                tags=["symposium", "networking", "matchmaking", "business development"]
            )
        ]
    
    def _initialize_social_media(self):
        """Initialize social media platforms"""
        self.social_media_platforms = [
            SocialMediaPlatform(
                name="Facebook",
                url="https://www.facebook.com/businessutah",
                icon="facebook",
                description="Follow Utah GOEO on Facebook for business updates and events",
                followers=12000
            ),
            SocialMediaPlatform(
                name="Instagram",
                url="https://www.instagram.com/businessutah/",
                icon="instagram",
                description="Visual updates and behind-the-scenes content from Utah GOEO",
                followers=8500
            ),
            SocialMediaPlatform(
                name="X (Twitter)",
                url="https://x.com/businessutah",
                icon="twitter",
                description="Real-time updates and business news from Utah GOEO",
                followers=15000
            ),
            SocialMediaPlatform(
                name="LinkedIn",
                url="https://www.linkedin.com/company/businessutah/",
                icon="linkedin",
                description="Professional networking and business development content",
                followers=12391
            ),
            SocialMediaPlatform(
                name="YouTube",
                url="https://www.youtube.com/@UtahGOEO/featured",
                icon="youtube",
                description="Video content, webinars, and educational resources",
                followers=3200
            )
        ]
    
    def get_upcoming_events(self, days_ahead: int = 30) -> List[UtahGOEOEvent]:
        """Get upcoming events within specified days"""
        current_date = datetime.now()
        end_date = current_date + timedelta(days=days_ahead)
        
        return [
            event for event in self.events
            if event.start_date >= current_date and event.start_date <= end_date
        ]
    
    def get_events_by_category(self, category: EventCategory) -> List[UtahGOEOEvent]:
        """Get events by category"""
        return [event for event in self.events if event.category == category]
    
    def get_virtual_events(self) -> List[UtahGOEOEvent]:
        """Get all virtual events"""
        return [event for event in self.events if event.is_virtual]
    
    def get_in_person_events(self) -> List[UtahGOEOEvent]:
        """Get all in-person events"""
        return [event for event in self.events if not event.is_virtual]
    
    def search_events(self, query: str) -> List[UtahGOEOEvent]:
        """Search events by title, description, or tags"""
        query_lower = query.lower()
        return [
            event for event in self.events
            if (query_lower in event.title.lower() or
                query_lower in event.description.lower() or
                any(query_lower in tag.lower() for tag in event.tags))
        ]
    
    def get_social_media_platforms(self) -> List[SocialMediaPlatform]:
        """Get all social media platforms"""
        return self.social_media_platforms
    
    def get_social_media_by_platform(self, platform_name: str) -> Optional[SocialMediaPlatform]:
        """Get specific social media platform"""
        for platform in self.social_media_platforms:
            if platform.name.lower() == platform_name.lower():
                return platform
        return None

# Global instance
utah_goeo_service = UtahGOEOEventsService()
