import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, CreditCard, Loader2, X } from 'lucide-react';

const PaymentStatusModal = ({ isOpen, onClose, onRetry, status, paymentData, error }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [status]);

  if (!isOpen) return null;

  const getStatusContent = () => {
    switch (status) {
      case 'processing':
        return {
          icon: <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />,
          title: 'Processing Payment',
          description: 'Please wait while we process your payment...',
          bgColor: 'bg-blue-50',
          showProgress: true
        };
      case 'success':
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-600" />,
          title: 'Payment Successful!',
          description: 'Your payment has been processed successfully.',
          bgColor: 'bg-green-50'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-12 h-12 text-red-600" />,
          title: 'Payment Failed',
          description: error || 'Your payment could not be processed.',
          bgColor: 'bg-red-50'
        };
      default:
        return null;
    }
  };

  const content = getStatusContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Status</h3>
          {status !== 'processing' && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className={`${content.bgColor} rounded-lg p-6 text-center mb-6`}>
          <div className="mb-4">
            {content.icon}
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {content.title}
          </h4>
          <p className="text-gray-600 mb-4">
            {content.description}
          </p>

          {/* Progress Bar for Processing */}
          {content.showProgress && (
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Payment Details for Success */}
          {status === 'success' && paymentData && (
            <div className="bg-white rounded-lg p-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Payment Details</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="text-gray-900 font-mono">{paymentData.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="text-gray-900 capitalize">{paymentData.method}</span>
                </div>
                {paymentData.last4 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Card:</span>
                    <span className="text-gray-900">****{paymentData.last4}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="text-gray-900 font-semibold">${paymentData.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {status === 'failed' && (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {status === 'success' && (
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Continue to Order Confirmation
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusModal;
