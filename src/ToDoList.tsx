import React, {useState} from "react";
import {type} from "os";
import {FilterValuesType} from "./App";

export type  TaskType ={
    id: number
    title: string
    isDone: boolean

}

type PropsType = {
    title : string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTask: any) => any

}

export function ToDoList(props:PropsType) {
    let[text, setText] = useState<string | null>(null)
    function newText (text: string) {
        if (text.length > 0){
            let new77 = {
                id: props.tasks.length + 1,
                title: text,
                isDone: false
            }
            setText('')
        return new77
        } //else  { alert('You need write name tasks')}
    }

    return (
        <div className={'App'}>
            <h1>{props.title}</h1>
            <div>
                <input type={"text"} onChange={(event)=> setText(event.target.value)} value={text as string} />
                <button onClick={()=> props.addTask(newText(text as string))}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map( (t) => {
                        return <li><input type={'checkbox'} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={ function () {props.removeTask(t.id) }}>x</button>
                        </li>
                    })
                }
              {/*
                <li><input type={'checkbox'} checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type={'checkbox'} checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type={'checkbox'} checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
          */}
            </ul>
            <div>
                <button onClick={ ()=> { props.changeFilter('all')}} >All</button>
                <button onClick={ ()=> { props.changeFilter('active')}} >Active</button>
                <button onClick={ ()=> { props.changeFilter('completed')}} >Completed</button>
            </div>
        </div>
    )
}

export default ToDoList ;