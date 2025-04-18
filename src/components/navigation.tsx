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
import { removeFromCart, setCartOpen, updateQuantity } from '@/lib/features/cart/cartSlice'
// import CheckoutButton from './CheckoutButton'

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
                        {item.plan == "Free Trial" ? '30 Days Free Trial' : '1 Year Payment'}
                      </span>
                      <span className='font-semibold text-lg text-end'>
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className='flex justify-between items-center mt-2 [&_p]:pb-1'>
                    <div className='flex flex-col justify-start items-start gap-x-4 [&_select]:w-[100px] [&_select]:border [&_select]:rounded [&_select]:py-1 [&_select]:px-2'>
                      <div className='flex gap-x-3'>
                        <p>Plan:</p>
                        <p>{item.plan}</p>
                        {/* <select>
                          <option>Pro</option>
                          <option>Basic</option>
                        </select> */}
                      </div>
                      <div className='flex gap-x-3'>
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
              <Link className='bg-[#333] text-white hover:text-[#333] w-full block text-center py-2 rounded-lg' href="/checkout">Checkout</Link>
              {/* <CheckoutButton /> */}
              {/* <button>Checkout</button> */}
              <p className='text-xs mt-2'>
                Credit and debit cards, PayPal, bank payments, and ACH accepted.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className='flex items-center justify-between py-4 sm:px-6 px-4 bg-transparent absolute top-0 z-10 w-full'>
        <Link href="/">
          <Image
            src='/images/logo.png'
            alt='logo'
            width={125}
            height={100}
            className='mr-10'
          />
        </Link>

        <nav className='hidden lg:flex mr-auto'>
          <ul className='navMainLi flex space-x-4 lg:text-[13px] xl:text-[15px] [&>li]:text-white [&_ul_li]:text-[#333]'>
          <li className="relative group border-b-2 border-[#85C451]">
              Software & Services
              <FontAwesomeIcon icon={faAngleDown} width={16} height={16} className="pl-2" />
              
              <div className="absolute left-0 pt-2 w-52  z-30 group-hover:block hidden">
                <ul className="navMainLi bg-white shadow-lg rounded p-4 space-y-1">
                  <li>
                    <Link href="https://www.qnect.com/early-connected-models">Early Connected Models</Link>
                  </li>
                  <li className='group/support relative'>
                    <Link href="/">Qnect for Autodesk Revit</Link>
                    <ul className='group-hover/support:block hidden absolute top-0 -right-36 bg-white shadow-lg rounded p-3'>
                      <li><Link href="https://www.qnect.com/qnect-autodesk-revit/support">Customer Support</Link></li>
                    </ul>
                  </li>
                  <li className='group/release relative'>
                    <Link href="https://www.qnect.com/quickqnect">QuickQnect</Link>
                    <ul className='group-hover/release:block hidden absolute top-0 -right-28 bg-white shadow-lg rounded p-3'>
                      <li><Link href="https://www.qnect.com/release-notes">Release Notes</Link></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link href='https://www.qnect.com/projects-testimonials'>Projects & Testimonials</Link>
            </li>
            <li>
              <Link href='https://www.qnect.com/videos'>Video Library</Link>
            </li>
            <li className='relative group'>
                About Us
                <FontAwesomeIcon icon={faAngleDown} width={16} height={16} className='pl-2' />
                <div className='absolute left-0 pt-2 w-52  z-30 group-hover:block hidden'>
                  <ul className='navMainLi bg-white shadow-lg rounded p-4 space-y-1'>
                    <li>
                      <Link href='https://www.qnect.com/team'>Team</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/careers'>Careers</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/contact-us'>Contact</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/blog'>News/Blogs</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/qonstruct-audiocast'>Qonstruct Audiocast</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/events'>Events</Link>
                    </li>
                  </ul>
                </div>
            </li>
            <li>
              <Link href='https://app.qnect.com/sign-in/?hsCtaTracking=918221c6-078a-4946-b0d1-d209a098a820%7Cbdb26f12-aca1-4773-b130-48f4bb268c6b'>Sign In</Link>
            </li>
          </ul>
        </nav>

        <div className='hidden lg:flex items-center xl:space-x-4 space-x-2 xl:ml-8 ml-1 [&_.headerBtn]:px-3.5 [&_.headerBtn]:py-1.5 max-xl:[&_.headerBtn]:py-1.5 max-xl:[&_.headerBtn]:px-2 [&_.headerBtn]:text-[13px] [&_.headerBtn]:text-white [&_.headerBtn]:rounded-full xl:[&_.headerBtn]:text-base [&_.headerBtn]:w-auto '>
          {/* <button>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              width={'auto'}
              height={20}
              color='white'
            />
          </button> */}
          <button onClick={() => dispatch(setCartOpen(true))}>
            <FontAwesomeIcon
              icon={faBasketShopping}
              width={'auto'}
              height={20}
              color='white'
            />
          </button>

          <Link  href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLLyBm5boAh5TN7zvyXe18NU3V7hGyL0ALywbkMv0ahB7OpBkUT8IqTFnmwXGpvnoEPulc4GUtA4NP1BuS91PEWxCmnPfF9NhsghW2%2BXMMWC4tq3va7Ds%2F7erZdvDnIoX6HYTBqZYVyapI5Els2ywmARadR9XnnHHZ5jCf8q&portalId=4536105&webInteractiveId=370237410323&webInteractiveContentId=180078916265&containerType=EMBEDDED&pageUrl=https%3A%2F%2Fwww.qnect.com%2Fcontact-us%3FhsCtaAttrib%3D180078916144&pageTitle=Contact+Qnect&referrer=&userAgent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%3B+rv%3A137.0%29+Gecko%2F20100101+Firefox%2F137.0&hutk=32088049f340575a28fb8c38ed6ef497&hssc=32748897.3.1744984506700&hstc=32748897.32088049f340575a28fb8c38ed6ef497.1740993391383.1744977174960.1744984506700.7&pageId=6175886349&analyticsPageId=6175886349&hsfp=220602648&canonicalUrl=https%3A%2F%2Fwww.qnect.com%2Fcontact-us&contentType=standard-page" className='headerBtn border border-transparent bg-[#CF5127] hover:bg-transparent hover:border hover:border-white'>Request Demo</Link>
          <Link href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLLW9Fd2Jf0Ac1NkgeEJC4DQpaKKzeY5UzUoSr5rfNWr8lekxNWZcmqtAMfqpf7dxPf4%2B1WhaW4SHJUtK68RgAjKy7%2F9Ds90beDcTePUo1Ph9%2F3B04t0vcFP%2Fh0N0wh9jNAfrc473yI344NdLkXsO5lmxFU7yc2FfaXfDxmN9MZ8t8FS&portalId=4536105&webInteractiveId=370240486692&webInteractiveContentId=180078916144&containerType=EMBEDDED&pageUrl=https%3A%2F%2Fwww.qnect.com%2Fcontact-us%3FhsCtaAttrib%3D180078916144&pageTitle=Contact+Qnect&referrer=&userAgent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%3B+rv%3A137.0%29+Gecko%2F20100101+Firefox%2F137.0&hutk=32088049f340575a28fb8c38ed6ef497&hssc=32748897.3.1744984506700&hstc=32748897.32088049f340575a28fb8c38ed6ef497.1740993391383.1744977174960.1744984506700.7&pageId=6175886349&analyticsPageId=6175886349&hsfp=220602648&canonicalUrl=https%3A%2F%2Fwww.qnect.com%2Fcontact-us&contentType=standard-page" className='headerBtn border border-transparent bg-[#85C451] hover:bg-transparent hover:border hover:border-white'>Contact Us</Link>
        </div>

        <div className='lg:hidden [&_svg]:w-auto [&_svg]:h-6 '>
          <button className='pr-3' onClick={() => dispatch(setCartOpen(true))}>
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
            <Link href="/">
              <Image
                src='/images/logo.png'
                alt='logo'
                width={125}
                height={100}
                className='mr-10'
                />
            </Link>
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
                      <Link href="https://www.qnect.com/qnect-autodesk-revit/support">Customer Support</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/quickqnect'>QuickQnect</Link>
                    </li>
                    <li><Link href="https://www.qnect.com/release-notes">Release Notes</Link></li>
                  </ul>
                )}
              </li>
              <li>
                <Link href='https://www.qnect.com/projects-testimonials'>Projects & Testimonials</Link>
              </li>
              <li>
                <Link href='https://www.qnect.com/videos'>Video Library</Link>
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
                      <Link href='https://www.qnect.com/team'>Team</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/careers'>Careers</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/contact-us'>Contact</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/blog'>News/Blogs</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/qonstruct-audiocast'>Qonstruct Audiocast</Link>
                    </li>
                    <li>
                      <Link href='https://www.qnect.com/events'>Events</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href='https://app.qnect.com/sign-in/?hsCtaTracking=918221c6-078a-4946-b0d1-d209a098a820%7Cbdb26f12-aca1-4773-b130-48f4bb268c6b'>Sign In</Link>
              </li>
            </ul>

            <div className='mt-4 flex justify-between space-x-3'>
              <Link href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLJ8UzkW0hkfLdDYwIB8zsG46SHFFErkVHUUio6eBUMg2WSA%2BCwPIW4JW6rhPpp7rgu8UIQ0BnIJInBMs9CSlcJtbUCmdddDCnaFAOamC5qbzgpR41bfn3dP3WWIgG1qqWki6UkAyjdtkElVCLVpTVocT4YtJy11t32dKKSy&portalId=4536105&webInteractiveId=370237410323&webInteractiveContentId=180078916265&containerType=EMBEDDED&pageUrl=https%3A%2F%2Fwww.qnect.com%2Fdemo%3FhsCtaAttrib%3D180078916265&pageTitle=Schedule+a+Demo&referrer=&userAgent=Mozilla%2F5.0+%28Windows+NT+10.0%3B+Win64%3B+x64%3B+rv%3A137.0%29+Gecko%2F20100101+Firefox%2F137.0&hutk=32088049f340575a28fb8c38ed6ef497&hssc=32748897.1.1744984506700&hstc=32748897.32088049f340575a28fb8c38ed6ef497.1740993391383.1744977174960.1744984506700.7&pageId=68908908911&analyticsPageId=68908908911&hsfp=220602648&canonicalUrl=https%3A%2F%2Fwww.qnect.com%2Fdemo&contentType=standard-page" className='bg-[#CF5127] text-white py-2 px-4 rounded-full text-md w-full text-center'>
                Request Demo
              </Link>
              <Link href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/click?encryptedPayload=AVxigLLW9Fd2Jf0Ac1NkgeEJC4DQpaKKzeY5UzUoSr5rfNWr8lekxNWZcmqtAMfqpf7dxPf4%2B1WhaW4SHJUtK68RgAjKy7%2F9Ds90beDcTePUo1Ph9%2F3B04t0vcFP%2Fh0N0wh9jNAfrc473yI344NdLkXsO5lmxFU7yc2FfaXfDxmN9MZ8t8FS&portalId=4536105&webInteractiveId=370240486692&webInteractiveContentId=180078916144&containerType=EMBEDDED&pageUrl=https%3A%2F%2Fwww.qnect.com%2Fcontact-us%3FhsCtaAttrib%3D180078916144" className='bg-[#85C451] text-white py-2 px-4 rounded-full text-md w-full text-center'>
                Contact Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
export default NavHeader
