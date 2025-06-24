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
        """generate a base 62 encoded short code for url shortening"""
        # base 62 characters: 0-9, a-z, A-Z
        characters = string.digits + string.ascii_lowercase + string.ascii_uppercase
        
        random_number = secrets.randbelow(62 ** length)
        
        if random_number == 0:
            return characters[0] * length
        
        result = ""
        while random_number > 0:
            random_number, remainder = divmod(random_number, 62)
            result = characters[remainder] + result
        
        # Pad with leading zeros if needed
        return result.zfill(length) 