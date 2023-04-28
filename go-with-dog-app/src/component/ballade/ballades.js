import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Typography,
    Card, CardMedia, CardContent, CardActions , MenuItem , Select ,InputLabel
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

    document.title = 'Toutes les balades';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
     const myIcon = new Icon({
         iconUrl: marker,
         iconSize: [32,32]
        })
     const [selectedDifficulty, setSelectedDifficulty] = useState(null);




    useEffect(() => {
        axios.get('https://api.gowithdog.fr/api/ballades').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
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
  const filteredData = data?.filter((data) => {
    if (selectedDifficulty) {
      return data.tag.tag_name === selectedDifficulty;
    } else {
      return true;
    }
  }) ?? [];


    return <Container maxWidth="xl" id="ballade">
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Toutes les ballades</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' , alignItems: "center"}}>
             <InputLabel>Trier par tags:</InputLabel>
             <Select value={selectedDifficulty}
             onChange={(e) => setSelectedDifficulty(e.target.value)}
             label="Trier par tags"
             sx={{ marginLeft : "10px"}}
             >
              <MenuItem value={null} label="Tous">Tous </MenuItem>
               <MenuItem value="Facile">Facile</MenuItem>
               <MenuItem value="Moyen">Moyen</MenuItem>
               <MenuItem value="Difficile">Difficile</MenuItem>
               <MenuItem value="Expert">Expert</MenuItem>
                </Select>
                </Box>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des balades...</Typography>
            ) : (

                <Box sx={{ maxWidth: '90%' }}>
                 {btn}
                                {filteredData.map(({id, ballade_name, ballade_description , ballade_image, tag, ballade_latitude , ballade_longitude , denivele , distance}) => {
                                    return (


                                        <Card sx={{ width: '300px' , display: 'inline-block' , margin: 3 , height: '500px'}} key={id}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                src={`https://api.gowithdog.fr/storage/uploads/ballades/${ballade_image}`}
                                                alt={ballade_name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {ballade_name}
                                                </Typography>
                                                <Box sx={{ display : 'flex'}}>
                                                 Niveau:<Typography gutterBottom variant="body1" component="div" color={tag.color} > {tag.tag_name}</Typography>
                                                </Box>
                                                <Box sx={{display : 'flex'}}>
                                                 <Typography variant="body" sx={{ marginTop: "25px" , textAlign: "left" , marginLeft: "5px"}} >Détails: </Typography>
                                                 <Typography variant="body2" sx={{ marginTop: "15px"}} component="div" color="text.secondary"><TrendingUpIcon />{denivele}m </Typography>
                                                 <Typography variant="body2" sx={{ marginTop: "15px"}} color="text.secondary" component="div"><LinearScaleIcon sx={{ paddingTop: "10px"}}/>{distance}km </Typography>
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