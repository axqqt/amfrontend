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
  const [userCard, setUserCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
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
      const response = await Axios.post(`${BASE}/mains/buy`, {
        buyItem,
        paymentInfo: userCard,
      }).then(async () => {
        await Axios.post(`${BASE}/affiliates/purchase`, {
          productId: buyItem._id,
          amount: buyItem.amount,
        });
      });
      if (response.status === 200) {
        setTimeout(() => {
          navigator(`/confirmation/${id}`);
        }, 500);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const containerStyle = {
    margin: "40px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#333",
    color: "white",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <div style={{ color: "white", padding: "20px" }}>
      <h1>Checkout</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div style={containerStyle}>
          <div className="item-details" style={{ margin: "40px" }}>
            {" "}
            <h1>{buyItem?.title}</h1>
            <h2>{buyItem?.price}</h2>
            <h3>Product user is buying! {id}</h3> {/** Temporary! */}
          </div>
          <form onSubmit={handleBuyProduct} style={formStyle}>
            <div>
              <label style={labelStyle}>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={userCard.cardNumber}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Expiry Date:</label>
              <input
                type="text"
                name="expiryDate"
                value={userCard.expiryDate}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={userCard.cvv}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Cardholder Name:</label>
              <input
                type="text"
                name="cardholderName"
                value={userCard.cardholderName}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
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
