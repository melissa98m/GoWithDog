import {Box, Button, FormControl, Modal, Snackbar, Typography, Alert , Grid} from "@mui/material";
import {useEffect, useState} from "react";
import update from "immutability-helper";
import {DeleteForeverRounded} from "@mui/icons-material";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

function DeleteBallade(props) {

    const [oneBallade, setOneBallade] = useState("");
    const [delBallade, setShowDelete] = useState(false)
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    let deleteBallade = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.delete('https://api.gowithdog.fr/api/ballades/' + oneBallade.id , {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.deleteValue.data.findIndex(x => x.id === oneBallade.id);
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
                    setOneBallade({id: props.deleteValue.id, ballade_name: props.deleteValue.ballade_name} )
                } }
            >
                <DeleteForeverRounded/>
            </Button>
            <Modal
                id="modal-crud-container"
                hideBackdrop
                open={delBallade}
                onClose={() => setShowDelete(false)}
                aria-labelledby="delete-ballade-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modal-crud modal-crud-ballade" sx={{bgcolor: 'background.default'}}>
                 <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                 <Button variant="outlined"  color="secondary" onClick={() => setShowDelete(false)}><CloseIcon /></Button>
                  </Grid>
                    <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="delete-ballade-title">Supprimer la balade</Typography>
                    <FormControl>
                        <Box>
                            êtes vous sur de vouloir supprimer le lieu : {oneBallade.ballade_name} ?
                        </Box>
                        <Box className="action-button">
                            <Button sx={{m: 3}} type="submit" variant="contained" onClick={deleteBallade}>Supprimer</Button>
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

export default DeleteBallade