import * as actionType from './actionType'

export const modalManager = (modal, status) => {
    return {
        type: actionType.MODAL_MANAGER,
        modal,
        status
    }
}

export const shoppingCartManager = (operation) => {
    return {
        type: actionType.SHOPPING_CART,
        operation
    }
}
