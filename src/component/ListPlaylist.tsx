import React, { useState } from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    IconButton
} from "@mui/material";
import SupprimerButton from "./Supprimer.tsx";
import ModifierButton from "./Modifier.tsx";
import SaveIcon from "@mui/icons-material/Save";
import ButtonGroup from '@mui/material/ButtonGroup';
import InfoIcon from '@mui/icons-material/Info';
import InfoDialog from "./Infos.tsx";

interface PlaylistItem {
    name: string;
    description: string;
    image: string;
}

const Playlist: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [playlistData, setPlaylistData] = useState<PlaylistItem[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState<PlaylistItem | null>(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const imageData = e.target.result as string;
                    localStorage.setItem('uploadedImage', imageData);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson: any = Object.fromEntries(formData.entries());
        const newPlaylist: PlaylistItem = {
            name: formJson.nom,
            description: formJson.descrip,
            image: localStorage.getItem('uploadedImage') || ''
        };
        setPlaylistData([...playlistData, newPlaylist]);
        handleClose();
    };

    const handleDelete = (index: number) => {
        const updatedPlaylistData = [...playlistData];
        updatedPlaylistData.splice(index, 1);
        setPlaylistData(updatedPlaylistData);
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditedName(playlistData[index].name);
        setEditedDescription(playlistData[index].description);
    };

    const handleSaveEdit = () => {
        const updatedPlaylistData = [...playlistData];
        updatedPlaylistData[editIndex!] = {
            ...updatedPlaylistData[editIndex!],
            name: editedName,
            description: editedDescription
        };
        setPlaylistData(updatedPlaylistData);
        setEditIndex(null);
    };

    const handleInfoClick = (playlist: PlaylistItem) => {
        setSelectedPlaylist(playlist);
        setInfoDialogOpen(true);
    };

    const handleInfoDialogClose = () => {
        setSelectedPlaylist(null);
        setInfoDialogOpen(false);
    };

    return (
        <>
            <Grid container direction="column" justifyContent="space-between" alignItems="center" marginBottom={10} marginTop={10}>
                <Typography variant="h4" >
                    Vos Créations de playlists
                </Typography>
                <Button variant="outlined" onClick={handleClickOpen} style={{ borderRadius: 50, color: "black", borderColor: "black", width: 290, height: 75, marginTop: 35 }} >
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
                    onSubmit: handleSubmit,
                }}
            >
                <DialogTitle>Ajouter une Playlist</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFile}
                        style={{ marginTop: '10px' }}
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
            <ListPlaylist
                playlistData={playlistData}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSaveEdit={handleSaveEdit}
                onInfoClick={handleInfoClick}
                editIndex={editIndex}
                setEditedName={setEditedName}
                setEditedDescription={setEditedDescription}
                editedName={editedName}
                editedDescription={editedDescription}
            />
            <InfoDialog
                open={infoDialogOpen}
                onClose={handleInfoDialogClose}
                playlist={selectedPlaylist}
            />
        </>
    );
}

const ListPlaylist: React.FC<{
    playlistData: PlaylistItem[],
    onDelete: (index: number) => void,
    onEdit: (index: number) => void,
    onSaveEdit: () => void,
    onInfoClick: (playlist: PlaylistItem) => void,
    editIndex: number | null,
    setEditedName: React.Dispatch<React.SetStateAction<string>>,
    setEditedDescription: React.Dispatch<React.SetStateAction<string>>,
    editedName: string,
    editedDescription: string
}> = ({
          playlistData,
          onDelete,
          onEdit,
          onSaveEdit,
          onInfoClick,
          editIndex,
          setEditedName,
          setEditedDescription,
          editedName,
          editedDescription
      }) => {
    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={10}>
            {playlistData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                    <Card sx={{ minWidth:400, maxWidth:400 }} >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="250"
                                image={item.image}
                            />
                            <CardContent sx={{justifyContent:"center", alignItems:"center", direction:"column", maxheight: 150, minHeight:60 }}>
                                {editIndex === index ? (
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id={`edit-name-${index}`}
                                        label="Nom de la Playlist"
                                        type="name"
                                        fullWidth
                                        variant="standard"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                ) : (
                                    <Typography variant="h5" color="text.secondary" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                        {item.name}
                                    </Typography>
                                )}
                                {editIndex === index ? (
                                    <TextField
                                        required
                                        margin="dense"
                                        id={`edit-description-${index}`}
                                        label="Description"
                                        type="string"
                                        fullWidth
                                        variant="standard"
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                    />
                                ) : (
                                    <Typography variant="h5" color="text.secondary" sx={{ flexGrow: 1, textAlign: 'center' }}>
                                        {item.description}
                                    </Typography>
                                )}
                                <Grid container justifyContent="center" alignItems="center" >
                                    <ButtonGroup
                                        color="secondary"
                                        disabled={false}
                                        variant="text"
                                    >
                                        <IconButton aria-label="info" onClick={() => onInfoClick(item)}>
                                            <InfoIcon/>
                                        </IconButton>

                                        {editIndex === index ? (
                                            <IconButton aria-label="save edit" onClick={onSaveEdit}>
                                                <SaveIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton aria-label="edit" onClick={() => onEdit(index)}>
                                                <ModifierButton onEdit={() => {}} />
                                            </IconButton>
                                        )}

                                        <IconButton aria-label="delete" onClick={() => onDelete(index)}>
                                            <SupprimerButton onDelete={() => {}} />
                                        </IconButton>

                                    </ButtonGroup>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Playlist;
