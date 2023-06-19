import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
}
export function ToDoList(props: PropsType) {
    let [textInput, setTextInput] = useState<string | null>(null)
    // Обработка ввода текста
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.currentTarget.value)
    };
    // Обработка нажатия ентер
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode == 13) {
            props.addTask(textInput as string)
            setTextInput('')
        }
    };
    // Отправка на добавление новой задачи
    const addTask = () => {
        props.addTask(textInput as string)
        setTextInput('')
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
                       onChange={onNewTitleChangeHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                        function onRemoveHandler() {
                            props.removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type={'checkbox'}
                                       checked={t.isDone}
                                       onChange={() => (t.isDone ? t.isDone = false : t.isDone = true)}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default ToDoList;