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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Token verification failed:', err);
          localStorage.removeItem('jwt');
        });
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onLogoutClick={handleLogout}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
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
