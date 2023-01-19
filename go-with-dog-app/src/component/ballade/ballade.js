import React, {useEffect, useState} from "react";
import {
    Box,
    Container,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Alert, Avatar
} from "@mui/material";
import DeleteBallade from "./deleteBallade";
import NewBallade from "./newBallade";
import EditBallade from "./editBallade";
import axios from "axios";


function Ballade() {

    document.title = 'Page des ballades';

    const [data, setData] = useState(null); // array of data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // WIP
    const [toast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({});

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (ballade, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (ballade) => {
        setRowsPerPage(+ballade.target.value);
        setPage(0);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ballades').then((actualData) => {
            actualData = actualData.data;
            setLoading(true)
            setData(actualData.data);
            setError(null);
        }).catch((err) => {
            setError(err.message);
            setData(null);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleDataChange = async (dataChange, message) => {
        await setData(dataChange)
        if (message && message === 'edit'){
            setToastMessage({message: "Ballade modifié !", severity: "success"});
            setShowToast(true);
        } else if(message && message === 'delete') {
            setToastMessage({message: "Ballade supprimé !", severity: "success"});
            setShowToast(true);
        }
    }

    return <Container maxWidth="xl" id="ballade">
        <Paper sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', py: 10}}>
            <Typography variant="h3" sx={{textAlign: "center"}} gutterBottom>Ballades</Typography>
            {loading ? (
                <Typography variant="h5" sx={{textAlign: "center"}} gutterBottom>Chargement des ballades...</Typography>
            ) : (
                <Box sx={{ maxWidth: '90%' }}>
                    <NewBallade newValue={{data}} handleDataChange={handleDataChange} />
                    <TableContainer sx={{ mt:4 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell key={1}>ID</TableCell>
                                    <TableCell key={2}>Nom</TableCell>
                                    <TableCell key={3}>Description</TableCell>
                                    <TableCell key={4}>Image</TableCell>
                                    <TableCell key={5}>Distance</TableCell>
                                    <TableCell key={6}>Denivelé</TableCell>
                                    <TableCell key={7}>Coordonnées</TableCell>
                                    <TableCell key={8}>Tag</TableCell>
                                    <TableCell key={9}>Createur</TableCell>
                                    <TableCell key={10} align={'right'}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({id, ballade_name, ballade_description, ballade_image, tag, ballade_latitude , ballade_longitude , distance , denivele , user}) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={ballade_name+id}>
                                            <TableCell>{id}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{ballade_name ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{ballade_description.slice(0,30) ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>
                                                { ballade_image ? (
                                                    <Box component="img" src={`http://127.0.0.1:8000/storage/uploads/ballades/${ballade_image}`} alt={ballade_image} sx={{ width: "80px" }}/>
                                                ) : (
                                                    '--'
                                                ) }
                                            </TableCell>
                                             <TableCell sx={{fontWeight: 'bold'}}>{ distance ?? '--'}</TableCell>
                                              <TableCell sx={{fontWeight: 'bold'}}>{ denivele ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}}>{ballade_latitude ?? '--'} , {ballade_longitude ?? '--'}</TableCell>
                                            <TableCell sx={{fontWeight: 'bold'}} ><Typography  color={tag.color}>{tag.tag_name ?? '--'}</Typography></TableCell>
                                             <TableCell>{user.username ?? '--'}</TableCell>
                                            <TableCell>
                                                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                                                    <EditBallade updateValue={{id, ballade_name, ballade_description, ballade_image,tag, distance, denivele, ballade_latitude, ballade_longitude, data}} handleDataChange={handleDataChange} />
                                                    <DeleteBallade deleteValue={{id, ballade_name, ballade_description, ballade_image, tag, data}} handleDataChange={handleDataChange}/>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            )}
        </Paper>

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
    </Container>
}

export default Ballade;