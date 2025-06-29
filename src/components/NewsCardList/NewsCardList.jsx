import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

export default function NewsCardList({ cards, isSavedSection = false }) {
  return (
    <ul className="card-list">
      {cards.map((card) => (
        <NewsCard key={card.id} card={card} isSavedSection={isSavedSection} />
      ))}
    </ul>
  );
}
