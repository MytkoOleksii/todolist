import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./ToDoList";

type TaskPropsType = {
    t: TaskType
    id: string
    dispatch: any

}
export const Task = React.memo((props: TaskPropsType) => {
    function onRemoveHandler() {
        props.dispatch(removeTaskAC(props.id, props.t.id))
        //  props.removeTask(t.id, props.id)
    }

    function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        props.dispatch(changeTaskStatusAC(props.id, props.t.id, event.currentTarget.checked)) // ???????????????
        //  props.changeStatus(t.id, event.currentTarget.checked, props.id)
    }

    function onChangeNewTitle(newValueTitle: string) {
        props.dispatch(changeTaskTitleAC(props.id, props.t.id, newValueTitle))
        // props.changeTaskTitle(t.id, newValueTitle, props.id)
    }

    return (
        <div key={props.t.id} className={props.t.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.t.isDone}
                onChange={onChangeHandler}
                sx={{'& .MuiSvgIcon-root': {fontSize: 28}}}
            />
            <EditableSpan title={props.t.title} editMode={true} onChangeNewValue={onChangeNewTitle}/>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )

});
