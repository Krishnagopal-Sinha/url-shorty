from pydantic import BaseModel, HttpUrl
from typing import List
from datetime import datetime


class URLCreate(BaseModel):
    """schema for creating a new shortened url"""
    original_url: HttpUrl


class URLResponse(BaseModel):
    """schema for url response"""
    id: int
    original_url: str
    short_code: str
    short_url: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class URLList(BaseModel):
    """schema for list of urls"""
    urls: List[URLResponse]
    total: int


class URLRedirect(BaseModel):
    """schema for url redirect response"""
    original_url: str
    short_code: str


class URLStats(BaseModel):
    """schema for url statistics"""
    total_urls: int
    urls_created_today: int


class SessionURLs(BaseModel):
    """schema for session urls response"""
    urls: list[URLResponse]
    session_id: str 