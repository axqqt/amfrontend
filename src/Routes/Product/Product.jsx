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
    <section className="h-screen w-full p-24">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container">
          <div className="flex justify-between items-center w-full">
            <div className="flex justfiy-center items-center w-1/2">
              <div className="">
                <video
                  className="aspect-auto rounded-lg"
                  width={480}
                  height={640}
                  controls
                >
                  <source src={Data.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* <div className="timestamps">
                  <h1 className="text-white">{Data.timestamps}</h1>
                </div> */}
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between items-start gap-6">
            <div className="p-10 rounded-xl border border-border w-full">
              <Badge>{Data.category}</Badge>
              <h1 className="text-4xl text-primary font-bold mt-5">{Data.title}</h1>
              <p className="text-muted mt-5 text-start text-sm">
                {Data.description}
              </p>
              <p className="text-white font-bold text-2xl mt-5">
                Commission: ${Data.commission}
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
