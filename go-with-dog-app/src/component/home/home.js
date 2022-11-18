import React, {useEffect, useState} from "react";
import { Box, CardHeader, Container, Card, TableContainer, Table, TablePagination } from "@mui/material";
import axios from "axios";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoupeIcon from '@mui/icons-material/Loupe';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AdminMessage from "../../services/auth/adminMessage";
import Grid from '@mui/material/Grid';
import Presentation from "../../assets/presentation.jpg";


import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet'
import marker from "../../assets/icon.svg";



function Home() {

    document.title = "Page d'accueil";

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [places , setPlaces] = useState([]); // array of
    const myIcon = new Icon({
     iconUrl: marker,
     iconSize: [32,32]
    })



    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ballades').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            getPlaces();
            console.log(actualData.data)
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
      let getPlaces = async () => {
        await axios.get("http://127.0.0.1:8000/api/places").then((actualData) => {
        setPlaces(actualData.data.data)
        console.log(places)
        })
        }

    return <Container maxWidth="xl" id='home'>
     <Typography variant="h4" sx={{textAlign: "left" , marginTop: "15px"}} gutterBottom>Bienvenue sur go with dog!</Typography>
        <Typography variant="h5" sx={{textAlign: "center" , marginTop: "35px"}} gutterBottom>Dernières ballades ajoutées</Typography>
        {loading ? (
            <Typography variant="body" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
        ) : (
            <Box sx={{ maxWidth: '100%' , marginTop: "2%"}}>
                        {data.slice(0,4).map(({id, ballade_name ,ballade_description ,ballade_image, distance , denivele , tag , created_at , user  }) => {
                return (
                <Card sx={{ maxWidth: 300 , display: 'inline-block'  , marginRight: "25px"}} key={id} color="success">
                    <CardHeader
                        title={ ballade_name }
                    />
                    <CardMedia
                        component="img"
                        height="160"
                        image={`http://127.0.0.1:8000/storage/uploads/ballades/${ballade_image}`}
                        alt={ballade_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" color={tag.color}>
                            {tag.tag_name}
                        </Typography>
                        <Typography variant="body2">
                            {ballade_description.slice(0,100)}
                        </Typography>
                        <Typography variant="body" sx={{ marginTop: "25px" , textAlign: "left" , marginLeft: "5px"}} >Détails: </Typography>
                        <Typography variant="body2" sx={{ marginTop: "5px"}} color="text.secondary">
                            {denivele}m
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {distance}km
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="secondary" sx={{textAlign: "center" , marginRight: "auto", marginLeft: "auto"}} href={`ballade/${id}`}>
                                <LoupeIcon />
                            Plus de détails</Button>
                    </CardActions>
                </Card>

            )
        })}
            </Box>


        )
        }
  <Box sx={{textAlign: "center" , marginTop: "5%" ,  marginBottom: "5%" , marginLeft: "auto" , marginRight: "auto" , maxWidth: "70%" ,
                   backgroundColor: "#B1B3C1" , borderRadius: "10px" , marginBottom: "10px" , padding : "10px"}}>
           <Grid container >
           <Grid item xs={8} sx={{ paddingLeft: "10px"}}>
            <Typography variant="h5" sx={{textAlign: "left" , marginBottom: "25px" }} >
             Qui sommes nous?</Typography>
             <Typography variant="body" sx={{textAlign: "left" , marginBottom: "55px" }} >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna mi, placerat non pellentesque nec, luctus id tellus.
               Nulla molestie ac felis eget vehicula. Proin elementum dui at malesuada faucibus. Mauris pulvinar metus id lacinia mollis.
                Duis non ante fringilla, vulputate est eget, malesuada sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Cras iaculis justo pretium scelerisque congue. Praesent mi dolor, vulputate in tempus vitae, hendrerit sit amet metus.
                  Mauris convallis metus in iaculis mattis. Cras gravida sem vel lorem dignissim, nec egestas purus bibendum. Aliquam nec tellus est.
                  Phasellus sed mi suscipit metus fermentum convallis ut at libero.
                                       </Typography>
                                   </Grid>
                  <Grid item xs={4} sx={{ marginTop: "15px"}}>
                   <img src={Presentation} alt="Presentation" width="200px"/>
                   </Grid>
          </Grid>
</Box>

  <Typography variant="h5" sx={{textAlign: "left" , marginTop: "35px"}} gutterBottom>Tout les lieux</Typography>
  {loading ? (
   <Typography variant="body" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
          ) : (
          <Box sx={{ maxWidth: '90%' , marginBottom: "150px" }}>
          <MapContainer center={[45.183567840163185, 5.718114920600324]} zoom={9} scrollWheelZoom={true} sx={{ marginLeft: '30px' , marginRight:"auto" , textAlign: "center"}}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                  {places.map(({id, place_name, address , category}) => {
                                      return (
                                      <Box sx={{ marginLeft: '30px' , marginRight:"auto" , textAlign: "center"}}>
                                                      <Marker position={[address.latitude, address.longitude]} icon={myIcon} key={id}>
                                                          <Popup>
                                                          <strong>{category.category_name}</strong> <br/>
                                                              {place_name} <br/>
                                                              {address.address} - {address.postal_code} {address.city}
                                                          </Popup>
                                                      </Marker>
                                                  </Box>
                                      )
                                  })}
                   </MapContainer>
                     </Box>
                          )}



</Container>

}
export default Home;