#!/usr/bin/env python3
"""
Simple test script to verify the backend server
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("Starting Utah Government Contracting Hub API...")
    print("Server will be available at: http://localhost:8000")
    print("API Documentation at: http://localhost:8000/docs")
    print("Press Ctrl+C to stop the server")
    
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except Exception as e:
        print(f"Error starting server: {e}") 