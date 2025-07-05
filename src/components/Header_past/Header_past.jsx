import React, { useState } from "react";
import "./Header_past.css";
import { Dialog, Typography } from "@mui/material";

const Header_past = ({ debateTitles, onDebateSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter debate titles based on the search term
  const filteredDebates = debateTitles.filter((title) =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="headers">
      <div className="header-content">
        <h1 className="main-heading">RECORDED DEBATES</h1>
        <p className="tagline">
          Capturing Every Word, Preserving Every Perspective – Dive into the World of Recorded Debates, Where Ideas Live On and Voices Echo Beyond the Moment
        </p>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search past debates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <ul className="search-suggestions">
              {filteredDebates.map((title, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onDebateSelect(title);
                    setSearchTerm(""); // Clear search term after selection
                  }}
                  className="search-suggestion-item"
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Rules Dialog */}
      <Dialog
        open={false} // Keeping this closed unless explicitly triggered
        onClose={() => {}}
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
            <li>
              The prizes will be distributed when the debate ends based on unbiased view of the Audience.
            </li>
          </ol>
          <button className="close-button" onClick={() => {}}>
            Close
          </button>
        </div>
      </Dialog>
    </header>
  );
};

export default Header_past;
