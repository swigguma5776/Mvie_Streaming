import React, { useState } from 'react';
import { Button,
    Typography, 
    Stack, 
    Box, 
    Divider,
    Dialog,
    DialogActions,
    DialogContent, 
    DialogContentText,
    Avatar } from '@mui/material'; 
import { styled } from '@mui/system'; 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import FastForwardIcon from '@mui/icons-material/FastForward';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

// Internal Imports
import background_image from '../../assets/images/baby_yoda_flip.jpeg'; 
import { HomeNavBar } from '../sharedComponents/NavBar'; 
import { useGetUserHubData, useGetHubData } from '../../custom-hooks';
import { useNavigate } from 'react-router-dom';
import { serverCalls } from '../../api';
import { Review, ReviewScore, CreateHub } from '../Forms';


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
    paddingTop: '100px',
    paddingBottom: '600px'
  });

//   const useStyles = makeStyles({
//     dialogContainer: {
//       backgroundColor: 'blue',
//     },
//   });



export const Hub = () => {
    let { userHubData, getUserData} = useGetUserHubData(); 
    let {hubData, getHubData } = useGetHubData();
    let [userHub, setUserHub ] = useState<any>({});
    let [currentData, setCurrentData] = useState<any>({});
    let [castData, setCastData] = useState<any>([]);
    let [detailsOpen, setDetailsOpen] = useState(false);
    let [reviewOpen, setReviewOpen] = useState(false);
    let [hubOpen, setHubOpen] = useState(false);
    let [reviewType, setReviewType] = useState<string>();
    let [hubType, setHubType] = useState<string>('');
    const navigate = useNavigate();

    console.log(userHubData)

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


    const chooseColor = (type: string) => {
        return (type === 'movie') ? 'orange' : 'purple'
    }

    const handleDetailsOpen = async () => {
        setCastData(await serverCalls.getCast(currentData.watch_id.slice(3)))
        setDetailsOpen(true);
      };

    const handleDetailsClose = () => {
        setDetailsOpen(false);
      };

    const handleReviewClose = () => {
        setReviewOpen(false);
      };

    const handleHubClose = () => {
        setHubOpen(false);
      };

    
    const getHub = async (name: string) => {
        localStorage.setItem('hubname', name)
        window.location.reload()
    }
    
    const deleteFromHub = async (id: string) => {
        await serverCalls.deleteHub(id)
        window.location.reload()
    }
    
    const updateHub = async () => {
        let data  = {"haveWatched": 'true'} 
        
        await serverCalls.updateHub(data, currentData.watch_id)
        window.location.reload()
    }
    

    console.log(castData)

    if (localStorage.getItem('auth') == 'true'){
    return(
        <Root>
            <Main>
            <HomeNavBar />
                <Stack direction = 'row' alignItems = 'center'>
                    <Typography
                    variant = 'h4'
                    sx = {{ marginLeft: '15vh', color: "white"}}>
                    View Your Hubs 
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
                        <MenuIcon sx={{color: 'white', marginTop: '5px'}}/>
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
                            <MenuItem key={index} onClick={()=> getHub(item.hub_name)}>
                            <Typography textAlign="right" color='black'>{item.hub_name}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Button
                            size="medium"
                            variant='contained'
                            color="secondary"
                            sx={{marginLeft: '50px'}}
                            onClick = {()=> {setHubOpen(true); setHubType('create')}}
                            >
                            Create Hub
                        </Button>
                    <Button
                            size="medium"
                            variant='contained'
                            color="success"
                            sx={{marginLeft: '25px'}}
                            onClick = {()=> {setHubOpen(true); setHubType('find')}}
                            >
                            Find Hub
                        </Button>
                </Stack>
                <Typography
                variant='h4'
                sx = {{ marginLeft: '15vh', color: "white"}}>
                    Current Hub: {localStorage.getItem('hubname')}
                </Typography>
                <Grid container spacing={3} sx={{marginTop: '25px', marginRight: 'auto', marginLeft: 'auto', width: '85vw'}}>
                    {hubData.map((browse: any, index: any) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card
                        sx={{
                            height: "425px",
                            width: "250px", 
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "#1B2929",
                            opacity: '66%',
                            borderRadius: '10px'
                        }}
                        >
                        <CardMedia
                            component="img"
                            sx={{
                            pt: "0",
                            height: "225px",
                            }}
                            image={browse.poster_image}
                            alt={browse.title}
                        />
                        <CardContent sx={{ flexGrow: 1, maxHeight: '150px'}} >
                            <Stack direction = 'row' justifyContent='space-between' sx={{marginBottom: '10px', height: '55px'}}>
                                <Typography variant="h5" component="h2" sx={{color: 'white'}}>
                                {browse.title} 
                                </Typography>
                                <Box sx={{display: 'flex', 
                                        justifyContent: 'center', 
                                        backgroundColor: chooseColor(browse.type_), 
                                        borderRadius: '8px', 
                                        height: '30px', 
                                        width: '60px'}}>
                                    <Typography sx={{ fontSize: "20px", height: '20px', marginBottom: '20px'}}>
                                    {browse.type_}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box sx={{bottom: '0px'}}>
                                <Stack direction = 'row' justifyContent='space-between'>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    Have Watched?
                                    </Typography>
                                    <Stack direction = 'row'>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    {browse.have_watched ? browse.have_watched.split(", ").map((value: any) => {
                                        if (value == 'true'){
                                            return 1
                                        } else return 0}).reduce((total: any,num: any) => total + num, 0): ''}
                                    </Typography>
                                    <ThumbUpIcon fontSize='small' sx={{color: 'green', mr: '7px', ml: '5px'}}/> 
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    {browse.have_watched? browse.have_watched.split(", ").map((value: any) => {
                                        if (value == 'false'){
                                            return 1
                                        } else return 0}).reduce((total: any,num: any) => total + num, 0): 'N/A'}
                                    </Typography>
                                    <ThumbDownIcon fontSize='small' sx={{color: 'red', ml: '5px'}}/> 
                                    </Stack>
                                </Stack>
                                <Stack direction = 'row' justifyContent='space-between'>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    Review Score
                                    </Typography>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    {browse.total_review || 'N/A'} 
                                    </Typography>
                                </Stack>
                            </Box>
                        </CardContent>
                        {/* card actions here */}
                        <CardActions>
                            <Button
                                size="large"
                                variant='text'
                                onClick={()=> {setCurrentData(browse); handleDetailsOpen()}}
                                sx={{left: '0px', color: 'white', marginLeft: '0px', textAlign: 'left'}}
                                >
                                View Details
                                <FastForwardIcon
                                    fontSize="small"
                                    sx = {{marginLeft: '5px'}}
                                />
                            </Button> 
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                {/* Details Dialog Box */}
                <Dialog
                    open={detailsOpen} 
                    scroll='body'
                    maxWidth='xl'
                    onClose={handleDetailsClose} 
                    aria-labelledby='form-dialog-title'
                    sx = {{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '25vh',
                        height: {xs: '1000px', sm: "500px"},
                        width: {xs: '400px', sm: "1000px"}, 
                        borderRadius: '10px',
                        padding: '20px'
                    }}>
                    <DialogContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Stack sx={{marginBottom: '10px'}}>
                                    <CardMedia
                                    component="img"
                                    sx={{
                                    pt: "0",
                                    height: "475px",
                                    width: '325px'
                                    }}
                                    image={currentData.poster_image}
                                    alt={currentData.title}
                                />
                            </Stack>
                            <Stack sx={{width: '60%'}}>
                                <Typography variant='h4' sx={{backgroundColor: 'initial'}}>{currentData.title}</Typography>
                                <Typography variant='h6' sx={{backgroundColor: 'initial'}}>{currentData.summary}</Typography>
                                <br />
                                <Typography variant='h6'>Genre:  { currentData.genre}</Typography>
                                <br />
                                <Typography variant='h6'>Available Streaming:  { currentData.streaming || ' N/A'} </Typography>
                                <Typography variant='h6'>Cast: </Typography>
                                <Grid container spacing={1} sx={{marginTop: '30px', marginBottom: '30px', marginRight: 'auto', marginLeft: 'auto'}}>
                                    {castData.map((cast: any, index: any) => (
                                    <Grid item key={index} xs={12} sm={3} md={2} >
                                        <Stack direction='column' justifyContent='center' sx={{textAlign: 'left'}}>
                                        <Avatar sx={{width: 75, height: 75}}><img src={cast.cast_image} style={{width: '100%', marginTop: '15px'}}/></Avatar>
                                        <Typography variant='body2' sx={{color: 'black'}}>{cast.full_name}</Typography>
                                        </Stack>
                                    </Grid>
                                    ))}
                                </Grid>
                            </Stack>
                        </DialogContent>
                        <Divider />
                        <DialogContent>
                        <Stack>
                            <br />
                            <Stack direction = 'row' justifyContent='start' alignItems='center'>
                                <Typography variant="h6" component="h2">
                                Have Watched?
                                </Typography>
                                <Stack direction = 'row'>
                                    <Typography variant="h6" component="h2" sx={{ml: '23px'}}>
                                    {currentData.have_watched? currentData.have_watched.split(", ").map((value: any) => {
                                        if (value == 'true'){
                                            return 1
                                        } else return 0}).reduce((total: any,num: any) => total + num, 0) : ''}
                                    </Typography>
                                    <ThumbUpIcon fontSize='small' sx={{color: 'green', mr: '7px', ml: '5px'}}/> 
                                    <Typography variant="h6" component="h2">
                                    {currentData.have_watched ? currentData.have_watched.split(", ").map((value: any) => {
                                        console.log(value)
                                        if (value == 'false'){
                                            return 1
                                        } else return 0}).reduce((total: any,num: any) => total + num, 0) : 'N/A'}
                                    </Typography>
                                    <ThumbDownIcon fontSize='small' sx={{color: 'red', ml: '5px'}}/> 
                                </Stack>
                                <Button
                                    size='large'
                                    variant='text'
                                    color='secondary'
                                    sx = {{top: '0px', marginLeft: '7px'}}
                                    onClick = {updateHub}>
                                        Add Watched 
                                    </Button>
                            </Stack>
                            <Stack direction = 'row' justifyContent='start' alignItems = 'center'>
                                <Typography variant="h6" component="h2">
                                Review Score: 
                                </Typography>
                                <Typography variant="h6" component="h2" sx={{ml: '25px'}}>
                                { currentData.total_review || 'N/A'}
                                </Typography>
                                <Button
                                    size='large'
                                    variant='text'
                                    color='secondary'
                                    sx = {{top: '0px', marginLeft: '5px'}}
                                    onClick = {()=>{setReviewOpen(true); setReviewType('reviewScore')}}>
                                        Add Score
                                </Button>
                            </Stack>
                            <Stack direction = 'row' justifyContent='start' alignItems = 'center'>
                                <Typography variant="h6" component="h2">
                                Reviews: 
                                </Typography>
                                <Typography variant="h6" component="h2" sx={{ml: '70px'}}>
                                {currentData.review || 'N/A'} 
                                </Typography>
                                <Button
                                    size='large'
                                    variant='text'
                                    color='secondary'
                                    sx = {{top: '0px', marginLeft: '5px'}}
                                    onClick = {() => {setReviewOpen(true); setReviewType('review')}}>
                                        Add Review
                                </Button>
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            size="small"
                            variant='contained'
                            color="error"
                            onClick={() => deleteFromHub(currentData.watch_id)}
                            >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={reviewOpen} onClose={handleReviewClose}>
                    <DialogContent>
                        <DialogContentText>Update your Review of {currentData.title}</DialogContentText>
                        {reviewType === 'review'? <Review id={currentData.watch_id} type={'hub'} /> : <ReviewScore id={currentData.watch_id} type={'hub'}/>}
                    </DialogContent>
                </Dialog>
                <Dialog open={hubOpen} onClose={handleHubClose}>
                    <DialogContent>
                        <DialogContentText>
                            {hubType === 'create'? "Create a New Hub!": "Join an Existing Hub!"}
                        </DialogContentText>
                        <CreateHub type={hubType}/>
                    </DialogContent>
                </Dialog>
            </Main>
        </Root>
    )} else {
        return (
            <Root>
                <Main>
                <HomeNavBar />
                <Stack 
                justifyContent = 'center'
                alignItems = 'center'
                textAlign = 'center'
                sx={{width: {md:'350px', xs: '250px'}, margin: 'auto', marginTop: '30vh'}}>
                    <Typography variant='h4' sx={{color: 'white'}}>
                        Please Sign In to view your watchlist
                    </Typography>
                </Stack>
                </Main>
            </Root>
        )}
    
}