import {
    
    CREATE_ORDER,
    UPDATE_ORDER,
    CLEAR_ORDER,
    SET_LATEST_ORDER,
    ADD_ITEM,
    REMOVE_ITEM,
    INCREASE_ITEM_COUNT,
    DECREASE_ITEM_COUNT,
} from '../constants';


export const createOrder = (payload) => {
    return {
        type: CREATE_ORDER,
        payload
    }
}

export const updateOrder = (payload) => {
    return {
        type: UPDATE_ORDER,
        payload
    }
}

export const clearOrder = (payload) => {
    return {
        type: CLEAR_ORDER        
    }
}

export const setLatestOrder = (payload) => {
    return {
        type: SET_LATEST_ORDER,
        payload
    }
}

export const addItem = (payload) => {
    return {
        type: ADD_ITEM,
        payload
    }
}

export const removeItem = (payload) => {
    return {
        type: REMOVE_ITEM,
        payload
    }
}

export const increaseItemCount = (payload) => {
    return {
        type: INCREASE_ITEM_COUNT,
        payload
    }
}

export const decreaseItemCount = (payload) => {
    return {
        type: DECREASE_ITEM_COUNT,
        payload
    }
}