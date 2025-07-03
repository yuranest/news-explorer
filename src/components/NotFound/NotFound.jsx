import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__icon" />
      <p className="not-found__title">Nothing found</p>
      <p className="not-found__text">
        Sorry, but nothing matched
        <br /> your search terms.
      </p>
    </div>
  );
}
