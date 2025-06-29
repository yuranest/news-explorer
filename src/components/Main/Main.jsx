import React, { useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';

import './Main.css';

const mockArticles = [
  {
    id: 1,
    title: 'Nature makes you better',
    description: 'Spending time in nature improves well-being...',
    url: '#',
    urlToImage: 'https://placehold.co/300x200',
    source: { name: 'National Geographic' },
    publishedAt: '2024-05-01',
  },
  {
    id: 2,
    title: 'The healing power of forests',
    description: 'Scientists confirm what we always knew...',
    url: '#',
    urlToImage: 'https://placehold.co/300x200',
    source: { name: 'Treehugger' },
    publishedAt: '2024-06-10',
  },
  {
    id: 3,
    title: 'Green time vs. screen time',
    description: 'Getting outdoors may be the best screen break...',
    url: '#',
    urlToImage: 'https://placehold.co/300x200',
    source: { name: 'BBC Earth' },
    publishedAt: '2024-06-20',
  },
];

export default function Main() {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };

  return (
    <main className="main">
      <section className="results">
        <h2 className="results__title">Search results</h2>
        <NewsCardList cards={mockArticles.slice(0, visibleCards)} />
        {visibleCards < mockArticles.length && (
          <button className="results__more-button" onClick={handleShowMore}>
            Show more
          </button>
        )}
      </section>
      <About />
    </main>
  );
}
