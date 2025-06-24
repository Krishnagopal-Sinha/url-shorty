from sqlalchemy.orm import Session
from db.models.url import URL
from schemas.url import URLCreate, URLResponse
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)


class URLRepository:
    """repository for url operations"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_url(self, url_data: URLCreate, base_url: str) -> URLResponse:
        """create a new shortened url"""
        try:
            # create url instance (short_code will be auto-generated)
            db_url = URL(original_url=str(url_data.original_url))
            
            # ensure short_code is unique
            while self.get_url_by_short_code(db_url.short_code):
                db_url.short_code = URL.generate_short_code()
            
            self.db.add(db_url)
            self.db.commit()
            self.db.refresh(db_url)
            
            # create response with full short url
            short_url = f"{base_url}/{db_url.short_code}"
            
            return URLResponse(
                id=db_url.id,
                original_url=db_url.original_url,
                short_code=db_url.short_code,
                short_url=short_url,
                created_at=db_url.created_at
            )
        except Exception as e:
            logger.error(f"Error creating URL: {e}")
            self.db.rollback()
            raise
    
    def get_url_by_short_code(self, short_code: str) -> Optional[URL]:
        """get url by short code"""
        return self.db.query(URL).filter(URL.short_code == short_code).first()
    
    def get_all_urls(self, limit: int = 50, offset: int = 0) -> List[URLResponse]:
        """get all urls with pagination"""
        try:
            urls = self.db.query(URL).order_by(URL.created_at.desc()).offset(offset).limit(limit).all()
            base_url = "http://localhost:8000"  # this should come from config
            
            return [
                URLResponse(
                    id=url.id,
                    original_url=url.original_url,
                    short_code=url.short_code,
                    short_url=f"{base_url}/{url.short_code}",
                    created_at=url.created_at
                )
                for url in urls
            ]
        except Exception as e:
            logger.error(f"Error getting URLs: {e}")
            return []
    
    def get_total_urls(self) -> int:
        """get total number of urls"""
        try:
            return self.db.query(URL).count()
        except Exception as e:
            logger.error(f"Error getting total URLs: {e}")
            return 0 