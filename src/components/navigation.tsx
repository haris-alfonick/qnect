'use client'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faBars,
  faBasketShopping,
  faCircleCheck,
  faMagnifyingGlass,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { removeFromCart, setCartOpen, toggleCart, updateQuantity } from '@/lib/features/cart/cartSlice'
import CheckoutButton from './CheckoutButton'

// LoadStripe
// import {loadStripe} from '@stripe/stripe-js';
// import {EmbeddedCheckoutProvider, EmbeddedCheckout} from '@stripe/react-stripe-js'

const NavHeader = () => {
  // const stripePromise = loadStripe(
  //   process.env.NEXT_PUBLIC_StripePublishableKey!
  // );

  // const fetchClientSecret = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({id: 1})
  //     })
  //     const data = await response.json();
  //     console.log(data)
  //     if(data?.error){
  //       throw new Error("Something went wrong");
  //     }
  //     return data.id
  //   } catch (error) {
  //     throw error;
  //   }
  // }, [])

  // const options = {fetchClientSecret}

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSoftwareDropdownOpen, setIsSoftwareDropdownOpen] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  // const [IsCartOpen, setIsCartOpen] = useState(false)
  const cartItemsData = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const isCartOpen = useAppSelector((state) => state.cart.isCartOpen)

  return (
    <>
      {isCartOpen && (
        <div className='bg-black/75 z-30 h-screen w-full fixed'>
          <div className='px-6 py-4 bg-white fixed right-0 top-0 rounded-lg shadow-lg overflow-y-auto h-full' style={{scrollbarWidth: 'none',}}>
            <div className='flex items-center justify-between mb-4 border-b pb-3 [&_strong]:text-xl [&_strong]:pl-2 [&_strong]:font-semibold'>
              <div className='[&_svg]:text-[#028A1B]'>
                <FontAwesomeIcon icon={faCircleCheck} />
                <strong>Added to cart</strong>
              </div>
              <button onClick={() => dispatch(setCartOpen(false))}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='h-6 w-auto text-black'
                />
              </button>
            </div>

            <div className='flex flex-col gap-4'>
              {cartItemsData.map((item, index) => (
                <div key={index} className='border-b pb-4 [&_strong]:font-semibold'>
                  <strong>New Subscription</strong>

                  <div className='flex justify-between items-center gap-4'>
                    <div className='flex items-center gap-x-3'>
                      <Image
                        src={`/images/${item.name == 'Revit' ? 'revit' : 'coin'}.png`}
                        alt=''
                        width={120}
                        height={40}
                        className='w-8 h-8'
                      />
                      <p className='font-medium'>{item.name}</p>
                    </div>

                    <div className='flex flex-col'>
                      <span className='text-[10px] text-gray-500'>
                        1 Year Payment
                      </span>
                      <span className='font-semibold text-lg text-end'>
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 [&_p]:pb-1'>
                    <div className='flex items-center gap-x-4 [&_select]:w-[100px] [&_select]:border [&_select]:rounded [&_select]:py-1 [&_select]:px-2'>
                      <div>
                        <p>Plan:</p>
                        <p>{item.plan}</p>
                        {/* <select>
                          <option>Pro</option>
                          <option>Basic</option>
                        </select> */}
                      </div>
                      <div>
                        <p>Quantity</p>
                        <div className='flex h-[34px] justify-start items-center border rounded [&_button]:px-2 w-fit [&_span]:px-4 [&_button]:text-[#D05129]'>
                          <button onClick={() => dispatch(updateQuantity({ id: item.id, type: 'decrement' }))}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => dispatch(updateQuantity({ id: item.id, type: 'increment' }))}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-[10px] text-gray-500 text-end'>Total Price</span>
                      <span className='font-semibold text-lg text-end'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className='text-[#DF0000] text-sm mt-2 underline' onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </div>
              ))}
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
                <span>${cartItemsData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
              </div>
              <p className='text-sm'>Tax is calculated at checkout</p>
              <CheckoutButton />
              {/* <button>Checkout</button> */}
              <p className='text-xs mt-2'>
                Credit and debit cards, PayPal, bank payments, and ACH accepted.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-between py-4 sm:px-6 px-4 bg-transparent absolute top-0 z-10 w-full'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={125}
          height={100}
          className='mr-10'
        />

        <nav className='hidden lg:flex mr-auto'>
          <ul className='navMainLi flex space-x-4 lg:text-[13px] xl:text-[15px] [&>li]:text-white [&_ul_li]:text-[#333]'>
            <li className='relative border-b-2 border-[#85C451]'
                onClick={() =>
                  setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)
                }
              >
                Software & Services
                <FontAwesomeIcon icon={faAngleDown} width={16} height={16} className='pl-2' />
          
              {isSoftwareDropdownOpen && (
                <div className='absolute left-0 mt-2 w-52 bg-white shadow-lg rounded p-4 z-30 [&_ul]:flex [&_ul]:flex-col [&_ul]:space-y-2'>
                  <ul className='navMainLi'>
                    <li>
                      <Link href='#'>Early Connected Models</Link>
                    </li>
                    <li>
                      <Link href='#'>Qnect for Autodesk Revit</Link>
                    </li>
                    <li>
                      <Link href='#'>QuickQnect</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href='#'>Projects & Testimonials</Link>
            </li>
            <li>
              <Link href='#'>Video Library</Link>
            </li>
            <li className='relative'
                onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              >
                About Us
                <FontAwesomeIcon icon={faAngleDown} width={16} height={16} className='pl-2' />
              {isAboutDropdownOpen && (
                <div className='absolute mt-2 w-52 bg-white shadow-lg rounded p-4 z-30 [&_ul]:flex [&_ul]:flex-col [&_ul]:space-y-2'>
                  <ul className='navMainLi'>
                    <li>
                      <Link href='#'>Team</Link>
                    </li>
                    <li>
                      <Link href='#'>Careers</Link>
                    </li>
                    <li>
                      <Link href='#'>Contact</Link>
                    </li>
                    <li>
                      <Link href='#'>News/Blogs</Link>
                    </li>
                    <li>
                      <Link href='#'>Qonstruct Audiocast</Link>
                    </li>
                    <li>
                      <Link href='#'>Events</Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link href='#'>Sign In</Link>
            </li>
          </ul>
        </nav>

        <div className='hidden lg:flex items-center xl:space-x-4 space-x-2 xl:ml-8 ml-1 [&_.headerBtn]:px-3.5 [&_.headerBtn]:py-1.5 max-xl:[&_.headerBtn]:py-1.5 max-xl:[&_.headerBtn]:px-2 [&_.headerBtn]:text-[13px] [&_.headerBtn]:text-white [&_.headerBtn]:rounded-full xl:[&_.headerBtn]:text-base [&_.headerBtn]:w-auto '>
          <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              width={'auto'}
              height={20}
              color='white'
            />
          </button>
          <button onClick={() => dispatch(toggleCart())}>
            <FontAwesomeIcon
              icon={faBasketShopping}
              width={'auto'}
              height={20}
              color='white'
            />
          </button>

          <button className='headerBtn border border-transparent bg-[#CF5127] hover:bg-transparent hover:border hover:border-white'>Request Demo</button>
          <button className='headerBtn border border-transparent bg-[#85C451] hover:bg-transparent hover:border hover:border-white'>Contact Us</button>
        </div>

        <div className='lg:hidden [&_svg]:w-auto [&_svg]:h-6 '>
          <button className='pr-3' onClick={() => dispatch(toggleCart())}>
            <FontAwesomeIcon icon={faBasketShopping} color='white' />
          </button>
          <button onClick={() => setIsMenuOpen(true)}>
            <FontAwesomeIcon icon={faBars} color='white' />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='lg:hidden fixed top-0 left-0 bottom-0 w-full h-full bg-white z-30 overflow-y-auto'>
          <div className='flex justify-between items-center p-3 px-4 border-b'>
            <Image
              src='/images/logo.png'
              alt='logo'
              width={125}
              height={100}
              className='mr-10'
            />
            <button onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon
                icon={faXmark}
                className='h-6 w-auto text-black'
              />
            </button>
          </div>

          <nav className='p-4'>
            <ul className='flex flex-col space-y-4 text-[#333333] lg:text-lg text-base max-lg:[&>li>ul>li]:text-base'>
              <li className='flex items-center space-x-2 pb-2'>
                <input
                  type='text'
                  placeholder='Search Here'
                  className='border px-2 py-2 w-full rounded'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </li>
              <li>
                <button
                  onClick={() =>
                    setIsSoftwareDropdownOpen(!isSoftwareDropdownOpen)
                  }
                >
                  Software & Services
                  <FontAwesomeIcon icon={faAngleDown} className='pl-2' />
                </button>
                {isSoftwareDropdownOpen && (
                  <ul className='mt-2 ml-4 space-y-2'>
                    <li>
                      <Link href='#'>Early Connected Models</Link>
                    </li>
                    <li>
                      <Link href='#'>Qnect for Autodesk Revit</Link>
                    </li>
                    <li>
                      <Link href='#'>QuickQnect</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href='#'>Projects & Testimonials</Link>
              </li>
              <li>
                <Link href='#'>Video Library</Link>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                >
                  About Us
                  <FontAwesomeIcon icon={faAngleDown} className='pl-2' />
                </button>
                {isAboutDropdownOpen && (
                  <ul className='mt-2 ml-4 space-y-2'>
                    <li>
                      <Link href='#'>Team</Link>
                    </li>
                    <li>
                      <Link href='#'>Careers</Link>
                    </li>
                    <li>
                      <Link href='#'>Contact</Link>
                    </li>
                    <li>
                      <Link href='#'>News/Blogs</Link>
                    </li>
                    <li>
                      <Link href='#'>Qonstruct Audiocast</Link>
                    </li>
                    <li>
                      <Link href='#'>Events</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href='#'>Sign In</Link>
              </li>
            </ul>

            <div className='mt-4 flex justify-between space-x-3'>
              <button className='bg-[#CF5127] text-white py-2 px-4 rounded-full text-md w-full'>
                Request Demo
              </button>
              <button className='bg-[#85C451] text-white py-2 px-4 rounded-full text-md w-full'>
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
export default NavHeader
