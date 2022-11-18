import {AppBar, Box, Link } from "@mui/material";
import {useEffect} from "react";
import '../../../assets/css/component/_partials/_footer.scss';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Logo from "../../../assets/logo.png";



export function Footer() {

    useEffect(() => {
    }, [])

    return (
         <AppBar id="footer"  position="static" color="primary" className='footer-container' sx={{ top: 'auto', bottom: 1, minHeight: "50px"  }}>
             <Grid container spacing={1}>
               <Grid item xs>
                  <List aria-label="link-footer" sx={{ textAlign: "center" , paddingBottom: "0px"  }}>
                    <ListItemText>
                       <Link href="/home" color="#000000" underline="none" className="footer-link">Accueil</Link>
                    </ListItemText>
                    <ListItemText>
                       <Link href="/home" color="#000000" underline="none" className="footer-link">Toutes les ballades</Link>
                  </ListItemText>
                  <ListItemText>
                       <Link href="/home" color="#000000" underline="none" className="footer-link">Tout les lieux</Link>
                  </ListItemText>
                  </List>
               </Grid>
               <Grid item xs>
               <List aria-label="link-footer" sx={{ textAlign: "center" , paddingBottom: "0px" , fontSize: "12px" }}>
               <ListItemText>
               <Link href="/contact" color="#000000" underline="none" className="footer-link">Contact</Link>
                </ListItemText>
                <ListItemText>
                <Link href="/home" color="#000000" underline="none" className="footer-link">Mentions légales</Link>
                 </ListItemText>
                   <ListItemText>
                   <Link href="/home" color="#000000" underline="none" className="footer-link">Politique de confidentialité</Link>
                   </ListItemText>
                    </List>
               </Grid>
               <Grid item xs  sx={{ display: "flex", justifyContent: "flex-end", marginRight: "5%" }}>
                     <Box
                     component="img"
                      sx={{
                       height: "100px",
                       width:"100px",
                       marginTop: "10px"
                        }}
                         alt="Your logo."
                         src={Logo}
                           />
               </Grid>
                <Grid  item xs={12} className="footer-secondary footer-link">©Go with dog - 2022</Grid>
             </Grid>

         </AppBar>



    )
}