/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyBasket = () => {
  const { loading, setLoading, BASE, status, setStatus, company } =
    useContext(UserContext);
  const [myBasket, setMyBasket] = useState([]);
  const navigate = useNavigate();

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
          setTimeout(() => {
            navigate("/mybasket");
          }, 1200);
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
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container" style={{ color: "white", fontSize: 22 }}>
          <div className="my-basket" style={{ margin: "40px" }}>
            <h1>{`${company.name}'s Basket!`}</h1>
            <div className="sub-container" style={{ margin: "40px" }}>
              {myBasket && myBasket.length ? (
                <div className="dashboard">
                  {myBasket.map((item, index) => {
                    <div key={item._id || index}>
                      <h1>{item.title}</h1>
                      <span>
                        <label>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              CancelOrder(item?._id);
                            }}
                          >
                            Cancel Order!
                          </button>
                        </label>
                        <h2>{status}</h2>
                      </span>
                    </div>;
                  })}
                  {/**A mapping needs to be done here! Stringify for now */}
                </div>
              ) : (
                <div style={{padding:"20px"}}>
                  <h1>Your basket is empty!</h1>
                  <Link to={"/"}>Go back home?</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBasket;
