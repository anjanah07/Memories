import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import jwt_decode from "jwt-decode";
import { redirect } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// import * as dotenv from "dotenv";
// dotenv.config();

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    console.log("Reached here");
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };
  const googleSuccess = (credentialResponse) => {
    // const clientId = res.clientId;

    const decode = jwt_decode(credentialResponse.credential);

    const result = decode?.picture;

    const token = decode?.jti;
    const nbf = decode?.nbf;
    const name = decode?.name;
    const email = decode?.email;
    try {
      dispatch({
        type: "AUTH",
        data: { result, token, nbf, name, email },
      });
      console.log("in trycatch of Auth.js");
      if (token) {
        console.log("in if block");

        navigate("/");
      }
    } catch (error) {
      console.log({ error });
    }
  };
  const googleError = (error) => {
    console.log({ error });
    console.log("Login Failed");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autofocus
                  half
                />
                <Input
                  name="firstName"
                  label="Last Name"
                  handleChange={handleChange}
                  autofocus
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <GoogleOAuthProvider
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  // onClick={renderProps.onClick}
                  // disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onError={googleError}
            />
          </GoogleOAuthProvider>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Dont have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
