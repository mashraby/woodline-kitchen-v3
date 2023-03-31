import React from "react";
import { AuthForm } from "./auth-form/auth-form";
import { Container } from "@mui/material";
import styled from "styled-components";

const AnimeBg = styled.div`
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const CenterForm = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthPage: React.FC = () => {
  return (
    <AnimeBg>
      <Container>
        <CenterForm>
          <AuthForm />
        </CenterForm>
      </Container>
    </AnimeBg>
  );
};
