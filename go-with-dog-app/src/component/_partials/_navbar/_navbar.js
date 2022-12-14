import {AppBar, Box, Button} from "@mui/material";
import {SwitchModeButton} from "../_theme/_switchModeButton";
import {useEffect} from "react";
import '../../../assets/css/component/_partials/_navbar.scss';
import {LogginButton} from "../../../services/auth/logginButton";
import auth from "../../../services/auth/token";
import Logo from "../../../assets/logo.png";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export function Navbar() {

    useEffect(() => {
    }, [])

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
                <Box className="navbar">
                    <Button color="secondary" href='/'>Accueil</Button>
                      <Button color="secondary" href='/places'>Places</Button>
                    {auth.loggedAndAdmin() ? (
                        <Box>
                            <Button color="secondary" href='/categorie'>Categorie</Button>
                        </Box>
                    ) : null }
                    {auth.loggedAndAdmin() ? (
                                            <Box>
                                               <Button color="secondary" href='/place'>Place</Button>
                                            </Box>
                                         ) : null }
                     {auth.loggedAndAdmin() ? (
                        <Box>
                           <Button color="secondary" href='/tag'>Tag</Button>
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