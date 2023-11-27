import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    editMode: boolean
    onChangeNewValue: Function
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [localTitle, setLocalTitle] = useState('');

    function activateEditMode() {
        setEditMode(true)
        setLocalTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeNewValue(localTitle)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => setLocalTitle(e.currentTarget.value)

    // Обработка нажатия ентер
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => { //

        if (e.charCode == 13 && localTitle?.trim() !== '') {
            activateViewMode()

        }
    };
    return (
        editMode
            ? <TextField
                type={"text"} value={localTitle}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeTitleHandler}
                onBlur={activateViewMode}

                autoFocus

                id="outlined-multiline-flexible"
                label="Change task"
                multiline
                maxRows={4}
                size={'small'}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}