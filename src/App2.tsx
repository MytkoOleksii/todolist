import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";


import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';

const drawerWidth = 240;

//----------------------------------------------------------------//
export  type  FilterValuesType = 'all' | 'completed' | 'active';

export  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App2() {



//-------------------------------------------------------------------------------------------------------//

    const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
        open?: boolean;
    }>(({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }));

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }))

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

//--------------------------------  END  -----------------------------------------------------------------------//
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
             }`
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
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Заголовок
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader/>
                <Container fixed>

                    <Grid container style={{padding: '10px'}}>
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
                                    <Paper elevation={6} style={{padding: '10px'}}>
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
            </Main>
        </Box>
    );
}

//export default App2;
