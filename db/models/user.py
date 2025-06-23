from db.base_class import Base
from sqlalchemy import Column, Integer, Text, DateTime, Boolean
from datetime import datetime


class User(Base):
    id = Column(Integer, primary_key=True)
    email = Column(Text, nullable=False, unique=True, index=True)
    password = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    is_active = Column(Boolean(), default=True)
    is_superuser = Column(Boolean(), default=False)