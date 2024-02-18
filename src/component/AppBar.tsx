/*import * as React from 'react';*/
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavAppBar() {
    return (
        <Box >
            <AppBar position="static">
                <Toolbar variant="dense" sx={{ backgroundColor: 'black', height: 80, marginTop: 0, paddingTop: 0 }}>
                    <Typography variant="h6" color="inherit" component="div">
                        Playlists
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}