import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from '../constants';

const cartItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                let item = state.find(x => x.id === action.payload.id)
                if (item)
                    {
                        item.count = item.count + 1;
                        return [...state];
                    }
                else
                    return [...state, action.payload]
            }
        case REMOVE_FROM_CART:
            let item = state.find(x => x.id === action.payload.id)
            if (item) {
                item.count = item.count - 1;
                return [...state];
            }
            else
                return state.filter(cartItem => cartItem.id !== action.payload.id)
        case CLEAR_CART:
            return state = []
    }
    return state;
}

export default cartItems;