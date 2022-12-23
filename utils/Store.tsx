import { createContext, useReducer } from 'react';

export const Store = createContext({}); // Create a context object to allow state to be passed to the component tree.

const initialState = { // Define the initial state of the store.
    cart: { cartItems: [] },
}

function reducer(state, action) { // Define a reducer function to update the store.
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            const newItem = action.payload; // Get the new item from the action payload.
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug); // Checks if the item already exists in the cart.

            // checks if newItem already exists in cart, if so, updates quantity, otherwise adds newItem to cartItems array
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) : [...state.cart.cartItems, newItem];
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        default:
            return state;
    }
}

// @ts-ignore
export function StoreProvider({ children }) { // The StoreProvider component wraps the component tree and passes the store to the component tree.
    const [state, dispatch] = useReducer(reducer, initialState); // Define a reducer hook to manage the state of the store.
    const value = { state, dispatch }; // Define the value of the context object.
    return <Store.Provider value={value}>{children}</Store.Provider>; // Pass the store to the component tree.
}
