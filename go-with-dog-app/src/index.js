import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './assets/css/component/_partials/_theme.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useTheme, useMediaQuery} from "@mui/material";

import {lightTheme} from "./component/_partials/_theme/_lightTheme";
import {darkTheme} from "./component/_partials/_theme/_darkTheme";
import {ColorContext, setThemeToStorage} from "./component/_partials/_theme/_colorContext";
import {createTheme, CssBaseline, ThemeProvider , Button} from "@mui/material";

import App from './App';
import Home from "./component/home/home";
import Contact from "./component/contact/contact";
import Category from "./component/category/category";
import Places from "./component/place/places";
import Place from "./component/place/place";
import Ballades from "./component/ballade/ballades";
import Ballade from "./component/ballade/ballade";
import Address from "./component/address/address";
import Tag from "./component/tag/tag";
import User from "./component/user/user";
import Dashboard from "./component/dashboard/dashboard";
import {Navbar} from "./component/_partials/_navbar/_navbar";
import {Footer} from "./component/_partials/_footer/_footer";
import Login from "./services/auth/login";
import Logout from "./services/auth/logout";
import Register from "./services/auth/register";
import ForgotPassword from "./services/auth/forgotPassword";
import ResetPassword from './/services/auth/resetPassword';
import Account from "./component/account/account";
import ChangePassword from "./component/account/changePassword";
import MentionsLegales from "./component/legal/mentionsLegales";
import PolitiqueConfidentialite from "./component/legal/politiqueConfidentialite";

import auth from "./services/auth/token"

function CustomTheme() {

    const [mode, setMode] = React.useState("light");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
                setThemeToStorage();
            },
        }),
        []
    );
    const theme = React.useMemo(
        () => createTheme(mode === "light" ? lightTheme : darkTheme),
        [mode]
    );
    const ecran = useTheme();
    const isMobile = useMediaQuery(ecran.breakpoints.down("sm"));

    useEffect(() => {
        // rend le thème persistant après reload
        const mode = localStorage.getItem("isDarkMode");
        if (mode) {
            setMode(mode);
        }
    }, []);
    return <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <Navbar/>
            {isMobile ? null : (
             <Button id="back"
             variant="outlined" color="secondary"
                              onClick={() => {
                                window.history.back();
                              }}
                            >
                             Retour
                            </Button>
             )}
            <App/>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>}>Accueil</Route>
                    <Route exact path="login" element={auth.getToken() ? <Home adminMessage='alreadyLogged'/> : <Login/> }>Login</Route>
                    <Route exact path="forgot-password" element={auth.getToken() ? <Home adminMessage='alreadyLogged'/> :<ForgotPassword/>}>Mot de passe oublié</Route>
                    <Route exact path="reset-password/:token" element={<ResetPassword/>}>ResetPassword</Route>
                    <Route exact path="register" element={<Register/>}>Inscription</Route>
                    <Route exact path="places" element={<Places/>}>Places</Route>
                    <Route exact path="ballades" element={<Ballades/>}>Ballades</Route>
                    <Route exact path="logout" element={<Logout/>}>Logout</Route>
                     <Route exact path="address" element={auth.loggedAndAdmin() ? <Address/> : <Home adminMessage='unauthorizedRole'/> }>Address</Route>
                    <Route exact path="place" element={auth.loggedAndAdmin() ? <Place/> : <Home adminMessage='unauthorizedRole'/> }>Place</Route>
                    <Route exact path="ballade" element={auth.loggedAndAdmin() ? <Ballade/> : <Home adminMessage='unauthorizedRole'/> }>Ballade</Route>
                    <Route exact path="category" element={auth.loggedAndAdmin() ? <Category/> : <Home adminMessage='unauthorizedRole'/> }>Categorie</Route>
                    <Route exact path="tag" element={auth.loggedAndAdmin() ? <Tag/> : <Home adminMessage='unauthorizedRole'/> }>Tag</Route>
                    <Route exact path="user" element={auth.loggedAndAdmin() ? <User/> : <Home adminMessage='unauthorizedRole'/> }>User</Route>
                    <Route exact path="dashboard" element={auth.loggedAndAdmin() ? <Dashboard/> : <Home adminMessage='unauthorizedRole'/> }>Dashboard</Route>
                    <Route exact path="mon-compte" element={auth.loggedAndUser() || auth.loggedAndAdmin() ? <Account/> : <Home adminMessage='Non connecté'/> }>Account</Route>
                    <Route exact path="change-password" element={auth.loggedAndUser() || auth.loggedAndAdmin() ? <ChangePassword/> : <Home adminMessage='Non connecté'/> }>Change Password</Route>
                    <Route exact path="contact" element={<Contact/>}>Contact</Route>
                    <Route exact path="mentions-legales" element={<MentionsLegales/>}>MentionsLegales</Route>
                    <Route exact path="politique-confidentialite" element={<PolitiqueConfidentialite/>}>PolitiqueConfidentialite</Route>
                    <Route path="*" element={
                           <div class="container">
                           <h1>Erreur 404</h1>
                            <div class="boo-wrapper">
                                <div class="boo">
                                <div class="face"></div>
                                </div>
                            <div class="shadow"></div>
                            <h2>Oops!</h2>
                             <p>La page demandée n'a pas été trouvée <br/></p>
                             <Button variant="outlined" color="secondary" sx={{ textAlign: "center"}}href="/">Retourner sur l'accueil</Button>
                         </div>
                        </div>

                    }/>
                </Routes>
            </BrowserRouter>
            <Footer />
        </ThemeProvider>
    </ColorContext.Provider>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <CustomTheme/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
