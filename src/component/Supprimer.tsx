import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface SupprimerButtonProps {
    onDelete: () => void;
}

const SupprimerButton: React.FC<SupprimerButtonProps> = ({ onDelete }) => {
    return (
        <>
            <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default SupprimerButton;
