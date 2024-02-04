import React, {useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {removeTodolistAC} from "./state/todolist-reducer";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    id: string
    changeTodolistTitle:  (id: string, newTitle: string) => void
}

export const ToDoList = React.memo( function (props: PropsType) {

    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => {dispatch(addTaskAC(props.id,title))},[])

//-------------------------------------------------------------------------------//
    const tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[props.id])
 /*   function addTask(textInput: any, todolistId: string) {
        let actions = addTaskAC(todolistId, textInput)
        dispatch(actions)
    }*/
 /*   function removeTask(id: string, todolistId: string) {
        let actions = removeTaskAC(todolistId, id)
        dispatch(removeTaskAC(todolistId, id))
    }*/
   /* function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let actions = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }*/
 /*   function onChangeNewTaskTitle(taskId: string, newValueTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newValueTitle))
    }*/
    //-----------------------------------------------------------------------------------------------//
    //Фильтрация кнопки
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    // Удаление туду листа
   const removeTodoList = () => {
       dispatch(removeTodolistAC(props.id))
    }
  /*  const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }*/
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    //--------------------------------------------//
    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }

    return (
        <div className={'App'}>
            <h1><EditableSpan title={props.title} editMode={false}
                              onChangeNewValue={changeTodolistTitle}></EditableSpan>

                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h1>
            <AddItemForm addItem={addTask} />
            <ul>
                {
                    tasksForTodolist.map(t => <Task key={t.id} t={t} id={props.id} dispatch={dispatch}/>)
                }
            </ul>
            <div>
                <Button color={"inherit"} variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"error"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
} );

export default ToDoList;
/*

                       function onRemoveHandler() {
                            dispatch(removeTaskAC(props.id,t.id))
                          //  props.removeTask(t.id, props.id)
                        }

                        function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
                            dispatch(changeTaskStatusAC(props.id,t.id,event.currentTarget.checked)) // ???????????????
                          //  props.changeStatus(t.id, event.currentTarget.checked, props.id)
                        }

                        function onChangeNewTitle(newValueTitle: string) {
                            dispatch(changeTaskTitleAC( props.id, t.id, newValueTitle))
                           // props.changeTaskTitle(t.id, newValueTitle, props.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeHandler}
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                />
                                <EditableSpan title={t.title} editMode={true} onChangeNewValue={onChangeNewTitle}/>
                                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                    <Delete />
                                </IconButton>
                            </div>
                        )*/
