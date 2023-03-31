import React from "react";
import styled, { keyframes } from "styled-components";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const flicker = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${flicker} 10s ease-in-out infinite;
`;

const Title = styled(Typography)`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #fff;
`;

const Subtitle = styled(Typography)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #fff;
`;

const HomeButton = styled(Button)`
  margin-top: 2rem;
`;

export const NotFoundPage: React.FC = () => {
  return (
    <Wrapper>
      <Title variant="h1">404</Title>
      <Subtitle variant="h2">Page Not Found</Subtitle>
      <Link to="/roles">
        <HomeButton variant="contained" color="primary">
          Go to Home Page
        </HomeButton>
      </Link>
    </Wrapper>
  );
};
