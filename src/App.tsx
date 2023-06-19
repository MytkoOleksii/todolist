import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {TaskType} from "./ToDoList";
import {v1} from "uuid";

export  type  FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    /*
        let initTasks =  [
            {id:1, title: "CSS", isDone: true},
            {id:2, title: "JS", isDone: true},
            {id:3, title: "React", isDone: true},
            {id:4, title: "Redux", isDone: false}
        ]
        */
    /*
     let arr = useState(initTasks);
        let tasks = arr[0];
        let setTasks = arr[1];
    */
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]);

    function addTask(textInput: any) {
        // let tasksCopy = tasks
        //  tasksCopy.push(newTask)
        if (textInput.length > 0) {
            let newTask = {
                // id: props.tasks.length + 1,
                id: v1(),
                title: textInput,
                isDone: false
            }
            let tasksCopy = [newTask, ...tasks]
            setTasks(tasksCopy)
        } else {
            alert('You need write name tasks')
        }
    }
    console.log(tasks)
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <ToDoList title={'Lessons 1'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      setTasks={setTasks}
            />
            <ToDoList title={'lessons 2'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      setTasks={setTasks}
            />
        </div>
    );
}

export default App;
