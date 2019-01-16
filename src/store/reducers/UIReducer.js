import * as actionTypes from 'store/actions/actionType'


const initialState = {
    shoppingCart: 0,
    modal: false,
    modalCart: false,
    modalLogin: false,
    modalSignUp: false,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.MODAL_MANAGER:
            return {
                ...state,
                modal: action.status,
                [action.modal]: action.status
            };
        case actionTypes.SHOPPING_CART:
            if(action.operation === 'add') {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart + 1
                }
            } else if (action.operation === 'subs') {
                return {
                    ...state,
                    shoppingCart: state.shoppingCart - 1
                }
            }
        break;
        default: 
            return state
        }
    }

    export default reducer