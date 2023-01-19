import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert , Grid} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';



function EditAddress(props) {
    const [id, setID] = useState("");
    const [address, setName] = useState(props.updateValue.address);
    const [city , setCity] = useState(props.updateValue.city);
    const [postal_code , setPostalCode] = useState(props.updateValue.postal_code);
    const [latitude, setLatitude] = useState(props.updateValue.latitude);
    const [longitude, setLongitude] = useState(props.updateValue.longitude);
    const [oneAddress, setOneAddress] = useState("");
    const [editAddress, setShowEdit] = useState(false);
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
            address: props.updateValue.address,
            city: props.updateValue.city,
            postal_code: props.updateValue.postal_code,
            longitude : props.updateValue.longitude,
            latitude: props.updateValue.latitude,
    } });

    let editAddressForm = async () => {
        try {
            let updatedAddress = {
                id: id ? id : parseInt(oneAddress.id),
                address:address ? address : oneAddress.address,
                city: city ? city : oneAddress.city,
                postal_code: postal_code ? postal_code : oneAddress.postal_code,
                latitude: latitude ? latitude : oneAddress.latitude,
                longitude: longitude ? longitude : oneAddress.longitude
            }
            let res = await axios.patch("http://127.0.0.1:8000/api/adresses/" + oneAddress.id, {address, city , postal_code , latitude , longitude} , {
                "headers" : { "Authorization":"Bearer"+localStorage.getItem('access_token') }
            })
            if (res.status === 200) {
                const foundIndex = props.updateValue.data.findIndex(x => x.id === oneAddress.id);
                let data = update(props.updateValue.data, {[foundIndex]: {$set: updatedAddress}})
                props.handleDataChange(data, 'edit');
                setShowEdit(false)
            } else {
                setToastMessage({message: "Une erreur est survenue", severity: "error"});
                setShowToast(true)
            }

        } catch (err) {
            console.log(err);
        }
    }


    return(<Box >
          <Button color='info' variant='contained' sx={{mx: 2}}
            onClick={() => {
                setShowEdit(true)
                setOneAddress({id: props.updateValue.id,
                address: props.updateValue.address ,
                city: props.updateValue.city ,
                postal_code: props.updateValue.postal_code ,
                latitude: props.updateValue.latitude ,
                longitude : props.updateValue.longitude
                })
            }}>
              <Edit/>
          </Button>
         <Modal
            id="modal-crud-container"
            hideBackdrop
            open={editAddress}
            onClose={() => setShowEdit(false)}
            aria-labelledby="edit-tag-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modal-crud modal-crud-tag" sx={{bgcolor: 'background.default'}}>
                <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' }}>
                <Button variant="outlined"  color="secondary" onClick={() => setShowEdit(false)}><CloseIcon /></Button>
             </Grid>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="edit-tag-title">Editer un tag de lieux</Typography>
                <form onSubmit={handleSubmit(editAddressForm)}>
                    <FormControl>
                          <Controller
                              name="address"
                              control={control}
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
                                   defaultValue={address}
                                />
                              )}
                            />
                            {errors.address ? (
                                <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.address?.message}</Alert>
                            ) : ''}
                           <Controller
                              name="postal_code"
                              control={control}
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
                                   defaultValue={postal_code}
                                />
                              )}
                            />
                            <Controller
                              name="city"
                              control={control}
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
                                   defaultValue={city}
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
                                    defaultValue={latitude}
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
                                    defaultValue={longitude}
                                     variant="standard"
                                      />
                                      )}
                                       />
                                       {errors.longitude ? (
                                        <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.longitude?.message}</Alert>
                                         ) : ''}

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
export default EditAddress;