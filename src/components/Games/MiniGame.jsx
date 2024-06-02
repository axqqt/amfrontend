import { useState, useEffect, useContext } from "react";
import "./MiniGame.css";
import { UserContext } from "@/App";

const MiniGame = () => {
  const [paddlePosition, setPaddlePosition] = useState(50);
  const [objectPosition, setObjectPosition] = useState({ top: 0, left: 50 });
  const [objectFalling, setObjectFalling] = useState(false);
  const [visible, setVisible] = useState(true);
  const { score, setScore } = useContext(UserContext);

  const handleMouseMove = (event) => {
    const container = document.querySelector(".game-container");
    const containerWidth = container.offsetWidth;
    const newPaddlePosition = (event.clientX / containerWidth) * 100;
    setPaddlePosition(newPaddlePosition);
  };

  useEffect(() => {
    if (!objectFalling) {
      const interval = setInterval(() => {
        const left = Math.random() * 100;
        setObjectPosition({ top: 0, left });
        setObjectFalling(true);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [objectFalling]);

  useEffect(() => {
    if (objectFalling) {
      const interval = setInterval(() => {
        setObjectPosition((prevPosition) => ({
          ...prevPosition,
          top: prevPosition.top + 2,
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [objectFalling, objectPosition]);

  useEffect(() => {
    if (objectPosition.top > 90) {
      if (
        Math.abs(objectPosition.left - paddlePosition) < 10 &&
        objectPosition.top > 80
      ) {
        setScore((prevScore) => prevScore + 1);
      }
      setObjectFalling(false);
      setObjectPosition({ top: 0, left: Math.random() * 100 });
    }
  }, [objectPosition, paddlePosition, setScore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ color: "white" }}>
      {visible ? (
        <div className="game-container" onMouseMove={handleMouseMove}>
          <div className="paddle" style={{ left: `${paddlePosition}%` }}></div>
          <div
            className="object"
            style={{
              top: `${objectPosition.top}%`,
              left: `${objectPosition.left}%`,
            }}
          ></div>
          <div className="score">
            Score: <span id="score">{score}</span>
          </div>
        </div>
      ) : (
        <div className="message">Game Over! Your score is {score}</div>
      )}
    </div>
  );
};

export default MiniGame;
