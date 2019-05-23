import { useState, useEffect } from 'react';

export default function useFetch(url, state) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(d => setData(d));
  }, state);
  return data;
}
