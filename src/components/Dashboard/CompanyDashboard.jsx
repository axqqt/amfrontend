/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserContext } from "@/App";

const CompanyDashboard = () => {
  const { loading, setLoading, setStatus, BASE, company } = useContext(UserContext);
  const [companyData, setCompanyData] = useState({});

  async function fetchCompanyData() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/company/${company._id}`);
      if (response.status === 200) {
        setCompanyData(response.data);
      } else {
        setStatus("No results found!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="company-dashboard">
      <div className="container">
        <h1>Company Dashboard</h1>
      </div>
      {loading ? (
        <div className="container">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="company-details container">
          <h2>Company: {companyData.name}</h2>
          <p>Registration Number: {companyData.registrationNumber}</p>
          <p>Address: {companyData.address}</p>
          <p>Country: {companyData.country}</p>
          <p>Email: {companyData.email}</p>
          <p>Phone: {companyData.phone}</p>
          <p>Website: {companyData.website}</p>
          <p>Registration Date: {companyData.registrationDate}</p>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
