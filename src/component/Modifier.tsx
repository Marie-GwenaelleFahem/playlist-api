import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface ModifierProps {
    onEdit: () => void;
}

const ModifierButton: React.FC<ModifierProps> = ({ onEdit }) => {
    return (
        <IconButton aria-label="edit" onClick={onEdit}>
            <EditIcon />
        </IconButton>
    );
};

export default ModifierButton;
