import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Typography,
    Card, CardMedia, CardContent, CardActions , Select , MenuItem , InputLabel
} from "@mui/material";

import axios from "axios";
import DisplayPlace from "./displayPlace";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet'
import marker from "../../assets/icon.svg";
import auth from "../../services/auth/token";
import NewPlace from "./newPlace";
import NewAddress from "../address/newAddress";



function Places() {

    document.title = 'Tous les lieux';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
     const myIcon = new Icon({
         iconUrl: marker,
         iconSize: [32,32]
        })
     const [selectedCategory, setSelectedCategory] = useState(null);



    useEffect(() => {
        axios.get('https://api.gowithdog.fr/api/places').then((actualData) => {
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
    let btn;
    let newAddress  ;

       if(auth.loggedAndUser() || auth.loggedAndAdmin()) {
         btn =<Typography sx={{ marginRight: "10px" }}>Créer un lieu : <NewPlace newValue={{data}} handleDataChange={handleDataChange} />  </Typography>;
         newAddress =  <Typography>Créer une adresse : <NewAddress newValue={{data}} handleDataChange={handleDataChange} /> </Typography>
        }

        const filteredData = data?.filter((data) => {
            if (selectedCategory) {
              return data.category.category_name === selectedCategory;
            } else {
              return true;
            }
          }) ?? [];



    return <Container maxWidth="xl" id="place">

            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Tous les lieux</Typography>
           <Box sx={{ display: 'flex', justifyContent: 'center' , alignItems: "center"}}>
            <InputLabel>Trier par categorie :</InputLabel>
                             <Select value={selectedCategory}
                             onChange={(e) => setSelectedCategory(e.target.value)}
                             label="Trier par categorie"
                             sx={{ marginLeft : "10px"}}
                             >
                              <MenuItem value={null} label="Tous">Tous </MenuItem>
                               <MenuItem value="Restaurant">Restaurant</MenuItem>
                               <MenuItem value="Parc">Parc</MenuItem>
                               <MenuItem value="Hebergement">Hebergement</MenuItem>
                               <MenuItem value="Autre">Autre</MenuItem>
                                </Select>
            </Box>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des lieux...</Typography>
            ) : (
                <Box sx={{ maxWidth: '90%' }}>
               <Box sx={{ display: 'flex'}}>
                {btn}
                {newAddress}
                </Box>
                                {filteredData.map(({id, place_name, place_description , place_image, category, address}) => {
                                    return (

                                        <Card sx={{ width: '300px' , display: 'inline-block' , margin: 3 , height: '550px'}} key={id}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                src={`https://api.gowithdog.fr/storage/uploads/places/${place_image}`}
                                                alt={place_name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {place_name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {place_description.slice(0,30)}
                                                </Typography>
                                            </CardContent>
                                            <Box>
                                                <CardActions>
                                                    <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                        <DisplayPlace DisplayPlaceValue={{id, place_name, place_description, place_image, category, address, data}} handleDataChange={handleDataChange} />
                                                    </Box>
                                                </CardActions>
                                                <MapContainer center={[address.latitude, address.longitude]} zoom={13} scrollWheelZoom={true}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker position={[address.latitude, address.longitude]} icon={myIcon}>
                                                        <Popup>
                                                            {place_name}
                                                            {address.address}
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

export default Places;