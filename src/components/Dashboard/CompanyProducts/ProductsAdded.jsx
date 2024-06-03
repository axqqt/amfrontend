/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const ProductsAdded = () => {
  const { loading, setLoading, status, setStatus, BASE, company } =
    useContext(UserContext);
  const [addedProducts, setAddedProducts] = useState([]);

  const [modification, setModification] = useState({
    title: "",
    description: "",
    video: null,
    link: "",
    category: "",
    commission: "",
    price: "",
    productType: "physical", // Default value
  });

  async function fetchAddedProducts() {
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/companys/fetchproducts`);
      if (response.status === 200) {
        setAddedProducts(response.data);
        console.log("Got data");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function modifyProducts(productId) {
    try {
      setLoading(true);
      const response = await Axios.post(
        `${BASE}/companys/modify/${productId}`,
        {
          ...modification,
        }
      );
      if (response.status === 200) {
        fetchAddedProducts(); // Fetch updated products
        console.log("Modified product");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddedProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setModification({
      ...modification,
      [name]: name === "video" ? files[0] : value,
    });
  };

  return (
    <div style={{ color: "white", fontSize: 22 }}>
      <div className="sub-container" style={{ margin: "40px" }}>
        <h1>Your inventory</h1>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="data">
            {addedProducts && addedProducts.length ? (
              addedProducts.map((product, index) => (
                <div
                  key={product._id || index}
                  className="product-card"
                  style={{ padding: "40px" }}
                >
                  <h1>Title: {product.title}</h1>
                  <h1>Price: {product.price}</h1>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      modifyProducts(product._id);
                    }}
                  >
                    <div>
                      <label>Title:</label>
                      <input
                        name="title"
                        type="text"
                        value={modification.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="p-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label>Description:</label>
                      <textarea
                        name="description"
                        value={modification.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="p-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label>Price:</label>
                      <input
                        name="price"
                        type="number"
                        value={modification.price}
                        onChange={handleChange}
                        placeholder="Enter Price"
                        className="p-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label>Category:</label>
                      <select
                        name="category"
                        value={modification.category}
                        onChange={handleChange}
                        className="p-2 rounded-lg"
                        required
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
                    <div>
                      <label>Commission:</label>
                      <input
                        name="commission"
                        type="number"
                        value={modification.commission}
                        onChange={handleChange}
                        placeholder="Enter Commission"
                        className="p-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label>Product Type:</label>
                      <select
                        name="productType"
                        value={modification.productType}
                        onChange={handleChange}
                        className="p-2 rounded-lg"
                        required
                      >
                        <option value="physical">Physical</option>
                        <option value="digital">Digital</option>
                      </select>
                    </div>
                    <div>
                      <label>Link:</label>
                      <input
                        name="link"
                        type="text"
                        value={modification.link}
                        onChange={handleChange}
                        placeholder="Enter Link"
                        className="p-2 rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label>Video / Photo:</label>
                      <input
                        name="video"
                        type="file"
                        onChange={handleChange}
                        className="p-2 rounded-md"
                        required
                      />
                    </div>
                    <button type="submit">Modify Listing!</button>
                  </form>
                  <h2>{status}</h2>
                </div>
              ))
            ) : (
              <div className="exceptional">
                <h1>No Products Listed yet</h1>
              </div>
            )}
            <Link to={"/create"}>Add a listing?</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsAdded;
