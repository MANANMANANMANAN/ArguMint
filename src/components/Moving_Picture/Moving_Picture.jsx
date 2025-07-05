import React, { useState, useEffect } from "react";
import "./Moving_Picture.css";

const MovingPicture = ({ direction, setDirection }) => {
  const [progress, setProgress] = useState(0); // Track progress percentage

  useEffect(() => {
    let interval;
    let localDirection = direction; // Use local direction to control animation

    const animate = () => {
      setProgress((prev) => {
        const newProgress = prev + localDirection * 0.082; // Adjust speed
        if (newProgress >= 98) {
          localDirection = -1; // Reverse direction
          setDirection(-1); // Notify parent of direction change
        } else if (newProgress <= 0) {
          localDirection = 1; // Reverse direction
          setDirection(1); // Notify parent of direction change
        }
        return newProgress;
      });
    };

    interval = setInterval(animate, 100); // Adjust interval for smooth animation

    return () => clearInterval(interval);
  }, [direction, setDirection]);

  return (
    <div className="rectangle">
      <div
        className="picture"
        style={{
          left: `${progress}%`,
        }}
      ></div>
      <div
        className="color-overlay"
        style={{
          background: `linear-gradient(
            to right,
            ${direction === 1 ? "darkmagenta" : "transparent"} ${progress}%,
            ${direction === -1 ? "darkblue" : "transparent"} ${progress}%
          )`,
        }}
      ></div>
    </div>
  );
};

export default MovingPicture;
