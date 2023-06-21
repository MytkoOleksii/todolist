import React, {ChangeEvent, useState} from "react";

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
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalTitle(e.currentTarget.value)
    return (
        editMode
            ? <input value={localTitle} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}