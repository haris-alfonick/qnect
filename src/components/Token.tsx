'use client'
import { addToCart, setCartOpen } from '@/lib/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/hooks';
import Link from 'next/link'
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/token-tabs"
// import CheckoutButton from './CheckoutButton';

const TokenComponent = () => {
  const [selected, setSelected] = useState(4750);
  const dispatch = useAppDispatch()

  const handleRevitLicense = (id: string, price: number) => {
    const item = {
      id: id,
      name: 'Token',
      plan: id == 't1' ? '1000 Tokens' : id == 't2' ? '5000 Tokens' : '15000 Tokens',
      quantity: 1,
      price: price
    };

    dispatch(addToCart(item))
    dispatch(setCartOpen(true))
  }

  const packages = [
    { id: 't1', amount: 1000, price: 1000, cost: '$1.00' },
    { id: 't2', amount: 5000, price: 4750, cost: '$0.95', discount: '5% Off' },
    { id: 't3', amount: 15000, price: 13500, cost: '$0.90', discount: '10% Off' },
  ];

  const selectedPackage = packages.find((pkg) => pkg.price === selected);

  return (
    <>
      <div className='max-w-7xl mx-auto text-[#000000] [&_h2]:text-[35px] [&_h2]:font-bold [&_p]:pt-2 [&_p]:text-[17px] xl:px-8 sm:px-6 px-4 pt-16 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:md:text-xl [&_ul]:text-sm [&_ul]:leading-loose [&_ul]:text-[#333333] [&_ul]:pt-4'>
        <h2>Overview</h2>
        <p>
          QuickQnect uses cloud-based computing to connect your model to meet
          AISC & CISC requirements within minutes, often seconds. It&apos;s super
          easy and helps you stick to schedule... and we know it&apos;s schedule,
          schedule, schedule… When revisions are required, Qnect allows you to
          re-engineer and model revisions in seconds.
        </p>
        <ul>
          <li>Set your preferences.</li>
          <li>Select all or part of your model.</li>
          <li>Push Button 1. Name the session. Submit.</li>
          <li>Push Button 2. Very quickly, your model is connected.</li>
        </ul>
      </div>

      <div className='md:mt-16 my-10 px-6'>
        <iframe
          src='https://player.vimeo.com/video/1107121441'
          className='w-full lg:h-[500] md:h-[350px] h-[200px] mx-auto'
          allow='autoplay;'
        ></iframe>
      </div>

      <div className='max-w-7xl mx-auto pt-5 sm:px-6 px-4'>
        <Tabs defaultValue="Preference" className="shadow-[0px_0px_20px_-4px_#dadde8]">
          <TabsList>
            <TabsTrigger value="Preference">Preference Optimization</TabsTrigger>
            <TabsTrigger value="Bolt">Bolt Optimization</TabsTrigger>
            <TabsTrigger value="Doubler">Doubler Optimization</TabsTrigger>
          </TabsList>
          <TabsContent value="Preference">Preference Optimization or P+Op runs your job 10 or more times to compare the cost of different bolt sizes and different connection types. If it is a “mandated” job where the Engineer mandates all of the connection standards, then the software can easily mimic the mandated standards. You could also choose to get an override from the Engineer for all Qnect connections. This is commonly done and will add significantly to the optimization savings total.</TabsContent>
          <TabsContent value="Bolt">Bolt Optimization or B+Op will use your priority bolt sizes (up to three) and will try to make the most efficient connections allowable by AISC engineering requirements. Our computer algorithms may give you vertical spacings of 3”, 3.5”, 4”, 4.5”, 5”, 5.5”, or 6”. You can limit it to the conventional 3” or to any subset with simple selections. You should expect anywhere from 20-50% reduction in the number of bolts, bolt holes, time for bolting, machine use, skilled laborers needed, and erection time.</TabsContent>
          <TabsContent value="Doubler">Our software automatically recognizes “doubler” requirements (needed to reinforce the web due to a cope). Qnect offers a doubler report so you can see exactly which members required doublers. Now you can act very early on to upsize the beam or reduce the load thereby eliminating the doubler condition. The Doubler Report will indicate the maximum load for each affected member in order to eliminate the doublers and will offer two new beam sizes that will efficiently eliminate each doubler.</TabsContent>
        </Tabs>
      </div>

      <div className='mx-auto py-4'>
        <div className='lg:hidden flex flex-wrap px-4 justify-center gap-x-2 gap-y-2 md:[&_button]:text-lg [&_button]:text-sm [&_button]:text-white [&_button]:rounded-[6px] [&_button]:py-2 [&_button]:px-4'>
          <button className='bg-[#CF5127]'>Modeling</button>
          <button className='bg-[#52B3CD]'>Modeling & Engineering</button>
          <button className='bg-[#85C451]'>
            Modeling ,Engineering & Optimization
          </button>
        </div>
      </div>

      <div className='grid grid-cols-12 max-w-7xl mx-auto lg:gap-x-6 mt-8 sm:px-6 px-0 [&_.tokenPoint>li]:pl-8 [&_.tokenPoint>li]:bg-[url(/images/check-icon.png)] [&_.tokenPoint>li]:bg-[left_center] [&_.tokenPoint>li]:bg-no-repeat [&_.tokenPoint>li]:bg-[length:20px_21px] [&_.tokenPoint>li]:leading-7 [&_.tokenPoint>li]:mt-3 [&_.tokenPoint>li]:text-[#333] [&_.ListEndText]:text-lg [&_.ListEndText]:font-medium [&_.ListEndText]:mt-5 [&>div]:relative [&_.ListEndText]:absolute [&_.ListEndText]:bottom-8'>

        <div className='lg:col-span-4 col-span-12 [&_span]:text-[#D05129] [&_span]:bg-[#FFBEAA] [&_span]:px-4 [&_span]:py-2 [&_span]:rounded-full [&_span]:text-base [&_span]:font-medium shadow-[0px_0px_20px_-4px_#dadde8] rounded-xl py-8 px-9 lg:mx-0 mx-4'>
          <span>Per Successful Qnection</span>
          <div className='flex items-center [&_strong]:text-[60px] [&_p]:text-[23px] [&_p]:pl-2 pt-3'>
            <strong>1</strong>
            <p>TOKEN</p>
          </div>
          <p className='xl:text-lg font-medium lg:mb-14 mb-6'>MODELING</p>
          {/* <button className='bg-[#CF5127] text-white text-2xl py-2 px-4 rounded-xl w-full lg:mt-12 mt-6'>
            Select
          </button> */}

          <div className='border-t-2 mt-7 mb-24'>
            <ul className='tokenPoint [&_li]:xl:text-[15px] [&_li]:lg:text-[12px] text-sm pt-3'>
              <li>Early issue detection</li>
              <li>Connection modeling in Tekla</li>
              <li>Customization and QA/QC of detailing</li>
              <li>Model change management</li>
              <li>Unlimited runs per joint</li>
              <li>Fabricator preferences and aliases</li>
            </ul>
          </div>

          <p className='ListEndText'>Detailers modeling connections</p>
        </div>

        <div className='lg:inline hidden lg:col-span-4 col-span-12 [&_span]:text-[#035388] [&_span]:bg-[#E3F8FF] [&_span]:px-4 [&_span]:py-2 [&_span]:rounded-full [&_span]:text-base [&_span]:font-medium shadow-[0px_0px_20px_-4px_#dadde8] rounded-xl py-8 px-9 lg:mx-0 mx-4'>
          <span>Per Successful Qnection</span>
          <div className='flex items-center [&_strong]:text-[60px] [&_p]:text-[23px] [&_p]:pl-2 pt-3'>
            <strong>2</strong>
            <p>TOKENS</p>
          </div>
          <p className='xl:text-lg font-medium lg:mb-14 mb-6'>MODELING & ENGINEERING</p>
          {/* <button className='bg-[#52B3CD] text-white text-2xl py-2 px-4 rounded-xl w-full lg:mt-12 mt-6'>
            Select
          </button> */}

          <div className='border-t-2 mt-7 mb-24'>
            <ul className='tokenPoint [&_li]:xl:text-[15px] [&_li]:lg:text-[12px] text-sm pt-3'>
              <li>Early issue detection</li>
              <li>Connection modeling in Tekla</li>
              <li>Customization and QA/QC of detailing</li>
              <li>Model change management</li>
              <li>Unlimited runs per joint</li>
              <li>Fabricator preferences and aliases</li>
              <li>Connection design calculations</li>
            </ul>
          </div>

          <p className='ListEndText'>
            Engineers and detailers performing delegated connection design
          </p>
        </div>

        <div className='lg:inline hidden lg:col-span-4 col-span-12 [&_span]:text-[#42870A] [&_span]:bg-[#DDFFC2] [&_span]:px-4 [&_span]:py-2 [&_span]:rounded-full [&_span]:text-base [&_span]:font-medium shadow-[0px_0px_20px_-4px_#dadde8] rounded-xl py-8 px-9 lg:mx-0 mx-4'>
          <span>Per Successful Qnection</span>
          <div className='flex items-center [&_strong]:text-[60px] [&_p]:text-[23px] [&_p]:pl-2 pt-3'>
            <strong>3</strong>
            <p>TOKENS</p>
          </div>
          <p className='xl:text-lg font-medium'>
            MODELING, ENGINEERING & OPTIMIZATION
          </p>
          {/* <button className='bg-[#83C44F] text-white text-2xl py-2 px-4 rounded-xl w-full mt-5'>
            Select
          </button> */}

          <div className='border-t-2 mt-7 mb-24'>
            <ul className='tokenPoint [&_li]:xl:text-[15px] [&_li]:lg:text-[12px] text-sm pt-3'>
              <li>Early issue detection</li>
              <li>Connection modeling in Tekla</li>
              <li>Customization and QA/QC of detailing</li>
              <li>Model change management</li>
              <li>Unlimited runs per joint</li>
              <li>Fabricator preferences and aliases</li>
              <li>Connection design calculations</li>
              <li>Connection type optimization</li>
              <li>Bolt optimization</li>
              <li>Doubler optimization</li>
            </ul>
          </div>

          <p className='ListEndText'>
            Engineers and fabricators optimizing steel connections for design,
            fabrication and erection
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto sm:px-6 px-4'>
        <div className='rounded-md shadow-[0px_0px_20px_-4px_#dadde8] sm:mt-16 mt-10 p-6'>
          <div className='flex justify-between items-center min-[992px]:flex-row gap-y-3 flex-col border-b-2 pb-4 [&_strong]:text-3xl'>
            <strong>BUY TOKENS</strong>
            <div className='flex gap-x-4 flex-wrap max-md:justify-center [&_p]:font-medium'>
              <p className='text-[#D05129]'>MODELING: 1 TOKEN</p>
              <p className='text-[#52B3CD] relative buyToken px-1'>
                ENGINEERING: 2 TOKENS
              </p>
              <p className='text-[#83C44F]'>OPTIMIZATION: 3 TOKENS</p>
            </div>
          </div>
          <strong className='text-xl font-normal py-4 block'>
            Each token cost: $0.95
          </strong>
          <div className='flex justify-between lg:flex-row flex-col'>
            <div className='flex md:space-x-4 md:space-y-0 space-y-4 md:flex-row flex-col'>
              {packages.map((pkg) => (
                <div
                  key={pkg.price}
                  className={`[&_p]:text-xl cursor-pointer shadow-[0px_0px_20px_-4px_#dadde8] px-4 py-6 rounded-xl 
                  ${selected === pkg.price ? 'bg-[#52B3CD] text-white' : 'hover:bg-[#52B3CD] hover:text-white'}`}
                  onClick={() => setSelected(pkg.price)}
                >
                  <p>Minimum</p>
                  <strong className='text-3xl pb-4 block'>
                    ${pkg.price}
                    {pkg.discount && <span className='text-[20px] font-medium pl-2'>({pkg.discount})</span>}
                  </strong>
                  <p>
                    {pkg.amount} tokens
                    <span className='block'>Each Token cost: {pkg.cost}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className='lg:pl-2'>
              <strong className='text-3xl block lg:pt-0 pt-4'>${selected}</strong>
              <div className='flex space-x-3 pt-4 [&_button]:sm:text-base [&_button]:text-[13px] [&_button]:px-5 [&_button]:py-2 [&_button]:rounded-[8px]'>
                <button
                  className='bg-[#333333] text-white'
                  onClick={() => {
                    if (selectedPackage) {
                      handleRevitLicense(selectedPackage.id, selectedPackage.price);
                    }
                  }}
                >Buy Tokens</button>
                <button className='border border-[#333333] text-[#333333]'>
                  Learn How Token Works
                </button>
              </div>
              <p className='text-[13px] pt-4'>
                Credit and debit cards, PayPal, pay by bank, and direct debit{' '}
                <span className='md:block inline'>
                  (ACH) accepted.{' '}
                  <Link href='#'>
                    <span className='text-[#52B3CD] underline'>Learn More</span>
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <strong className='py-3 block text-xl font-medium mt-4'>PLAN DETAILS</strong>
          <ul className='list-none leading-loose md:text-md text-sm text-[#333333]'>
            <li>
              User pre-purchases token blocks and gets notified when falling below
              400 tokens
            </li>
            <li>User gets a weekly usage and balance statement</li>
            <li>usage is based on successful Qnection only.</li>
            <li>
              Each unique joint (unique GUID) will be counted only once, for
              multiple Qnect runs or revisions.
            </li>
          </ul>
        </div>
      </div>
      <div className='max-w-7xl mx-auto text-[#000000] [&_h2]:mb-4 [&_h2]:text-[35px] [&_h2]:leading-10 [&_h2]:font-bold [&_p]:pt-2 [&_p]:text-[17px] sm:px-8 px-4 md:pt-16 p-10 [&_ul]:leading-loose [&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-[#333333]'>
        <h2>Available Connection Types</h2>
        <p>
          All connections are designed using Qnect&apos;s patented iterative process
          yielding the most efficient connections in the market. All connections
          follow your user-defined preferences to match your exact requirements.
        </p>
        <p>
          Below is a partial list of available connection types. All connection
          types are designed per the AISC steel code. The ones denoted with *
          support both AISC and CISC codes. Contact us for the most up-to-date
          list of connection types:
        </p>
        <div className='flex justify-between md:flex-row flex-col'>
          <div className='[&_strong]:block [&_strong]:pt-6 [&_strong]:text-2xl [&_ul]:pt-4'>
            <strong>Bracing Connections:</strong>
            <ul>
              <li>HSS Vertical Bracing</li>
              <li>Single Angle Vertical Bracing</li>
            </ul>
            <strong>Shear, Shear and Axial Connections:</strong>
            <ul>
              <li>Shear Plates*</li>
              <li>Extended Shear Plate to Column web*</li>
              <li>Extended Shear Plate Beam to Beam*</li>
              <li>Double Angles Bolted Bolted*</li>
              <li>Double Angles Bolted Welded*</li>
              <li>Double Angles Welded Bolted*</li>
              <li>Single Angles Bolted Bolted*</li>
              <li>Single Angles Bolted Welded*</li>
              <li>Single Angles Weld Bolted*</li>
              <li>Extended Shear Plate to Column Web</li>
              <li>Extended Shear Plate Beam to Beam</li>
              <li>Shear Plates for Built-Up Plate Girders</li>
            </ul>
            <strong>Moment Connections:</strong>
            <div className='flex justify-between md:flex-row flex-col'>
              <ul>
                <li>Directly Welded Flanges with Shear Plate</li>
                <li>
                  Directly Welded Flanges with Double Angles Bolted Bolted
                </li>
                <li>
                  {' '}
                  Directly Welded Flanges with Double Angles Welded Bolted
                </li>
              </ul>
            </div>
          </div>
          <div className='[&_ul]:md:pt-4 [&_strong]:block [&_strong]:pt-6 [&_strong]:text-2xl'>
            <ul>
              <li>Bolted Flange Plates with Shear Plate</li>
              <li>Bolted Flange Plates with Double Angles Bolted Bolted</li>
              <li>Bolted Flange Plates with Double Angles Welded Bolted</li>
              <li>Read more on Moment Connections </li>
            </ul>
            <strong>Framing Condition</strong>
            <ul>
              <li>Beam to Beam</li>
              <li>Skewed Beam to Beam</li>
              <li>Beam to Column Web</li>
              <li>Skewed Beam to Column Web</li>
              <li>Beam to Column Flange</li>
              <li>Skewed Beam to Column Flange</li>
              <li>Beam to HSS Beam</li>
              <li>Beam to HSS Column</li>
              <li>Beam to Embed Plate with plate washer provided</li>
              <li>Beams framing at different elevations</li>
              <li>Beam to Column Flange</li>
              <li>Skewed Beam to Column Flange</li>
              <li>Beam to HSS Beam</li>
              <li>Beam to HSS Column</li>
              <li>Beam to Embed Plate with plate washer provided</li>
              <li>Beams framing at different elevations</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <CheckoutButton /> */}
    </>
  )
}

export default TokenComponent