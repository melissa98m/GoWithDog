import {Box, Button, FormControl, Modal, Snackbar, TextField, Typography, Alert, Input} from "@mui/material";
import {useState} from "react";
import update from "immutability-helper";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

const Contact = () => {

    const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [contenu, setContenu] = useState("");
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});
    const { register, control, handleSubmit, formState: { errors } } = useForm({defaultValues: {contact_email: '' ,
    contact_content: '' , contact_subject: ''
    }});

    //Méthode d'ajout de joueurs
     const newContact = async () => {
       //e.preventDefault();
       const formData = new FormData();
       formData.append("email", email);
       formData.append("subject", subject);
       formData.append("contenu", contenu);
       await axios
         .post(`http://127.0.0.1:8000/api/contact`, formData)
         .catch(({ response }) => {
           if (response.status != 200) {

           }
         });
     };

    return (
            <Box className="" sx={{bgcolor: 'background.default'}}>
                <Typography variant="h4" sx={{textAlign: 'center', mb: 4}} id="new-category-title">Contactez-nous</Typography>
                <form onSubmit={handleSubmit(newContact)} className="contact">
                    <FormControl>
                        <Controller
                          name="email"
                          control={control}
                          defaultValue=""
                          render={() => (
                              <TextField
                               {...register(
                                   'email',
                                   {
                                       required: 'Ce champ est requis'
                                   }
                               )}
                               onChange={(e) => setEmail(e.target.value)}
                               style={{width: 400, height: 50}}
                               label="Votre email"
                               variant="standard"
                               value={email}
                            />
                          )}
                        />
                        {errors.email ? (
                            <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.email?.message}</Alert>
                        ) : ''}
                         <Controller
                                                  name="subject"
                                                  control={control}
                                                  defaultValue=""
                                                  render={() => (
                                                      <TextField
                                                       {...register(
                                                           'subject',
                                                           {
                                                               required: 'Ce champ est requis'
                                                           }
                                                       )}
                                                       onChange={(e) => setSubject(e.target.value)}
                                                       style={{width: 400, height: 50}}
                                                       label="Sujet"
                                                       variant="standard"
                                                       value={subject}
                                                    />
                                                  )}
                                                />
                                                {errors.subject ? (
                                                    <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.subject?.message}</Alert>
                                                ) : ''}
                              <Controller
                                                       name="contenu"
                                                       control={control}
                                                       defaultValue=""
                                                       render={() => (
                                                           <TextField
                                                            {...register(
                                                                'contenu',
                                                                {
                                                                    required: 'Ce champ est requis'
                                                                }
                                                            )}
                                                            onChange={(e) => setContenu(e.target.value)}
                                                            style={{width: 400, height: 50}}
                                                            label="Message"
                                                            variant="standard"
                                                            value={contenu}
                                                         />
                                                       )}
                                                     />
                                                     {errors.contenu ? (
                                                         <Alert sx={{mt:2, p:0, pl:2}} severity="error">{errors.contenu?.message}</Alert>
                                                     ) : ''}
                        <Box className="action-button">
                            <Button type="submit" sx={{m: 3}} variant="contained">Envoyer</Button>
                        </Box>
                    </FormControl>
                </form>
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
};

export default Contact;