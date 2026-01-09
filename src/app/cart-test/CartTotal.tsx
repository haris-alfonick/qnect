// components/cart/CartTotals.tsx

export default function CartTotals() {
  return (
    <div className="w-full max-w-[992px] bg-white border rounded-lg p-4 h-fit">
      <h3 className="text-lg font-semibold mb-4">Cart Totals</h3>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Revit (1x)</span>
          <span>$599.00</span>
        </div>

        <div className="flex justify-between">
          <span>Token (1x)</span>
          <span>$4,750</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>$0.00</span>
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold text-base text-black">
          <span>Total</span>
          <span>$5,349 USD</span>
        </div>
      </div>

      <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition ">
        Proceed to Payment
      </button>
    </div>
  )
}
