import { createContext, useContext, useReducer, useEffect } from 'react';

const CheckoutContext = createContext();

// Checkout action types
const CHECKOUT_ACTIONS = {
  SET_STEP: 'SET_STEP',
  UPDATE_CHECKOUT_DATA: 'UPDATE_CHECKOUT_DATA',
  SET_ERRORS: 'SET_ERRORS',
  RESET_CHECKOUT: 'RESET_CHECKOUT'
};

// Initial state
const initialState = {
  currentStep: 1,
  totalSteps: 4,
  checkoutData: {
    // Shipping Address
    shippingAddress: {
      fullName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    // Billing Address
    billingAddress: {
      fullName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    sameAsShipping: true,
    // Shipping Options
    shippingOption: '',
    shippingCost: 0,
    // Payment
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false,
    // Additional
    orderNotes: ''
  },
  errors: {},
  timestamp: Date.now()
};

// Checkout reducer
const checkoutReducer = (state, action) => {
  switch (action.type) {
    case CHECKOUT_ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
        timestamp: Date.now()
      };

    case CHECKOUT_ACTIONS.UPDATE_CHECKOUT_DATA:
      return {
        ...state,
        checkoutData: {
          ...state.checkoutData,
          ...action.payload
        },
        timestamp: Date.now()
      };

    case CHECKOUT_ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case CHECKOUT_ACTIONS.RESET_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

// Validation functions
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\D/g, ''));
};

const validateZipCode = (zipCode) => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

const validateCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanNumber);
};

const validateExpiryDate = (expiryDate) => {
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (month < 1 || month > 12) return false;
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
  
  return true;
};

const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

