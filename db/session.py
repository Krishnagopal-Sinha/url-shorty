from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator
from core.config import settings

SQL_ALCHEMY_DATABASE_URL = settings.DATABASE_URL
print("Databse URL is: ", SQL_ALCHEMY_DATABASE_URL)
engine = create_engine(SQL_ALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autoflush=False, bind=engine)


def get_db() -> Generator:
    """get database session"""
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
