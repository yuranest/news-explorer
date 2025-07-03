import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import * as auth from '../../utils/auth';
import './SavedNews.css';

function SavedNews() {
  const currentUser = useContext(CurrentUserContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (!token) return;

    auth
      .getArticles(token)
      .then((res) => {
        console.log('Loaded articles:', res);
        setArticles(res);
      })
      .catch((err) => {
        console.error('Error loading saved articles:', err);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDeleteArticle = (article) => {
    auth
      .deleteArticle(article._id, token)
      .then(() => {
        setArticles((prev) => prev.filter((a) => a._id !== article._id));
      })
      .catch((err) => {
        console.error('Error deleting article:', err);
      });
  };

  const getKeywordSummary = () => {
    if (!articles.length) return '';

    const keywordCount = {};
    articles.forEach(({ keyword }) => {
      keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });

    const sorted = Object.entries(keywordCount)
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => k);

    if (sorted.length <= 3) {
      return sorted.join(', ');
    }

    return `${sorted.slice(0, 2).join(', ')} and ${sorted.length - 2} others`;
  };

  return (
    <main className="saved-news-page">
      <section className="saved-news-info">
        <h2 className="saved-news-info__heading">Saved articles</h2>
        <h3 className="saved-news-info__title">
          {currentUser?.name}, you have {articles.length} saved <br />
          articles
        </h3>
        <p className="saved-news-info__keywords">
          By keywords: <strong>{getKeywordSummary()}</strong>
        </p>
      </section>

      {!loading && (
        <NewsCardList
          cards={articles}
          isSavedSection
          onDelete={handleDeleteArticle}
        />
      )}
    </main>
  );
}

export default SavedNews;
