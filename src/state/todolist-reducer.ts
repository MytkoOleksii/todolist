import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type StateType = {
    age: number,
    children: number,
    name: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
}

type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
type RemoveTodolistActionType={
    type: 'REMOVE-TODOLIST',
    id: string
}
type  ActionsType = AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | RemoveTodolistActionType
/*type ActionType = {
    type: string,
    [key: string]: any
}*/

export const todolistReducer= function (state: Array<TodoListType>,action: ActionsType): Array<TodoListType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
           return state.filter((tl) => tl.id != action.id)
        }
        case 'ADD-TODOLIST' : {
         return  [ ...state, {
             id: v1(),
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
            throw  new  Error(" I don't understate this action.")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type:'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string) : AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodolistTitleAC = (id: string,title: string) : ChangeTodolistTitleActionType=> {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export  const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type:'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}