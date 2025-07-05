import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyDebates, logoutUser } from "../../Actions/User"; // bnana h
// import Loader from "../Loader/Loader";
import Debate from "../Debate/Debate";
import User from "../User/User";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
//   const alert = useAlert();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, debates } = useSelector((state) => state.myPosts); // Bnani Hai
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.like);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const deleteProfileHandler = async () => {
    // await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyDebates());
  }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch({ type: "clearErrors" });
//     }

//     if (likeError) {
//       alert.error(likeError);
//       dispatch({ type: "clearErrors" });
//     }
//     if (message) {
//       alert.success(message);
//       dispatch({ type: "clearMessage" });
//     }
//   }, [alert, error, message, likeError, dispatch]);

  return loading === true || userLoading === true ? (
    <div>Loading</div>
  ) : (
    <div className="account">
      <div className="accountleft">
        {debates && debates.length > 0 ? (
          debates.map((debate) => (
            <Debate
              key={debate._id}
              debateId={debate._id}
              title={debate.Title}
            //   postImage={post.image.url}
              likes={debate.likes}
              comments={debate.comments}
            //   ownerImage={debate.owner.avatar.url}
            //   ownerName={debate.owner.name}
            //   ownerId={debate.owner._id}
            //   isAccount={true}
            //   isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any post</Typography>
        )}
      </div>
      <div className="accountright">
      <Avatar
  src={user.avatar ? user.avatar.url : undefined}
  alt={user.avatar ? "User Avatar" : "No Avatar"}
  sx={{ height: "8vmax", width: "8vmax" }}
>
  {!user.avatar && "No Avatar"} {/* Fallback text when no avatar */}
</Avatar>

        <Typography variant="h5">{user.name}</Typography>

        <div>
          <Typography>Debates</Typography>
          <Typography>{user.debates_organised.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        {/* <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link> */}

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        {/* <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog> */}

        {/* <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog> */}
      </div>
    </div>
  );
};

export default Account;