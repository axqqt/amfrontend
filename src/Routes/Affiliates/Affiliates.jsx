/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { UserContext } from "@/App";
import { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

/* eslint-disable no-unused-vars */
const Affiliates = () => {
  //affiliates
  const { BASE, loading, setLoading, company, status, setStatus } =
    useContext(UserContext);
  const navigator = useNavigate();

  async function Affiliates(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/affiliates/affiliated`, {
        userId: company._id,
      }); //test
      if (response.status === 200) {
        setStatus("Affiliated!"); //test msg
        setTimeout(()=>{
          navigator("/");
        },1500);
      } else if (response.status === 404) {
        setStatus("User not found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // const handleChange = (e) => {
  //   setAffiliate({ ...affiliate, [e.target.name]: e.target.value });
  // };

  return (
    <div style={{ color: "white" }}>
      {company && (
        <div>
          {/* <h1>Affiliates</h1> */}
          <div className="container">
            <form onSubmit={Affiliates}>
              <h1>Become an Affiliate Today!</h1>
              <button type="submit" disabled={loading}>
                Join!
              </button>
            </form>
          </div>
          <h1>{status}</h1>
        </div>
      )}
    </div>
  );
};

export default Affiliates;