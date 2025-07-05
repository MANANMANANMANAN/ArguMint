import React, { useEffect, useState } from "react";
import "./Register.css";
import { Avatar, Typography, Button } from "@mui/material";
// import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Actions/User";
// import { useAlert } from "react-alert";

const Register = () => {
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
//   const alert = useAlert();

//   const { error } = useSelector((state) => state.user);
//   const { message } = useSelector((state) => state.like);
const handleImageChange = (e) => {
  const file = e.target.files[0];

  const Reader = new FileReader();
  Reader.readAsDataURL(file);

  Reader.onload = () => {
    if (Reader.readyState === 2) {
      setAvatar(Reader.result);
    }
  };
};
  const registerHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(name, email, password , avatar));
  };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch({ type: "clearErrors" });
//     }
//     if (message) {
//       alert.success(message);
//       dispatch({ type: "clearMessage" });
//     }
//   }, [alert, error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={registerHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
        //   type="email"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
        //   type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link> */}

        <Button type="submit">Register</Button>

        {/* <Link to="/register">
          <Typography>New User?</Typography>
        </Link> */}
      </form>
    </div>
  );
};

export default Register;