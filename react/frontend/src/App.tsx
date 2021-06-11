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
            <Route path="/team" component={Team}/>
        </BrowserRouter>
    </div>
  );
}

export default App;
