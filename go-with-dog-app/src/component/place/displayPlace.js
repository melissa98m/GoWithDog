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



function DisplayPlace(place) {

    const { id } = useParams();
    const [onePlace, setOnePlace] = useState([]);
    const [place_name, setName] = useState(place.DisplayPlaceValue.place_name);
    const [place_description, setDescription] = useState(place.DisplayPlaceValue.place_description);
    const [place_image, setImage] = useState(place.DisplayPlaceValue.place_image);
    const [category, setType] = useState(place.DisplayPlaceValue.category);
    const [address, setAddress] = useState(place.DisplayPlaceValue.address);
    const [DisplayPlace, setShowDisplay] = useState(false);


    return(<Box>
        <Box>
            <Button  variant='contained' sx={{mx: 2}}
                    onClick={() => {
                        setShowDisplay(true)
                        setOnePlace({
                            id: place.DisplayPlaceValue.id,
                            place_name: place.DisplayPlaceValue.place_name,
                            place_description: place.DisplayPlaceValue.place_description,
                            place_image: place.DisplayPlaceValue.place_image,
                            category: place.DisplayPlaceValue.category,
                            address: place.DisplayPlaceValue.address

                        })
                    }}>
                <Loupe/> Voir details
            </Button>
            <Modal
                id="modal-crud-container"
                hideBackdrop
                open={DisplayPlace}
                onClose={() => setShowDisplay(false)}
                aria-labelledby="edit-place-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-crud-place" sx={{bgcolor: 'background.default'}}>
                <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                                        <Button variant="outlined"  color="secondary" onClick={() => setShowDisplay(false)}><CloseIcon /></Button>
                                    </Grid>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-place-title">{place_name}</Typography>
                    <Box component="img" src={`https://api.gowithdog.fr/storage/uploads/places/${place_image}`} alt={place_image} sx={{ width: "400px"  , margin: "auto" , textAlign: "center"}}/>
                    <Box sx={{ marginTop: 3 }}>
                        {place_description}
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                       Type de lieu: {category.category_name}
                    </Box>
                    <Box sx={{ marginTop: 3 }}>
                        Adresse du lieu: {address.address}
                        <Typography variant="body"> ~{address.postal_code} {address.city}</Typography>
                    </Box>
                </Box>

            </Modal>
        </Box>
        </Box>
    )
}
export default DisplayPlace;