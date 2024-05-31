/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Product = () => {
  const { loading, setLoading, status, setStatus, BASE, affiliate, company } =
    useContext(UserContext);
  const { id } = useParams();
  const [Data, setData] = useState({});
  const [affiliateMenu, setAffiliateMenu] = useState(false);

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

  async function openAffiliate() {
    //affiliates
    setAffiliateMenu(!affiliateMenu);
    try {
      const response = await Axios.post(`${BASE}/affiliates`, {
        productId: id,
        affiliateId: company._id,
      });
      if (response.status === 200) {
        setStatus("Got data!");
      } else if (response.status === 500) {
        setStatus("You are not affiliated!");
      }
    } catch (err) {
      console.error(err);
      if (err.status === 404) {
        setStatus("Not found!");
      }
    }
  }

  return (
    <section className="h-full flex w-full md:p-24">
      {loading ? (
        <h1 style={{ color: "white" }}>Loading...</h1>
      ) : (
        <div className="container">
          <div className="flex md:justify-between flex-col md:flex-row justify-center gap-6 flex-auto items-center w-full">
            <div className="flex justfiy-center items-center md:w-1/2">
              <div className="">
                {Data.mediaType === "photo" ? (
                  <img src={Data.mediaUrl} alt={`Image of ${Data.title}`}></img>
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
            <h1 style={{ color: "white" }}>{status}</h1>
            {affiliate && (
              <button
                className="get-link"
                style={{ color: "white" }}
                onClick={openAffiliate}
              >
                Get Affiliate Link
              </button>
            )}
            {affiliate && affiliateMenu && (
              <div className="affiliates" style={{ color: "wheat" }}>
                <div
                  className="container"
                  style={{ border: "10px solid white" }}
                >
                  <p
                    className="text-white md:text-start text-center font-bold text-2xl mt-5"
                    style={{ margin: "20px" }}
                  >
                    You will receive {Data.commission}% Commission Per Sale! ,
                    approx.{" "}
                    {Data.price / Data.commission !== null ? (
                      Data.price / Data.commission
                    ) : (
                      <h1>0%</h1>
                    )}
                  </p>
                  <div className="outcome">
                    {Data.length ? (
                      <div>
                        <h1>Grab your link</h1>
                        <button
                          onClick={() => {
                            setStatus("Link Copied!");
                          }}
                        >
                          {Data?.affiliateLink}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h1>Error while getting your link</h1>
                      </div>
                    )}
                  </div>
                  {/* <h2>{status}</h2> */}
                </div>
              </div>
            )}
            <div className="md:w-1/2 flex flex-col justify-between items-start gap-6 w-full">
              <div className="p-10 rounded-xl border border-border w-full">
                <Badge>{Data.category}</Badge>
                <h1 className="text-4xl text-primary font-bold mt-5">
                  {Data.title}
                </h1>
                <p className="text-muted mt-5 text-center md:text-start text-xs md:text-sm">
                  {Data.description}
                </p>
              </div>
              <div className="w-full">
                {Data.stock ? (
                  <Link
                    to={`/purchase/${id}`}
                    target="_blank"
                    className="w-full"
                  >
                    <Button className="flex justify-center w-full">
                      <h1>Buy Now!</h1>
                    </Button>
                  </Link>
                ) : (
                  <div
                    className="out"
                    onClick={() => {
                      alert(`${Data.title} Is Out of Stock`);
                    }}
                  >
                    <button
                      className="flex justify-center w-full"
                      disabled={true}
                      style={{color:"white"}}
                    >
                      <h1>Item out of stock</h1>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
