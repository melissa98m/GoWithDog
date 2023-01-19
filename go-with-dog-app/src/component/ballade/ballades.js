import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Typography,
    Card, CardMedia, CardContent, CardActions
} from "@mui/material";

import axios from "axios";
import DisplayBallade from "./displayBallade";
import NewBallade from "./newBallade";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet'
import marker from "../../assets/icon.svg";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import auth from "../../services/auth/token";


function Ballades() {

    document.title = 'Toutes les ballades';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
     const myIcon = new Icon({
         iconUrl: marker,
         iconSize: [32,32]
        })



    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ballades').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            console.log(actualData)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDataChange = async (dataChange) => {
        await setData(dataChange)
    }
    let btn
    if(auth.loggedAndUser() || auth.loggedAndAdmin()) {
     btn = <NewBallade newValue={{data}} handleDataChange={handleDataChange} />
    }

    return <Container maxWidth="xl" id="ballade">
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Toutes les ballades</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
            ) : (
                <Box sx={{ maxWidth: '90%' }}>
                 {btn}
                                {data.map(({id, ballade_name, ballade_description , ballade_image, tag, ballade_latitude , ballade_longitude , denivele , distance}) => {
                                    return (

                                        <Card sx={{ maxWidth: 500 , display: 'inline-block' , margin: 3 , height: '500px'}}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                src={`http://127.0.0.1:8000/storage/uploads/ballades/${ballade_image}`}
                                                alt={ballade_name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {ballade_name}
                                                </Typography>
                                                <Box>
                                                 Niveau:<Typography gutterBottom variant="body1" component="div" color={tag.color} >{tag.tag_name}</Typography>
                                                </Box>
                                                <Box>
                                                 <Typography variant="body" sx={{ marginTop: "25px" , textAlign: "left" , marginLeft: "5px"}} >Détails: </Typography>
                                                 <Typography variant="body2" sx={{ marginTop: "5px"}} color="text.secondary"><TrendingUpIcon />{denivele}m </Typography>
                                                 <Typography variant="body2" color="text.secondary"><LinearScaleIcon sx={{ paddingTop: "10px"}}/>{distance}km </Typography>
                                                  </Box>
                                            </CardContent>
                                            <Box>
                                                <CardActions>
                                                    <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                        <DisplayBallade DisplayBalladeValue={{id, ballade_name, ballade_description, ballade_image, tag,  ballade_latitude , ballade_longitude,denivele , distance ,  data}} handleDataChange={handleDataChange} />
                                                    </Box>
                                                </CardActions>
                                                <MapContainer center={[ ballade_latitude , ballade_longitude ]} zoom={13} scrollWheelZoom={true}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker position={[ ballade_latitude , ballade_longitude]} icon={myIcon}>
                                                        <Popup>
                                                            {ballade_name}
                                                        </Popup>
                                                    </Marker>

                                                </MapContainer>
                                            </Box>
                                        </Card>

                                    )
                                })}
                </Box>
            )}


    </Container>
}

export default Ballades;