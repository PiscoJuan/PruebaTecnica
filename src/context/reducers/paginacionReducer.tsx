const init = {
    pagina : 0
};

const paginacionReducer = (state=init, action:any) => {
    switch (action.type){
        case 'NEXTPAG':
            return {
                ...state,
                pagina : state.pagina +10
            }
        case 'PREVPAG':
            return {
                ...state,
                pagina : state.pagina -10
            }
        default :
            return state
    }
};

export default paginacionReducer;