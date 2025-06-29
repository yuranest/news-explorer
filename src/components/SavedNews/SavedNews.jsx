import React, { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

const mockSavedArticles = [
  {
    _id: '1',
    keyword: 'Nature',
    title: 'Nature makes you better',
    date: 'February 19, 2019',
    source: 'National Geographic',
    text: 'We all know how good nature can make us feel...',
    link: '#',
    image: '/src/images/nature.jpg',
  },
  // ещё несколько карточек
];

function SavedNews() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="saved-news-page">
      <section className="saved-news-info">
        <h2 className="saved-news-info__heading">Saved articles</h2>
        <h3 className="saved-news-info__title">
          {currentUser?.name}, you have {mockSavedArticles.length} saved
          articles
        </h3>
        <p className="saved-news-info__keywords">
          By keywords: <strong>Nature, Yellowstone, and 2 other</strong>
        </p>
      </section>
      <NewsCardList cards={mockSavedArticles} isSavedSection />
    </main>
  );
}

export default SavedNews;
