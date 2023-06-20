import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

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
    return (
        <div className={'App'}>
            <h1>{props.title}
                <button onClick={removeTodoList}>x</button>
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

                        return (
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={onChangeHandler}/>
                                {/*  onChange={() => (t.isDone ? t.isDone = false : t.isDone = true)}/>*/}
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default ToDoList;

