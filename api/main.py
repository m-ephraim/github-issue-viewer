from fastapi import FastAPI, Response as APIResponse
from fastapi.middleware.cors import CORSMiddleware
from requests import get, Response
from requests.exceptions import RequestException



app = FastAPI(title="Proxy to GitHub Issues")

# API running on different port than UI, so allow all origins for CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_URL = "https://api.github.com"

def make_request(url: str):
    """Make a get request to the GitHub API

    :param url: Relative API URL
    :return: JSON response if successfull, otherwise { "error": *error_detail* } dict
    """
    try:
        response: Response = get(f"{API_URL}{url}", headers={"accepts": "application/vnd.github+json"})

        # successful response
        if response.status_code == 200:
            return response.json()

        # throw if any other response status code
        response.raise_for_status()
    except RequestException as e:
        return { "error": str(e) }

    return { "error": "Unknown error"}

@app.get("/api/v1/issues")
@app.get("/api/v1/issues/")
def get_issues(owner: str = "tiangolo", repo: str = "fastapi"):
    """Get all the issues for a given repository, defaults to the FastAPI repo

    :param owner: The repository owner, defaults to "tiangolo"
    :param repo: The repository, defaults to "fastapi"
    :return: JSON list of issues if successfull, dict { "error": reason}
    """
    return make_request(f"/repos/{owner}/{repo}/issues")


@app.get("/api/v1/issues/{issue_number}")
@app.get("/api/v1/issues/{issue_number}/")
def get_issue(issue_number: str, owner: str = "tiangolo", repo: str = "fastapi"):
    """Get a specific issue for a given repository, defaults to the FastAPI repo

    :param issue_number: The issue number to retrieve from the specified repo
    :param owner: The repository owner, defaults to "tiangolo"
    :param repo: The repository, defaults to "fastapi"
    :return: JSON dict of issue details if successfull, dict { "error": reason}
    """
    return make_request(f"/repos/{owner}/{repo}/issues/{issue_number}")