import { useEffect, useState, useCallback } from "react";
import { SERVER_DOMAIN } from "../cons/Cons";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const res = await axios
      .get(`${SERVER_DOMAIN}/${endpoint}`)
      .catch((e) => setError(e.message));
    setData(res.data);
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, error, fetchData };
};

export default useFetch;
