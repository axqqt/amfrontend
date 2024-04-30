import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Axios from "axios";
import { Textarea } from "./ui/textarea";

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
            console.log("Thank you for your feedback");
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
    <section className="w-full  mt-5 py-5  " id="feedback">
      <div className="container w-full flex justify-between">
        <div className="flex flex-col md:flex-row justify-around items-center w-full">
          <div className="w-full lg:p-24 xl:p-0 xl:w-1/2">
            <h1 className="md:text-5xl text-3xl text-white font-bold mb-5 text-start">
              Leave a Feedback
            </h1>

            <h3 className="text-md text-muted  text-start font-bold mt-5">
              We would really appreciate your feedback for{" "}
              <span className="text-primary">Improvement!</span>
            </h3>

            <form
              onSubmit={AddFeedback}
              className="flex flex-col justify-between items-start md:w-full gap-3 mt-5"
            >
              <Textarea
                rows={5}
                className="p-2 rounded-lg bg-slate-900 border border-border  text-white"
                type="text"
                placeholder="Type your message here."
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
              <h3 className="text-muted text-start text-sm  mb-5 flex">
                Don't Worry It's Completely Anonymous :)
              </h3>
              <Button className="w-full lg:w-auto" type="submit" disabled={loading}>
                Submit
              </Button>
            </form>
            <h2 style={{ color: "white", margin: "40px" }}>{status}</h2>
          </div>
          <div className="hidden xl:flex">
            <img
              src="/bg.jpg"
              className="rounded-2xl"
              alt="background"
              height={450}
              width={450}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeedbackSection;
