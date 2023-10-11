import { useReducer } from 'react';

interface Item {
    id: number;
    name: string;
    price: string;
}

interface CartItem extends Item {
    quantity: number;
}

const actionTypes = {
    ADD_TO_CART: 'ADD_TO_CART1',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
    DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
} as const;

type ActionTypes = typeof actionTypes;

type Action = {
    type: ActionTypes[keyof ActionTypes];
    item: Item;
} | {
    type: 'CLEAR_CART'
}

const items: Item[] = [
    { id: 1, name: 'Laptop', price: '1200' },
    { id: 2, name: 'Smartphone', price: '750' },
    { id: 3, name: 'Coffee Maker', price: '50' },
    { id: 4, name: 'Camera', price: '500' },
    { id: 5, name: 'Headphones', price: '35' },
    { id: 6, name: 'Tablet', price: '300' },
    { id: 7, name: 'Desk Chair', price: '110' },
    { id: 8, name: 'Television', price: '650' },
    { id: 9, name: 'Gaming Console', price: '400' },
    { id: 10, name: 'Blender', price: '80' },
    { id: 11, name: 'Toaster', price: '25' },
    { id: 12, name: 'Vacuum Cleaner', price: '150' },
    { id: 13, name: 'Hiking Boots', price: '120' },
    { id: 14, name: 'Dining Table', price: '300' },
    { id: 15, name: 'Refrigerator', price: '800' },
    { id: 16, name: 'Microwave Oven', price: '100' },
    { id: 17, name: 'Fitness Tracker', price: '60' },
    { id: 18, name: 'Sofa', price: '700' },
    { id: 19, name: 'Washing Machine', price: '450' },
    { id: 20, name: 'Coffee Table', price: '120' }];



const cartReducer = (state: CartItem[], action: Action) => {
    switch (action.type) {

        case actionTypes.ADD_TO_CART:
            const existingItem = state.find(item => item.id === action.item.id);
            if (existingItem) {
                return state.map(item =>
                    item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...state, { ...action.item, quantity: 1 }];
            }

        case actionTypes.REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.item.id);

        case actionTypes.INCREMENT_QUANTITY:
            return state.map(item =>
                item.id === action.item.id ? { ...item, quantity: item.quantity + 1 } : item
            );

        case actionTypes.DECREMENT_QUANTITY:
            return state.map(item =>
                item.id === action.item.id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                    : item
            ).filter(item => item.quantity > 0);

        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

const ShoppingCart = () => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    const addToCart = (item: Item) => {
        dispatch({ type: 'ADD_TO_CART1', item });
    };

    const removeFromCart = (item: Item) => {
        dispatch({ type: 'REMOVE_FROM_CART', item });
    };

    const incrementQuantity = (item: Item) => {
        dispatch({ type: 'INCREMENT_QUANTITY', item });
    };

    const decrementQuantity = (item: Item) => {
        dispatch({ type: 'DECREMENT_QUANTITY', item });
    };

    const clearCart = () => {
        dispatch({
            type: 'CLEAR_CART'
        });
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h3>Cart</h3>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} - Quantity: {item.quantity}
                        <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
                        <button onClick={() => incrementQuantity(item)}>+</button>
                        <button onClick={() => decrementQuantity(item)}>-</button>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
};

export default ShoppingCart;
