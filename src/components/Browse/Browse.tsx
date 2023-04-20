import React, { useState } from 'react';
import { Button, Typography, Stack } from '@mui/material'; 
import { useForm } from 'react-hook-form';
import { styled } from '@mui/system'; 
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useDispatch, useStore } from 'react-redux'
import { chooseTitle,
        chooseType,
        choosePosterImage,
        chooseGenre,
        chooseSummary,
        chooseStreaming,
        chooseWatchId,
        chooseFullName,
        chooseCharacterName,
        chooseCastImage,
        chooseBioLink} from '../../redux/slices/rootSlice';
//Internal Imports
import background_image from '../../assets/images/baby_yoda_flip.jpeg'; 
import { HomeNavBar } from '../sharedComponents/NavBar'; 
import { InputText } from '../sharedComponents/InputFields';
import { serverCalls, getMvieData } from '../../api';
import { useGetPopularData } from '../../custom-hooks/FetchData'; 



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
    paddingBottom: '600px'
  });

  interface BrowseForm {
    formdata?: {}; 
  }

  interface DataState{
    title: string;
    type: string; 
    browseData?: []
  }

export const Browse = (props:BrowseForm) => {
    const { popularData, getPopularData } = useGetPopularData()
    const { register, handleSubmit } = useForm({})
    const [browseData, setBrowseData ] = useState([])
    const [browseType, setType] = useState('')
    const dispatch = useDispatch();
    const store = useStore();


    const onSubmit = async (formdata:any, event: any) => {
        console.log(formdata.title)
        console.log(formdata.type)
        setType(formdata.type)

        setBrowseData(await getMvieData.getData(formdata.title, formdata.type))
        
    }

    const addToWatchlist = async (formdata:any) => {
        if (browseData.length == 0){
          setType('movie')
        }
        dispatch(chooseType(browseType))
        dispatch(choosePosterImage(formdata.poster_path))
        dispatch(chooseSummary(formdata.overview))
        dispatch(chooseTitle(formdata.title || formdata.name))
        dispatch(chooseGenre(await getMvieData.getGenre(formdata.genre_ids, browseType)))
        dispatch(chooseStreaming(await getMvieData.getStreaming(formdata.id, browseType)))

        console.log(store.getState())
        let data: any = await store.getState()
        let returnData = await serverCalls.createShow(data.show)
        console.log(returnData.watch_id)

        let cast = await getMvieData.getCast(formdata.id, browseType)
        console.log(cast)
        for (let member of cast){
          dispatch(chooseWatchId(returnData.watch_id))
          dispatch(chooseCharacterName(member.character))
          dispatch(chooseFullName(member.name))
          dispatch(chooseCastImage(member.profile_path))
          let browseData: any = await store.getState()
          await serverCalls.createCast(browseData.cast)
        }

        window.location.reload()
        
    }
    console.log(browseData)

    return(
        <Root>
            <Main>
            <HomeNavBar />
                <Stack
                width='550px'
                height='75px'
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                sx={{marginRight: 'auto', marginLeft: 'auto', marginTop: '100px'}}>
                <form onSubmit = {handleSubmit(onSubmit)} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <label htmlFor="title"></label>
                    <InputText {...register('title')} name='title' placeholder='Movie/Show Title Here' />
                    <label htmlFor='type'></label>
                    <RadioGroup
                        row
                        aria-labelledby='row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                        sx={{marginLeft: '20px'}}>
                        <FormControlLabel {...register('type')} value='movie' control={<Radio />} label='Movie'/>
                        <FormControlLabel {...register('type')} value='tv' control={<Radio />} label='TV'/>
                    </RadioGroup>
                <Button size='large' variant='contained' color='primary' type='submit' sx={{height: '60px', width: '150px', borderRadius: '10px', marginTop: '10px'}}>Search</Button>
                </form>
                </Stack>
              <Typography variant='h4' sx={{fontWeight: 500, color: 'white', width: '78vw', right: 0, mt: '50px', mr: 'auto', ml: 'auto'}}>{browseData.length == 0? 'Popular': 'Your Results'}</Typography>
            <Grid container spacing={3} sx={{marginTop: '25px', marginRight: 'auto', marginLeft: 'auto', width: '80vw'}}>
            {(browseData.length == 0 ? popularData : browseData).map((browse: any, index: any) => (
              <Grid item key={index} sm={12} md={3}>
                <Card
                  sx={{
                    height: "475px",
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
                      height: "325px",
                    }}
                    image={`https://image.tmdb.org/t/p/w500${browse.poster_path}`}
                    alt={browse.original_title}
                  />
                  <CardContent sx={{ flexGrow: 1, maxHeight: '100px', marginBottom: '10px'}}>
                    <Typography variant="h5" component="h2" sx={{color: 'white'}}>
                      {browse.title || browse.name} 
                    </Typography>
                    {/* <Typography sx={{ fontSize: "14px", height: '20px', marginBottom: '20px'}}>
                      {browse.overview}
                    </Typography> */}
                  </CardContent>
                  {/* card actions here */}
                  <CardActions>
                    <Button
                      size="small"
                      variant='contained'
                      color="secondary"
                      onClick={() => {addToWatchlist(browse)}}
                    >
                      Add to WatchList
                    </Button> 
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
            </Main>
        </Root>
    )
}