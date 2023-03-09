import React from 'react';
import { Button, Typography, Stack, Divider } from '@mui/material'; 
import background_image from '../../assets/images/baby_yoda_flip.jpeg'; 
import { styled } from '@mui/system'; 
import { HomeNavBar } from '../sharedComponents/NavBar'; 

interface Props {
    title: string; 
}

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

export const SignIn = (props:Props) => {

    return(
        <Root>
            {/* <HomeNavBar /> */}
            <Main>
                <Stack
                direction = 'column'
                alignItems = 'center'
                textAlign = 'center'
                sx = {{width: '350px', marginTop: '100px', marginRight: 'auto', marginLeft: 'auto'}}>
                    <Typography
                    variant = 'h1'
                    sx = {{color: "white"}}>
                    {props.title}
                    </Typography>
                    <br /> 
                    <Typography
                    variant = 'h4'
                    sx = {{color: "white"}}>
                    Track what you and your friends are watching!
                    </Typography>
                <br /> 
                <Button
                variant = 'contained'
                color = 'secondary'
                size = 'large'
                sx = {{width: '250px', fontSize: '20px'}}>
                    Continue With Google
                </Button>
                <br /> 
                <Divider variant= 'fullWidth' color='white'/>
                <br />
                <Stack
                width = '100%'
                alignItems = {{xs: 'center'}}
                justifyContent = {{xs: 'center', sm: 'space-between'}}
                direction = {{xs:'column', sm:'row'}}>
                    <Button
                        variant = 'contained'
                        color = 'primary'
                        size = 'large'
                        sx = {{width: '150px', fontSize: '16px'}}>
                        Email Log In
                    </Button>
                    <br /> 
                    <Button
                        variant = 'contained'
                        color = 'primary'
                        size = 'large'
                        sx = {{width: '150px', fontSize: '16px'}}>
                        Email Sign Up
                    </Button>
                </Stack>

                </Stack>
            </Main>
        </Root>
    )
}