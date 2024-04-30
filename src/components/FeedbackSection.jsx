import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Axios from "axios";

function FeedbackSection() {
  const [feedback, setMsg] = useState("");
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);

  async function AddFeedback(e) {
    e.preventDefault();
    try {
      await Axios.post(`${BASE}/feedbacks`, { feedback }).then((response) => {
        if (response.status === 201) {
          setTimeout(() => {
            setStatus("Thank you for your feedback");
            console.log("Thank you for your feedback")
          }, 2000);
        } else if (response.status === 403) {
          setStatus("Error while adding your status!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="w-full mt-5 py-5" id="feedback">
      <div className="container flex flex-col justify-between items-center">
        <h1 className="md:text-5xl text-3xl text-white font-bold mb-5 text-center">Leave a Feedback</h1>
        <h3 className="md:text-3xl text-xl text-muted  text-center font-bold mt-5">
          We would really appreciate your feedback for{" "}
          <span className="text-primary">Improvement!</span>
        </h3>
        <h3 className="text-white text-start md:text-2xl mt-3 mb-5 hidden md:flex">
          Don't Worry It's Completely Anonymous :)
        </h3>
        
          <form onSubmit={AddFeedback} className="flex justify-between items-center lg:w-auto md:w-full gap-3 mt-5">
            <Input type="text" placeholder="Leave a Feedback" onChange={(e) => {
            setMsg(e.target.value);
          }}/>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </form>
          <h3 className="text-muted text-center text-xl mt-5 mb-5 md:hidden flex">
          Don't Worry It's Completely Anonymous :)
        </h3>
        <h2 style={{color:"white",margin:"40px"}}>{status}</h2>
        </div>
        
    </section>
  );
}

export default FeedbackSection;
