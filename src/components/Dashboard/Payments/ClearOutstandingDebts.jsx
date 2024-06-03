/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const ClearOutstandingDebts = () => {
  const { id } = useParams();
  const { loading, setLoading, BASE, status, setStatus, company, setCompany } =
    useContext(UserContext);
  const companyId = id;
  const [payment, setPayment] = useState({});

  async function clearDebts() {
    try {
      setLoading(true);
      const response = await Axios.post(
        `${BASE}/mains/clearance/${companyId}`,
        { payment }
      );
      if (response.status === 200) {
        //
        console.log("Debt cleared");
      } else {
        setStatus("No results found!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="sub-container">
        <h1>Clear Outstanding Debts</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="outstanding debts">
              <span>
                <label>Outstanding balance</label>
              </span>
              <button onClick={clearDebts}>Clear Debts!</button>
            </div>
            <h2>{status}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClearOutstandingDebts;
