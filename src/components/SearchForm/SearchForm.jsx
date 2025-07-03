import './SearchForm.css';
import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}
