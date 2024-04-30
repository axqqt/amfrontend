/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Suspense,
} from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./Routes/NotFound/NotFound";

import Procedure from "./Routes/Procedure/Procedure";
import Footer from "./components/Footer";
import Searched from "./Routes/Searched/Searched";
import FeedbackSection from "./components/FeedbackSection";

// Lazy load your route components
const Home = React.lazy(() => import("./Routes/Home/Home"));
const Register = React.lazy(() => import("./Routes/Manage/Register/Register"));
const Login = React.lazy(() => import("./Routes/Manage/Login/Login"));
const Nav = React.lazy(() => import("./Routes/Navbar/Nav"));
const Create = React.lazy(() => import("./Routes/Create/Create"));
const Search = React.lazy(() => import("./Routes/Search/Search"));
const Product = React.lazy(() => import("./Routes/Product/Product"));
const Contact = React.lazy(() => import("./Routes/Contact/Contact"));
const ChatBox = React.lazy(() => import("./Routes/ChatBox/ChatBox"));

export const UserContext = createContext();

function App({ location }) {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(() => {
    // Retrieve company data from localStorage on initial render
    const storedCompany = localStorage.getItem("company");
    return storedCompany
      ? JSON.parse(storedCompany)
      : { gmail: "", password: "" };
  });
  const [status, setStatus] = useState("");
  const BASE = "http://localhost:8000";
  location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setStatus("");
    }, 2000);
  }, [status]);

  useEffect(() => {
    // Save company data to localStorage whenever it changes
    localStorage.setItem("company", JSON.stringify(company));
  }, [company]);

  const theStates = {
    loading,
    setLoading,
    company,
    setCompany,
    BASE,
    status,
    setStatus,
  };

  // If you want to clear company data on certain routes, you can do it here
  useEffect(() => {
    if (location.pathname === "/logout") {
      setCompany({ gmail: "", password: "" });
    }
  }, [location.pathname, setCompany]);

  return (
    <section className="bg-black flex flex-col justify-center items-center w-full">
      <UserContext.Provider value={theStates}>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
          {/* <ChatBox /> */}
          {/* <Search /> */}
          <Search />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search/:item" element={<Searched />}></Route>
            <Route path="/procedure" element={<Procedure />}></Route>
            <Route path="/product/:id" element={<Product />} />
            {company && company.gmail && (
              <Route path="/create" element={<Create />} />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>

          <FeedbackSection />
        </Suspense>
      </UserContext.Provider>
      <Footer />
    </section>
  );
}

export default App;
