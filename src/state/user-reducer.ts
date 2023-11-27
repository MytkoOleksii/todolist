type StateType ={
    age: number,
    children: number,
    name: string,

}

type ActionType = {
    type: string,
    [key: string] : any,
}
export const userReducer = function (state: StateType, action: ActionType ): StateType {
     switch (action.type) {
         case 'INCREMENT-AGE' :
             let newState ={...state};
             newState.age = state.age + 1;
             return newState
         case 'INCREMENT-CHILDREN-COUNT' :
             return {
                 ...state,
              children: state.children + 1
             }
         case 'CHANGE-NAME' :
            return {
                 ...state,
                 name: action.newName
             }

         default:
             throw new Error("I don't understand this type action ")

     }
}