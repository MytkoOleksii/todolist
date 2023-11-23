import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (newTask: any, todolistId: string) => any
    setTasks: Function
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodoList: (todolistId: string) => void
    changeTodolistTitle:  (id: string, newTitle: string) => void
    changeTaskTitle: (id: string, newValueTitle: string, todoListId: string) => void
}

export function ToDoList(props: PropsType) {

    //Фильтрация кнопки
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // Удаление туду листа
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title , props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div className={'App'}>
            <h1><EditableSpan title={props.title} editMode={false}
                              onChangeNewValue={changeTodolistTitle}></EditableSpan>

                {/* <button onClick={removeTodoList}>x</button>*/}
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h1>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    props.tasks.map((t) => {
                        function onRemoveHandler() {
                            props.removeTask(t.id, props.id)
                        }

                        function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                            // console.log( t.id + event.currentTarget.checked )
                            props.changeStatus(t.id, event.currentTarget.checked, props.id)
                        }

                        function onChangeNewTitle(newValueTitle: string) {
                            // console.log( t.id + event.currentTarget.checked )
                            props.changeTaskTitle(t.id, newValueTitle, props.id)
                        }


                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                              {/*  <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={onChangeHandler}/>*/}
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeHandler}

                                    defaultChecked
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                                {/*  onChange={() => (t.isDone ? t.isDone = false : t.isDone = true)}/>*/}
                                <EditableSpan title={t.title} editMode={true} onChangeNewValue={onChangeNewTitle}/>

                                {/*<button onClick={onRemoveHandler}>x</button>*/}
                                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    })
                }
            </ul>
            <div>
{/*                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>*/}
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"error"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

export default ToDoList;