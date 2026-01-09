// components/cart/CartRow.tsx
'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  row: {
    id: string
    name: string
    price: number
  }
  onRemove: (id: string) => void
}

export default function CartRow({ row, onRemove }: Props) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="relative grid grid-cols-12 gap-x-4 gap-y-2 px-4 max-sm:pb-0.5 py-4 border-b last:border-b-0 items-start sm:items-center [&_p]:text-gray-700 [&_p]:text-sm">
      <div className="col-span-12 sm:col-span-5 flex items-start sm:items-center gap-4">
        {/* Remove */}
        <button
          onClick={() => onRemove(row.id)}
          className="text-[15px] text-[#CF5127] hover:text-white absolute right-4 sm:bottom-0 bottom-auto m-auto sm:top-0 top-3.5 sm:[&_svg]:w-3.5 sm:[&_svg]:h-3.5 [&_svg]:w-3 [&_svg]:h-3 hover:bg-[#CF5127] border-[#CF5127] border w-fit h-fit rounded-full sm:px-1 px-1.5">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {/* Placeholder Image / Icon */}
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center font-semibold">
          R
        </div>

        {/* Product Name */}
        <div className="space-y-1 pr-6 sm:pr-0">
          <p className="font-medium leading-4 sm:leading-5">
            {row.name}
          </p>
        </div>
      </div>

      {/* Price */}
      <div className=" col-span-12 sm:col-span-1 flex justify-between sm:block border-t sm:border-t-0 pt-2 sm:pt-0">
        <p className="text-xs font-semibold sm:hidden">Price</p>
        <p className="sm:text-center">
          ${row.price.toLocaleString()}
        </p>
      </div>

      {/* Quantity */}
      <div className=" col-span-12 sm:col-span-3 flex justify-between sm:block border-t sm:border-t-0 pt-2 sm:pt-0">
        <p className="text-xs font-semibold sm:hidden content-center">Quantity</p>

        <div className="sm:flex sm:justify-end">
          <div className="flex items-center border rounded-md overflow-hidden">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-2.5 py-1"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <span className="px-2 py-1 text-sm">
              {String(quantity).padStart(2, '0')}
            </span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-2.5 py-1"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>

      {/* Subtotal */}
      <div className="col-span-12 sm:col-span-2 flex justify-between sm:block border-t sm:border-t-0 pt-2 sm:pt-0">
        <p className="text-xs font-semibold sm:hidden">Subtotal</p>
        <p className="font-medium sm:text-right">
          ${(row.price * quantity).toLocaleString()}
        </p>
      </div>

      {/* Product / Remove / Name */}
      <div className="col-span-12 sm:col-span-1">

        </div>
    </div>
  )
}
