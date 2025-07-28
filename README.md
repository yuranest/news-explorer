# 🗞️ News Explorer — Final Project (Stage 1)

News Explorer is a React + Vite application that allows users to search for news articles via the NewsAPI.org service. This is Stage 1 of the final project, covering JSX markup, component structure, and NewsAPI integration.

## 🌐 Live Demo

[👉 View the deployed site here](https://yuranest.github.io/news-explorer)

---

## 🔧 Project Structure

- **React + Vite** project using functional components and hooks
- Fully responsive layout from 320px+
- Semantic JSX with proper BEM class naming
- Components:
  - `SearchForm` — input for topic search
  - `Preloader` — loading spinner
  - `NewsCardList` + `NewsCard` — article list with “Show more”
  - `LoginModal`, `RegisterModal`, `SuccessModal` — authentication modals
  - `ProtectedRoute` — secure routing logic
- Connected to **NewsAPI.org** with fetch logic in `utils/newsApi.js`

---

## ✅ Features Implemented

- Search for articles over the past 7 days
- Shows 3 articles at a time with “Show more” button
- Preloader during API call
- “Nothing found” message for empty results
- Modal popup logic working (Sign In, Sign Up, Success)
- Layout matches the Figma design (Stage 1 spec)

---

## 🗂 Tech Stack

- React 18 + Vite
- Vanilla CSS (modularized)
- NewsAPI.org
- React Router v6

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/yuranest/news-explorer.git
cd news-explorer
npm install
npm run dev
```
