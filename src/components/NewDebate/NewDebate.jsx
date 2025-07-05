import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewDebate } from "../../Actions/Debate";
import { loadUser } from "../../Actions/User";
import MicIcon from "@mui/icons-material/Mic"; // Import the microphone icon
import "./NewDebate.css";

const NewDebate = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [isRecordingTitle, setIsRecordingTitle] = useState(false);
  const [isRecordingCategory, setIsRecordingCategory] = useState(false);
  const [titleMicColor, setTitleMicColor] = useState("black");
  const [categoryMicColor, setCategoryMicColor] = useState("black");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  let silenceTimeout = null;

  useEffect(() => {
    // Initialize Speech Recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = "en-US";
      recog.interimResults = false;
      recog.continuous = true;
      setRecognition(recog);
    } else {
      console.error("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleSilenceTimeout = (field) => {
    if (silenceTimeout) clearTimeout(silenceTimeout);

    silenceTimeout = setTimeout(() => {
      if (field === "title" && isRecordingTitle) {
        recognition.stop();
        setIsRecordingTitle(false);
        setTitleMicColor("gray"); // Change color to gray after silence
      } else if (field === "category" && isRecordingCategory) {
        recognition.stop();
        setIsRecordingCategory(false);
        setCategoryMicColor("gray"); // Change color to gray after silence
      }
    }, 3000); // Stop recording after 3 seconds of silence
  };

  const toggleRecording = (field) => {
    if (!recognition) return;

    if (field === "title") {
      if (isRecordingTitle) {
        recognition.stop();
        setIsRecordingTitle(false);
        setTitleMicColor("black"); // Reset color when stopped manually
        if (silenceTimeout) clearTimeout(silenceTimeout);
      } else {
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setTitle((prevTitle) => prevTitle + " " + transcript);
          handleSilenceTimeout("title");
        };
        recognition.start();
        setIsRecordingTitle(true);
        setTitleMicColor("red"); // Change color to red when recording
      }
    } else if (field === "category") {
      if (isRecordingCategory) {
        recognition.stop();
        setIsRecordingCategory(false);
        setCategoryMicColor("black"); // Reset color when stopped manually
        if (silenceTimeout) clearTimeout(silenceTimeout);
      } else {
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join("");
          setCategory((prevCategory) => prevCategory + " " + transcript);
          handleSilenceTimeout("category");
        };
        recognition.start();
        setIsRecordingCategory(true);
        setCategoryMicColor("red"); // Change color to red when recording
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewDebate(title, category, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="newDebate">
      <form className="newDebateForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Debate</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="inputWithMic">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MicIcon
            onClick={() => toggleRecording("title")}
            style={{
              cursor: "pointer",
              color: titleMicColor,
            }}
          />
        </div>
        <div className="inputWithMic">
          <input
            type="text"
            placeholder="Description..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <MicIcon
            onClick={() => toggleRecording("category")}
            style={{
              cursor: "pointer",
              color: categoryMicColor,
            }}
          />
        </div>
        <Button disabled={loading} type="submit">
          Make Live
        </Button>
      </form>
    </div>
  );
};

export default NewDebate;
