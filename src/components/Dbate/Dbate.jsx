

import React, { useEffect, useState, useMemo } from "react";
import MovingPicture from "../Moving_Picture/Moving_Picture";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { pointDebate, like_message, finish_debate } from "../../Actions/Debate";
import MicIcon from "@mui/icons-material/Mic";
import "./Dbate.css";
import Dbate_header from "../Dbate_header/Dbate_header";
// Import the audio file
import audioFile from "../../components/Dbate/audio.mp3"; // Adjust the path if necessary
const Dbate = () => {
  const socket = useMemo(() => io("http://localhost:5000"), []); // Create socket connection
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState("");
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState("");
  const [isParticipant, setIsParticipant] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [likedMessages, setLikedMessages] = useState([]);
  const [direction, setDirection] = useState(1);
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [micColor, setMicColor] = useState("black");
  const [listeningMessages, setListeningMessages] = useState(false); // State for controlling TTS
  const dispatch = useDispatch();
  const { debates } = useSelector((state) => state.allDebates);
  useEffect(() => {
    // Initialize Speech Recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = "hi-IN";
      recog.interimResults = false;
      recog.continuous = true;
      setRecognition(recog);
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const toggleMic = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      setMicColor("black");
    } else {
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setMessage((prevMessage) => prevMessage + " " + transcript);
      };
      recognition.start();
      setIsRecording(true);
      setMicColor("red");
    }
  };

  const setParameters = () => {
    const queryParams = new URLSearchParams(location.search);
    const debateId = queryParams.get("debate_id");
    const side = queryParams.get("side");
    setState(side);
    setRoom(debateId);
    setIsParticipant(side === "left" || side === "right");
    if (debateId) {
      socket.emit("join-room", debateId);
    }
  };

  const handle_like = (index) => {
    setLikedMessages((prevLikedMessages) =>
      prevLikedMessages.includes(index)
        ? prevLikedMessages.filter((i) => i !== index)
        : [...prevLikedMessages, index]
    );
    const queryParams = new URLSearchParams(location.search);
    const debate_id = queryParams.get("debate_id");
    const debate = debates.find(debate => debate._id === debate_id);
    const messages = debate.messages;
    const messageId = messages[index]._id;
    console.log(index);
    console.log(messageId);
    dispatch(like_message(debate_id, messageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const debate_id = queryParams.get("debate_id");
    const side = queryParams.get("side");
    socket.emit("message", {
      room: debate_id,
      state: side,
      message: message,
      socketId: socketId,
      messageId: `${socketId}-${Date.now()}`,
    });
    await dispatch(pointDebate(debate_id, side, message));
    setMessage("");
  };

  const handleEnd = () => {
    const queryParams = new URLSearchParams(location.search);
    const debateId = queryParams.get("debate_id");
    dispatch(finish_debate(debateId));
    setIsFinish(true);
  };

  const playTTS = async (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "hi-IN"; // Google Hindi-English TTS
    speech.volume = 1; // Full volume
    window.speechSynthesis.speak(speech);
    setListeningMessages(false);
  };

  useEffect(() => {
    setParameters();
    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    socket.on("receive-message", (data) => {
      setListeningMessages(true);
      console.log("Message received from server:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      const text = `${
        data.state === "left" ? "Left side states that" : "Right side states that"
      }: ${data.message}`;
      playTTS(text);
    });
    if (listeningMessages) {
    } else {
      // If TTS is not enabled, play the audio file
      const audio = document.getElementById('audioPlayer');
      audio.play();
    }
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, [location, socket, listeningMessages]);

  return (
    <div className="debate-container">
      <Dbate_header messages={messages} />
      <MovingPicture
        direction={direction}
        setDirection={setDirection}
      />
      {isParticipant ? (
        <div className="input-container">
          <form onSubmit={handleSubmit} className="forms">
            <div className="mic-and-input">
              <MicIcon
                onClick={toggleMic}
                style={{
                  cursor: "pointer",
                  color: micColor,
                  marginRight: "10px",
                }}
              />
              <input
                className="message-input"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </div>

            {!isFinish && (
              <button
                className="send-button"
                type="submit"
                disabled={
                  (state === "left" && direction === -1) ||
                  (state === "right" && direction === 1)
                }
              >
                Send
              </button>
            )}
          </form>
        </div>
      ) : null}

      <div className="messages-container">
        {messages.map((item, index) => (
          <div
            key={index}
            className={`message-box ${
              item.state === "left" ? "left" : "right"
            }`}
            onDoubleClick={() => handle_like(index)}
            style={{
              border: likedMessages.includes(index)
                ? "5px solid #e9aad7"
                : "none",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>{item.message}</p>
          </div>
        ))}
      </div>

      {/* Audio Player for when TTS is not playing */}
      <audio id="audioPlayer">
        <source src={audioFile} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Dbate;
