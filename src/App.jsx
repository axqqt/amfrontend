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
import Company from "./Routes/Company/Company";
import MyBasket from "./Routes/MyOrders/MyBasket";

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
  const [company, setCompany] = useState({}); //containing user at the moment needs to be divided to user and company
  const [user, setUser] = useState([]);
  const [affiliate, setAffiliate] = useState(true);
  const [toggleBot, setToggleBot] = useState(false);

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
    user,
    setUser,
    toggleBot,
    setToggleBot,
  };

  return (
    <section className="bg-black flex flex-col justify-center items-center h-full w-full">
      <UserContext.Provider value={theStates}>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
          <ChatBox /> {/**Plugged to gemini */}
          <Routes>
            {/**There needs to be a ranking system! (BACKEND) */}
            <Route path="/" element={<Home />} /> {/**Homepage*/}
            <Route path="/more" element={<SeeMore />} />
            {/**View more about a product */}
            <Route path="/company" element={<Company />}></Route>
            {/**Company related */}
            <Route path="/register" element={<Register />} /> {/**Register*/}
            <Route path="/contact" element={<Contact />} /> {/**Contact*/}
            <Route path="/affiliates" element={<Affiliates />} />
            {/**Joins program (non affiliated existing users ONLY) */}
            {/**company &&  */}
            <Route path="/mybasket" element={<MyBasket />}></Route>
            {/**User's basket (CAN CANCEL ORDERS) */}
            <Route path="/login" element={<Login />} /> {/**Buggy */}
            <Route path="/search/:item" element={<Searched />} />
            {/**Search bar*/}
            <Route path="/procedure" element={<Procedure />} />
            {/**How to get started*/}
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
            {/* <Route
              path="/dashboard"
              element={(company || affiliate) && <Dashboard />}
            /> */}
            <Route path="/dashboard" element={<Dashboard />}></Route>
            {/**Calculates earnings and traces -> reporting back to user + company */}
            <Route path="/product/:id" element={<Product />} />
            {/**Redirects hashed link to product */}
            {/* {company && company.gmail && (
              <Route path="/create" element={<Create />} />
            )} */}
            {company && ( //companies , verified users and affiliates should be able to write!
              <div>
                <Route path="/create" element={<Create />} />
                {/**Create COMPANY listing*/}
                <Route path="social" element={<Social />}></Route>
                {/**Social Section */}
                <Route path="/write" element={<CreatePost />} />
                {/**Create social post*/}
                <Route path="*" element={<NotFound />}></Route>
                {/**Handles exceptions */}
              </div>
            )}
          </Routes>
        </Suspense>
      </UserContext.Provider>
      <Footer />
    </section>
  );
}

export default App;
