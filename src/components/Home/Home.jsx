import React, { useEffect, useState } from "react";
import Debate from "../Debate/Debate";
import Past_Debate from "../Past_Debate/Past_Debate";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import { getAllDebates } from "../../Actions/Debate";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header_live from "../Header_live/Header_live";
import Header_past from "../Header_past/Header_past";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { debates } = useSelector((state) => state.allDebates);
  const { users } = useSelector((state) => state.allUsers);

  const [selectedDebate, setSelectedDebate] = useState(null);
  const [pastSelectedDebate, setPastSelectedDebate] = useState(null);

  useEffect(() => {
    dispatch(getAllDebates());
    dispatch(getAllUsers());
    navigate("/");
  }, [dispatch, navigate]);

  const loading = false;
  const usersLoading = false;

  // Extract debate titles for live and past debates
  const debateTitles = debates
    ? debates.filter((debate) => !debate.isFinish).map((debate) => debate.Title)
    : [];

  const pastDebateTitles = debates
    ? debates.filter((debate) => debate.isFinish).map((debate) => debate.Title)
    : [];

  return loading === true || usersLoading === true ? (
    <div></div>
  ) : (
    <div className="home">
      <div className="homeleft">
        {/* Header for live debates */}
        <Header_live
          debateTitles={debateTitles}
          onDebateSelect={(title) => setSelectedDebate(title)}
        />
        {selectedDebate && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedDebate(null)}
            className="go-back-button"
          >
            Go Back
          </Button>
        )}
        <div className="live_debates">
          {selectedDebate ? (
            debates
              .filter((post) => post.Title === selectedDebate)
              .map((post) => (
                <Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image={post.image.url}
                />
              ))
          ) : debates && debates.length > 0 ? (
            debates
              .filter((post) => !post.isFinish)
              .map((post) => (
                <Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image={post.image.url}
                />
              ))
          ) : (
            <Typography variant="h6">No Live Debates yet</Typography>
          )}
        </div>

        {/* Header for past debates */}
        <Header_past
          debateTitles={pastDebateTitles}
          onDebateSelect={(title) => setPastSelectedDebate(title)}
        />
        {pastSelectedDebate && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPastSelectedDebate(null)}
            className="go-back-button"
          >
            Go Back
          </Button>
        )}
        <div className="live_debates">
          {pastSelectedDebate ? (
            debates
              .filter((post) => post.Title === pastSelectedDebate)
              .map((post) => (
                <Past_Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image={post.image.url}
                />
              ))
          ) : debates && debates.length > 0 ? (
            debates
              .filter((post) => post.isFinish)
              .map((post) => (
                <Past_Debate
                  key={post._id}
                  debateId={post._id}
                  title={post.Title}
                  category={post.Category}
                  likes={post.likes}
                  comments={post.comments}
                  ownerImage=""
                  ownerId={post.owner}
                  image={post.image.url}
                />
              ))
          ) : (
            <Typography variant="h6">No Past Debates yet</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
