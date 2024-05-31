/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

const Confirmation = () => {
  const { id } = useParams(); //just for test
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [orderNo, setOrderNo] = useState(0);

  //needs to show real order number
  async function GetOrderNo() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/affiliates/`).then((response) => {
        if (response.status === 200) {
          setOrderNo(response.data);
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetOrderNo();
  }, []);

  return (
    <div style={{ color: "white", margin: "20px" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <h1>Thanks You for your order!</h1>
          <div className="order" style={{ margin: "40px" }}>
            <h1>Your order number is {id}</h1>
            <h2>Test order no : {orderNo}</h2>
          </div>
          <p>{status}</p>
          <Link to={"/"}>Go back home? 😎</Link>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
