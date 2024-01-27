import {TaskStateType, TodoListType} from "../AppWithRedux";
import {addTodolistAC, todolistReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTaskState: TaskStateType = {};
    const startTodolistState: Array<TodoListType> = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodolistState =  todolistReducer(startTodolistState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);

})
