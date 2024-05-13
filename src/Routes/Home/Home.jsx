/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Search from "../Search/Search";
import { UserContext } from "../../App";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import FeedbackSection from "@/components/FeedbackSection";

const Home = () => {
  const { company, loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  async function fetchContent() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains?type=${selectedType}`);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("No results found");
      } else {
        setStatus("Error!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <section className="h-full w-full">
      <Search />
      <HeroSection />
      <ProductsSection />
      <FeedbackSection />
    </section>
  );
};

export default Home;
