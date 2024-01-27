import {FilterValuesType, TodoListType} from "../AppWithRedux";
//import {v1} from "uuid";
import {v1} from "uuid"
import {createStore} from "redux";
import {useReducer} from "react";
// "react-scripts": "^5.0.1",

type StateType = {
    age: number,
    children: number,
    name: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type RemoveTodolistActionType={
    type: 'REMOVE-TODOLIST',
    id: string
}
type  ActionsType = AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | RemoveTodolistActionType
/*type ActionType = {
    type: string,
    [key: string]: any
}*/
export let todoListId1 = v1()// id
export let todoListId2 = v1()

const initialState: Array<TodoListType> = [
        {id: todoListId1, title: 'Lessons1', filter: 'active'},
        {id: todoListId2, title: 'Lessons2', filter: 'completed'}
    ]
export const todolistReducer= function (state: Array<TodoListType> = initialState,action: ActionsType): Array<TodoListType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
           return state.filter((tl) => tl.id != action.id)
        }
        case 'ADD-TODOLIST' : {
         return  [ ...state, {
             id: action.todolistId,
             title: action.title,
             filter: 'all'
         }]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            let todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
            }
        return [...state]
        }
            case 'CHANGE-TODOLIST-FILTER' : {
                let todoList = state.find(tl => tl.id === action.id);
                if (todoList) {
                    todoList.filter = action.filter;
                }
               return [...state]
            }

        default:
            //throw  new  Error(" I don't understate this action.") //old with Reducer from React
            return state; // New , reducer from Redux
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type:'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string) : AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}// !!!!!!! добавляет id
}
export const ChangeTodolistTitleAC = (id: string,title: string) : ChangeTodolistTitleActionType=> {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export  const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type:'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}

