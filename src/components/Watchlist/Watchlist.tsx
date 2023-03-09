import React, { useState } from 'react';
import { Button,
     Typography, 
     Stack, 
     Box, 
     Dialog,
     DialogActions,
     DialogContent, 
     DialogContentText,
     DialogTitle, } from '@mui/material'; 
import { styled } from '@mui/system'; 
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import FastForwardIcon from '@mui/icons-material/FastForward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import { makeStyles } from '@material-ui/styles';
// Internal Imports
import background_image from '../../assets/images/baby_yoda_flip.jpeg'; 
import { HomeNavBar } from '../sharedComponents/NavBar'; 
import { ViewDetails } from '../ViewDetails'; 
import { useGetData } from '../../custom-hooks';
import { useNavigate } from 'react-router-dom';


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

//   const useStyles = makeStyles({
//     dialogContainer: {
//       backgroundColor: 'blue',
//     },
//   });



export const Watchlist = () => {
    let { browseData, getData} = useGetData(); 
    let [currentData, setCurrentData] = useState<any>({})
    const [detailsOpen, setDetailsOpen] = useState(false);

    const chooseColor = (type: string) => {
        return (type === 'movie') ? 'orange' : 'purple'
    }

    const handleDetailsClose = () => {
        setDetailsOpen(false);
      };

    console.log(currentData)


    return(
        <Root>
            <HomeNavBar />
            <Main>
                <Typography
                variant = 'h4'
                sx = {{marginTop: '100px', marginLeft: '15vh', color: "white"}}>
                Your Watchlist
                </Typography>
                <Grid container spacing={3} sx={{marginTop: '50px', marginRight: 'auto', marginLeft: 'auto', width: '80vw'}}>
                    {browseData.map((browse: any, index: any) => (
                    <Grid item key={index} xs={12} sm={6} md={3}>
                        <Card
                        sx={{
                            height: "400px",
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
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    {browse.have_watched == false? <ThumbDownIcon fontSize='medium' sx={{color: 'red'}}/> : <ThumbUpIcon fontSize='medium' sx={{color: 'green'}} />} 
                                    </Typography>
                                </Stack>
                                <Stack direction = 'row' justifyContent='space-between'>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    Review Score
                                    </Typography>
                                    <Typography variant="h6" component="h2" sx={{color: 'white'}}>
                                    {browse.review_score || 'N/A'} 
                                    </Typography>
                                </Stack>
                            </Box>
                        </CardContent>
                        {/* card actions here */}
                        <CardActions>
                            <Button
                                size="large"
                                variant='text'
                                onClick={()=> {setCurrentData(browse); setDetailsOpen(true)}}
                                sx={{left: '0px', color: 'white', marginLeft: '0px', textAlign: 'left'}}
                                >
                                View Details
                                <FastForwardIcon
                                    fontSize="small"
                                    sx = {{marginLeft: '5px'}}
                                />
                            </Button> 
                            <ViewDetails data={browse} />
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                <Dialog
                    open={detailsOpen} 
                    onClose={handleDetailsClose} 
                    aria-labelledby='form-dialog-title'
                    sx = {{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: '30vh',
                        height: {xs: '1000px', sm: "400px"},
                        width: {xs: '400px', sm: "800px"}, 
                        display: "flex",
                        flexDirection: {xs: 'column', sm: "row"},
                        backgroundColor: "#1B2929",
                        borderRadius: '10px'
                    }}>
                    <Stack sx={{direction: 'column', backgroundColor: 'initial'}}>
                            <CardMedia
                            component="img"
                            sx={{
                            pt: "0",
                            height: "225px",
                            width: '300px'
                            }}
                            image={currentData.poster_image}
                            alt={currentData.title}
                        />
                    </Stack>
                    <Stack>
                        <Typography variant='h4' sx={{backgroundColor: 'initial'}}>{currentData.title}</Typography>
                        <Typography variant='h6' sx={{backgroundColor: 'initial'}}>{currentData.summary}</Typography>

                    </Stack>
                </Dialog>
            </Main>
        </Root>
    )
}