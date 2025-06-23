from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserRead(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    class Config:
        # tell pydantic to convert even non dict obj to json
        orm_mode = True
