# URL Shawty

Heyy there! Welcome to URL Shawty project, a chill and minimal URL shortener built with FastAPI (Python) and React (TS). Let's get started!

---

## 🐍 Backend Setup (FastAPI + Postgres)

1. **Clone the repo**

   ```bash
   git clone <this-repo-url>
   cd url_shortner_proj
   ```

2. **Create a virtual environment with [uv](https://github.com/astral-sh/uv)**

   ```bash
   uv venv .venv
   source .venv/bin/activate
   ```

   (If you don't have `uv`, just `pip install uv` globally!)

3. **Install Python dependencies**

   ```bash
   uv pip install -r requirements.txt
   ```

4. **Set up your Postgres database**

   - Make sure you have Postgres running on **port 5430** (not the default 5432!).
   - You can use Docker, Homebrew, or your favorite method. Example with Docker:
     ```bash
     docker run --name urlshawty-db -e POSTGRES_USER=shawty -e POSTGRES_PASSWORD=shawtypass -e POSTGRES_DB=shawtydb -p 5430:5432 -d postgres:15
     ```
   - Update your `.env` file with the correct DB credentials if needed.

5. **Fire up the backend!**
   ```bash
   uvicorn main:app --reload
   ```
   - The API will be live at [http://localhost:8000](http://localhost:8000)
   - Docs are at [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚡ Frontend Setup (React + Vite)

The frontend lives in the `frontend/` folder. It's built with React, Vite, and Tailwind for a super snappy experience.

1. **Hop into the frontend folder**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   npm i
   # or
   pnpm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   - The app will be at [http://localhost:5173](http://localhost:5173)
   - Make sure your backend is running for full functionality!

   You can also build the file to serve it from BE
   ```bash
   npm run build
   # or
   pnpm build
   ```

---

## 🗂️ File Structure (Quick Peek)

- `main.py` — FastAPI backend entrypoint
- `db/` — Database models and logic
- `frontend/` — All the React code (UI, hooks, components, etc.)
- `.env` — Your environment variables (DB creds, etc.)

---

## 📝 Notes

- The backend expects Postgres on port **5430**.
- CORS is set up for local dev and production builds.
- The frontend is clean, fast and has support for dark and light mode.
- If you run into any issues, just open an issue or ping me!

---
