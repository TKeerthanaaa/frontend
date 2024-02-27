import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import "./styles/home.css";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <>
      <Home />
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={300}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justify={"center"}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={5}
            // marginLeft={60}
            borderRadius={5}
            position={"relative"}
          >
            <Typography variant="h3" padding={3} textAlign="center">
              {isSignup ? "Signup" : "Login"}
            </Typography>
            {isSignup && (
              <TextField
                name="name"
                onChange={handleChange}
                value={inputs.name}
                placeholder="Name"
                margin="normal"
                sx={{
                  borderRadius: 3,
                  background: "white",
                }}
              />
            )}{" "}
            {}
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              type={"email"}
              placeholder="Email"
              margin="normal"
              sx={{
                borderRadius: 3,
                background: "white",
              }}
            />
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type={"password"}
              placeholder="Password"
              margin="normal"
              sx={{
                borderRadius: 3,
                background: "white",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 3, marginTop: 3, background: "#4a148c" }}
            >
              Submit
            </Button>
            <Typography
              sx={{
                borderRadius: 3,
                marginTop: 3,
                background: "#e1bee7",
              }}
              display="flex"
              flexDirection={"column"}
              variant="p"
              padding={2}
              textAlign="center"
            >
              <span>view credentials</span>
              <span>mail id: shakee0620@gmail.com</span>
              <span>pw: IndianVillain</span>
            </Typography>
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{
                borderRadius: 3,
                marginTop: 3,
                color: "white",
                fontWeight: "bold",
                background: "#6a1b9a",
              }}
            >
              Change To {isSignup ? "Login" : "Signup"}
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Auth;