// Step validation functions
const validateShippingAddress = (address) => {
  const errors = {};
  
  if (!address.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (!address.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(address.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!address.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(address.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!address.street.trim()) {
    errors.street = 'Street address is required';
  }
  
  if (!address.city.trim()) {
    errors.city = 'City is required';
  }
  
  if (!address.state.trim()) {
    errors.state = 'State is required';
  }
  
  if (!address.zipCode.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!validateZipCode(address.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP code';
  }
  
  return errors;
};

const validateBillingAddress = (billingData, sameAsShipping) => {
  if (sameAsShipping) return {};
  
  const errors = {};
  const { billingAddress } = billingData;
  
  if (!billingAddress.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }
  
  if (!billingAddress.street.trim()) {
    errors.street = 'Street address is required';
  }
  
  if (!billingAddress.city.trim()) {
    errors.city = 'City is required';
  }
  
  if (!billingAddress.state.trim()) {
    errors.state = 'State is required';
  }
  
  if (!billingAddress.zipCode.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!validateZipCode(billingAddress.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP code';
  }
  
  return errors;
};

const validateShippingOptions = (shippingOption) => {
  const errors = {};
  
  if (!shippingOption) {
    errors.shippingOption = 'Please select a shipping option';
  }
  
  return errors;
};

const validatePaymentInfo = (paymentData) => {
  const errors = {};
  
  if (!paymentData.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
    return errors;
  }
  
  if (paymentData.paymentMethod === 'card') {
    if (!paymentData.cardNumber || !validateCardNumber(paymentData.cardNumber)) {
      errors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!paymentData.expiryDate || !validateExpiryDate(paymentData.expiryDate)) {
      errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!paymentData.cvv || !validateCVV(paymentData.cvv)) {
      errors.cvv = 'Please enter a valid CVV';
    }
    
    if (!paymentData.cardholderName.trim()) {
      errors.cardholderName = 'Please enter the cardholder name';
    }
  }
  
  return errors;
};

// Checkout provider component
export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('checkout-data', JSON.stringify(state));
  }, [state]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('checkout-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Only restore if it's recent (within last hour)
        const hourAgo = Date.now() - (60 * 60 * 1000);
        if (parsedData.timestamp && parsedData.timestamp > hourAgo) {
          dispatch({ type: CHECKOUT_ACTIONS.UPDATE_CHECKOUT_DATA, payload: parsedData.checkoutData });
          if (parsedData.currentStep) {
            dispatch({ type: CHECKOUT_ACTIONS.SET_STEP, payload: parsedData.currentStep });
          }
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
      }
    }
  }, []);

  const updateCheckoutData = (data) => {
    dispatch({ type: CHECKOUT_ACTIONS.UPDATE_CHECKOUT_DATA, payload: data });
  };

  const setStep = (step) => {
    dispatch({ type: CHECKOUT_ACTIONS.SET_STEP, payload: step });
  };

  const setErrors = (errors) => {
    dispatch({ type: CHECKOUT_ACTIONS.SET_ERRORS, payload: errors });
  };

  const resetCheckout = () => {
    dispatch({ type: CHECKOUT_ACTIONS.RESET_CHECKOUT });
    localStorage.removeItem('checkout-data');
  };

  const validateCurrentStep = () => {
    let errors = {};
    
    switch (state.currentStep) {
      case 1: // Shipping Address
        errors = validateShippingAddress(state.checkoutData.shippingAddress);
        break;
      case 2: // Billing Address
        errors = validateBillingAddress(state.checkoutData, state.checkoutData.sameAsShipping);
        break;
      case 3: // Shipping Options
        errors = validateShippingOptions(state.checkoutData.shippingOption);
        break;
      case 4: // Payment
        errors = validatePaymentInfo(state.checkoutData);
        break;
      default:
        break;
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && state.currentStep < state.totalSteps) {
      setStep(state.currentStep + 1);
      return true;
    }
    return false;
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      setStep(state.currentStep - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const processPayment = async (paymentData, orderTotal) => {
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { paymentMethod } = paymentData;
      
      if (paymentMethod === 'card') {
        const { cardNumber, expiryDate, cvv, cardholderName } = paymentData;
        
        // Basic validation
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
          throw new Error('Invalid card number');
        }
        if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
          throw new Error('Invalid expiry date');
        }
        if (!cvv || cvv.length < 3) {
          throw new Error('Invalid CVV');
        }
        if (!cardholderName.trim()) {
          throw new Error('Cardholder name required');
        }
        
        // Simulate payment gateway response
        const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Simulate success/failure (90% success rate)
        if (Math.random() < 0.9) {
          return {
            success: true,
            transactionId,
            method: 'card',
            amount: orderTotal,
            last4: cardNumber.slice(-4),
            cardType: getCardType(cardNumber),
            processedAt: new Date().toISOString()
          };
        } else {
          throw new Error('Payment declined. Please try again or use a different card.');
        }
      }
      
      if (paymentMethod === 'paypal') {
        // Simulate PayPal processing
        const transactionId = `pp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
          success: true,
          transactionId,
          method: 'paypal',
          amount: orderTotal,
          processedAt: new Date().toISOString()
        };
      }
      
      if (paymentMethod === 'upi') {
        // Simulate UPI processing
        const transactionId = `upi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
          success: true,
          transactionId,
          method: 'upi',
          amount: orderTotal,
          processedAt: new Date().toISOString()
        };
      }
      
      throw new Error('Unsupported payment method');
      
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Payment processing failed'
      };
    }
  };

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5') || number.startsWith('2')) return 'Mastercard';
    if (number.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  const processOrder = async () => {
    if (!validateCurrentStep()) {
      return { success: false, error: 'Please fix the validation errors' };
    }

    try {
      // Get cart items and calculate total
      const cartItems = JSON.parse(localStorage.getItem('cart-items') || '[]');
      const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Process payment first
      console.log('Processing payment...', state.checkoutData);
      const paymentResult = await processPayment(state.checkoutData, cartTotal);
      
      if (!paymentResult.success) {
        return { success: false, error: paymentResult.error };
      }
      
      // If payment successful, create order
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const orderData = {
        orderId,
        ...state.checkoutData,
        items: cartItems,
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        payment: paymentResult,
        totals: {
          subtotal: cartTotal,
          shipping: parseFloat(state.checkoutData.shippingOption?.price || 0),
          tax: cartTotal * 0.08, // 8% tax
          total: cartTotal + parseFloat(state.checkoutData.shippingOption?.price || 0) + (cartTotal * 0.08)
        }
      };
      
      // Save order to localStorage (in real app, this would be sent to backend)
      const existingOrders = JSON.parse(localStorage.getItem('user-orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('user-orders', JSON.stringify(existingOrders));
      
      // Clear cart and checkout data
      localStorage.removeItem('cart-items');
      localStorage.removeItem('cart-coupons');
      resetCheckout();
      
      return { success: true, orderId, orderData, payment: paymentResult };
    } catch (error) {
      console.error('Order processing error:', error);
      return { success: false, error: 'Failed to process order. Please try again.' };
    }
  };

  const value = {
    // State
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    checkoutData: state.checkoutData,
    errors: state.errors,
    
    // Actions
    updateCheckoutData,
    setStep,
    setErrors,
    resetCheckout,
    
    // Helpers
    validateCurrentStep,
    nextStep,
    prevStep,
    processOrder,
    processPayment
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use checkout context
export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export default CheckoutContext;
