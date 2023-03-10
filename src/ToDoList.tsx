import React from "react";
import {type} from "os";

export type  TaskType ={
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title : string
    tasks: Array<TaskType>
}

export function ToDoList(props:PropsType) {
    return (
        <div className={'App'}>
            <h1>{props.title}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type={'checkbox'} checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type={'checkbox'} checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type={'checkbox'} checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList ;