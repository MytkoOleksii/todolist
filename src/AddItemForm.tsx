import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircleOutlineOutlined, AddCircleTwoTone} from "@mui/icons-material";

type AddItemFormsPropsType = {
    addItem: (newTask: any) => any
}

export function AddItemForm(props: AddItemFormsPropsType) {
    let [textInput, setTextInput] = useState<string | null>('');
    let [error, setError] = useState<string | null>(null) //

    // Обработка ввода текста
    const onNewTitleChangeHandler = useCallback( (event: ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.currentTarget.value)
    },[]);

    // Отправка на добавление новой задачи
    const addTask = () => { //
        if (textInput?.trim() !== '') {
            props.addItem(textInput as string)
            setTextInput('')
        } else {
            setError('Title is required')
        }
    };
    // Обработка нажатия ентер
    const onKeyPressHandler =  (e: KeyboardEvent<HTMLInputElement>) => { //
        if (error !== null) {
            setError(null)
        }
        if (e.charCode == 13 && textInput?.trim() !== '') {
            props.addItem(textInput as string)
            setTextInput('')
        }
    };

    return (
        <div>
            <TextField
                type={"text"} value={textInput as string}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
               // onBlur={onBlurClear}
                error={!!error}/* !! - псевдо лож псевдо истина */
                helperText={error}

                id="outlined-multiline-flexible"
                label="Write task"
                multiline
                maxRows={1}
                size={'small'}
            />
            <IconButton onClick={addTask} color={'primary'} size={"large"}  ><AddCircleOutlineOutlined fontSize={"inherit"}/></IconButton>
        </div>
    )
}
