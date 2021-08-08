import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/context';
import Routing from './components/routing/Routing';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
        
    },
});

function App() {

    const classes = useStyles();

    return (
        <div className="App">

            <h1 className={classes.header}> 
                Scrum Tool
            </h1>

            <AuthProvider>
                <BrowserRouter>
                    <Routing></Routing>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
