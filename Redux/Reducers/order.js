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
            if (state.items?.length > 0) {
                state.totalPrice = state.items.reduce((n, { price, count }) => n + (price * count), 0)
            }
            else { state.totalPrice = 0 }
            return { ...state }
        case CLEAR_ORDER:
            state = {};
            return state;
        case SET_LATEST_ORDER:            
            return { ...state, latest: action.payload };
        case ADD_ITEM:
            state.items = [...state.items, action.payload]
            state.totalPrice = state.totalPrice + action.payload.price;
            return { ...state }
        case REMOVE_ITEM:
            state.items = state.items.filter(cartItem => cartItem.id !== action.payload.id)
            state.totalPrice = state.totalPrice - action.payload.price;
            return {...state}
        case INCREASE_ITEM_COUNT:
            let itemToIncrease = state.items.find(x => x.id === action.payload.id)
            if (itemToIncrease) {
                itemToIncrease.count = itemToIncrease.count + 1;
                state.totalPrice = state.totalPrice + itemToIncrease.price;
            }
            return { ...state };
        case DECREASE_ITEM_COUNT:
            let itemToDecrease = state.items.find(x => x.id === action.payload.id)
            if (itemToDecrease) {
                itemToDecrease.count = itemToDecrease.count - 1;
                state.totalPrice = state.totalPrice - itemToDecrease.price;
            }
            return { ...state };
    }
    return state;
}

export default order;