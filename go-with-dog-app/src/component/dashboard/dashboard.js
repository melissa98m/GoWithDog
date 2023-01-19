import React, {useEffect, useState} from "react";
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button, Container , Box ,Link , Typography
} from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import PushPinIcon from '@mui/icons-material/PushPin';
import TagIcon from '@mui/icons-material/Tag';
import CategoryIcon from '@mui/icons-material/Category';
import BusinessIcon from '@mui/icons-material/Business';
import ApprovalIcon from '@mui/icons-material/Approval';

function Dashboard() {

    document.title = "Dashboard";
      const [open, setOpen] = useState(false);

    return <Container maxWidth="lg" id='dashboard'>
     <Drawer
       PaperProps={{
           sx: {
             maxHeight: "50%",
             height: "50%",
             marginTop: "100px" ,
             marginLeft: "2%"
           }
         }}
       variant="permanent"
       open={open}
       anchor={"left"}
       onClose={() => setOpen(false)}
     >
    <Box sx={{ width: 250 }} onClick={() => setOpen(false)}>
    <Typography variant="body">Dashboard</Typography>
    <Link href='/address' underline="none">
      <ListItem button >
        <BusinessIcon />
         <ListItemText primary="Gérer les adresses" />
         </ListItem>
 </Link>
 <Link href='/ballade' underline="none" >
       <ListItem button >
         <ApprovalIcon />
          <ListItemText primary="Gérer les ballades"  />
          </ListItem>
  </Link>
 <Link href='/category' underline="none">
       <ListItem button >
         <CategoryIcon />
          <ListItemText primary="Gérer les categories" />
          </ListItem>
  </Link>
  <Link href='/place' underline="none">
        <ListItem button >
          <PushPinIcon />
           <ListItemText primary="Gérer les lieux" />
           </ListItem>
   </Link>
   <Link href='/tag' underline="none">
         <ListItem button >
           <TagIcon />
            <ListItemText primary="Gérer les tags" />
            </ListItem>
    </Link>
    <Link href='/user' underline="none">
          <ListItem button >
            <PersonIcon  />
             <ListItemText primary="Gérer les utilisateurs" />
             </ListItem>
     </Link>
              </Box>
     </Drawer>
     <Box sx={{ height: "400px" , marginLeft: "10%"}}>
     <Typography variant="h5">Bienvenue sur votre dashboard</Typography>
     <Typography variant="body">Bonjour cher(e) Administrateur ,</Typography>
     <Typography variant="body">Ici vous avez accés aux liens pour gérer les éléments du site </Typography> <br/>
     <Typography variant="body">Il suffit de cliquer sur les liens dans le menu de gauche et vous serez emmené au pages correspondantes </Typography>
     </Box>

</Container>

}
export default Dashboard;