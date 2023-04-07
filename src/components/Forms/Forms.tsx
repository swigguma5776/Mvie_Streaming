import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, 
    Typography,
    Stack,
    Box } from '@mui/material';
import { InputText, InputPassword } from '../sharedComponents/InputFields';
import { useNavigate } from 'react-router-dom'; 
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { 
    onAuthStateChanged,
    getAuth, 
    signOut, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, } from 'firebase/auth'; 
import { serverCalls } from '../../api';
import { useGetUserHubData } from '../../custom-hooks';


interface ReviewProps {
    id: string ,
    type: string
}

interface HubProps {
    hubdata: object ,
}

interface CreateProps {
    type: string
}

export const ReviewScore = (props: ReviewProps) => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        let reviewData = {'haveWatched': null, 'review': null, 'reviewScore': data.reviewScore}
        if (props.type == 'watchlist'){
            await serverCalls.updateShow(reviewData, props.id)
            window.location.reload()
        } else {
            await serverCalls.updateHub(reviewData, props.id)
            window.location.reload()
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="reviewScore"></label>
                    <InputText {...register('reviewScore')} name='reviewScore' placeholder='New Score Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export const Review = (props: ReviewProps) => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        let reviewData = {'haveWatched': null,'review': data.review, 'reviewScore': null}
        if (props.type == 'watchlist'){
            console.log('watchlist review')
            await serverCalls.updateShow(reviewData, props.id)
            window.location.reload()
        } else {
            await serverCalls.updateHub(reviewData, props.id)
            window.location.reload()
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="review"></label>
                    <InputText {...register('review')} name='review' placeholder='New Review Here' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export const CreateHub = (props: CreateProps) => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        console.log(data)
        console.log(props.type)
        if (props.type == 'create'){
            await serverCalls.createUserHub(data)
            window.location.reload()
        } else {
            await serverCalls.findUserHub(data.hubName)
            window.location.reload()
        }
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="hubname"></label>
                    <InputText {...register('hubName')} name='hubName' placeholder='What is the Hub name?' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export const AddToHub = (props:HubProps) => {
    // const  {register, handleSubmit} = useForm({})
    let { userHubData, getUserData} = useGetUserHubData(); 

    //copied form MUI template
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const onSubmit = async (data:any) => {
        console.log(data)
        console.log(props.hubdata)
        await serverCalls.createHub(props.hubdata, data.hub_name)
        window.location.reload()
    }

    return(
        <Stack direction = 'row' alignItems = 'center'>
        <Typography
        variant = 'h6'>
        Select Which Hub to Add to
        </Typography>
        <Box >
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
            <MenuIcon sx={{ marginTop: '5px'}}/>
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{display:"block"}}
            >
            {userHubData.map((item: any, index: any) => (
                <MenuItem key={index} onClick={()=> onSubmit(item)}>
                <Typography textAlign="right" color='black'>{item.hub_name}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </Box>
        </Stack>
    )
}

export const SignIn = () => {
    const {register, handleSubmit} = useForm({});
    const navigate = useNavigate();
    const auth = getAuth(); 


    const signUsOut = async () =>{
        await signOut(auth)
        localStorage.setItem('auth', 'false')
        console.log('User signed out')
        navigate('/')
    }

    const onSubmit = async (data: any, event: any) => {
        console.log(data.email, data.password);
        signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            localStorage.setItem("auth", "true");
            onAuthStateChanged(auth, (user) => {
              if (user) {
                localStorage.setItem("token", user.uid);
                localStorage.setItem("user", user.email || '');
              }
            });
            const user = userCredential.user;
            //Once signed in we navigate to dashboard
            navigate("/watchlist");
            window.location.reload();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      };

      return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Into your Account</Typography>
                <div>
                    <label htmlFor="email"></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor="password"></label>
                    <InputPassword {...register("password")} name="password"placeholder="Password must be 6 or more characters"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )

}

export const SignUp = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({});
    const auth = getAuth();
   
  
    const onSubmit = async (data: any, event: any) => {
      console.log(data.email, data.password);
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            localStorage.setItem("auth", "true");
            onAuthStateChanged(auth, (user) => {
              if (user) {
                localStorage.setItem("token", user.uid);
                localStorage.setItem("user", user.email || '');
              }
            });
  
          const user = userCredential.user;
          //Once signed in we navigate to dashboard
          navigate("/watchlist");
          window.location.reload()
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    };

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
            <Typography variant='h4'>Sign Up for Free!</Typography>
                <div>
                    <label htmlFor="email"></label>
                    <InputText {...register('email')} name='email' placeholder='Email Here' />
                    <label htmlFor="password"></label>
                    <InputPassword {...register("password")} name="password"placeholder="Password must be 6 or more characters"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )

}

