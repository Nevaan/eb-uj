import './App.css';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import { AuthProvider, useAuthState } from './context/auth/context';
import { Routes } from './config/routes';
import React, { Component } from 'react';
import Login from './components/login/Login';

function App() {

    const { loggedIn } = useAuthState();

    return (
    <div className="App">
        <AuthProvider>
            <BrowserRouter>
            { loggedIn && <Drawer/> && <Header></Header> }

            { loggedIn ? 
            (<Switch>
                { 
                Routes.map(route => (
                    <Route exact={route.exact} path={route.path} component={route.component} ></Route>
                ))
                }
                 <Redirect to='/'/>
            </Switch>) :
            (<Switch>
                <Route path="/login" component={Login}></Route>
                <Redirect to='/login' />
            </Switch>) }

            </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
