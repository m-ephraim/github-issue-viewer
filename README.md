# github-issue-viewer
Simple GitHub issue viewer of the Python FastAPI repository (https://github.com/tiangolo/fastapi).  React front end on top of simple FastAPI backend.
## Usage
Application is Dockerized.  To launch both API and UI, run:
```
docker-compose build && docker-compose up -d
```
This will spin up the App UI at http://localhost:3000 and the API at http://localhost:8000 (FastAPI Auto Documentation at http://localhost:8000/docs)
