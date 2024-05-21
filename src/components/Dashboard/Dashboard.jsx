/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Dashboard = () => {
  const { status, setStatus, BASE, company, loading, setLoading } =
    useContext(UserContext);
  const [earnings, setEarnings] = useState({});

  async function DashboardData() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/affiliates/comissions`, {
        affiliate: company._id,
      }).then((data) => {
        if (data.status === 200) {
          setEarnings(data.data.totalEarnings);
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    DashboardData();
  }, [BASE]);

  return (
    <div style={{color:"white"}}>
      <h1>Dashboard</h1>
      <div className="container">
        <span>
          <label>Your total earnings!</label>
          {/* <h2>{earnings}</h2> */}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
