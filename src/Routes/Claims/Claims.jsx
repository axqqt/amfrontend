/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Claims = () => {
  const { id, price } = useParams();
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [claimMethod, setClaimMethod] = useState("none");

  async function claimReward() {
    try {
      setLoading(true);
      // Send a request to the backend to claim the reward based on the selected method
      await Axios.post(`${BASE}/affiliates/claims/${claimMethod}`).then(
        (response) => {
          if (response.status === 200) {
            setStatus("Reward claimed successfully!");
          } else {
            setStatus("Failed to claim reward. Please try again later.");
          }
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle reward method selection
  const handleClaimMethodChange = (event) => {
    setClaimMethod(event.target.value);
  };

  useEffect(() => {
    // Call the function to claim the reward when the component mounts or when the ID changes
    claimReward();
  }, [id]);

  return (
    <div>
      <div className="container">
        <h1>Claim your reward!</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="method">
            <label>
              <span>Price: LKR {price}</span>
            </label>
            <label>
              Select Reward Method:
              <select value={claimMethod} onChange={handleClaimMethodChange}>
                <option value="none">Select</option>
                <option value="giftBox">Surprise Gift Box</option>
                <option value="voucher">Voucher</option>
                <option value="inAppCredit">In-App Credit</option>
              </select>
            </label>
            {/* <div className="tests">
              <h1>{status}</h1>
            </div> **/}
            {/**Comment it out , this is just for test z */}
            <button onClick={claimReward}>Claim Reward</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Claims;
