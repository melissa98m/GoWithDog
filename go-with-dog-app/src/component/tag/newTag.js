import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input , Grid} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

function NewTag(props) {

    const [id, setID] = useState("");
    const [ tag_name, setName] = useState("");
    const [color , setColor] = useState("")
    const [newTag, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
            tag_name: '',
            color:'#FFFF'
    }});

    let newTagForm = async () => {
        try {
            let res = await axios.post('http://api.gowithdog.fr/api/tags/', {tag_name , color} , {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, tag_name: tab.tag_name , color: tab.color}]})
                props.handleDataChange(data);
                setName("");
                setColor("");
                setToastMessage({message: "Tag ajouté ! Vous pouvez en ajouter un autre", severity: "success"});
                setShowToast(true);
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<Box>
        <Button variant="contained" onClick={() => setShowNew(true)}>Ajouter</Button>
        <Modal
            id="modal-crud-container"
            hideBackdrop
            open={newTag}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-tag-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-tag" sx={{bgcolor: 'background.default'}}>
             <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
               <Button variant="outlined"  color="secondary" onClick={() => setShowNew(false)}><CloseIcon /></Button>
              </Grid>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-tag-title">Nouveau tag de lieux</Typography>
                <form onSubmit={handleSubmit(newTagForm)} className="tagForm">
                    <FormControl>
                        <Controller
                          name="tag_name"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'tag_name',
                                   {
                                       required: 'Ce champ est requis',
                                       minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                   }
                               )}
                               onChange={(e) => setName(e.target.value)}
                               sx={{mt: 5, height: 50}}
                               label="Nom"
                               variant="standard"
                               value={tag_name}
                            />
                          )}
                        />
                        {errors.tag_name ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.tag_name?.message}</Alert>
                        ) : ''}
                         <Typography variant="body1">Couleur :</Typography>
                        <input type="color" id="color" name="color" required className="color-picker"
                             value={color} onChange={(e) => setColor(e.target.value)} label="Couleur"/>
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                        </Box>
                    </FormControl>
                </form>

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

export default NewTag;