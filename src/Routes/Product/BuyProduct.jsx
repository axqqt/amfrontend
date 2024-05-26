/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const BuyProduct = () => {
  const { id } = useParams();
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [buyItem, setBuyItem] = useState({});
  const navigator = useNavigate();

  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/${id}`);
      if (response.status === 200) {
        setBuyItem(response.data);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setStatus("No results found");
      } else {
        setStatus("An error occurred");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuyProduct(e) {
    e.preventDefault();
    try {
        setLoading(true);
        const response = await Axios.post(`${BASE}/mains/buy`,{buyItem});
        if (response.status === 200) {
          setTimeout(()=>{
            navigator(`/confirmation/${id}`);
          },500);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setStatus("No results found");
        } else {
          setStatus("An error occurred");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <div>
      <h1>Checkout</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <h1>{buyItem?.title}</h1>
          <h2>{buyItem?.price}</h2>
          <form onSubmit={handleBuyProduct}>
            <button type="submit" disabled={loading}>
              Buy!
            </button>
          </form>
          <h2>{status}</h2>
        </div>
      )}
    </div>
  );
};

export default BuyProduct;
