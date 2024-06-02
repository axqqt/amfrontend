/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Company = () => {
  const { loading, setLoading, BASE, status, setStatus, company, setCompany } =
    useContext(UserContext);
  const [newCompany, setNewCompany] = useState({ title: "", description: "" });
  const navigator = useNavigate();

  async function CompanyCheck() {
    try {
      setLoading(true);
      await Axios.post(`${BASE}/company/validation`, { company }).then(
        (data) => {
          if (data.status === 404) {
            RegisterCompany();
          } else if (data.status === 200) {
            setStatus("Company already exists!");
          }
        }
      );
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
      {!company.length ? (
        <div className="container" style={{ color: "white", margin: "40px" }}>
          {loading && <h1>Loading...</h1>}
          <div className="company-check">
            {company && company.mail && (
              <h1>{`${company.name} is already associated!`}</h1>
            )}
          </div>
          <h1 style={{ textAlign: "center", fontSize: 32 }}>
            Company Registration!
          </h1>
          <form onSubmit={RegisterCompany} style={{ margin: "40px" }}>
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
