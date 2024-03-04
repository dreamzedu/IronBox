import {
    CREATE_ORDER,
    UPDATE_ORDER,
    CLEAR_ORDER,
    SET_LATEST_ORDER,
} from '../constants';

const order = (state = {}, action) => {
    switch (action.type) {      
        
        case CREATE_ORDER:
            let orderDetail = {
                productId: action.payload.productId,
                productName: action.payload.productName,
                productCode: action.payload.productCode,
                userId: action.payload.userId,
                items: action.payload.items,
                pickupAddress: action.payload.pickupAddress,
                pickupSlot: null,
                totalPrice: 0

            };
            state = orderDetail;
            return { ...state }
        case UPDATE_ORDER:
            state = action.payload;
            return { ...state }
        case CLEAR_ORDER:
            state = {};
            return state;
        case SET_LATEST_ORDER:
            
            return { ...state, latest: action.payload };

    }
    return state;
}

export default order;