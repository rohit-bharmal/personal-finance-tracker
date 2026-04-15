# Personal Finance Tracker

A full-stack expense tracking application built with FastAPI and React.

## Tech Stack

- **Backend:** Python, FastAPI, SQLAlchemy, SQLite, JWT authentication
- **Frontend:** React, vanilla CSS

## Project Structure

```
backend/
  app/
    main.py          # FastAPI app entry point, CORS config
    auth.py          # Password hashing, JWT token creation/validation
    database.py      # SQLAlchemy engine and session setup
    models.py        # User and Expense database models
    schemas.py       # Pydantic request/response schemas
    routes/
      auth.py        # Signup and login endpoints
      expenses.py    # CRUD endpoints for expenses

frontend/
  src/
    App.js           # Root component with auth routing
    api.js           # API client functions
    index.css        # Global styles
    pages/
      Login.js       # Login form
      Signup.js      # Signup form
      Dashboard.js   # Expense list, add/delete, stats
```

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API runs at `http://127.0.0.1:8000`. Interactive docs are available at `/docs`.

### Frontend

```bash
cd frontend
npm install
npm start
```

The app runs at `http://localhost:3000`.

## Features

- User signup and login with hashed passwords and JWT tokens
- Add, view, and delete expenses
- Expenses are categorized and scoped per user
- Summary stats (total spent, transaction count)
- Responsive, mobile-friendly UI
