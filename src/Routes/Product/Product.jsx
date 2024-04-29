/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App";

const Product = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const { id } = useParams();
  const [Data, setData] = useState([]);

  async function fetchItem() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/${id}`);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("Item not found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <section className="h-screen">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="text-white">
            <h1>{Data.title}</h1>
            <p>{Data.description}</p>
            <p>{Data.commission}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
