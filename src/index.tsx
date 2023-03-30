import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Watchlist, Browse, Hub, SignInOptions } from './components'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './Theme/themes'; 
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './styles.css'; 
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig'; 


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store = {store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path='/' element ={<Home title={'Mvie'} />} />
              <Route path='/watchlist' element={<Watchlist />} />
              <Route path='/browse' element={<Browse />} />
              <Route path='/hub' element={<Hub />} />
              <Route path='/signin' element ={<SignInOptions title={'Mvie'} />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
