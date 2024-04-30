import { useContext, useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { loading, setLoading, status, setStatus, BASE, setCompany } =
    useContext(UserContext);
  const [creds, setCreds] = useState({ gmail: "", password: "" });
  const navigator = useNavigate();

  async function userLogin(e) {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);
      
      // Assuming creds is defined somewhere and contains { gmail, password }
      console.log(creds)
      const response = await Axios.post(`${BASE}/users/login`, creds);
      console.log(response.data);
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Store JWT in local storage
        localStorage.setItem("token", token);
  
        // Assuming setCompany is a state setter function
        setCompany(user);
        
        setStatus(`${user.company.gmail} Logged in!`);
        
        setTimeout(() => {
          // Assuming navigator is a function to navigate to a route
          navigator("/");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setStatus("Wrong Credentials");
      } else {
        setStatus("Error");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex items-center justify-center h-screen md:w-full lg:w-auto  lg:p-24">
      <div className="container ">
        <div className="flex flex-col justify-center items-center h-full border border-border p-10 rounded-xl">
          <div className="w-full">
            <h1 className="text-5xl text-white text-start font-bold mb-3">
              Login
            </h1>
            <h1 className="text-lg text-muted">
              Please enter your details to Login
            </h1>
          </div>
          <div className="w-full">
            <form onSubmit={userLogin} className="flex flex-col gap-3 mt-5">
              <input
                onChange={handleChange}
                name="gmail"
                placeholder="Enter username..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter password..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit" disabled={loading} className="w-full mt-5">
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-start">
              <h1 className="text-gray-600">{status}</h1>
              <Link to="/register" className="text-blue-500 hover:underline">
                {" "}
                Not registered?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
