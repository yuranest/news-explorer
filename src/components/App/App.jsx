import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SuccessModal from '../SuccessModal/SuccessModal';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import fetchNewsArticles from '../../utils/newsApi';

function App() {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState('');

  const isAnyModalOpen = isLoginOpen || isRegisterOpen || isSuccessOpen;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          return auth.getArticles(token);
        })
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => {
          console.error('Init failed:', err);
          localStorage.removeItem('jwt');
        })
        .finally(() => {
          setIsAppInitialized(true);
        });
    } else {
      setIsAppInitialized(true);
    }
  }, []);

  function handleLoginClick() {
    setIsLoginOpen(true);
  }

  function handleRegisterClick() {
    setIsRegisterOpen(true);
  }

  function closeAllModals() {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsSuccessOpen(false);
  }

  function handleRegister({ email, password, name }) {
    auth
      .register({ email, password, name })
      .then(() => {
        setIsRegisterOpen(false);
        setIsSuccessOpen(true);
      })
      .catch((err) => {
        console.error('Registration failed:', err);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return auth.getUserInfo(data.token);
        }
        throw new Error('No token received');
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error('Login failed:', err);
      });
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleSaveArticle(article) {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setIsLoginOpen(true);
      return;
    }

    const savedData = {
      keyword: searchKeyword, // ← вот теперь всегда актуальный keyword
      title: article.title,
      text: article.description || article.text,
      date: article.publishedAt || new Date().toISOString(),
      source: article.source?.name || article.source,
      link: article.url,
      image: article.urlToImage || article.image,
    };

    auth
      .saveArticle(savedData, token)
      .then((newArticle) => {
        setSavedArticles((prev) => [...prev, newArticle]);
      })
      .catch((err) => {
        console.error('Error saving article:', err);
      });
  }

  function handleSearch(keyword) {
    if (!keyword.trim()) {
      setSearchError('Please enter a keyword');
      setArticles([]);
      return;
    }

    setSearchKeyword(keyword);

    setIsLoading(true);
    setSearchError('');
    fetchNewsArticles(keyword)
      .then((data) => {
        if (!data.articles.length) {
          setSearchError('Nothing Found');
          setArticles([]);
        } else {
          const sortedArticles = data.articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );

          setArticles(sortedArticles);
          setVisibleCount(3);
        }
      })
      .catch(() => {
        setSearchError(
          'Sorry, something went wrong during the request. Please try again later.'
        );
        setArticles([]);
      })
      .finally(() => setIsLoading(false));
  }
  if (!isAppInitialized) return null;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogoutClick={handleLogout}
          isLoggedIn={isLoggedIn}
          onSearch={handleSearch}
          isModalOpen={isAnyModalOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSearch={handleSearch}
                articles={articles.slice(0, visibleCount)}
                isLoading={isLoading}
                searchError={searchError}
                showMoreVisible={visibleCount < articles.length}
                onShowMore={() => setVisibleCount((c) => c + 3)}
                onSaveArticle={handleSaveArticle}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAppInitialized={isAppInitialized}
              >
                <SavedNews />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeAllModals}
          onLogin={handleLogin}
          onSwitchToRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={closeAllModals}
          onRegister={handleRegister}
          onSwitchToLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />

        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={closeAllModals}
          onSwitchToLogin={() => {
            setIsSuccessOpen(false);
            setIsLoginOpen(true);
          }}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
