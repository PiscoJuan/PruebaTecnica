const init = {
    count : 0
};

const threeTimesReducer = (state=init, action:any) => {
    switch (action.type){
        case 'INCREMENT':
            return {
                ...state,
                count : state.count +1
            }
        case 'RESET':
            return {
                ...state,
                count : 0
            }
        default :
            return state
    }
};

export default threeTimesReducer;