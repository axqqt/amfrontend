import { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Button } from "@/components/ui/button";

const Create = () => {
  const { loading, setLoading, BASE, status, setStatus, company } =
    useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: null,
    link: "",
    category: "",
    commission: "",
  });

  const navigator = useNavigate();

  const addContent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("commission", formData.commission);
      formDataToSend.append("userId", company._id); // Add userId
      formDataToSend.append("media", formData.video); // Change 'video' to 'media'
      console.log(
        formData.title,
        formData.description,
        formData.link,
        formData.category,
        formData.commission,
        company._id
      );
      const response = await Axios.post(`${BASE}/`, formDataToSend); // Send to root route
      if (response.status === 201) {
        setStatus("Content Added");
        setFormData({
          title: "",
          description: "",
          video: null,
          link: "",
          category: "",
          commission: "",
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
    setFormData({ ...formData, [name]: name === "video" ? files[0] : value });
  };

  return (
    <section className="flex flex-col justify-between items-center w-full p-24 h-screen">
      <div className="container">
        <h1 className="text-3xl text-white font-bold mt-5 mb-5 text-center">
          Add Listing
        </h1>
        <form onSubmit={addContent} className="w-full">
          <div className="grid lg:grid-cols-3  grid-cols-1 gap-6 w-full">
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
                  type="text"
                  value={formData.commission}
                  onChange={handleChange}
                  placeholder="Enter Commission"
                  className="p-2 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="bg-slate-900 p-5 border border-border rounded-xl flex flex-col justify-between">
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
