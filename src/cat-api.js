const API_KEY = "live_D9WRtKJvTyQUEV8VmqVZKOTfp8W1SOdTieIJrIBuucHyGJtEHTZ9pqgTxYreVVup";

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': API_KEY,
    },
  }).then(response => response.json());
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;

  return fetch(url, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => response.json())
    .then(data => data[0]);
}

