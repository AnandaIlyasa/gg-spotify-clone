import { useEffect, useState } from "react";

const useFetch = (initialUrl, opt) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [url] = useState(initialUrl || "");
  const [options] = useState(opt);

  console.log("useFetch is called");

  const callback = () => {
    if (!url) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          console.log(response.body);
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.log(error.message);
      }
    };

    fetchData();
  };

  useEffect(callback, [options, url]);

  return [data, setData, error, isLoading];
};

export default useFetch;
