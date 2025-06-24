from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from db.session import get_db
from db.repository.url_repository import URLRepository
from schemas.url import URLCreate, URLResponse, URLList
from typing import List
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/urls/", response_model=URLResponse, status_code=201)
def create_short_url(
    url_data: URLCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """create a new shortened url"""
    try:
        url_repo = URLRepository(db)
        
        # get base url for constructing short url
        base_url = str(request.base_url).rstrip('/')
        
        # create shortened url
        result = url_repo.create_url(url_data, base_url)
        
        logger.info(f"Created short URL: {result.short_code} -> {result.original_url}")
        return result
        
    except Exception as e:
        logger.error(f"Error creating short URL: {e}")
        raise HTTPException(status_code=500, detail="Failed to create short URL")


@router.get("/urls/", response_model=URLList)
def get_all_urls(
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """get all shortened urls with pagination"""
    try:
        url_repo = URLRepository(db)
        urls = url_repo.get_all_urls(limit=limit, offset=offset)
        total = url_repo.get_total_urls()
        
        return URLList(urls=urls, total=total)
        
    except Exception as e:
        logger.error(f"Error getting URLs: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve URLs")


@router.get("/urls/{short_code}", response_model=URLResponse)
def get_url_info(
    short_code: str,
    db: Session = Depends(get_db)
):
    """get information about a shortened url"""
    try:
        url_repo = URLRepository(db)
        url = url_repo.get_url_by_short_code(short_code)
        
        if not url:
            raise HTTPException(status_code=404, detail="URL not found")
        
        # create response with full short url
        base_url = "http://localhost:8000"  # this should come from config
        short_url = f"{base_url}/{url.short_code}"
        
        return URLResponse(
            id=url.id,
            original_url=url.original_url,
            short_code=url.short_code,
            short_url=short_url,
            created_at=url.created_at,
            clicks=url.clicks
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting URL info: {e}")
        raise HTTPException(status_code=500, detail="Failed to get URL information") 