import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { InputText } from '../sharedComponents/InputFields';
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