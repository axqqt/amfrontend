/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";

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

      <div className="s-container">
        {/* <ul>
          <li>
            <a href="default.asp">Home</a>
          </li>
          <li>
            <a href="news.asp">News</a>
          </li>
          <li>
            <a href="contact.asp">Contact</a>
          </li>
          <li>
            <a href="about.asp">About</a>
          </li>
        </ul> */}
      </div>
      <div>
        <h1>Social</h1>
        {blog && blog.length ? (
          <div>
            <h2>{JSON.stringify(blog)}</h2>
          </div>
        ) : (
          <h1>No results found</h1>
        )}
      </div>
      <h1>{status}</h1>
    </div>
  );
};

export default Social;
