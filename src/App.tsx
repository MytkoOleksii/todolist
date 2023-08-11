import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {TaskType} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export  type  FilterValuesType = 'all' | 'completed' | 'active';

export  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    /*
        let initTasks =  [
            {id:1, title: "CSS", isDone: true},
            {id:2, title: "JS", isDone: true},
            {id:3, title: "React", isDone: true},
            {id:4, title: "Redux", isDone: false}
        ]
        */
    /*
     let arr = useState(initTasks);
        let tasksObj = arr[0];
        let setTasksObj = arr[1];
    */

    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'Lessons1', filter: 'active'},
        {id: todoListID2, title: 'Lessons2', filter: 'completed'}
    ]);

    function addTask(textInput: any, todolistId: string) {
        //  tasksCopy.push(newTask)
        /*   if (textInput.length > 0) {
               let newTask = {
                   // id: props.tasksObj.length + 1,
                   id: v1(),
                   title: textInput,
                   isDone: false
               }
               let tasksCopy = [newTask, ...tasksObj]
               setTasksObj(tasksCopy)
           } else {
               alert('You need write name tasksObj')

           }*/
        let newTask = {
            id: v1(),
            title: textInput,
            isDone: false
        }
        let tasks = tasksObj[todolistId]; // Достаем нужный массив
        let tasksCopy = [newTask, ...tasks]
        tasksObj[todolistId] = tasksCopy
        setTasksObj({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]; // Достаем нужный массив
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
        }
        setTodoList([...todoLists])
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        /* let task = tasksObj.find( (t) => {
             if (t.id === taskId) {
             } else {
                 return false
             }
         });*/
        let tasks = tasksObj[todolistId]; // Достаем нужный массив
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    let removeTodoList = (todolistId: string) => {
        let filteredTodolist = todoLists.filter(t => t.id !== todolistId);
        setTodoList(filteredTodolist);
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }
    let [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Wood", isDone: false},
            {id: v1(), title: "Tea", isDone: false},
        ],
    });

    function addTodolist(title: string) {
        let newTodolist: TodoListType = { // Создание нового туду листа
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodoList([newTodolist, ...todoLists])
        setTasksObj({...tasksObj, [newTodolist.id]: []}) // Взять старый и добавить новый список дел
    }

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

                <Grid container style={ { padding: '10px'}} >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tdl) => {

                            let tasksForTodolist = tasksObj[tdl.id];
                            if (tdl.filter === 'completed') {
                                tasksForTodolist = tasksObj[tdl.id].filter(t => t.isDone === true);
                            }
                            if (tdl.filter === 'active') {
                                tasksForTodolist = tasksObj[tdl.id].filter(t => t.isDone === false);
                            }
                            return <Grid item>
                                <Paper elevation={6} style={ { padding: '10px'}}>
                                    <ToDoList key={tdl.id}
                                              title={tdl.title}
                                              id={tdl.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              setTasks={setTasksObj}
                                              changeStatus={changeStatus}
                                              filter={tdl.filter}
                                              removeTodoList={removeTodoList}
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

export default App;


