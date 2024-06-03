/* eslint-disable no-unused-vars */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import "./ChatBox.css"; // Import the CSS file

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
  const [geminiResponse, setGeminiResponse] = useState({});

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
    <div className="chatbox-container">
      {!toggleBot ? (
        <div className="chatbox-button" onClick={() => setToggleBot(!toggleBot)}>
          <img
            src="https://img.icons8.com/ios/50/FFFFFF/speech-bubble--v2.png"
            alt="speech-bubble--v2"
          />
        </div>
      ) : (
        <div className="chatbox-content">
          <div className="chatbox-header">
            <h4>Ask Vexy</h4>
            <button onClick={() => setToggleBot(!toggleBot)}>X</button>
          </div>
          <div className="chatbox-body">
            <form className="bot" onSubmit={GeminiCall}>
              <input
                onChange={handleChange}
                name="search"
                placeholder="Ask me anything!"
                value={userAsks.search}
              />
              <button type="submit" disabled={loading}>
                Ask Vexy!
              </button>
            </form>
            <div className="response">
              {geminiResponse.length ? geminiResponse : null}
            </div>
            <h2>{status}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
