// components/cart/CartTable.tsx
'use client'

import { useState } from 'react'
import CartItem from './CartItem'

export default function CartTable () {
  const [rows, setRows] = useState([
    { id: '1', name: 'Revit (Express Plan · 01 Year)', price: 599 },
    { id: '2', name: 'Token (5000 token)', price: 4750 }
  ])

  const removeRow = (id: string) => {
    setRows(prev => prev.filter(row => row.id !== id))
  }

  return (
    <div className='lg:col-span-2 bg-white border rounded-lg relative'>
      <div className='hidden sm:grid grid-cols-12 bg-gray-100 py-3 px-5 border-b text-sm font-medium text-gray-700'>
        <div className='col-span-5'>Products</div>
        <div className='col-span-1 text-center'>Price</div>
        <div className='col-span-3 text-end'>Quantity</div>
        <div className='col-span-2 text-right'>Sub-Total</div>
      </div>

      {rows.map(row => (
        <CartItem key={row.id} row={row} onRemove={removeRow} />
      ))}

      {rows.length === 0 && (
        <p className='py-10 text-center text-gray-500'>Your cart is empty.</p>
      )}

      <div className='mx-4 my-4 lg:absolute bottom-0 left-0'>
        <button className='border px-4 py-2 rounded-md text-sm hover:bg-gray-100'>
          ← Back to Pricing
        </button>
      </div>
    </div>
  )
}
