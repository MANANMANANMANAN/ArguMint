import { Avatar, Button, Typography, Dialog } from "@mui/material";
import React, { useEffect } from "react";
// import { useWallet } from "@aptos-labs/wallet-adapter-react";
// const { account, signAndSubmitTransaction } = useWallet()
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
  Title,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Debate.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MoneyTransfer from "../Money_Transfer";
// import {
//     addCommentOnPost,
//     deletePost,
//     likePost,
//     updatePost,
// } from "../../Actions/Post";
import { likeDebate, commentDebate, participateDebate } from "../../Actions/Debate"
// import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
// import User from "../User/User";
import { getAllDebates } from "../../Actions/Debate";
import CommentCard from "../CommentCard/CommentCard";
// import { deposit } from "../Aptos";
const Debate = ({
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
    if (liked === true) return; // No Unlike Functionality
    setLiked(!liked);
    await dispatch(likeDebate(debateId));
    dispatch(getAllDebates());
  };
  const handleLeft = async () => {
    setIsLeft(!isLeft);
    const side = "Left";
    await dispatch(participateDebate(debateId, side))
    dispatch(getAllDebates());
  }
  const handleView = async () => {
    setIsView(!isView);
  }
  const handleRight = async () => {
    setIsRight(!isRight);
    const side = "Right";
    await dispatch(participateDebate(debateId, side))
    dispatch(getAllDebates());
  }
  // const handleStart = async () => {
  //   setTab("/debate");
  // }
  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(commentDebate(debateId, commentValue));
    setCommentValue("")
    dispatch(getAllDebates());
  };
  const handlePayment = async () => {
    // await deposit(account,signAndSubmitTransaction,100);
  }
  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <div className="debate">
      {/* <img src={image} alt="Debate"  onClick={() => setInterestToggle(!interestToggle)} /> */}
      <img 
    src={image} 
    alt="Debate" 
    style={{ width: "20vw" , height : "30vh" }} 
    onClick={() => setInterestToggle(!interestToggle)} 
  />
      <div className="debateDetails" onClick={() => setInterestToggle(!interestToggle)}>
        <div>{title}</div>

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
          {/* <Typography>{comments.length}</Typography> */}
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
                userId={item.user}
                name={item.user}
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
          {/* <Typography className="title" variant="h4">{title}</Typography> */}
          <div className="title">{title}</div>
          <div className="description">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sapiente possimus expedita dicta voluptas atque aliquid doloremque velit pariatur, quo et voluptate rerum eum illo consequatur asperiores veritatis voluptates ab, libero, repellendus perspiciatis eos dolorem. Obcaecati et laborum, beatae facere, incidunt id quia neque deserunt consequatur dolore, ab odit vitae molestiae iusto! Qui porro debitis impedit culpa molestiae unde modi sapiente praesentium possimus earum hic veniam odio et quae, placeat dolores maxime fuga voluptatibus ad. Id sit commodi dicta obcaecati quae. Quod neque architecto repudiandae, sequi placeat aut consectetur officiis recusandae, accusamus reprehenderit optio natus veritatis dignissimos nemo fuga quisquam! */}
            {category}
          </div>
          {/* <MoneyTransfer /> */}
          {(isLeft === true || isRight === true || isView === true) ? (
            <Link
              to={`/debate?debate_id=${debateId}&side=${isLeft ? 'left' : isRight ? 'right' : isView ? 'none' : undefined}`}
              onClick={() => setTab("/debate")}
            >
              <button className="audience-button">Start</button>
            </Link>
          ) : (
            <div className="opt">

              <button onClick={handleLeft} className="support-button">SUPPORT</button>
              <button onClick={handleRight} className="contradict-button">CONTRADICT</button>
              <button onClick={handleView} className="audience-button">AUDIENCE</button>
              <button onclick={handlePayment}>Pay Entry Fees</button>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Debate;
