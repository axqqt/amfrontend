/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Line } from "react-chartjs-2";
import "./Dashboard.css"; // Import your CSS file for styling

const Dashboard = () => {
  const { status, setStatus, BASE, company, loading, setLoading, user } =
    useContext(UserContext);
  const [earnings, setEarnings] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [referralCount, setReferralCount] = useState(0);

  async function DashboardData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/affiliates/comissions`, {
        affiliate: company._id,
      });

      if (response.status === 200) {
        setEarnings(response.data);
        setStatus("Found");

        // Calculate loyalty points
        const totalEarnings = response.data.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        const loyaltyPoints = Math.floor(totalEarnings / 10); // Example: 1 point for every $10 earned
        setLoyaltyPoints(loyaltyPoints);

        // Get referral count
        const referralResponse = await Axios.get(
          `${BASE}/affiliates/referral/count/${user._id}`
        );
        if (referralResponse.status === 200) {
          setReferralCount(referralResponse.data.count);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setStatus("No results found!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    DashboardData();
  }, []);

  const data = {
    labels: earnings.map((entry) => entry.date),
    datasets: [
      {
        label: "Earnings",
        data: earnings.map((entry) => entry.amount),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Earnings Over Time",
      },
    },
  };

  async function claimMoney() {
    await Axios.post(`${BASE}/affiliates/claim/${user._id}`).then(
      (response) => {
        if (response.status === 200) {
          //

          setStatus("Earnings claimed!");

          setTimeout(() => {
            navigator(`/claims/${user._id}/{earnings.price}`);
          }, 2000);
        } else {
          setStatus("Error while processing , please check again later!");
        }
      }
    );
  }

  useEffect(() => {
    console.log(`The status is ${status}`);
  }, [status]);

  return (
    <div className="dashboard-container" style={{color:"white"}}>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="dashboard-content" style={{ textAlign: "center" }}>
          <h1>Dashboard</h1>
          <br />
          <div className="welcome-message">
            <h1>{`Welcome back, ${company?.username}!`}</h1>
          </div>
          <div className="earnings-info">
            <div className="total-earnings">
              <label>Your total earnings : </label>
              <span>
                $
                {earnings
                  .reduce((acc, curr) => acc + curr.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="rank-info">
              <label>Your Rank : </label>
              <span>
                {(company.rank || "bronze").charAt(0).toUpperCase() +
                  (company.rank || "bronze").slice(1)}
              </span>
            </div>
            <div className="loyalty-points">
              <label>Loyalty Points : </label>
              <span>{loyaltyPoints}</span>
            </div>
            <div className="referral-count">
              <label>Total Referrals : </label>
              <span>{referralCount}</span>
            </div>
          </div>
          {earnings.length > 0 && (
            <div className="earnings-chart">
              <Line data={data} options={options} />
            </div>
          )}
          <div className="claim">
            <label>
              <span>Your comissions : </span>
              <span>$test</span>
            </label>
            <br />
            <button
              onClick={() => {
                claimMoney();
                alert(`Claimed LKR ${20}!`);
              }}
            >
              Claim!
            </button>
          </div>
          {/* <div className="status">
            <h1>{status}</h1>
          </div> */}
          <div className="transaction-history">
            <h1>Transaction History</h1>
            <label style={{ margin: "40px" }}>
              <span>Test transaction 1</span>
              <span>Test transaction 2</span>
            </label>
            <ul>
              {earnings.map((entry, index) => (
                <li key={index}>
                  {entry.date}: ${entry.amount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
