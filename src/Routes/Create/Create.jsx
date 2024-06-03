import { useContext, useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";

const Create = () => {
  const { loading, setLoading, BASE, status, setStatus, company } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    link: "",
    category: "",
    commission: "",
    price: "",
    productType: "physical", // Default value
  });

  const navigator = useNavigate();
  const commissionRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    if (formData.commission && parseFloat(formData.commission) < 5) {
      alert("Commission rate must be minimum 5%");
      commissionRef.current.focus();
    }
  }, [formData.commission]);

  const addContent = async (e) => {
    e.preventDefault();

    // Validate Commission and Price
    if (parseFloat(formData.commission) < 5) {
      setStatus("Error: Commission must be at least 5%");
      commissionRef.current.focus();
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setStatus("Error: Price must be a positive number");
      priceRef.current.focus();
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("commission", formData.commission);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("userId", company._id);
      formDataToSend.append("media", formData.video);
      formDataToSend.append("mediaType", formData.video.type.startsWith("video") ? "video" : "image");

      const response = await Axios.post(`${BASE}/content`, formDataToSend);
      if (response.status === 201) {
        setStatus("Content Added");
        setFormData({
          title: "",
          description: "",
          video: null,
          link: "",
          category: "",
          commission: "",
          price: "",
          productType: "physical",
        });
        navigator("/");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error: Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "commission" ? (parseFloat(value) < 5 ? 5 : value) : value;
    setFormData({ ...formData, [name]: name === "video" ? files[0] : newValue });
  };

  return (
    <section className="flex flex-col justify-between items-center w-full lg:p-24 h-full" style={{ color: "white" }}>
      {loading && <h1>Loading...</h1>}
      <div className="container">
        <h1 className="text-3xl text-white font-bold mt-5 mb-5 text-center">
          Add Listing
        </h1>
        <form onSubmit={addContent} className="w-full" style={{ margin: "60px" }}>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
            <div className="bg-slate-900 p-5 border border-border rounded-xl flex flex-col justify-between">
              <h1 className="text-2xl text-primary font-bold">Main Details</h1>
              <p className="text-muted text-sm">Enter main details here...</p>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Title:</label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Description:</label>
                <textarea
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Price:</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  ref={priceRef}
                  placeholder="Enter Price"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="bg-slate-900 p-5 border border-border rounded-xl flex flex-col justify-between">
              <h1 className="text-2xl text-primary font-bold">Other Details</h1>
              <p className="text-muted text-sm">Enter other details here...</p>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Category:</label>
                <select
                  name="category"
                  className="p-2 rounded-lg"
                  value={formData.category}
                  onChange={handleChange}
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
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Commission:</label>
                <input
                  name="commission"
                  type="number"
                  value={formData.commission}
                  min={5}
                  ref={commissionRef}
                  onChange={handleChange}
                  placeholder="Enter Commission"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Product Type:</label>
                <select
                  name="productType"
                  className="p-2 rounded-lg"
                  value={formData.productType}
                  onChange={handleChange}
                  required
                >
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                </select>
              </div>
            </div>
            <div className="bg-slate-900 p-5 border border-border rounded-xl flex flex-col justify-between w-full md:col-span-2">
              <h1 className="text-2xl text-primary font-bold">Media</h1>
              <p className="text-muted text-sm">Upload media files here...</p>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Video / Photo:</label>
                <input
                  name="video"
                  type="file"
                  onChange={handleChange}
                  className="text-white p-2 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col justify-between gap-2 mt-5">
                <label className="text-white">Link:</label>
                <input
                  name="link"
                  type="text"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter Link"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          <Button className="flex w-full mt-5">Submit</Button>
        </form>
        <h2>{status}</h2>
      </div>
    </section>
  );
};

export default Create;
