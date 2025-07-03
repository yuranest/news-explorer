import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';

import About from '../About/About';
import './Main.css';

export default function Main({
  onSearch,
  articles,
  isLoading,
  searchError,
  showMoreVisible,
  onShowMore,
  onSaveArticle,
  isLoggedIn,
  savedArticles,
}) {
  return (
    <main className="main">
      {(isLoading || searchError || articles.length > 0) && (
        <section className="results">
          {isLoading && <Preloader />}

          {!isLoading && searchError === 'Nothing Found' && <NotFound />}

          {!isLoading && searchError && searchError !== 'Nothing Found' && (
            <p className="results__error">{searchError}</p>
          )}

          {!isLoading && !searchError && articles.length > 0 && (
            <>
              <h2 className="results__title">Search results</h2>
              <NewsCardList
                cards={articles}
                onSave={onSaveArticle}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
              />
              {showMoreVisible && (
                <button className="results__more-button" onClick={onShowMore}>
                  Show more
                </button>
              )}
            </>
          )}
        </section>
      )}
      <About />
    </main>
  );
}
