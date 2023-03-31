import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import styled from "styled-components";
import { ILogin } from "../../../interfaces/login.interfaces";
import { login } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

const AuthWrapper = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.46);
  background-color: #fff;
`;

const Title = styled.h4`
  text-align: center;
`;

export const AuthForm: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    username: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleLogin = (): void => {
    console.log(loginData.username, loginData.password );

    login(loginData.username, loginData.password).then((res: AxiosResponse) => {
      console.log(res);

      if(res.data.token) {
        console.log(res.data.token);

        localStorage.setItem("token", JSON.stringify(res.data.token))
        navigate("/roles")
      } else {
        //
      }
    });
  };

  return (
    <AuthWrapper>
      <Typography className="auth-form__heading" variant="h4" component="div">
        <Title>Login</Title>
      </Typography>
      <TextField
        required={true}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setLoginData({ ...loginData, username: e.target.value });
        }}
        id="outlined-basic"
        label="Username"
        variant="outlined"
      />
      <TextField
        required={true}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
          setLoginData({ ...loginData, password: e.target.value });
        }}
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button onClick={handleLogin} variant="contained" aria-label="primary">
        Login
      </Button>
    </AuthWrapper>
  );
};
