import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid, Typography} from "@mui/material";


export default function FormAjouterPlaylist() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result as string; // Récupère les données de l'image sous forme de chaîne Base64
                localStorage.setItem('uploadedImage', imageData); // Stocke l'image dans localStorage
            };
            reader.readAsDataURL(file); // Lit le contenu du fichier en tant que chaîne Base64
        }
    };

    return (

        <React.Fragment>
            <Grid container direction="column"  justifyContent="space-between"  alignItems="center" marginBottom={10} marginTop={10}>
                <Typography variant="h4" >
                   Vos Création de playlists
                </Typography>
                <Button variant="outlined" onClick={handleClickOpen} style={{borderRadius : 50, color: "black", borderColor: "black", width:290, height: 75, marginTop: 35}} >
                    <Typography variant="h6" >
                        Créer une Playlist
                    </Typography>
                </Button>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Ajouter une Playlist</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{marginTop: '10px'}}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="nom"
                        label="Nom de la Playlist"
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="descrip"
                        label="Description"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    );
}