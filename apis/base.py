from apis.v1 import urls
from fastapi import APIRouter


api_router = APIRouter()
api_router.include_router(urls.router, prefix="/api/v1", tags=["urls"])
