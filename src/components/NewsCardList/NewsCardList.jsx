import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

export default function NewsCardList({
  cards,
  isSavedSection = false,
  isLoggedIn = false,
  onSave,
  onDelete,
  savedArticles = [],
}) {
  return (
    <ul className="card-list">
      {cards.map((card) => {
        const isSaved = savedArticles.some(
          (a) =>
            a.title === card.title &&
            (a.source === card.source?.name || a.source === card.source)
        );

        return (
          <NewsCard
            key={card._id || `${card.title}-${card.publishedAt}`}
            card={card}
            isSavedSection={isSavedSection}
            isLoggedIn={isLoggedIn}
            onSave={onSave}
            onDelete={onDelete}
            isSaved={isSaved}
          />
        );
      })}
    </ul>
  );
}
