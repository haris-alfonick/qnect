'use client';
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
// import FreeTrial from "./FreeTrial";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart, setCartOpen } from "@/lib/features/cart/cartSlice";

export default function RevitPage() {
  const dispatch = useAppDispatch()

  const handleRevitLicense = (license: string) => {
    const item = {
      id: license === 'Free Trial' ? '1' : license === 'express' ? '2' : '3',
      name: 'Revit',
      plan: license,
      quantity: 1,
      price: license === 'Free Trial' ? 0 : license == 'express' ? 950 : 1900
    };    

    dispatch(addToCart(item))
    dispatch(setCartOpen(true))
  }
  // const handlePurchase = async () => {
  //   const isValid = await validateEmail('user@example.com', 'REVIT');
  //   if (isValid) {
  //     await processFreeTrialOrPurchase({
  //       txn_id: '12345',
  //       custom: 'custom-data',
  //       payment_status: 'Completed',
  //       item_number: 'revit-sub-1',
  //       payment_gross: 100.0,
  //       txn_type: 'subscr_payment',
  //       last_name: 'Doe',
  //       first_name: 'John',
  //       user_name: 'John Doe',
  //       buyer_adsk_account: 'user@example.com',
  //       referer_account: 'referrer@example.com',
  //     });
  //   }
  // };

  return (
    <>
      <div className="md:mt-20 my-10 px-6">
        <iframe
            src="https://player.vimeo.com/video/1059708633?h=7d5425eced"
            className="w-full lg:h-[500px] md:h-[350px] h-[200] mx-auto"
            allow="autoplay;"
        ></iframe>
      </div>

      <div className="mt-16 text-center [&_h2]:text-3xl [&_h2]:font-bold [&_p]:text-[#666666] [&_p]:mt-2 [&_button]:text-white [&_button]:py-2 [&_button]:px-4 [&_button]:rounded-sm [&_button]:text-md [&_button]:w-auto [&_button]:bg-[#CF5127] [&_button]:mt-4">
          <h2>FREE 30-day Trial</h2>
          <p>Visit the <strong>Autodesk App</strong> Store to download!</p>
          <Link href="https://apps.autodesk.com/RVT/en/Detail/Index?id=455692108544260402&appLang=en&os=Win64"><button>Visit The App Store</button></Link>
      </div>

      <h2 className="text-center text-2xl md:text-4xl mt-16 avenir-bold">Choose Your Plan Now</h2>

      <div className="mx-auto py-4">
          <div className="lg:hidden flex justify-center gap-2.5 px-6 [&_button]:py-2 [&_button]:w-48 [&_button]:rounded-sm [&_button]:text-white">
              <button className="bg-[#CF5127]">
                  Free Trial
              </button>
              <button className="bg-[#52B3CD]">
                  Express
              </button>
              <button className="bg-[#85C451]">
                  Pro
              </button>
          </div>
      </div>

      <div className="sm:px-5 px-4 grid 2xl:grid-cols-11 grid-cols-12 max-w-7xl mx-auto mb-6 [&_li_svg]:w-auto [&_li_svg]:h-6 [&_li_svg]:text-[#DF0000] [&_li_svg]:mx-auto [&_li_svg.fa-circle-check]:text-[#028A1B] [&_.planLabel]:text-center [&_.planLabel]:xl:text-xl [&_.planLabel]:md:text-lg :[&_.planLabel]:text-[13px] [&_.planLabel]:h-fit [&_.planLabel]:font-bold [&_.planLabel]:text-white xl:[&_.planLabel]:py-4 [&_.planLabel]:py-2.5 xl:[&_.planLabel]:px-6 [&_.planLabel]:w-full [&_.planLabel]:rounded-md [&_.planLabel]:inline-block [&_.planLabel]:mb-4 lg:[&_ul_li]:text-lg [&_ul_li]:text-base lg:[&_ul_li]:!leading-[2.5] [&_ul_li]:leading-[1.6] xl:[&_ul_li_button]:text-lg max-lg:[&_ul_li_button]:px-3 [&_ul_li_button]:text-sm [&>div]:mx-2 [&>div]:rounded-xl [&>div]:p-4 [&>div]:shadow-[0px_0px_24px_-4px_#dadde9]">

        <div className="2xl:col-span-5 lg:col-span-6 col-span-12 max-lg:!mx-0">
          <div className="lg:block grid grid-cols-12 justify-between items-center lg:[&_strong]:px-0 [&_strong]:px-2.5">
            <strong className="planLabel sm:col-span-9 col-span-8 !text-black bg-[#B7B7B7] lg:!text-center !text-start">Features</strong>
            <strong className="planLabel sm:col-span-3 col-span-4 lg:!hidden inline !text-black bg-[#B7B7B7] lg:!text-center max-sm:!text-center">Free Trial</strong>
          </div>
            <ul className="list-none list-inside [&_strong]:text-xl lg:[&_strong]:inline [&_strong]:block lg:[&_strong]:px-0 [&_strong]:px-2 lg:[&_li]:block [&_li]:grid [&_li]:items-center [&_li]:grid-cols-12 sm:[&_li_span]:col-span-10 [&_li_span]:col-span-9 sm:[&_li_.iconPlanText]:col-span-2 [&_li_.iconPlanText]:col-span-3 [&_li_.iconPlanText]:text-center [&_li]:gap-x-1.5 lg:[&_li]:px-0 [&_li]:px-2 lg:[&_li_.iconPlanText]:hidden [&_li_.iconPlanText]:inline-block [&_li>.iconPlanText]:border-r-0 [&_li>span]:border-r lg:[&_li]:border-b-0 [&_li]:border-b lg:[&>strong]:border-b-0 [&>strong]:border-b lg:[&>strong]:py-0 [&>strong]:py-1.5 lg:[&_li>span]:py-0 [&_li>span]:py-1.5">
              <li><span>Visualize and document issues in 2D & 3D</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleCheck} /></span></li>
              <li><span>Identify joints that require shear doublers or stiffeners</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleCheck} /></span></li>
              <li><span>Define forces from model framing and UDL</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleCheck} /></span></li>
              <li><span>Define forces from shear tables</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <li><span>Set detailing preferences</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <li><span>Set connection preferences</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <li><span>Beam & column doubler optimization</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <strong>Additional Benefits</strong>
              <li><span>30-day Trial</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <li><span>Customer Support</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleCheck} /></span></li>
              <li><span>Live Training</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleCheck} /></span></li>
              <strong>Annual Pricing</strong>
              <li><span>1 License</span> <span className="font-bold text-xl iconPlanText">$0</span></li>
              <li><span>Multiple License</span> <span className="iconPlanText"><FontAwesomeIcon icon={faCircleXmark} /></span></li>
              <li><span>Time Period</span> <span className="font-bold iconPlanText">30 Days</span></li>
              <li className="!mt-8 !block lg:!justify-start !justify-center lg:text-start text-center !border-b-0"><strong className="!px-0">Get The Great Our Service</strong></li>
            <div className="lg:!hidden !block w-fit m-auto !mt-2 [&_li]:!block"><button onClick={() => handleRevitLicense('trail')} className='border border-[#CF5127] text-[#CF5127] hover:text-white hover:bg-[#CF5127] lg:py-1 py-2 sm:px-0 px-6 w-full rounded-md'>
              Get Free Trial
            </button></div>
          </ul>
        </div>
        <div className="lg:col-span-2 sm:col-span-4 col-span-5 lg:block hidden">
          <strong className="planLabel bg-[#CF5127]">Free Trial</strong>
          <ul className="text-center list-none list-inside [&_strong]:text-xl xl:mt-[6px]">
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li className="2xl:mt-6 lg:mt-8 mt-4"><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li className="lg:mt-6"><strong>$0</strong></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><strong>30 Days</strong></li>
            <li className='lg:mt-5 lg:!px-2 !px-0'><button onClick={() => handleRevitLicense('Free Trial')} className='border border-[#CF5127] text-[#CF5127] hover:text-white hover:bg-[#CF5127] lg:py-1 py-2 sm:px-0 px-6 w-full rounded-md'>Get Free Trial</button></li>
            {/* <FreeTrial /> */}
          </ul>
        </div>
        <div className="hidden lg:grid lg:col-span-2 sm:col-span-4 col-span-5">
          <strong className="planLabel bg-[#52B3CD]">Express</strong>
          <ul className="text-center list-none list-inside [&_strong]:text-xl max-xl:-mt-4">
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li className="2xl:mt-6 mt-8"><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li className="lg:mt-6"><strong>$950</strong></li>
            <li><FontAwesomeIcon icon={faCircleXmark} /></li>
            <li><strong>Unlimited</strong></li>
            <li className="mt-6"><button onClick={() => handleRevitLicense('express')} className="border border-[#52B3CD] text-[#52B3CD] hover:text-white hover:bg-[#52B3CD] py-1 w-full rounded-md">Buy Subscription</button></li>
          </ul>
        </div>
        <div className="hidden lg:grid lg:col-span-2 sm:col-span-4 col-span-5">
          <strong className="planLabel bg-[#85C451]">Pro</strong>
          <ul className="text-center lg:leading-[3] sm:leading-loose leading-relaxed list-none list-inside [&_strong]:text-xl max-xl:-mt-4">
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li className="2xl:mt-6 mt-8"><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li className="lg:mt-6"><strong>$1900</strong></li>
            <li><FontAwesomeIcon icon={faCircleCheck} /></li>
            <li><strong>Unlimited</strong></li>
            <li className="mt-6 !leading-3"><button onClick={() => handleRevitLicense('pro')} className="border border-[#85C451] text-[#85C451] hover:text-white hover:bg-[#85C451] py-1 w-full rounded-md">Buy Subscription</button></li>
          </ul>
        </div>
      </div>
    </>
    // <button onClick={handlePurchase}>Purchase</button>

  );
}