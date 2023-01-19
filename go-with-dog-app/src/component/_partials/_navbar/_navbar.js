import {AppBar, Box, Button} from "@mui/material";
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


export function Navbar() {

const [places , setPlaces] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

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
                    />
                <Box sx={{m: 4, flexGrow: 1}} component="div" color="secondary">{document.title}</Box>
                <Box>
                     <Search searchHandler={handleSearch} />
                 </Box>
                <Box className="navbar">
                    <Button color="secondary" href='/'>Accueil</Button>
                      <Button color="secondary" href='/places'>Places</Button>
                       <Button color="secondary" href='/ballades'>Ballades</Button>
                    {auth.loggedAndAdmin() ? (
                        <Box>
                            <Button color="secondary" href='/dashboard'>Dashboard</Button>
                        </Box>
                    ) : null }
                    <Box>
                    <Button color="secondary" href='/contact'>Contact</Button>
                    </Box>
                    {auth.loggedAndUser() || auth.loggedAndAdmin() ? (
                         <Box>
                         <Button color="secondary" href='mon-compte'><AccountCircleOutlinedIcon /></Button>
                          </Box>
                           ) : null }
                    <LogginButton/>
                    <SwitchModeButton/>
                </Box>
            </AppBar>
        </Box>
    )
}