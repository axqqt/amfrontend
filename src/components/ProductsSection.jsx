import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "@/App";

function ProductsSection() {
  const { company, loading, setLoading, BASE, status, setStatus } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [visibleCards, setVisibleCards] = useState(12); // Initially show 12 cards
  const navigate = useNavigate();

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
      setStatus("Error!");
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

  const handleSeeMore = () => {
    navigate("/more");
  };

  return (
    <section className="lg:px-24 py-12 justify-center items-start" id="products">
      <div className="container flex flex-col ">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-start text-white text-3xl font-bold">Products</h1>
          <div className="md:flex justify-between items-center hidden">
            <select
              value={selectedType}
              className="p-2 rounded-lg"
              onChange={handleTypeChange}
            >
          <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="health">Health</option>
              <option value="travel">Travel</option>
              <option value="home">Home</option>
              <option value="outdoors">Outdoors</option>
            </select>
          </div>
          <div className="flex justify-between items-center md:hidden">
            <select
              value={selectedType}
              className="p-2 rounded-lg"
              onChange={handleTypeChange}
            >
              <option value="all">All</option>
              <option value="clothing">Clothing</option>
              <option value="health">Health Care</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 gap-x-6 mt-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {Array.isArray(data) && data.length > 0 ? (
                data
                  .filter(
                    (item) =>
                      selectedType === "all" || item.category === selectedType
                  )
                  .slice(0, visibleCards) // Limit to visibleCards
                  .map((item) => (
                    <Link to={`/product/${item._id}`} key={item._id}>
                      <div
                        key={item._id}
                        className="flex flex-col justify-between gap-6 items-center border border-border p-5 rounded-xl hover:scale-105 transition-all"
                      >
                        {item.mediaType === "photo" ? (
                          <img
                            src={item.mediaUrl}
                            alt={`Image of ${item.title}`}
                          ></img>
                        ) : (
                          <video
                            width="320"
                            height="240"
                            controls
                            className="rounded-xl hover:opacity-70 transition-all "
                          >
                            <source src={item.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}

                        <div className="flex justify-between items-center w-full">
                          <div>
                            <h1 className="text-white">{item.title}</h1>
                            <h3 className="text-muted mt-3 ">
                              Commission : {item.commission}
                            </h3>
                          </div>

                          <div className="flex flex-col justify-between items-end">
                            <p className="text-white p-1 bg-primary-foreground rounded-xl text-xs px-2">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
              ) : (
                <h1>{status}</h1>
              )}
            </>
          )}
        </div>
        {/* Render See More button if there are more cards to display */}
        {data.length > visibleCards && (
          <div className="flex justify-center mt-4">
            <button className="btn" onClick={handleSeeMore} style={{color:"wheat",borderRadius:"12px",borderColor:"purple"}}>
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;
