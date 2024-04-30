/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Searched = () => {
  const { loading, setLoading, status, setStatus, BASE } = useContext(UserContext);
  const { item } = useParams();
  const [data, setData] = useState([]);

  async function fetchForQuery() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/searchs`, { search: item });
      console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("No results found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchForQuery();
  }, []);

  return (
    <div style={{color:"wheat",margin:"40px"}}>
      <h2>{item}</h2>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="data">
          {data && data.length ? (
            JSON.stringify(data)
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      )}
      <p>{status}</p>
    </div>
  );
};

export default Searched;
