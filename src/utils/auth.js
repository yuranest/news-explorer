const BASE_URL = 'http://localhost:3001'; // заменишь на свой backend

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function register({ email, password, name }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}
