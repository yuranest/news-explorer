const BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything';

const API_KEY = '25817cad47924b37bd62729b3a1e7283'; // 🔑 key

function getFormattedDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

export default function fetchNewsArticles(query) {
  const from = getFormattedDate(-7);
  const to = getFormattedDate(0);

  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&apiKey=${API_KEY}&from=${from}&to=${to}&pageSize=100`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`News API error: ${res.status}`);
    }
    return res.json();
  });
}
