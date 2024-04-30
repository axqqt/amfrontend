/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Product = () => {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const { id } = useParams();
  const [Data, setData] = useState([]);

  async function fetchItem() {
    try {
      setLoading(true);
      const response = await Axios.get(`${BASE}/mains/${id}`);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) {
        setStatus("Item not found");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItem();
  }, [id]);

  return (
    <section className="h-full flex w-full md:p-24">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="flex md:justify-between flex-col md:flex-row justify-center gap-6 flex-auto items-center w-full">
            <div className="flex justfiy-center items-center md:w-1/2">
              <div className="">
                {Data.mediaType === "photo" ? (
                  <img
                    src={Data.mediaUrl}
                    alt={`Image of ${Data.title}`}
                  ></img>
                ) : (
                  <video
                    className="aspect-auto rounded-lg w-full h-full"
                    width={720}
                    height={1280}
                    controls
                  >
                    <source src={Data.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {/* <div className="timestamps">
                  <h1 className="text-white">{Data.timestamps}</h1>
                </div> */}
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-between items-start gap-6 w-full">
              <div className="p-10 rounded-xl border border-border w-full">
                <Badge>{Data.category}</Badge>
                <h1 className="text-4xl text-primary font-bold mt-5">
                  {Data.title}
                </h1>
                <p className="text-muted mt-5 text-center md:text-start text-xs md:text-sm">
                  {Data.description}
                </p>
                <p className="text-white md:text-start text-center font-bold text-2xl mt-5">
                  Commission: {Data.commission}%
                </p>
              </div>
              <div className="w-full">
                <Link to={Data.link} target="_blank" className="w-full">
                  <Button className="flex justify-center w-full">
                    Take a look
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
