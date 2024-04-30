import { useContext, useState } from "react";
import { UserContext } from "../../App";
import Axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const Feedback = () => {
  const [feedback, setMsg] = useState("");
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);

  async function AddFeedback(e) {
    e.preventDefault();
    try {
      await Axios.post(`${BASE}/feedbacks`, {feedback}).then((response) => {
        if (response.status === 201) {
          setTimeout(() => {
            setStatus("Thank you for your feedback");
          }, 2400);
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
    <div id="feedback">
      <h1>Feedback</h1>
      <h2>We would really appreciate your feedback for improvement!</h2>
      <h3>Do NOT worry , its completely anonymous!</h3>
      <form onSubmit={AddFeedback}>
        <Textarea
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          min={5}
          
          placeholder="Your valuable feedback"
        ></Textarea>
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      <p style={{color:"white"}}>{status}</p>
      <a href="#top" >Back to the top</a>
    </div>
  );
};

export default Feedback;
