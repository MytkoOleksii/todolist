import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {FilterValuesType} from "./App";

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
    changeFilter: (value: FilterValuesType, todoListId: string ) => void
    addTask: (newTask: any, todolistId: string) => any
    setTasks: Function
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodoList: ( todolistId: string) => void
}
export function ToDoList(props: PropsType) {
    let [textInput, setTextInput] = useState<string | null>('')
    let [error, setError] = useState<string | null>(null)
    // Обработка ввода текста
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.currentTarget.value)
    };
    // Обработка нажатия ентер
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.charCode == 13) {
            props.addTask(textInput as string,props.id)
            setTextInput('')
        }
    };
    // Отправка на добавление новой задачи
    const addTask = () => {
        if (textInput?.trim() !== ''){
            props.addTask(textInput as string, props.id)
            setTextInput('')
        } else {
            setError('Title is required')
        }
    };
    //Фильтрация
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    return (
        <div className={'App'}>
            <h1>{props.title} <button onClick={removeTodoList}>x</button></h1>
            <div>
                {/*<input type={"text"} onChange={(event)=> setTextInput(event.target.value)} value={textInput as string} />*/}
                <input type={"text"} value={textInput as string}
                       onKeyPress={onKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                       className={error ? 'error':''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-messages'}>{error}</div>}

            </div>
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
                            <li key={t.id} className={ t.isDone ? 'is-done' : ''}>
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
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;