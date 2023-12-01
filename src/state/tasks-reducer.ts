import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {stat} from "fs";
import {TaskType} from "../ToDoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";

type RemoveTasksActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title:string
}
type  ActionsType = RemoveTasksActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType
/*type ActionType = {
    type: string,
    [key: string]: any
}*/
export const tasksReducer = function (state: TaskStateType, action: ActionsType): { [p: string]: Array<TaskType> } {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            let copyState = {...state};
            let task = copyState[action.todolistId]; // Достаем нужный массив
            let filteredTask = task.filter((t) => t.id !== action.taskId);
            copyState[action.todolistId] = filteredTask;
            return copyState;
        }
        case 'ADD-TASK' : {
            let stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            let newTask= {id: v1(), title:action.title, isDone:false}
            let newTasks = [newTask,...tasks] ;
            stateCopy[action.todolistId] = newTasks
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS' : {
            let stateCopy = {...state}

            let tasks = stateCopy[action.todolistId]; // Достаем нужный массив
            let task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
                /*stateCopy[action.todolistId]={...tasks}*/
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE' : {
            let stateCopy = {...state};
            let tasks = stateCopy[action.todolistId]
            let task = tasks.find(tl => tl.id === action.taskId)
            if (task) {
                task.title = action.title;
            }
            return  stateCopy
        }
        case 'ADD-TODOLIST' : {
            const  stateCopy = {...state}
            stateCopy[action.todolistId] = [];

            return stateCopy
        }
        case  'REMOVE-TODOLIST': {
            const  stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            throw  new Error(" I don't understate this action.")
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId}
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK',todolistId, title}
}

export const changeTaskStatusAC = function (todolistId:string,taskId: string, isDone: boolean):ChangeTaskStatusActionType {
    return {type: 'CHANGE-TASK-STATUS',todolistId, taskId, isDone}
}

export  const  changeTaskTitleAC = function (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType {
    return { type:'CHANGE-TASK-TITLE' , todolistId, taskId, title}
}

