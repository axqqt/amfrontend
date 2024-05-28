/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { status, setStatus, BASE, company, loading, setLoading } =
    useContext(UserContext);
  const [earnings, setEarnings] = useState([]);

  async function DashboardData() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/affiliates/comissions`, {
        affiliate: company._id,
      });

      if (response.status === 200) {
        setEarnings(response.data);
        setStatus("Found");
      }
    } catch (err) {
      if (err.status === 404) {
        setStatus("No results found!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    DashboardData();
  }, [BASE]);

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

  return (
    <div style={{ color: "white" }}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        company && (
          <div>
            <h1>Dashboard</h1>
            <div className="container">
              <h1>{`Welcome back ${company?.username}!`}</h1>
              <span>
                <label>Your total earnings!</label>
                <h2>{earnings.reduce((acc, curr) => acc + curr.amount, 0)}</h2>
              </span>
              <span>
                <label>Your Rank!</label>
                <h2>{earnings.filter((item)=>{item?.rank})}</h2>
              </span>
              <div>
                <Line data={data} options={options} />
              </div>

              <div className="status">
                <h1>{status}</h1>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;
