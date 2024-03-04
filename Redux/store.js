import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension'
import cartItems from './Reducers/cartItem';
import order from './Reducers/order';

const reducers = combineReducers({ cartItems: cartItems, order:order });

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;