// app/cart/page.tsx

import Footer from "@/components/footer";
import NavHeader from "@/components/navigation";
import CartTable from "./CartTable";
import CartTotals from "./CartTotal";

export default function CartPage () {
  return (
    <>
    <div className='bg-[#111] h-[70px] w-full'>
        <NavHeader />
    </div>
     <section className='py-10'>
      <div className='max-w-[1200px] mx-auto px-4'>
        <div className='mb-8'>
          <h1 className='text-2xl font-semibold'>Your Cart</h1>
          <p className='text-sm text-gray-600'>You have 1 item in your cart</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <CartTable />
          <CartTotals />
        </div>
      </div>
    </section>
      <Footer />
    </>
   
  )
}
