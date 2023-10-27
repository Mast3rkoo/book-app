import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not reach the server to fetch the data!");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    // Added a slight delay (e.g., 1000ms) to simulate loading for demo purposes

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
