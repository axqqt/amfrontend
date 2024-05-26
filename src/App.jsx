/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./Routes/NotFound/NotFound";
import "./index.css";
import Procedure from "./Routes/Procedure/Procedure";
import Searched from "./Routes/Searched/Searched";
import FeedbackSection from "./components/FeedbackSection";
import SeeMore from "./Routes/Home/SeeMore/SeeMore";
import Affiliates from "./Routes/Affiliates/Affiliates";
import Social from "./Routes/Social/Social";
import CreatePost from "./Routes/CreatePost/CreatePost";
import Dashboard from "./components/Dashboard/Dashboard";
import BuyProduct from "./Routes/Product/BuyProduct";
import Confirmation from "./Routes/Product/Confirmation";

// Lazy load your route components
const Home = React.lazy(() => import("./Routes/Home/Home"));
const Register = React.lazy(() => import("./Routes/Manage/Register/Register"));
const Login = React.lazy(() => import("./Routes/Manage/Login/Login"));
const Nav = React.lazy(() => import("./Routes/Navbar/Nav"));
const Create = React.lazy(() => import("./Routes/Create/Create"));
const Search = React.lazy(() => import("./Routes/Search/Search"));
const Product = React.lazy(() => import("./Routes/Product/Product"));
const Contact = React.lazy(() => import("./Routes/Contact/Contact"));
const Footer = React.lazy(() => import("./Routes/Footer/Footer"));
const ChatBox = React.lazy(() => import("./Routes/ChatBox/ChatBox"));

export const UserContext = React.createContext();

function App({ location }) {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({}); //containing user
  const [affiliate, setAffiliate] = useState(true);

  const BASE = "http://localhost:8000";

  const [status, setStatus] = useState("");
  location = useLocation();

  useEffect(() => {
    const storedCompany = localStorage.getItem("company");
    try {
      // Check if storedCompany is valid JSON before parsing
      const parsedCompany = storedCompany ? JSON.parse(storedCompany) : {};
      setCompany(parsedCompany);
    } catch (error) {
      console.error("Error parsing storedCompany:", error);
      // Handle parsing error, maybe set company to an empty object or log the error
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }, [status]);

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
  }, [company]);

  function clearUp() {
    localStorage.clear();
  }

  useEffect(() => {
    if (location.pathname === "/logout") {
      setCompany({ gmail: "", password: "" });
    }
  }, [location.pathname, setCompany]);

  const theStates = {
    company,
    setCompany,
    status,
    setStatus,
    loading,
    setLoading,
    BASE,
    affiliate,
    setAffiliate,
  };

  return (
    <section className="bg-black flex flex-col justify-center items-center h-full w-full">
      <UserContext.Provider value={theStates}>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} /> {/**Homepage*/}
            <Route path="social" element={<Social />}></Route>
            {/**Social Section */}
            <Route path="/more" element={<SeeMore />} />
            <Route path="/register" element={<Register />} /> {/**Register*/}
            <Route path="/contact" element={<Contact />} /> {/**Contact*/}
            <Route path="/write" element={<CreatePost />} />
            {/**Create social post*/}
            <Route path="/affiliates" element={company && <Affiliates />} />
            {/**Joins program */}
            <Route path="/login" element={<Login />} /> {/**Buggy */}
            <Route path="/search/:item" element={<Searched />} />
            {/**Search bar*/}
            <Route path="/procedure" element={<Procedure />} />
            {/**How to start*/}
            <Route
              path="/purchase/:id"
              element={company && <BuyProduct />}
            ></Route>
            {/**Buying product*/}
            <Route
              path="/confirmation/:id"
              element={company && <Confirmation />}
            ></Route>
            {/**Order confirmation*/}
            <Route
              path="/dashboard"
              element={company && affiliate && <Dashboard />}
            ></Route>
            {/**Calculates earnings */}
            <Route path="/product/:id" element={<Product />} />
            {/**Redirects to product */}
            {company && company.gmail && (
              <Route path="/create" element={<Create />} />
            )}
            {/**Create listing*/}
            <Route path="*" element={<NotFound />}></Route>
            {/* <Route path="/create" element={<Create />} /> */}
          </Routes>
        </Suspense>
      </UserContext.Provider>
      <Footer />
    </section>
  );
}

export default App;
