import { UserContext } from "@/App";
import { useContext, useState } from "react";
import Axios from "axios";

function Contact() {
  const { loading, setLoading, BASE, status, setStatus } =
    useContext(UserContext);

  const [inquiry, setInquiry] = useState({ title: "", description: "" , email:""});

  async function ContactUsEmail(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post(`${BASE}/contact`, { inquiry }).then((data) => {
        if (data.status === 200) {
          setStatus("We will get back to you soon!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center w-full p-24">
      <div className="container">
        <div className="flex flex-col justify-between items-center gap-6 h-full">
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-5xl text-white text-center font-bold">
              We are here to help <br /> you level up.
            </h1>
            <p className="text-muted">
              Contact us for any queries or feedback.
            </p>
          </div>
          <div className="mx-auto items-center justify-center text-start">
            <h1 className="text-xl mb-5  text-white">
              Contact us using these Emails:
            </h1>
            <span className="text-muted">Velo: </span>
            <a
              href="mailto:imveloxal@gmail.com"
              className="text-lg text-primary underline hover:text-muted transition-all"
            >
              imveloxal@gmail.com
            </a>{" "}
            <br />
            <span className="text-muted">Reminoes: </span>
            <a
              href="mailto:hello@binukads.me"
              className="text-lg text-primary underline  hover:text-muted transition-all"
            >
              reminoes555@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="email-us">
        <h1>{status}</h1>
        {loading && <h1>Loading...</h1>}
        <form onSubmit={ContactUsEmail}>
          <input onChange={handleChange} name="title"></input>
          <input onChange={handleChange} name="description"></input>
          <input onChange={handleChange} name="email"></input>
          <button type="submit" disabled={loading}>
            Report!
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
