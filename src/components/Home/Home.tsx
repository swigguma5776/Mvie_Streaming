import React from "react";
import { styled } from "@mui/system";
import { Button, Stack, Typography, Link } from "@mui/material";
import background_image from "../../assets/images/baby_yoda_flip.jpeg";
import { HomeNavBar } from "../sharedComponents/NavBar";
import { useNavigate } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


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
  backgroundAttachment: 'fixed',
  paddingTop: '50px',
  paddingBottom: '200px'
});

const LinkStyles = {
  width: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}




export const Home = (props: Props) => {
  const navigate = useNavigate();
//   const myAuth = localStorage.getItem("auth");

    return (
      <Root>
        <HomeNavBar />
        <Main>
          <Stack
            direction = 'column'
            justifyContent='flex-end'
            marginLeft = {{xs: 'None', md: '100px'}}
            width = "95%"
            alignItems = {{xs: 'center', md: 'start'}}
            sx = {{ color: 'white', marginTop: '30vh', marginBottom: 'auto'}}>
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
            <Stack 
              direction='row'
              width= '150px'
              justifyContent="space-between"
              mt='200px'>
              <Link sx={LinkStyles} variant='body1' underline="hover" target="_blank" href="https://github.com/swigguma5776/Mvie_Streaming"><GitHubIcon/> Github</Link>
              <Link sx={LinkStyles} variant='body1' underline="hover" target="_blank" href="https://www.linkedin.com/in/alex-swiggum-profile/"><LinkedInIcon/> LinkedIn</Link>
            </Stack>
          </Stack>
        </Main>
      </Root>
    );
}