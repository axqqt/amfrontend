/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";

const MyBasket = () => {
  const { loading, setLoading, BASE, status, setStatus, company } =
    useContext(UserContext);
  const [myBasket, setMyBasket] = useState([]);

  async function whatsMyBasket() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/baskets/${company._id}`).then((response) => {
        if (response.status === 200) {
          setMyBasket(response.data);
        } else if (response.status === 404) {
          setStatus("You don't have any orders left!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function CancelOrder(itemId) {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/baskets/cancels/${itemId}`).then((response) => {
        if (response.status === 200) {
          setStatus("Cancelled order!");
        } else if (response.status === 404) {
          setStatus("No data found!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    whatsMyBasket();
  }, []);

  return (
    <div>
      <div className="container" style={{ color: "white" }}>
        <div className="my-basket" style={{ margin: "40px" }}>
          <h1>{`${company.name}'s Basket!`}</h1>
          <div className="dashboard">
            {JSON.stringify(myBasket)}
            {/**A mapping needs to be done here! Stringify for now */}
            <span>
              <label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    CancelOrder(/*myBasket._id*/);
                  }}
                >
                  Cancel Order!
                </button>
              </label>
              <h2>{status}</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBasket;
