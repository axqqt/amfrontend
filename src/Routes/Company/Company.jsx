/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "@/App";

const Company = () => {
  const { loading, setLoading, BASE, status, setStatus, company, setCompany } = useContext(UserContext);
  const [newCompany, setNewCompany] = useState({
    name: "",
    registrationNumber: "",
    address: "",
    country: "",
    email: "",
    phone: "",
    website: ""
  });
  const navigator = useNavigate();

  async function CompanyCheck() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/companys/validation`, { company: newCompany });
      if (response.status === 200) {
        setStatus("Company already exists!");
        setCompany(response.data);
      } else if (response.status === 404) {
        setStatus("Company not found. You can register a new one.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function RegisterCompany(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/company/registration`, { newCompany });
      if (response.status === 200) {
        setStatus(`${newCompany.name} Registered 🎉`);
        setCompany(response.data);

        setTimeout(() => {
          navigator("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    CompanyCheck();
  }, []);

  return (
    <div>
      {!company.length ? (
        <div className="container" style={{ color: "white", margin: "40px" }}>
          {loading && <h1>Loading...</h1>}
          <div className="company-check">
            {company && company.email && (
              <h1>{`${company.name} is already associated!`}</h1>
            )}
          </div>
          <h1 style={{ textAlign: "center", fontSize: 32 }}>
            Company Registration!
          </h1>
          <form onSubmit={RegisterCompany} style={{ margin: "40px" }}>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Enter company name..."
            />
            <input
              name="registrationNumber"
              onChange={handleChange}
              type="text"
              placeholder="Enter registration number..."
            />
            <input
              name="address"
              onChange={handleChange}
              type="text"
              placeholder="Enter address..."
            />
            <input
              name="country"
              onChange={handleChange}
              type="text"
              placeholder="Enter country..."
            />
            <input
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Enter email..."
            />
            <input
              name="phone"
              onChange={handleChange}
              type="text"
              placeholder="Enter phone number..."
            />
            <input
              name="website"
              onChange={handleChange}
              type="text"
              placeholder="Enter website (optional)..."
            />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "40px" }}
            >
              Register!
            </button>
          </form>
        </div>
      ) : (
        <div
          className="exists"
          style={{
            color: "white",
            margin: "40px",
            padding: "40px",
            fontSize: 32,
            textAlign: "center",
          }}
        >
          <h1>Your company has already been registered!</h1>
          <Link to={"/"}>Go back home?</Link>
        </div>
      )}
    </div>
  );
};

export default Company;
