import {TodoListType} from "../App";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";


test('correct todolist should be removed', ()=>{
    let todolistId1= v1();
    let todolistId2= v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

/*
    const endState = todolistReducer(startState,{type: 'REMOVE-TODOLIST', id: todolistId1}) // old
*/
    const endState = todolistReducer(startState, RemoveTodolistAC(todolistId1)) // new


    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
//---------------------------------------//
test('correct todolist should be added', ()=>{
    let todolistId1= v1();
    let todolistId2= v1();

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistReducer(startState,AddTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
    expect(endState[2].filter).toBe('all');
});
//-------------------------------------------------//
test('меняем filter', ()=>{
    let todolistId1= v1();
    let todolistId2= v1();
    const newFilter = "active"
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

/*
    const action:ChangeTodolistFilterActionType = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistReducer(startState,action)
*/

    const endState = todolistReducer(startState,ChangeTodolistFilterAC(todolistId2,newFilter))


    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
//-------------------------------------------------//
test('меняем имя', ()=>{
    let todolistId1= v1();
    let todolistId2= v1();
    const newTodolistTitle = 'New Task'
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
  /*  const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = todolistReducer(startState,action)
*/


    const endState = todolistReducer(startState,ChangeTodolistTitleAC(todolistId2,newTodolistTitle))


    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});
