from fastapi import FastAPI, Depends, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from core.config import settings

from db.session import engine, get_db
from db.base import Base
from db.repository.url_repository import URLRepository
from apis.base import api_router
import os


def create_tables():
    Base.metadata.create_all(bind=engine)


def include_router(app):
    return app.include_router(api_router)


def start_app():
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)
    
    # cors middleware stuff
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost",
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1",
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173",
            "*"
        ],  # allow all local dev and same-origin for built frontend
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    create_tables()
    include_router(app)
    
    # serve react app files 
    if os.path.exists("frontend/dist/assets"):
        app.mount("/assets", StaticFiles(directory="frontend/dist/assets"), name="assets")
    if os.path.exists("frontend/dist/static"):
        app.mount("/static", StaticFiles(directory="frontend/dist/static"), name="static")
    
    @app.get("/")
    async def serve_react_app():
        """serve react app from root path"""
        index_file = "frontend/dist/index.html"
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"msg": "URL Shortener API - Build frontend to see the app", "docs": "/docs"}
    
    # redirect route | Note: must be after api routes to avoid conflicts
    @app.get("/{short_code}")
    def redirect_to_original_url(
        short_code: str,
        db: Session = Depends(get_db)
    ):
        """redirect to original url using 301 redirect"""
        try:
            # skip if its our internal api route 
            if short_code.startswith(('api', 'docs', 'openapi', 'assets', 'static')):
                raise HTTPException(status_code=404, detail="URL not found")
                
            url_repo = URLRepository(db)
            url = url_repo.get_url_by_short_code(short_code)
            
            if not url:
                raise HTTPException(status_code=404, detail="URL not found")
            
            # return 301 redirect to original url
            return Response(
                status_code=301,
                headers={"Location": url.original_url}
            )
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to redirect")
    
    return app


app = start_app()
