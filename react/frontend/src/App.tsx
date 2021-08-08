import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth/context';
import Routing from './components/routing/Routing';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Routing></Routing>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
