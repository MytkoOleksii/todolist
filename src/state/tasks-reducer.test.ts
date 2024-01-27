import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodoListType} from "../AppWithRedux";
import {addTodolistAC, ChangeTodolistFilterAC, removeTodolistAC, todolistReducer} from "./todolist-reducer";

test('remove task from todolist', () => {
    const startState: TaskStateType = {
        'todolistId1': [
        {id: '1', title: "CSS", isDone: true},
        {id: '2', title: "JS", isDone: true},
        {id: '3', title: "React", isDone: false},
        {id: '4', title: "Redux", isDone: false},
    ],
        'todolistId2': [
        {id: '1', title: "Milk", isDone: true},
        {id: '2', title: "Book", isDone: true},
        {id: '3', title: "Wood", isDone: false},
        {id: '4', title: "Tea", isDone: false},
    ]};
const action = removeTaskAC('todolistId2','2')
const  endState:any = tasksReducer(startState, action)

expect(endState['todolistId1'].length).toBe(4);
expect(endState['todolistId2'].length).toBe(3);
expect(endState['todolistId2'].every((t: any)=> t.id != '2')).toBe(true)
});

test('add new task', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Book", isDone: true},
            {id: '3', title: "Wood", isDone: false},
            {id: '4', title: "Tea", isDone: false},
        ]};
    const action = addTaskAC('todolistId2','new name task')
    const  endState:any = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(5);
    expect(endState['todolistId2'][0].title).toBe('new name task')
});

test('change task status', () => {
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Book", isDone: true},
            {id: '3', title: "Wood", isDone: false},
            {id: '4', title: "Tea", isDone: false},
        ]};
    const action = changeTaskStatusAC('todolistId2','2', false)
    const  endState:any = tasksReducer(startState, action)

    expect(endState['todolistId1']['1'].isDone).toBe(true);
    expect(endState['todolistId2']['1'].isDone).toBe(false);

});


test('change filter in task', ()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Book", isDone: true},
            {id: '3', title: "Wood", isDone: false},
            {id: '4', title: "Tea", isDone: false},
        ]};
    /*
        const action:ChangeTodolistFilterActionType = {
            type: 'CHANGE-TODOLIST-FILTER' as const,
            id: todolistId2,
            filter: newFilter
        }

        const endState = todolistReducer(startState,action)
    */
const action = changeTaskTitleAC('todolistId2','3','new text')
    const endState = tasksReducer(startState,action)


    expect(endState['todolistId2'][2].title).toBe('new text');
    expect(endState['todolistId1'][2].title).toBe('React');
});


test('new property with new arrey should be added when new todolist is added', ()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Book", isDone: true},
            {id: '3', title: "Wood", isDone: false},
            {id: '4', title: "Tea", isDone: false},
        ]};
    /*
        const action:ChangeTodolistFilterActionType = {
            type: 'CHANGE-TODOLIST-FILTER' as const,
            id: todolistId2,
            filter: newFilter
        }

        const endState = todolistReducer(startState,action)
    */
    const action = addTodolistAC('new todolist');
    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState);
    const newKey = keys.find( k => k != 'todolistId1' && k != 'todolistId2');
if(!newKey) {
    throw  Error(' new key should be added ')
}


    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('remove todolist', ()=>{
    const startState: TaskStateType = {
        'todolistId1': [
            {id: '1', title: "CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "Book", isDone: true},
            {id: '3', title: "Wood", isDone: false},
            {id: '4', title: "Tea", isDone: false},
        ]};
    /*
        const action:ChangeTodolistFilterActionType = {
            type: 'CHANGE-TODOLIST-FILTER' as const,
            id: todolistId2,
            filter: newFilter
        }

        const endState = todolistReducer(startState,action)
    */
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1 );
    expect(endState['todolistId2']).not.toBeDefined();
});
