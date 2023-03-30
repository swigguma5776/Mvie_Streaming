import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import { InputText, InputPassword } from '../sharedComponents/InputFields';
import { useNavigate } from 'react-router-dom'; 
import { 
    onAuthStateChanged,
    getAuth, 
    GoogleAuthProvider, 
    signOut, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, } from 'firebase/auth'; 
import { serverCalls } from '../../api';


interface FormProps {
    id: string
}

export const ReviewScore = (props: FormProps) => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        let reviewData = {'haveWatched': null, 'review': null, 'reviewScore': data.reviewScore}
            await serverCalls.updateShow(reviewData, props.id)
            window.location.reload()
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

export const Review = (props: FormProps) => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        let reviewData = {'haveWatched': null,'review': data.review, 'reviewScore': null}
            await serverCalls.updateShow(reviewData, props.id)
            window.location.reload()
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

export const CreateHub = () => {
    const  {register, handleSubmit} = useForm({})

    const onSubmit = async (data:any, event: any) => {
        console.log(data)
        await serverCalls.createUserHub(data)
        window.location.reload()
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="hubname"></label>
                    <InputText {...register('hubName')} name='hubName' placeholder='What is the name of your Hub?' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
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

