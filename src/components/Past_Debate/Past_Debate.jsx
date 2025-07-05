import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Title,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Past_Debate.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeDebate, commentDebate, participateDebate } from "../../Actions/Debate"
import { getAllDebates } from "../../Actions/Debate";
import CommentCard from "../CommentCard/CommentCard";
const Past_Debate = ({
  debateId,
  title,
  category,
  image,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [tab, setTab] = useState(window.location.pathname);
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(title);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [interestToggle, setInterestToggle] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likeDebate(debateId));
    dispatch(getAllDebates());
  };
  const handleView = async () => {
    setIsView(!isView);
  }
  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(commentDebate(debateId, commentValue));
    dispatch(getAllDebates());
  };
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="debate">
      <img 
    src={image} 
    alt="Debate" 
    style={{ width: "20vw" , height : "30vh" }} 
    onClick={() => setInterestToggle(!interestToggle)} 
  />

      <div className="debateDetails" onClick={() => setInterestToggle(!interestToggle)}>
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {title}
        </Typography>
      </div>
      <div className="debateFooter">
        <div className="likes">
          <Button onClick={handleLike}>
            {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
          </Button>
          <Typography>{likes.length}</Typography>
        </div>
        <div className="likes">
          <Button onClick={() => setCommentToggle(!commentToggle)}>
            <ChatBubbleOutline />
          </Button>
        </div>
      </div>
      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>
          <form className="commentForm" onSubmit={addCommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                userId={item.user._id}
                name={item.user.name}
                comment={item.comment}
                key={item._id}
              />
            ))
          ) : (
            <Typography>No comments Yet</Typography>
          )}
        </div>
      </Dialog>
      <Dialog
        open={interestToggle}
        onClose={() => setInterestToggle(!interestToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">{title}</Typography>
          <div className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sapiente possimus expedita dicta voluptas atque aliquid doloremque velit pariatur, quo et voluptate rerum eum illo consequatur asperiores veritatis voluptates ab, libero, repellendus perspiciatis eos dolorem. Obcaecati et laborum, beatae facere, incidunt id quia neque deserunt consequatur dolore, ab odit vitae molestiae iusto! Qui porro debitis impedit culpa molestiae unde modi sapiente praesentium possimus earum hic veniam odio et quae, placeat dolores maxime fuga voluptatibus ad. Id sit commodi dicta obcaecati quae. Quod neque architecto repudiandae, sequi placeat aut consectetur officiis recusandae, accusamus reprehenderit optio natus veritatis dignissimos nemo fuga quisquam!
          </div>
          <Link
              to={`/debate_past?debate_id=${debateId}`}
              onClick={() => setTab("/debate")}
            >
              <Button>View</Button>
            </Link>
        </div>
      </Dialog>
    </div>
  );
};

export default Past_Debate;
