import {
    Box,
    Button,
    FormControl,
    Modal,
    Snackbar,
    TextField,
    Typography,
    Alert,
    Grid,
    MenuItem,
    Select, InputLabel, Input
} from "@mui/material";
import {Loupe} from "@mui/icons-material";
import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LinearScaleIcon from '@mui/icons-material/LinearScale';



function DisplayBallade(ballade) {

    const { id } = useParams();
    const [oneBallade, setOneBallade] = useState([]);
    const [ballade_name, setName] = useState(ballade.DisplayBalladeValue.ballade_name);
    const [ballade_description, setDescription] = useState(ballade.DisplayBalladeValue.ballade_description);
    const [ballade_image, setImage] = useState(ballade.DisplayBalladeValue.ballade_image);
    const [ distance, setDistance] = useState(ballade.DisplayBalladeValue.distance);
    const [ denivele , setDénivele] = useState(ballade.DisplayBalladeValue.denivele);
    const [tag, setType] = useState(ballade.DisplayBalladeValue.tag);
    const [ballade_latitude, setLatitude] = useState(ballade.DisplayBalladeValue.ballade_latitude);
    const [ballade_longitude, setLongitude] = useState(ballade.DisplayBalladeValue.ballade_longitude);
    const [DisplayBallade, setShowDisplay] = useState(false);


    return(<Box>
        <Box>
            <Button  variant='contained' sx={{mx: 2}}
                    onClick={() => {
                        setShowDisplay(true)
                        setOneBallade({
                            id: ballade.DisplayBalladeValue.id,
                            ballade_name: ballade.DisplayBalladeValue.ballade_name,
                            ballade_description: ballade.DisplayBalladeValue.ballade_description,
                            ballade_image: ballade.DisplayBalladeValue.ballade_image,
                            tag: ballade.DisplayBalladeValue.tag,
                            ballade_latitude: ballade.DisplayBalladeValue.ballade_latitude,
                            ballade_longitude: ballade.DisplayBalladeValue.ballade_longitude,
                            distance: ballade.DisplayBalladeValue.distance,
                            denivele: ballade.DisplayBalladeValue.denivele

                        })
                    }}>
                <Loupe/> Voir details
            </Button>
            <Modal
                id="modal-crud-container"
                hideBackdrop
                open={DisplayBallade}
                onClose={() => setShowDisplay(false)}
                aria-labelledby="edit-ballade-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-crud-ballade" sx={{bgcolor: 'background.default'}}>
                <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                                        <Button variant="outlined"  color="secondary" onClick={() => setShowDisplay(false)}><CloseIcon /></Button>
                                    </Grid>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-ballade-title">{ballade_name}</Typography>
                     <Box sx={{ marginTop: 3 }}>
                       <Typography gutterBottom variant="body1" component="div" color={tag.color} sx={{textAlign: 'center', mb: 4}}>{tag.tag_name}</Typography>
                     </Box>
                    <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/ballades/${ballade_image}`} alt={ballade_image} sx={{ width: "400px"  , margin: "auto" , textAlign: "center"}}/>
                    <Box sx={{ marginTop: 3 }}>
                        {ballade_description}
                    </Box>
                    <Box>
                      <Typography variant="body" sx={{ marginTop: "25px" , textAlign: "left" , marginLeft: "5px"}} >Détails: </Typography>
                      <Typography variant="body2" sx={{ marginTop: "5px"}} color="text.secondary"><TrendingUpIcon />{denivele}m </Typography>
                      <Typography variant="body2" color="text.secondary"><LinearScaleIcon sx={{ paddingTop: "10px"}}/>{distance}km </Typography>
                    </Box>
                </Box>
            </Modal>
        </Box>
        </Box>
    )
}
export default DisplayBallade;