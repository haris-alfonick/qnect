'use client'
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const CartComp = () => {
  const [IsCartOpen, setIsCartOpen] = useState(false)
  return(
    <>
      {IsCartOpen && (
        <div className='bg-black/75 z-30 h-screen w-full fixed'>
          <div className='px-6 py-4 bg-white fixed right-0 top-0 rounded-lg shadow-lg overflow-y-auto h-full' style={{scrollbarWidth: 'none',}}>
            <div className='flex items-center justify-between mb-4 border-b pb-3 [&_strong]:text-xl [&_strong]:pl-2 [&_strong]:font-semibold'>
              <div className='[&_svg]:text-[#028A1B]'>
                <FontAwesomeIcon icon={faCircleCheck} />
                <strong>Added to cart</strong>
              </div>
              <button onClick={() => setIsCartOpen(false)}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='h-6 w-auto text-black'
                />
              </button>
            </div>

            <div className='flex flex-col gap-4'>
              <div className='border-b pb-4 [&_strong]:font-semibold'>
                <strong>New Subscription</strong>

                <div className='flex justify-between items-center gap-4'>
                  <div className='flex items-center gap-x-3'>
                    <Image
                      src='/images/revit.png'
                      alt=''
                      width={120}
                      height={40}
                      className='w-8 h-8'
                    />
                    <p className='font-medium'>Revit</p>
                  </div>

                  <div className='flex flex-col'>
                    <span className='text-[10px] text-gray-500'>
                      1 Year Payment
                    </span>
                    <span className='font-semibold text-lg'>$1900.00</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mt-2 [&_p]:pb-1'>
                  <div className='flex items-center gap-x-4 [&_select]:w-[100px] [&_select]:border [&_select]:rounded [&_select]:py-1 [&_select]:px-2'>
                    <div>
                      <p>Plan</p>
                      <select>
                        <option>Pro</option>
                        <option>Basic</option>
                      </select>
                    </div>
                    <div>
                      <p>Quantity</p>
                      <div className='flex h-[34px] justify-start items-center border rounded [&_button]:px-2 w-fit [&_span]:px-4 [&_button]:text-[#D05129]'>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[10px] text-gray-500'>Total Price</span>
                    <span className='font-semibold text-lg'>$1900.00</span>
                  </div>
                </div>

                <button className='text-[#DF0000] text-sm mt-2 underline'>
                  Remove
                </button>
              </div>

              <div className='border-b pb-4'>
                <div className='flex justify-between items-center gap-4'>
                  <div className='flex items-center gap-x-3'>
                    <Image
                      src='/images/coin.png'
                      alt='image'
                      width={120}
                      height={40}
                      className='w-8 h-8'
                    />
                    <p className='font-medium'>Token</p>
                  </div>

                  <div className='flex flex-col'>
                    <span className='text-[10px] text-gray-500'>
                      15,000 TOKEN
                    </span>
                    <span className='font-semibold text-lg'>$4,750.00</span>
                  </div>
                </div>

                <div className='flex justify-between flex-row items-end'>
                  <div className='[&_p]:pb-1'>
                    <p>Quantity</p>
                    <div className='flex h-[34px] justify-start items-center border rounded [&_button]:text-[#D05129] [&_button]:px-2 w-fit [&_span]:px-4'>
                      <button>-</button>
                      <span>1</span>
                      <button>+</button>
                    </div>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[10px] text-gray-500'>Total Price</span>
                    <span className='font-semibold text-lg'>$4,750.00</span>
                  </div>
                </div>
                <button className='text-[#DF0000] text-sm mt-2 underline'>
                  Remove
                </button>
              </div>
            </div>

            <div className='mt-4 [&_strong]:font-semibold'>
              <strong>Send Reward to Friend</strong>
              <input
                type='email'
                placeholder='Enter Email Address'
                className='w-full border px-2 py-1 rounded-lg mt-2'
              />
            </div>
            <div className='flex flex-col mt-4 [&_p]:text-gray-500 [&_button]:bg-black [&_button]:text-white [&_button]:rounded [&_button]:py-2 [&_button]:mt-4'>
              <div className='flex flex-row items-center justify-between font-semibold'>
                <span>SUBTOTAL</span>
                <span>$6,650.00</span>
              </div>
              <p className='text-sm'>Tax is calculated at checkout</p>
              <button>Checkout</button>
              <p className='text-xs mt-2'>
                Credit and debit cards, PayPal, bank payments, and ACH accepted.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartComp;