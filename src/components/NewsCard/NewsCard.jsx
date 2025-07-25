import React, { useState } from 'react';
import './NewsCard.css';
import bookmarkIcon from '../../images/bookmark.svg';
import bookmarkHoverIcon from '../../images/bookmark-hover.svg';
import bookmarkSavedIcon from '../../images/bookmark-saved.svg';
import trashIcon from '../../images/trash.svg';
import trashHoverIcon from '../../images/trash-hover.svg';

function NewsCard({
  card,
  isSavedSection,
  isSaved = false,
  isLoggedIn = false,
  onSave,
  onDelete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(card.publishedAt || card.date).toLocaleString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );

  const handleSaveClick = () => {
    if (isSaved) {
      onDelete?.(card);
    } else {
      onSave?.(card);
    }
  };

  const handleDeleteClick = () => {
    onDelete?.(card);
  };

  return (
    <li className="card">
      {isSavedSection && card.keyword && (
        <span className="card__keyword">{card.keyword}</span>
      )}

      <a
        className="card__link"
        href={card.url}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={card.urlToImage || card.image}
          alt={card.title}
          className="card__image"
        />
        <div className="card__content">
          <p className="card__date">{formattedDate}</p>
          <h3 className="card__title">{card.title}</h3>
          <p className="card__text">{card.description || card.text}</p>
          <p className="card__source">{card.source?.name || card.source}</p>
        </div>
      </a>

      <div className="card__icon-wrapper">
        <div
          className="card__icon-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isSavedSection ? (
            <>
              <span className="card__tooltip">Remove from saved</span>
              <button
                className="card__icon card__icon_type_trash"
                onClick={handleDeleteClick}
                aria-label="Delete article"
              >
                <img
                  src={isHovered ? trashHoverIcon : trashIcon}
                  alt="Delete"
                />
              </button>
            </>
          ) : (
            <>
              {!isLoggedIn && (
                <span className="card__tooltip">Sign in to save articles</span>
              )}
              <button
                className="card__icon card__icon_type_bookmark"
                onClick={handleSaveClick}
                aria-label="Save article"
              >
                <img
                  src={
                    isSaved
                      ? bookmarkSavedIcon
                      : isHovered
                      ? bookmarkHoverIcon
                      : bookmarkIcon
                  }
                  alt="Save"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default NewsCard;
