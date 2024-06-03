/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Suspense, useContext } from "react";
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
import MiniGame from "./components/Games/MiniGame";
import MiniGame2 from "./components/Games/MiniGame2";
import Axios from "axios";
import Claims from "./Routes/Claims/Claims";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";
import Popup from "./components/Games/Popup";
import ProductsAdded from "./components/Dashboard/CompanyProducts/ProductsAdded";

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
  const [company, setCompany] = useState({}); // containing user at the moment, needs to be divided to user and company
  const [user, setUser] = useState({}); // for the user
  const [affiliate, setAffiliate] = useState(true);
  const [toggleBot, setToggleBot] = useState(false);
  const [score, setScore] = useState(0);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [gameCounter, setGameCounter] = useState(0);

  async function updateScore() {
    try {
      setLoading(true);
      await Axios.put(`${BASE}/affiliates/score`, { score, user }).then(
        (response) => {
          if (response.status === 200) {
            console.log("Recorded!");
          } else {
            console.log("Error while recording!");
          }
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    updateScore();
  }, [score]);

  const BASE = "http://localhost:8000";
  const MAX_GAMES_PER_SESSION = 3; // Maximum number of mini-games per session
  const COOLDOWN_PERIOD = 30000; // Cooldown period between mini-games in milliseconds (30 seconds)

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

  useEffect(() => {
    if (affiliate && gameCounter < MAX_GAMES_PER_SESSION) {
      const gameTimer = setTimeout(() => {
        setShowMiniGame(true);
        setGameCounter((prevCounter) => prevCounter + 1);
      }, COOLDOWN_PERIOD);

      return () => clearTimeout(gameTimer);
    }
  }, [affiliate, gameCounter]);

  const handleSkipGame = () => {
    setShowMiniGame(false);
  };

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
    score,
    setScore,
  };

  const getRandomMiniGame = () => {
    const games = [<MiniGame key="game1" />, <MiniGame2 key="game2" />];
    return games[Math.floor(Math.random() * games.length)];
  };

  return (
    <section className="bg-black flex flex-col justify-center items-center h-full w-full">
      <UserContext.Provider value={theStates}>
        <Suspense fallback={<div>Loading...</div>}>
          <Nav />
          {affiliate && <Popup />} {/**Quiz for affiliates */}
          {user && company && <ChatBox />}
          {showMiniGame && affiliate && (
            <div className="mini-game-wrapper">
              {getRandomMiniGame()}
              <button className="skip-button" onClick={handleSkipGame}>
                Skip
              </button>
            </div>
          )}
          <Routes>
            {/**There needs to be a ranking system! (BACKEND) */}
            <Route path="/" element={<Home />} /> {/**Homepage*/}
            <Route path="/more" element={<SeeMore />} />
            {/**View more products */}
            <Route path="/company" element={<Company />}></Route>
            {/**Company registration */}
            {!user?._id && (
              <>
                <Route path="/register" element={<Register />} />
                {/**Register*/}
                <Route path="/login" element={<Login />} /> {/**Login*/}
              </>
            )}
            <Route path="/contact" element={<Contact />} /> {/**Contact*/}
            <Route path="/affiliates" element={<Affiliates />} />
            {/**Joins program (non affiliated existing users ONLY) */}
            <Route path="/mybasket" element={<MyBasket />}></Route> 
            {/**For users */}
            <Route path="/companyproducts" element={<ProductsAdded/>}></Route> 
            {/*For companies* */}
            {/**User's basket (CAN CANCEL ORDERS) */}
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
            {user?.role !== "user" && company._id !== null && (
              <Route path="/create" element={<Create />} />
            )}
            {/**Create COMPANY listing for non-normal users*/}
            <Route path="/claims/:id/:price" element={<Claims />}></Route>{" "}
            {/**Claiming comissions */}
            {/* <Route path="/dashboard" element={affiliate._id && <Dashboard />}></Route> */}
            {/**Commented out for test 👆🏻 */}
            <Route
              path="/dashboard"
              element={affiliate && <Dashboard />}
            ></Route>
            {/* <Route path="/companydashboard" element={company._id && <CompanyDashboard/>}></Route> */}
            {/**Uncomment when needed 👆🏻 */}
            <Route
              path="/companydashboard"
              element={<CompanyDashboard />}
            ></Route>
            {/**Calculates earnings and traces -> reporting back to user + company */}
            <Route path="/product/:id" element={<Product />} />
            {/**Redirects hashed link to product */}
            {/**FOR MUCH LATER 👇🏻 */}
            <Route path="social" element={<Social />}></Route>
            {/**Social Section */}
            <Route path="/write" element={<CreatePost />} />
            {/**Create social post*/}
            <Route path="*" element={<NotFound />}></Route>
            {/**Handles exceptions */}
          </Routes>
        </Suspense>
      </UserContext.Provider>
      <Footer />
    </section>
  );
}

export default App;
