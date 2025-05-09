"use client"

import { useAppSelector } from '@/lib/hooks';
import { selectCartItems, selectCartTotal, selectCartInitialized } from '@/lib/features/cart/cartSlice';
import NavHeader from '@/components/navigation';
import CheckoutField, { CheckoutFormRef } from '@/components/checkoutForm';
import Footer from '@/components/footer';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_StripePublishableKey!);

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const isInitialized = useAppSelector(selectCartInitialized);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const formRef = useRef<CheckoutFormRef>(null);

  useEffect(() => {
    if (isInitialized) {
      console.log('Cart items:', items);
      console.log('Cart initialized:', isInitialized);
      
      if (items.length === 0) {
        console.log('No items in cart, redirecting...');
        router.push('/');
      } else {
        console.log('Items found in cart:', items);
        setIsLoading(false);
      }
    }
  }, [items, router, isInitialized]);

  const handleFormSubmit = (data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    referEmail?: string;
    message?: string;
  }) => {
    handleCheckout(data);
  };

  const handleCheckout = async (formData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    referEmail?: string;
    message?: string;
  }) => {
    setIsProcessing(true);
    setStatus({ type: null, message: '' });

    try {
      // Verify email first
      // const userType = items[0]?.plan === 'Free Trial' ? 'REVIT' : 'QNECT';
      const verifyResponse = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          userType: 'QNECT'
        }),
      });

      const verifyData = await verifyResponse.json();
      if (!verifyData.success) {
        throw new Error(verifyData.message || 'Email verification failed');
      }

      // Check if it's a free trial
      const isFreeTrial = items.length === 1 && items[0].plan === 'Free Trial';

      if (isFreeTrial) {
        // Process free trial directly
        const response = await fetch('/api/free-trial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              username: formData.username,
              email: formData.email,
              referEmail: formData.referEmail,
              message: formData.message
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to process free trial');
        }

        setStatus({
          type: 'success',
          message: 'Free trial activated successfully! You will receive an email with instructions shortly.'
        });
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          router.push('/success');
        }, 3000);
        return;
      }

      // For paid items, require Autodesk token
      const autodeskToken = sessionStorage.getItem('autodesk_token');
      if (!autodeskToken) {
        throw new Error('Autodesk authentication required');
      }

      // Create Stripe checkout session
      const response = await fetch('/api/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            referEmail: formData.referEmail,
            message: formData.message
          },
          autodesk_token: autodeskToken
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        await stripe.redirectToCheckout({
          sessionId,
        });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred during checkout. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProceedToCheckout = () => {
    if (formRef.current) {
      const isValid = formRef.current.validateForm();
      if (isValid) {
        const formData = formRef.current.getFormData();
        handleCheckout(formData);
      }
    }
  };

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <div className='bg-[#111] h-[70px] w-full'>
        <NavHeader />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold sm:mb-7 mb-5">Checkout</h1>

        {status.type && (
          <div className={`mb-6 p-4 rounded-lg ${
            status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className="flex items-center">
              <FontAwesomeIcon 
                icon={status.type === 'success' ? faCheckCircle : faExclamationCircle} 
                className="mr-2"
              />
              <span>{status.message}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          <div className='lg:col-span-7 md:col-span-6 col-span-12 md:order-1 order-2'>
            <CheckoutField ref={formRef} onFormSubmit={handleFormSubmit} />
          </div>

          <div className='lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-1'>
            <div className="lg:col-span-5 md:col-span-6 col-span-12 md:order-2 order-1 space-y-6 border border-[#e5e7eb] py-4 px-5 rounded">
            <h2 className="md:text-2xl text-xl font-semibold">Order Summary</h2>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">{item.plan}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              disabled={isProcessing}
              className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : total === 0 ? (
                'Get Free Trial'
              ) : (
                'Proceed to Payment'
              )}
            </button>
          </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
