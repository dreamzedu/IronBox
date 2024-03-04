import {
    
    CREATE_ORDER,
    UPDATE_ORDER,
    CLEAR_ORDER,
    SET_LATEST_ORDER,
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