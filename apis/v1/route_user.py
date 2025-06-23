from fastapi import APIRouter, status
from db.repository.user import create_new_user
from db.session import get_db
from schemas.user import UserCreate, UserRead
from sqlalchemy.orm import Session
from fastapi import Depends

router = APIRouter()


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_new_user(user=user, db=db)
    return user
