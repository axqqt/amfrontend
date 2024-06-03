/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";

function ChatBox() {
  const {
    toggleBot,
    setToggleBot,
    loading,
    setLoading,
    status,
    setStatus,
    BASE,
  } = useContext(UserContext);
  const [userAsks, setUserAsks] = useState({
    search: "",
  });
  {
    /**We can add other fields if we want to */
  }
  const [geminiResponse, setGeminiResponse] = useState({});

  // useEffect(() => {
  //   {
  //     toggleBot
  //       ? console.log("NAHH DIS NPC OUT HERE")
  //       : console.log("Nah bro chilling for now!");
  //   }
  // }, [toggleBot]);

  //just a test lol

  async function GeminiCall(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await Axios.post(`${BASE}/bots`, { userAsks }).then((response) => {
        if (response.status === 200) {
          setGeminiResponse(response.data);
        } else if (response.status === 404) {
          setStatus("No results found!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setUserAsks({ ...userAsks, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button
        onClick={() => {
          setToggleBot(!toggleBot);
        }}
      >
        {!toggleBot ? "Open bot " : "Close bot"}
      </button>
      {!toggleBot ? (
        <div className="fixed bottom-10 p-3 left-10 bg-primary text-white rounded-full shadow-xl shadow-indigo-500/40">
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/ios/50/FFFFFF/speech-bubble--v2.png"
            alt="speech-bubble--v2"
          />
        </div>
      ) : (
        <div className="bot-response" style={{backgroundColor:"white",color:"black"}}>
          <form className="bot" onSubmit={GeminiCall}>
            <input
              onChange={handleChange}
              name="search"
              placeholder="Ask me anything!"
            ></input>
            <button type="submit" disabled={loading}>
              Ask Vexy!
            </button>
          </form>
          <div className="response">
            {geminiResponse.length && geminiResponse}
          </div>
          <h2>{status}</h2>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
