import './App.css'
import ListPlaylist from "./component/ListPlaylist.tsx";
import FormAjouterPlaylist from "./component/AjouterPlaylist.tsx";
import NavAppBar from "./component/AppBar.tsx";

function App() {

    return (
        <>
            <NavAppBar/>
            <FormAjouterPlaylist/>
            <ListPlaylist/>
        </>
    )
}

export default App;
