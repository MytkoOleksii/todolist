import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {TaskType} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export  type  FilterValuesType = 'all' | 'completed' | 'active';

export  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch(); // обєднані редюсери куди відправляєш екшени
    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolist) // вибрати щось з стейту


    /*   const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
       function addTask(textInput: any, todolistId: string) {
           let actions = addTaskAC(todolistId, textInput)
           dispatch(actions)
       }
       function removeTask(id: string, todolistId: string) {
           let actions = removeTaskAC(todolistId, id)
           dispatch(actions)
       }

       function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
           let actions = changeTaskStatusAC(todolistId, taskId, isDone)
           dispatch(actions)
       }
       function onChangeNewTaskTitle(taskId: string, newValueTitle: string, todolistId: string) {
           let actions = changeTaskTitleAC(todolistId, taskId, newValueTitle)
           dispatch(actions)
       }*/

//--------------------- Todolist ---------------------------------------------------------------------//
  const changeFilter= useCallback(function(value: FilterValuesType, todoListId: string) {
        let actions = ChangeTodolistFilterAC(todoListId, value)
        dispatch(actions)
    },[]);

  // Додавання тексту
    const  addTodolist = useCallback(function (title: string)  {
        let actions = addTodolistAC(title)
        dispatch(actions)
    },[]);

    const changeTodolistTitle = useCallback(function(id: string, newTitle: string) {
        let actions = ChangeTodolistTitleAC(id, newTitle)
        dispatch(actions)
    },[]);

    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>

                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tdl) => {

                            return <Grid item>
                                <Paper elevation={6} style={{padding: '10px'}}>
                                    <ToDoList
                                        key={tdl.id}
                                        title={tdl.title}
                                        id={tdl.id}
                                        changeFilter={changeFilter}
                                        filter={tdl.filter}
                                       // removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;


