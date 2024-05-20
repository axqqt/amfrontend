import { UserContext } from "@/App";
import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { loading, setLoading, status, setStatus, BASE, userId } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null,
    tags: "",
    userId,
  });

  async function createPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", postData.image);
    formData.append("tags", postData.tags);
    formData.append("userId", userId);

    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/socials`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setStatus("Your post was added!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setStatus("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPostData({ ...postData, image: files[0] });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  return (
    <div>
      <h1>Create Blog Post</h1>
      <div className="sub">
        <h1>{status}</h1>
        <div className="create">
          {loading && <h1>Loading...</h1>}
          <form onSubmit={createPost}>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Enter title"
              value={postData.title}
              required
            />
            <textarea
              onChange={handleChange}
              name="content"
              placeholder="Enter content"
              value={postData.content}
              required
            />
            <input
              type="file"
              onChange={handleChange}
              name="image"
              accept="image/*"
              required
            />
            <input
              onChange={handleChange}
              name="tags"
              placeholder="Enter tags (comma separated)"
              value={postData.tags}
              required
            />
            <button type="submit">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
