import {AppBar, Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import auth from './token';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export function LogginButton() {

    const tokenHere = auth.getToken() && auth.getExpiryTime();
    const [href, setHref] = useState('login')
    const [message, setMessage] = useState('Se connecter')

    useEffect(() => {
        if (tokenHere){
            setHref('logout')
            setMessage(<LogoutOutlinedIcon />)
        }
    }, [tokenHere])

    return (
        <Button href={href} color="secondary">{message}</Button>
    )
}