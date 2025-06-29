import React, { useState } from 'react';
import './NewsCard.css';
import bookmarkIcon from '../../images/bookmark.svg';
import bookmarkHoverIcon from '../../images/bookmark-hover.svg';
import bookmarkSavedIcon from '../../images/bookmark-saved.svg';
import trashIcon from '../../images/trash.svg';
import trashHoverIcon from '../../images/trash-hover.svg';

function NewsCard({ card, isSavedSection }) {
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = false; // TODO: update with real logic

  function handleSaveClick() {
    console.log('Save clicked:', card.title);
  }

  function handleDeleteClick() {
    console.log('Delete clicked:', card.title);
  }

  return (
    <li className="card">
      <a
        className="card__link"
        href={card.url}
        target="_blank"
        rel="noreferrer"
      >
        <img src={card.urlToImage} alt={card.title} className="card__image" />
        <div className="card__content">
          <p className="card__date">
            {new Date(card.publishedAt).toLocaleDateString()}
          </p>
          <h3 className="card__title">{card.title}</h3>
          <p className="card__text">{card.description}</p>
          <p className="card__source">{card.source.name}</p>
        </div>
      </a>

      <div
        className="card__icon-wrapper"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isSavedSection ? (
          <>
            {isHovered && (
              <span className="card__tooltip">Remove from saved</span>
            )}
            <button
              className="card__icon card__icon_type_trash"
              onClick={handleDeleteClick}
              aria-label="Delete article"
            >
              <img src={isHovered ? trashHoverIcon : trashIcon} alt="Delete" />
            </button>
          </>
        ) : (
          <>
            {isHovered && (
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
    </li>
  );
}

export default NewsCard;
