"use client"

import { useAppSelector } from '@/lib/hooks';
import { selectCartItems, selectCartTotal } from '@/lib/features/cart/cartSlice';
import NavHeader from '@/components/navigation';
import CheckoutField from '@/components/checkoutForm';

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  // const [isProcessing, setIsProcessing] = useState(false);

  // const handleCheckout = async () => {
  //   try {
  //     setIsProcessing(true);
  //     const response = await fetch('/api/checkout-session', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         items: items.map(item => ({
  //           name: item.name,
  //           price: item.price,
  //           quantity: item.quantity,
  //         })),
  //       }),
  //     });

  //     const { sessionId } = await response.json();
      
  //     // Redirect to Stripe Checkout
  //     window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //     alert('An error occurred during checkout. Please try again.');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <>
    <div className='bg-[#111] h-[70px] w-full'>
    <NavHeader />
    </div>
    <div className="container mx-auto px-4 py-8">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold sm:mb-7 mb-5">Checkout</h1>

      <div className="grid grid-cols-12 gap-8">

        <div className='lg:col-span-7 md:col-span-6 col-span-12 md:order-1 order-2'>
          <CheckoutField />
        </div>

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
        </div>

        {/* <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Payment Information</h2>
      
      <div className="p-6 border rounded-lg bg-gray-50">
        <p className="text-gray-600 mb-4">
          You will be redirected to Stripe Checkout to complete your payment securely.
        </p>
        
        <button
          onClick={handleCheckout}
          disabled={isProcessing || items.length === 0}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
              Processing...
            </span>
          ) : (
            'Proceed to Payment'
          )}
        </button>
      </div>
    </div> */}
      </div>
    </div>
    </>
  );
}
