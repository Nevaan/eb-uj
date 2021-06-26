import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import ProjectList from './components/project/ProjectList';
import Project from './components/project/Project';
import Drawer from "./components/Drawer";
import Team from "./components/team/Team";
import Header from "./components/Header";
import Story from "./components/story/Story";
import Task from "./components/task/Task";
import Subtask from "./components/subtask/Subtask";
import TeamList from "./components/team/TeamList";
import UserList from "./components/user/UserList";
import User from "./components/user/User";

function App() {
    return (
    <div className="App">
        <BrowserRouter>
            <Drawer/>
            <Header></Header>

            <Route exact path="/project" component={ProjectList}/>
            <Route path="/project/:projectId" component={Project}/>
            <Route path="/story/:storyId" component={Story}/>
            <Route path="/task/:taskId" component={Task}/>
            <Route path="/subtask/:subtaskId" component={Subtask}/>
            <Route exact path="/team" component={TeamList}/>
            <Route path="/team/:teamId" component={Team}/>
            <Route exact path="/user" component={UserList}/>
            <Route path="/user/:userId" component={User}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
