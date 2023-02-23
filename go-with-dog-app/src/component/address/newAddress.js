import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input , Grid} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

function NewAddress(props) {

    const [id, setID] = useState("");
    const [address, setName] = useState("");
    const [city , setCity] = useState("");
    const [postal_code , setPostalCode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [newAddress, setShowNew] = useState(false);
    // Handle Toast event
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {
            address: '',
            city: '',
            postal_code : '',
            latitude : '',
            longitude : '',
    }});

    let newAddressForm = async () => {
        try {
            let res = await axios.post('http://127.0.0.1:8000/api/addresses/', {address , city , postal_code , latitude , longitude} , {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                let tab = {};
                await Object.assign(tab, res.data.data);
                let data = update(props.newValue.data, {$push: [{id : tab.id, address: tab.address , city: tab.city,
                postal_code: tab.postal_code , latitude: tab.latitude , longitude: tab.longitude
                }]})
                props.handleDataChange(data);
                setName("");
                setCity("");
                setPostalCode("");
                setLatitude("");
                setLongitude("");
                setToastMessage({message: "Address ajouté ! Vous pouvez en ajouter une autre", severity: "success"});
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
            open={newAddress}
            onClose={() => setShowNew(false)}
            aria-labelledby="new-address-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-address" sx={{bgcolor: 'background.default'}}>
            <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
              <Button variant="outlined"  color="secondary" onClick={() => setShowNew(false)}><CloseIcon /></Button>
              </Grid>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-address-title">Nouveau address de lieux</Typography>
                <form onSubmit={handleSubmit(newAddressForm)} className="addressForm">
                    <FormControl>
                        <Controller
                          name="address"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'address',
                                   {
                                       required: 'Ce champ est requis',
                                       minLength: {value: 5, message: 'Longueur minimale de 5 caractères'}
                                   }
                               )}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Adresse"
                               variant="standard"
                               value={address}
                            />
                          )}
                        />
                        {errors.address ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.address?.message}</Alert>
                        ) : ''}

                    <Controller
                              name="postal_code"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <TextField
                                   {...register(
                                       'postal_code',
                                       {
                                           required: 'Ce champ est requis',
                                           maxLength: {value: 5, message: 'Longueur maximale de 5 caractères'},
                                           minLength: {value: 5, message: 'Longueur minimal de 5 caractères'}
                                       }
                                   )}
                                   onChange={(e) => setPostalCode(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Code Postal"
                                   variant="outlined"
                                   value={postal_code}
                                />
                              )}
                            />
                            <Controller
                              name="city"
                              control={control}
                              defaultValue=""
                              render={() => (
                                  <TextField
                                   {...register(
                                       'city',
                                       {
                                           required: 'Ce champ est requis'
                                       }
                                   )}
                                   onChange={(e) => setCity(e.target.value)}
                                   style={{width: 400, height: 50}}
                                   label="Ville"
                                   variant="outlined"
                                   value={city}
                                />
                              )}
                            />
                            <Controller
                                name="latitude"
                                control={control}
                                 render={() => (
                                  <TextField
                                  {...register(
                                  'latitude',
                                   {
                                   required: 'Ce champ est requis'
                                    }
                                    )}

                                    onChange={(e) => setLatitude(e.target.value)}
                                    sx={{mt: 5, height: 50}}
                                    label="Latitude"
                                     variant="standard"
                                      />
                                      )}
                                       />
                                       {errors.latitude ? (
                                        <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.latitude?.message}</Alert>
                                         ) : ''}
                            <Controller
                                name="longitude"
                                control={control}
                                 render={() => (
                                  <TextField
                                  {...register(
                                  'longitude',
                                   {
                                   required: 'Ce champ est requis'
                                    }
                                    )}

                                    onChange={(e) => setLongitude(e.target.value)}
                                    sx={{mt: 5, height: 50}}
                                    label="Longitude"
                                     variant="standard"
                                      />
                                      )}
                                       />
                                       {errors.longitude ? (
                                        <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.longitude?.message}</Alert>
                                         ) : ''}
                    <Button variant="outlined" color="primary"  href="https://www.coordonnees-gps.fr/" target="_blank" variant="outlined" color="secondary">Vous ne connaissez pas la latitude et longitude de votre adresse</Button>

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

export default NewAddress;