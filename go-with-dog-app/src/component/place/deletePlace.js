import {Box, Button, FormControl, Modal, Snackbar, Typography, Alert , Grid} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {DeleteForeverRounded} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function DeletePlace(props) {

    const [onePlace, setOnePlace] = useState("");
    const [delPlace, setShowDelete] = useState(false)
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    let deletePlace = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.delete('http://127.0.0.1:8000/api/places/' + onePlace.id , {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.deleteValue.data.findIndex(x => x.id === onePlace.id);
                let data = update(props.deleteValue.data, {$splice: [[foundIndex, 1]]})
                props.handleDataChange(data, 'delete');
                setShowDelete(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(<Box>
            <Button
                variant='contained'
                sx={{mx: 2}}
                onClick={ () => {
                    setShowDelete(true)
                    setOnePlace({id: props.deleteValue.id, place_name: props.deleteValue.place_name} )
                } }
            >
                <DeleteForeverRounded/>
            </Button>
            <Modal
                id="modal-crud-container"
                hideBackdrop
                open={delPlace}
                onClose={() => setShowDelete(false)}
                aria-labelledby="delete-place-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-crud-place" sx={{bgcolor: 'background.default'}}>
                    <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                    <Button variant="outlined"  color="secondary" onClick={() => setShowDelete(false)}><CloseIcon /></Button>
                    </Grid>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="delete-place-title">Supprimer un lieux</Typography>
                    <FormControl>
                        <Box>
                            êtes vous sur de vouloir supprimer le lieu : {onePlace.place_name} ?
                        </Box>
                        <Box className="action-button">
                            <Button sx={{m: 3}} type="submit" variant="contained" onClick={deletePlace}>Supprimer</Button>
                        </Box>
                    </FormControl>
                </Box>
            </Modal>

            <Snackbar
                open={toast}
                autoHideDuration={3000}
                onClose={() => setShowToast(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert onClose={() => setShowToast(false)} severity={toastMessage.severity} sx={{width: '100%'}}>
                    {toastMessage.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DeletePlace