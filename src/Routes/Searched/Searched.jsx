/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import Search from "../Search/Search";

const Searched = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const { item } = useParams();
  const [selectedType, setSelectedType] = useState("all");
  const [data, setData] = useState([]);

  async function fetchForQuery() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/searchs`, { search: item });
      console.log(response.data);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("No results found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchForQuery();
  }, []);

  return (
    <section
      className="lg:px-24 py-12 justify-center items-start"
      id="products"
    >
      <div className="search">
        <Search />
      </div>
      <div className="container flex flex-col ">
        {loading ? (
          <h1 style={{ color: "white" }}>Loading...</h1>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 gap-x-6 mt-5"
            style={{ color: "white" }}
          >
            {data && data.length ? (
              <>
                {Array.isArray(data) && data.length > 0 ? (
                  data
                    .filter(
                      (item) =>
                        selectedType === "all" || item.category === selectedType
                    )
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
            ) : (
              <h1>{`No results matching ${item}`} </h1>
            )}
          </div>
        )}
        <p>{status}</p>
      </div>
    </section>
  );
};

export default Searched;
