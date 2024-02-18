import React, { MouseEvent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import { TextField } from "@mui/material";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedMenus() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editedContent, setEditedContent] = React.useState('');
    const [itemToDelete, setItemToDelete] = React.useState<number>(-1); // Assurez-vous que itemToDelete est de type number, pas number | null

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleEditDialogOpen = () => {
        setEditDialogOpen(true);
        handleClose();
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleSaveChanges = () => {
        console.log("Contenu modifié :", editedContent);
        handleEditDialogClose();
    };

    const handleDelete = (id: number) => {
        // Suppose `itemData` est défini en dehors de la fonction
        const updatedData = itemData.filter(item => item.id !== id);
        console.log("Element supprimé :", id);
        // Mettre à jour l'état ou envoyer les données au serveur
        // setItemData(updatedData);
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={anchorEl ? 'long-menu' : undefined}
                aria-expanded={anchorEl ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick} // Supprimez l'argument supplémentaire ici
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEditDialogOpen} disableRipple>
                    <EditIcon />
                    Edit
                </MenuItem>
                <MenuItem onClick={() => handleDelete(itemToDelete)}>
                    <DeleteIcon />
                    Delete
                </MenuItem>
                <MenuItem onClick={handleClickOpen} disableRipple>
                    <InfoIcon />
                    Read
                </MenuItem>
            </StyledMenu>

            {/*Popup de la partie Read*/}

            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={dialogOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Informations
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis risus euismod, fermentum
                        lorem et, eleifend nisi. Ut id tortor in ligula consectetur finibus. Nullam nec nunc non
                        odio vehicula blandit. Vivamus varius est et orci vehicula, at convallis nisl tempus.
                        Vivamus a efficitur libero. Duis feugiat justo a magna vehicula, sed sagittis dui sagittis.
                        Cras sit amet malesuada nulla. Sed auctor ultrices massa, vel eleifend dui pharetra et.
                        Vivamus lacinia hendrerit nulla, non tincidunt est finibus a. Phasellus nec ligula ac enim
                        consectetur rutrum. Curabitur vitae lacus nec ligula dignissim scelerisque.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>
                        Fermer
                    </Button>
                </DialogActions>
            </BootstrapDialog>

            {/*Popup de la partie Edit*/}

            <BootstrapDialog
                onClose={handleEditDialogClose}
                aria-labelledby="customized-dialog-title"
                open={editDialogOpen}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Edit Information
                    <IconButton
                        aria-label="close"
                        onClick={handleEditDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis risus euismod, fermentum
                        lorem et, eleifend nisi. Ut id tortor in ligula consectetur finibus. Nullam nec nunc non
                        odio vehicula blandit. Vivamus varius est et orci vehicula, at convallis nisl tempus.
                        Vivamus a efficitur libero. Duis feugiat justo a magna vehicula, sed sagittis dui sagittis.
                        Cras sit amet malesuada nulla. Sed auctor ultrices massa, vel eleifend dui pharetra et.
                        Vivamus lacinia hendrerit nulla, non tincidunt est finibus a. Phasellus nec ligula ac enim
                        consectetur rutrum. Curabitur vitae lacus nec ligula dignissim scelerisque.
                    </Typography>
                    <TextField
                        label="Modifier les informations"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleEditDialogClose}>
                        Annuler
                    </Button>
                    <Button autoFocus onClick={handleSaveChanges}>
                        Sauvegarder
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
