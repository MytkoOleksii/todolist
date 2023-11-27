import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => { //  1.писуємо строку що вона повинна робити 2. Передаємо стрелочну функцію
    const startState  = { age: 20, children:2, name: 'Dima'};
    const endState = userReducer(startState, { type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.children).toBe(2);
});

test('user reducer should increment only children', () => {
    const startState = { age: 20, children: 2, name: 'Dima'};
    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20);
    expect(endState.children).toBe(3);
});

test('user reducer should change name of user', () => {
    const startState = { name: 'Dima', age: 20, children: 2};
    const newName = 'Vitya';
    const  endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName)
});