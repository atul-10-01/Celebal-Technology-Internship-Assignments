import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';
import ShippingForm from './checkout/ShippingForm';
import BillingForm from './checkout/BillingForm';
import ShippingOptions from './checkout/ShippingOptions';
import PaymentForm from './checkout/PaymentForm';
import OrderSummary from './checkout/OrderSummary';
import PaymentStatusModal from './PaymentStatusModal';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, itemCount } = useCart();
  const {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    setStep,
    validateCurrentStep,
    resetCheckout,
    processOrder
  } = useCheckout();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing', 'success', 'failed'
  const [paymentData, setPaymentData] = useState(null);
  const [paymentError, setPaymentError] = useState(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (itemCount === 0) {
      navigate('/');
    }
  }, [itemCount, navigate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't reset if we're just navigating between steps
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/checkout')) {
        resetCheckout();
      }
    };
  }, []);

  const steps = [
    { number: 1, title: 'Shipping', component: ShippingForm },
    { number: 2, title: 'Billing', component: BillingForm },
    { number: 3, title: 'Delivery', component: ShippingOptions },
    { number: 4, title: 'Payment', component: PaymentForm }
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        nextStep();
      }
    } else {
      handleCompleteOrder();
    }
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    setPaymentStatus('processing');
    setPaymentError(null);
    
    try {
      const result = await processOrder();
      
      if (result.success) {
        setPaymentStatus('success');
        setPaymentData(result.payment);
        
        // Auto redirect after 3 seconds or wait for user to click continue
        setTimeout(() => {
          navigate(`/order-confirmation?orderId=${result.orderId}`);
        }, 3000);
      } else {
        setPaymentStatus('failed');
        setPaymentError(result.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error('Order processing error:', error);
      setPaymentStatus('failed');
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentRetry = () => {
    setPaymentStatus(null);
    setPaymentError(null);
    setPaymentData(null);
  };

  const handlePaymentModalClose = () => {
    if (paymentStatus === 'success' && paymentData) {
      // Navigate to order confirmation if payment was successful
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('orderId') || 'unknown';
      navigate(`/order-confirmation?orderId=${orderId}`);
    } else {
      // Just close the modal for failed payments
      setPaymentStatus(null);
      setPaymentError(null);
      setPaymentData(null);
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      // Allow going back to previous steps
      setStep(stepNumber);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shopping
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.number)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    step.number < currentStep
                      ? 'bg-green-600 border-green-600 text-white cursor-pointer'
                      : step.number === currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {step.number < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </button>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step.number <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-px mx-4 ${
                      step.number < currentStep ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Content */}
              {CurrentStepComponent && <CurrentStepComponent />}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Order
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>

      {/* Payment Status Modal */}
      <PaymentStatusModal
        isOpen={paymentStatus !== null}
        onClose={handlePaymentModalClose}
        onRetry={handlePaymentRetry}
        status={paymentStatus}
        paymentData={paymentData}
        error={paymentError}
      />
    </div>
  );
};

export default Checkout;
