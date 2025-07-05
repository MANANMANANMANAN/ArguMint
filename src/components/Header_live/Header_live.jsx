import React, { useState } from "react";
import "./Header_live.css";
import { Dialog, Typography } from "@mui/material";

const Header_live = ({ debateTitles, onDebateSelect }) => {
  const [interestToggle, setInterestToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = debateTitles.filter((title) =>
        title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onDebateSelect(suggestion); // Notify the parent component
  };

  return (
    <header className="headers">
      <div className="header-content">
        <h1 className="main-heading">LIVE DEBATES</h1>
        <p className="tagline">
          Join the Conversation That Shapes Tomorrow: Where Bold Ideas and Critical Thinking Collide
        </p>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search debates..."
            className="search-box"
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        className="rules-button"
        onClick={() => setInterestToggle(!interestToggle)}
      >
        Rules
      </button>
      <Dialog
        open={interestToggle}
        onClose={() => setInterestToggle(!interestToggle)}
        classes={{ paper: "custom-dialog" }}
      >
        <div className="rules-container">
          <Typography variant="h4" className="rules-heading">
            Debate Rules
          </Typography>
          <ol className="rules-list">
            <li>All participants must pay the entry fee before joining the debate.</li>
            <li>Respectful communication is mandatory—no foul language or personal attacks.</li>
            <li>Wait for the opposing team’s reply before sending your next message.</li>
            <li>Stick to the time limit for each response to keep the debate on track.</li>
            <li>The prizes will be distributed when the debate ends based on an unbiased view of the Audience.</li>
          </ol>
          <button
            className="close-button"
            onClick={() => setInterestToggle(false)}
          >
            Close
          </button>
        </div>
      </Dialog>
    </header>
  );
};

export default Header_live;
