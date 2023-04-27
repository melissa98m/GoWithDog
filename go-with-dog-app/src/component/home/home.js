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
import DisplayBallade from "../ballade/displayBallade";


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
       const handleDataChange = async (dataChange) => {
            await setData(dataChange)
        }



    useEffect(() => {
        axios.get('https://api.gowithdog.fr/api/ballades').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            getPlaces();
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);
      let getPlaces = async () => {
        await axios.get("https://api.gowithdog.fr/api/places").then((actualData) => {
        setPlaces(actualData.data.data)
        })
        }

    return <Container maxWidth="xl" id='home'>
     <Typography variant="h1" sx={{textAlign: "left" , marginTop: "15px" , fontSize: "25px"}} gutterBottom>Bienvenue sur go with dog! Le site qui réferencie les adresses dogfriendly</Typography>
        <Typography variant="h2" sx={{textAlign: "center" , marginTop: "35px"}} gutterBottom>Dernières ballades ajoutées</Typography>
        {loading ? (
            <Typography variant="body" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
        ) : (
            <Box sx={{ maxWidth: '100%' , marginTop: "2%"}}>
                        {data.slice(0,4).map(({id, ballade_name ,ballade_description ,ballade_image, distance , denivele , tag , ballade_latitude , ballade_longitude , created_at , user  }) => {
                return (
                <Card sx={{ maxWidth: 300 , display: 'inline-block'  , marginRight: "25px"}} key={id + ballade_name} color="success">
                    <CardHeader
                        title={ ballade_name }
                    />
                    <CardMedia
                        component="img"
                        height="160"
                        image={`https://go-with-dog.vercel.app/storage/uploads/ballades/${ballade_image}`}
                        alt={ballade_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body2" component="div" color={tag.color}>
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
                        <Box sx={{display: 'flex', textAlign: 'center', marginRight: "auto", marginLeft: "auto"}}>
                        <DisplayBallade DisplayBalladeValue={{id, ballade_name, ballade_description, ballade_image, tag,  ballade_latitude , ballade_longitude,denivele , distance ,  data}} handleDataChange={handleDataChange} />
                         </Box>
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
            <Typography variant="h3" sx={{textAlign: "left" , marginBottom: "25px" , fontWeight: "bold" , fontSize: "20px"}} >
             Qui sommes nous?</Typography>
             <Typography variant="body" sx={{textAlign: "left" }} >
              Bienvenue sur notre site dédié aux amoureux des sorties en compagnie de leur fidèle compagnon à quatre pattes ! Ici,
              vous trouverez une liste complète des endroits autorisés aux chiens pour profiter de promenades en pleine
               nature ou en ville.
               </Typography> <br/>
               <Typography variant="body" sx={{textAlign: "left" , marginTop: "5px" }} >
               Mais ce n'est pas tout ! Nous vous offrons également la possibilité d'ajouter vos propres découvertes pour que d'autres amateurs de balades puissent également en profiter.
               Nous sommes conscients que chaque chien est différent et que chaque propriétaire a des préférences personnelles. C'est pourquoi notre site offre des options de recherche
               pour vous aider à trouver les lieux adaptés à votre chien et vous.
               Nous sommes convaincus que la promenade avec votre chien est une expérience enrichissante pour vous et votre compagnon.
               Nous espérons que notre site vous aidera à trouver les meilleurs endroits pour passer du temps ensemble en plein air ou en intérieur.
               </Typography><br/>
               <Typography variant="body" sx={{textAlign: "left" , marginTop: "5px" }} >
               N'oubliez pas de prendre soin de votre chien en apportant de l'eau fraîche et en ramassant les déchets pour maintenir ces espaces propres et agréables pour tous.
               </Typography>
                                   </Grid>
                  <Grid item xs={4} sx={{ marginTop: "15px"}}>
                   <img src={Presentation} alt="Presentation" width="300px"/>
                   </Grid>
          </Grid>
</Box>

  <Typography variant="h4" sx={{textAlign: "left" , marginTop: "35px"}} gutterBottom>Tout les lieux</Typography>
  {loading ? (
   <Typography variant="body" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
          ) : (
          <Box sx={{ maxWidth: '90%' , marginBottom: "150px" ,marginRight: 'auto' , marginLeft: 'auto'}}>
          <MapContainer center={[45.183567840163185, 5.718114920600324]} zoom={9} scrollWheelZoom={true} sx={{  textAlign: "center"}}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                  {places.map(({id, place_name, address , category}) => {
                                      return (
                                      <Box sx={{ marginLeft: '30px' , marginRight:"auto" , textAlign: "center"}}>
                                                      <Marker position={[address.latitude, address.longitude]} icon={myIcon} key={id + place_name}>
                                                          <Popup key={id + place_name}>
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