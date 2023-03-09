import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
  } from "@mui/material";

interface DetailsProps {
    data: {
        title: string,
        type_: string,
        poster_image: string,
        streaming: string,
        summary: string,
        genre: string,
        review: string | null,
        review_score: string | null,
        user_id: string,
        watch_id: string
    }
}

export const ViewDetails = (props:DetailsProps) => {
    const [detailsOpen, setDetailsOpen] = useState(false);
    const handleDetailsOpen = () => {
        setDetailsOpen(true);
      };
    
      const handleDetailsClose = () => {
        setDetailsOpen(false);
      };
    return (
        <Dialog open={detailsOpen} onClose={handleDetailsClose} aria-labelledby='form-dialog-title'>
            <DialogTitle id='form-dialog-title'>{props.data.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>We got the dets</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}