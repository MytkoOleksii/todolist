import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormsPropsType = {
    addItem: (textInput: string) => void
}

export function AddItemForm(props: AddItemFormsPropsType) {
    let [textInput, setTextInput] = useState<string | null>('');
    let [error, setError] = useState<string | null>(null) //
    // Обработка ввода текста
    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.currentTarget.value)
    };
    // Обработка нажатия ентер
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { //
        setError('')
        if (e.charCode == 13) {
            props.addItem(textInput as string)
            setTextInput('')
        }
    };
    // Отправка на добавление новой задачи
    const addTask = () => { ///
        if (textInput?.trim() !== '') {
            props.addItem(textInput as string)
            setTextInput('')
        } else {
            setError('Title is required')
        }
    };

    return (
        <div>
            {/*<input type={"text"} onChange={(event)=> setTextInput(event.target.value)} value={textInput as string} />*/}
            <input type={"text"} value={textInput as string}
                   onKeyPress={onKeyPressHandler}
                   onChange={onNewTitleChangeHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-messages'}>{error}</div>}
        </div>
    )
}