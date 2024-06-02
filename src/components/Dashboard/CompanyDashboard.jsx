/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserContext } from "@/App";

const CompanyDashboard = () => {
  const { loading, setLoading, setStatus, BASE, company } =
    useContext(UserContext);
  const [companyData, setCompanyData] = useState({});
  const [companyMenu,setCompanyMenu] = useState(false);

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
    <div className="company-dashboard" style={{color:"white",fontSize:22}}>
      <div className="container">
        <h1>Company Dashboard</h1>
      </div>
      {loading ? (
        <div className="container">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="company-details container" style={{color:"white"}}>

          <h1 style={{paddingBottom:"20px"}}>{companyData.name}</h1>
          <button onClick={()=>{
            setCompanyMenu(!companyMenu)
          }} style={{border:"12px solid white",margin:"20px",padding:"40px"}}>{!companyMenu ? <h1>View More! </h1>: <h1>Close</h1> }</button>
        {companyMenu && <div>
          <p>Registration Number: {companyData.registrationNumber}</p>
          <p>Address: {companyData.address}</p>
          <p>Country: {companyData.country}</p>
          <p>Email: {companyData.email}</p>
          <p>Phone: {companyData.phone}</p>
          <p>Website: {companyData.website}</p>
          <p>Registration Date: {companyData.registrationDate}</p></div>}
          <div className="transactions" style={{margin:"40px"}}>
            <h1>Transaction History</h1>
            <br/>
            <span style={{padding:"40px"}}>
              <label>Testing 1</label>
              <label>Testing 2</label>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
