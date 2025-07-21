import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const CartContext = createContext();

// Cart action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  APPLY_COUPON: 'APPLY_COUPON',
  REMOVE_COUPON: 'REMOVE_COUPON'
};

// Available coupons
const AVAILABLE_COUPONS = {
  'WELCOME10': { discount: 10, type: 'percentage', description: '10% off your first order' },
  'SAVE20': { discount: 20, type: 'fixed', description: '$20 off orders over $100' },
  'FREESHIP': { discount: 0, type: 'shipping', description: 'Free shipping on any order' }
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload }]
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        coupon: null
      };
    
    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || [],
        coupon: action.payload.coupon || null
      };
    
    case CART_ACTIONS.APPLY_COUPON:
      if (AVAILABLE_COUPONS[action.payload]) {
        return {
          ...state,
          coupon: {
            code: action.payload,
            ...AVAILABLE_COUPONS[action.payload]
          }
        };
      }
      return state;
    
    case CART_ACTIONS.REMOVE_COUPON:
      return {
        ...state,
        coupon: null
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  coupon: null
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state));
  }, [state]);

  // Cart calculations
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  
  // Shipping calculation (free over $50)
  const shippingCost = cartTotal >= 50 || (state.coupon?.type === 'shipping') ? 0 : 9.99;
  
  // Discount calculation
  let discountAmount = 0;
  if (state.coupon) {
    if (state.coupon.type === 'percentage') {
      discountAmount = (cartTotal * state.coupon.discount) / 100;
    } else if (state.coupon.type === 'fixed' && cartTotal >= 100) {
      discountAmount = state.coupon.discount;
    }
  }
  
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  // Cart actions
  const addToCart = useCallback((product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        quantity
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: productId
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, []);

  const applyCoupon = useCallback((couponCode) => {
    const upperCode = couponCode.toUpperCase();
    if (AVAILABLE_COUPONS[upperCode]) {
      dispatch({
        type: CART_ACTIONS.APPLY_COUPON,
        payload: upperCode
      });
      return { success: true, message: 'Coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code' };
  }, []);

  const removeCoupon = useCallback(() => {
    dispatch({ type: CART_ACTIONS.REMOVE_COUPON });
  }, []);

  const isInCart = useCallback((productId) => {
    return state.items.some(item => item.id === productId);
  }, [state.items]);

  const getItemQuantity = useCallback((productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [state.items]);

  const value = {
    // State
    items: state.items,
    coupon: state.coupon,
    itemCount,
    cartTotal,
    shippingCost,
    discountAmount,
    finalTotal,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    isInCart,
    getItemQuantity,
    
    // Available coupons for display
    availableCoupons: AVAILABLE_COUPONS
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
