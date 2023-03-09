import React from "react";
import { styled } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import background_image from "../../assets/images/baby_yoda_flip.jpeg";
import { HomeNavBar } from "../sharedComponents/NavBar";
import { useNavigate } from "react-router-dom";


interface Props {
  title: string;
}
//nav bar is separate component
const Root = styled("div")({
  padding: 0,
  margin: 0,
});
const Main = styled("main")({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(46, 115, 154, 1)), url(${background_image});`,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "absolute",
});




export const Home = (props: Props) => {
  const navigate = useNavigate();
//   const myAuth = localStorage.getItem("auth");

    return (
      <Root>
        <div>Hello World</div>
        <HomeNavBar />
        <Main>
          <Stack
            direction = 'column'
            justifyContent='flex-end'
            marginLeft = {{xs: 'None', md: '100px'}}
            alignItems = {{xs: 'center', md: 'start'}}
            sx = {{ color: 'white', marginTop: '35vh', marginBottom: 'auto'}}>
            <Typography variant="h4">welcome to....</Typography>
            <Typography variant="h1">{props.title}</Typography>
            <br />
            <Typography variant="h3">What are you watching?</Typography>
            <br />
            <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => navigate("/signin")}>
                Sign Up for Free
            </Button>
           
          </Stack>
        </Main>
      </Root>
    );
}