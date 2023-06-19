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
    removeTask: (id: string) => void
    // changeFilter: (value: FilterValuesType) => void
    changeFilter: Function
    addTask: (newTask: any) => any
    setTasks: Function
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
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
            props.addTask(textInput as string)
            setTextInput('')
        }
    };
    // Отправка на добавление новой задачи
    const addTask = () => {
        if (textInput?.trim() !== ''){
            props.addTask(textInput as string)
            setTextInput('')
        } else {
            setError('Title is required')
        }
    };
    //Фильтрация
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');
    return (
        <div className={'App'}>
            <h1>{props.title}</h1>
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
                            props.removeTask(t.id)
                        }
                        function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                         // console.log( t.id + event.currentTarget.checked )
                            props.changeStatus(t.id, event.currentTarget.checked)
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