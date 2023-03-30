import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { getAuth } from "firebase/auth"; // ** new ** add this for authentication functionality
import { signOut } from "firebase/auth";
import { useState } from "react";

export const HomeNavBar = () => {
  const auth = getAuth();
  const myAuth = localStorage.getItem("auth");
  const navigate = useNavigate();

  let links = [
    {
      text: "Browse",
      onClick: () => navigate("/browse"), // will be '/TheHub' in future
    },
    {
      text: "Watchlist",
      onClick: () => navigate("/watchlist"), // will be '/Watchlist' in future
    },
    {
      text: "The HUB",
      onClick: () => navigate("/hub"), // will be '/TheHub' in future
    },
  ];

  const [navLinks, setNavlinks] = useState(links);
  let signInText = 'Sign In'; 

  if (myAuth == 'false'){
    signInText = 'Sign In'
  } else {
    signInText = 'Sign Out'
  }

  const signinButton = async () => {
    if (myAuth == 'false'){
        navigate('/signin') // will be '/SignIn' in future
    } else {
        signUsOut()
    }
  }


  const signUsOut = async () => {
      await signOut(auth);
      localStorage.setItem("auth", "false");
      localStorage.setItem("token", "");
      navigate("/");
      
    };



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

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FastForwardIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MVie
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              sx={{display: { xs: "block", md: "none" }}}
            >
              {navLinks.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                  <Typography textAlign="right" color='black'>{item.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
         
          <FastForwardIcon
            fontSize="large"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 600,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mvie 
          </Typography>
         

          <Box sx={{ position: 'absolute', flexGrow: 1, display: { xs: "none", md: "flex" }, left: '125px' }}>
            {navLinks.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick}
                sx={{ fontSize: '18px', color: "white", display: "block" }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Button 
            variant = 'outlined'
            color = 'secondary'
            size = 'large'
            sx = {{  position: 'absolute', color: "white", right: '0px'}}
            onClick = {signinButton}
            >
            {signInText}
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};