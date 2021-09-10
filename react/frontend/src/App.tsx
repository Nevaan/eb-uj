import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/context';
import Routing from './components/routing/Routing';
import { makeStyles } from '@material-ui/core';
import Profile from './components/profile/Profile';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

function App() {

    const classes = useStyles();

    return (
        <div className="App">
            <AuthProvider>
                <div className={classes.header}>
                    <div>
                        <Profile></Profile>
                    </div>
                </div>
                <BrowserRouter>
                    <Routing></Routing>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
