import {AppBar, Box, Button , useTheme, useMediaQuery, Typography} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";
import '../../../assets/css/component/_partials/_navbar.scss';
import {LogginButton} from "../../../services/auth/logginButton";
import auth from "../../../services/auth/token";
import Logo from "../../../assets/logo.png";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Search from "../../search/search";
import Places from "../../place/places";
import React, {useState} from "react";
import DrawerComponent from "./Drawer";


export function Navbar() {

const [places , setPlaces] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
    }, [])

  const handleSearch = (userInput) => {
    setSearchTerm(userInput);
  };


const filterPlaces = (query, place) => {
  if (!query) {
    return places;
  } else {
    return places.filter((d) => d.toLowerCase().includes(query));
  }
};

    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar className='header' id="navbar">
            <Box
                        component="img"
                        sx={{
                        height: 70,
                        }}
                        alt="Your logo."
                        src={Logo}
                        id= "logo"
                ></Box>
                {isMobile ? null : (
                 <Box sx={{m: 4, flexGrow: 1}} component="div" color="secondary" id="title">{document.title}</Box>
                )}
                 {isMobile ? (
                     <DrawerComponent />
                     ) : (
                <Box sx={{display: 'flex' , justifyContent: 'flex-end'}}>

                   <Box className="navbar">
                    <Button color="secondary" href='/'>Accueil</Button>
                      <Button color="secondary" href='/places'>Places</Button>
                       <Button color="secondary" href='/ballades'>Ballades</Button>
                    {auth.loggedAndAdmin() ? (
                            <Button color="secondary" href='/dashboard'>Dashboard</Button>
                    ) : null }
                    <Button color="secondary" href='/contact'>Contact</Button>
                    {auth.loggedAndUser() || auth.loggedAndAdmin() ? (
                         <Button color="secondary" href='/mon-compte'><AccountCircleOutlinedIcon /></Button>
                           ) : null }
                </Box>
                </Box>
)}
                           {isMobile ? (
                           <Box sx={{display: 'flex' , justifyContent: 'flex-end' , flexGrow: 3 }}  >
                           <LogginButton/>
                            <SwitchModeButton/>
                            </Box>
                           ) : ( <Box sx={{display: 'flex' , justifyContent: 'flex-end'  }}  >
                           <LogginButton/>
                           <SwitchModeButton/>
                            </Box>
                           )}

            </AppBar>

        </Box>
    )
}