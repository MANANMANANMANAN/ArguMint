import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router
import "./Dbate_header.css";
import Leaderboard from "../Leaderboard/Leaderboard";
const Dbate_header = ({messages}) => {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 90 minutes in seconds
  const navigate = useNavigate(); // Hook for navigation, inside the component
  const [opened, setOpened] = useState(false);
  // Function to open the dialog box
  const handleOpen = () => {
    setOpen(true);
  };
  
  // Function to close the dialog box
  const handleClose = () => {
    setOpen(false);
  };
  const onClose = () => {
    setOpened(false);
    navigate("/"); // Redirect to the desired page
  };
  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          setOpened(true);
          // navigate("/"); // Redirect to the home page (or any other page)
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [navigate]); // Ensure the navigate hook is correctly passed as dependency

  // Format time in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="debate-arena-strip">
      {opened && <Leaderboard open={opened} onClose={onClose} />}
      <button className="debate-arena-text" onClick={handleOpen}>
        Debate Arena
      </button>

      {/* Countdown Timer */}
      <div className="countdown-timer">
        {formatTime(timeLeft)}
      </div>

      {/* Dialog Box with features */}
      <Dialog open={open} onClose={handleClose} className="dialog">
        <div className="t">Features of Debate Arena</div>
        <div className="features">
          <ul>
            <li>Live debates with real-time interaction</li>
            <li>Audience can support or contradict teams with a single click</li>
            <li>Audience vote the comments and decide the rewards of the participants</li>
            <li>The identity of the commentor is hidden to ensure transparency</li>
            <li>Debate history and statistics tracking</li>
            <li>
              Each team can send a message only when the other team replies to
              prevent spamming
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
};

export default Dbate_header;
