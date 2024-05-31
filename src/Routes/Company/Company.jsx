/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const { loading, setLoading, BASE, status, setStatus, company, setCompany } =
    useContext(UserContext);
  const [newCompany, setNewCompany] = useState({ title: "", description: "" });
  const navigator = useNavigate();

  async function CompanyCheck() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/company`, { company }).then((data) => {
        if (data.status === 404) {
          RegisterCompany();
        } else if (data.status === 200) {
          setStatus("Company already exists!");
        }
      });
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
      await Axios.post(`${BASE}/company`, { newCompany }).then((data) => {
        if (data.status === 200) {
          setStatus(`${newCompany.title} Registered 🎉`);
          setCompany(data.data); //what's sent from the backend (needs to be implemented)

          setTimeout(() => {
            navigator("/");
          }, 2000);
        }
      });
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
      <div className="container">
        {loading && <h1>Loading...</h1>}
        <div className="company-check">
          {company && <h1>{`${company.name} is already associated!`}</h1>}
        </div>
        <form onSubmit={RegisterCompany}>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Enter title..."
          ></input>
          <input
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="Enter description..."
          ></input>
          {/**All I can think of for now */}
          <button type="submit" disabled={loading}>
            Register!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Company;
