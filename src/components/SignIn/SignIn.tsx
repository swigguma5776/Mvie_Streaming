import React, {useState} from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import { 
    onAuthStateChanged,
    getAuth, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, } from 'firebase/auth'; 
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Stack, Divider, CircularProgress, Dialog, DialogContent } from '@mui/material'; 
import background_image from '../../assets/images/baby_yoda_flip.jpeg'; 
import { styled } from '@mui/system'; 
import { HomeNavBar } from '../sharedComponents/NavBar'; 
import { SignIn, SignUp } from '../Forms'; 

interface Props {
    title: string; 
}

interface buttonProps{
    open: boolean,
    onClick: () => void
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

// Functional component to conditionally render Google SignIn Button
const GoogleButton = (props:buttonProps) =>{
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = async ( ) =>{
        await signInWithGoogle();
        localStorage.setItem('auth', 'true')
        console.log('User signed in')
        onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user.email);
            console.log(user.uid)
            localStorage.setItem("user", user.email || '');
            localStorage.setItem("token", user.uid);
        }
        });
      
          await navigate("/watchlist");
          
        };


    if (loading){
        return <CircularProgress />
    }

    return (
        <Button
        variant = 'contained'
        color = 'secondary'
        size = 'large'
        sx = {{width: '250px', fontSize: '20px'}}
        onClick={signIn}>
            Continue With Google
        </Button>
    )
    
}

export const SignInOptions = (props:Props) => {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const [signOpen, setSignOpen] = useState(false);
    const [signType, setSignType] = useState<string>()

    const handleSnackOpen =() =>{
        setOpen(true)
    }
    const handleSnackClose =() =>{
        setOpen(false)
        navigate('/watchlist')
    }
    const handleSignClose =() =>{
        setSignOpen(false)
       
    }

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
                    <GoogleButton open={open} onClick={handleSnackClose} />
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
                            sx = {{width: '150px', fontSize: '16px'}}
                            onClick = {()=>{setSignOpen(true); setSignType('login')}}>
                            Email Log In
                        </Button>
                        <br /> 
                        <Button
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = {{width: '150px', fontSize: '16px'}}
                            onClick = {()=>{setSignOpen(true); setSignType('signup')}}>
                            Email Sign Up
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={signOpen} onClose={handleSignClose}>
                    <DialogContent>
                        {signType === 'login'? <SignIn /> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Main>
        </Root>
    )
}