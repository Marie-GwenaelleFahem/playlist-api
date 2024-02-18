import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
interface PlaylistItem {
    name: string;
    description: string;
    image: string;
}
const InfoDialog: React.FC<{
    open: boolean,
    onClose: () => void,
    playlist: PlaylistItem | null
}> = ({ open, onClose, playlist }) => {

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
                sx: {
                    width: 400,
                }}} >
            <DialogTitle sx={{ textDecoration: 'underline' }}>
                <Typography variant="h5">Nom :</Typography>
                </DialogTitle>
            <DialogContent>
                <Typography variant="h6">{playlist ? playlist.name : ''}</Typography>
            </DialogContent>
            <DialogTitle sx={{ textDecoration: 'underline' }}>
                <Typography variant="h5">Description :</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h6">
                    {playlist ? playlist.description : ''}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InfoDialog;
