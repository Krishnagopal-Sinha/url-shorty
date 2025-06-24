from db.base_class import Base
from sqlalchemy import Column, Integer, Text, DateTime, String, Index
from datetime import datetime
import secrets
import string


class URL(Base):
    """url model for storing shortened urls"""
    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(Text, nullable=False, index=True, unique=True)
    short_code = Column(String(10), nullable=False, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.short_code:
            self.short_code = self.generate_short_code()
    
    @staticmethod
    def generate_short_code(length: int = 6) -> str:
        """generate a random short code for url shortening"""
        characters = string.ascii_letters + string.digits
        return ''.join(secrets.choice(characters) for _ in range(length)) 