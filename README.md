# 🗞️ News Explorer — Final Project

News Explorer is a React + Vite application that allows users to search for news articles via the NewsAPI.org service and save them to a personal collection. This is the final version of the full-stack app, deployed to production.

## 🌐 Live

👉 [Visit the deployed site](https://news.ugo.si)

## 🔐 Demo Login

You can use the following test account to log in and explore saved articles:

📧 **Email**: `test@mail.com`  
🔒 **Password**: `123123`

✅ This account already contains saved articles, so you can test the `/saved-news` route directly.

---

## ✅ Features

- Full-text news search via NewsAPI.org
- Shows 3 articles at a time with “Show more” button
- Preloader and empty result handling
- Save/delete articles in personal collection
- Protected route `/saved-news` for logged-in users
- JWT-based authentication with auto-login on refresh
- Fully responsive layout (320px+)
- Modal system: Sign In, Sign Up, Success popup

---

## 🔧 API and Environment

- Backend API: [https://api.news.ugo.si/news-api](https://api.news.ugo.si/news-api)

Environment variable required in `.env`:

```env
VITE_BASE_URL=https://api.news.ugo.si/news-api
```

---

## 🗂 Project Structure

- **React + Vite** project using functional components and hooks
- Semantic JSX with proper BEM class naming
- Components:
  - `SearchForm`, `Preloader`, `NewsCardList`, `NewsCard`
  - `LoginModal`, `RegisterModal`, `SuccessModal`
  - `ProtectedRoute`, `SavedNews`, `Header`, `Footer`

---

## 🛠 Tech Stack

- React 18 + Vite
- React Router v6
- Vanilla CSS Modules (BEM)
- NewsAPI.org
- Custom Express.js + MongoDB backend
- GCP + nginx (production hosting)

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/yuranest/news-explorer.git
cd news-explorer
npm install
npm run dev
```

Runs at `http://localhost:3002` if set in `vite.config.js`.

---

## 📄 License

MIT — free to use, modify, and deploy.
