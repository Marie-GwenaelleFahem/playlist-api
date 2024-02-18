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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Nom :
                {playlist ? playlist.name : ''}</DialogTitle>
            <DialogContent>
                <Typography>
                    Description :
                    {playlist ? playlist.description : ''}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InfoDialog;
