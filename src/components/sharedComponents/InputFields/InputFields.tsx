import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface inputType{
    name: string;
    placeholder: string;
}

export const InputText = forwardRef((props:inputType, ref) => {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        type='text'
        sx = {{backgroundColor: 'white', borderRadius: '10px'}}
        {...props}
      ></TextField>
    );
  });

export const InputPassword = forwardRef((props:inputType, ref) => {
    return (
      <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        type='password'
        {...props}
      ></TextField>
    );
  });