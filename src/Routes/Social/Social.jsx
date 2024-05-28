/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Social = () => {
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);
  const [blog, setBlog] = useState([]);

  async function fetchSocials() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/socials`);
      if (response.status === 200) {
        setBlog(response.data);
      }
    } catch (err) {
      console.error(err);
      if (err.status === 404) {
        setStatus("No results found!");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSocials();
  }, []);

  return (
    <div style={{ color: "white", margin: "40px" }}>
      {loading && <h1>Loading...</h1>}

      <div className="s-container"></div>
      <div>
        <h1>Social</h1>
        {blog && blog.length ? (
          <div>
            <h2>
              {blog.map((iterate) => {
                <div className="container">
                  <h1>{iterate.title}</h1>
                  <h2>{iterate.content}</h2>
                  <h3>{iterate.category}</h3>
                  {iterate.image && (
                    <img
                      src={iterate.image}
                      alt={`Image of ${iterate.title}`}
                    ></img>
                  )}
                  <h4>{iterate.tags}</h4>
                  <div className="comments">
                    {iterate.comments.array.forEach((element) => {
                      <h1>{element}</h1>;
                    })}
                  </div>
                  <label>
                    <span>
                      <h1>Added on</h1>
                      <h2>{iterate.createdAt}</h2>
                    </span>
                  </label>
                </div>;
              })}
            </h2>
          </div>
        ) : (
          <h1>No results found</h1>
        )}
        <div className="create">
          <Link to={"/write"}>Create A Post!</Link>
        </div>
      </div>
      <h1>{status}</h1>
    </div>
  );
};

export default Social;
