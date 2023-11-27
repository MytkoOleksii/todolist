import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircleOutlineOutlined, AddCircleTwoTone} from "@mui/icons-material";

type AddItemFormsPropsType = {
    addItem: (newTask: any) => any
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
        if (e.charCode == 13 && textInput?.trim() !== '') {
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
    const onBlurClear = () => {
        setTextInput('')
    }

    return (
        <div>
            {/*<input type={"text"} onChange={(event)=> setTextInput(event.target.value)} value={textInput as string} />*/}
          {/*  <input type={"text"} value={textInput as string}
                   onKeyPress={onKeyPressHandler}
                   onChange={onNewTitleChangeHandler}
                   className={error ? 'error' : ''}
            />*/}
            <TextField
                type={"text"} value={textInput as string}
                onKeyPress={onKeyPressHandler}
                onChange={onNewTitleChangeHandler}
                onBlur={onBlurClear}
                error={!!error}/* !! - псевдо лож псевдо истина */
                helperText={error}

                id="outlined-multiline-flexible"
                label="Write task"
                multiline
                maxRows={1}
                size={'small'}
            />
          {/*  <Button variant="contained" color={'primary'} size={'medium'} onClick={addTask}>+</Button>*/}
            <IconButton onClick={addTask} color={'primary'} size={"large"}  ><AddCircleOutlineOutlined fontSize={"inherit"}/></IconButton>

            {/* {error && <div className={'error-messages'}>{error}</div>} // заменил helpertext */}
        </div>
    )
}