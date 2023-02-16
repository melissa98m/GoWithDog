import React, { useState } from "react";
import {
  Drawer,
  Button,
  Grid,
  Box , Typography
} from "@mui/material";
import Link from '@mui/material/Link';
import auth from "../../../services/auth/token";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LogginButton} from "../../../services/auth/logginButton";
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ApprovalIcon from '@mui/icons-material/Approval';
import PushPinIcon from '@mui/icons-material/PushPin';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function DrawerComponent() {

 const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
             PaperProps={{
                        sx: {
                          maxWidth: "40%",
                          width: "40%",
                        }
                      }}
       >
       <Grid item xs={12} className="action-button" sx={{ minwidth: '100%' , display: 'flex' ,
        justifyContent: "flex-end" , marginTop: '2%' , marginRight: "2%"}}>
         <Button variant="outlined" color="secondary" onClick={() => setOpenDrawer(false)}><CloseIcon /></Button>
       </Grid>
       <Box sx={{ display: 'flex' , flexDirection: 'column'  ,marginLeft: "2%"}}>
             <Button href="/" color="secondary" underline="none" sx={{ marginTop : "15px" , textTransform:'none'}}> <HomeOutlinedIcon fontSize="medium"/><Typography sx={{ marginLeft: "5px"}}>Accueil</Typography></Button>
              <Button href="/places" sx={{ marginTop : "15px" , textTransform:'none'}} color="secondary" underline="none"><PushPinIcon fontSize="medium"/><Typography sx={{ marginLeft: "5px"}} >Places</Typography></Button>
              <Button href="/ballades" sx={{ marginTop : "15px" , textTransform:'none'}}  color="secondary" underline="none"><ApprovalIcon  fontSize="medium"/><Typography sx={{ marginLeft: "5px"}}>Ballades</Typography></Button>
          {auth.loggedAndAdmin() ? (
              <Button href="/dashboard"  sx={{ marginTop : "15px" , textTransform:'none'}} color="secondary" underline="none"><DashboardIcon fontSize="medium" /><Typography sx={{ marginLeft: "5px"}}>Dashboard</Typography></Button>
          ) : null }
              <Button href="/contact"  sx={{ marginTop : "15px" , textTransform:'none'}} color="secondary" underline="none"><ContactsIcon fontSize="medium" /><Typography sx={{ marginLeft: "5px"}}>Contact</Typography></Button>
          {auth.loggedAndUser() || auth.loggedAndAdmin() ? (
              <Button href="/mon-compte" sx={{ marginTop : "15px" , textTransform:'none'}}  color="secondary"  underline="none"><AccountCircleOutlinedIcon fontSize="medium" /><Typography sx={{ marginLeft: "5px"}} >Mon compte </Typography></Button>
           ) : null }
           </Box>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
              <MenuIcon />
      </IconButton>
       </>
  );
}
export default DrawerComponent;
