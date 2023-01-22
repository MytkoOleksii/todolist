import React from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {TaskType} from "./ToDoList";

function App() {

    let tasks1 =  [
        {id:1, title: "CSS", isDone: true},
        {id:1, title: "JS", isDone: true},
        {id:1, title: "React", isDone: false},
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 1, title: "xxx", isDone: true},
        {id: 1, title: "Avatar", isDone: false},
    ]

    return (
        <div className="App">
            <ToDoList title={'Lessons 1'} tasks={tasks1} />
            <ToDoList title={'Lessons 2'} tasks={tasks2} />
            <ToDoList title={'Lessons 3'} tasks={tasks2} />
        </div>
    );
}

export default App;
