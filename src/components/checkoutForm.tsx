import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const CheckoutField = () => {
  return (
    <div className='space-y-4 [&_input]:h-10 [&_input]:text-[15px] [&_input]:rounded [&_textarea]:text-[15px] [&_textarea]:rounded [&_textarea]:h-32 [&_input]:border-[#e5e7eb] [&_textarea]:border-[#e5e7eb] [&_textarea]:text-[#555] [&_input]:text-[#555]'>
      <div className='flex sm:flex-row flex-col items-center w-full sm:gap-x-3 max-sm:gap-y-3 [&>div]:w-full'>
        <div>
          <Input type='text' placeholder='First Name' />
        </div>
        <div>
          <Input type='text' placeholder='Last Name' />
        </div>
      </div>
      <div>
        <Input type='text' placeholder='User Name' />
      </div>
      <div className='flex sm:flex-row flex-col items-center w-full sm:gap-x-3 max-sm:gap-y-3 [&>div]:w-full'>
        <div>
          <Input type='email' placeholder='Email' />
        </div>
        <div>
          {/* <Label htmlFor="email">Email</Label> */}
          <Input type='email' placeholder='Refer Email' />
        </div>
      </div>
      <div>
           <Textarea placeholder="Type your message here." />
      </div>
      <Button className='w-fit md:ml-0 mx-auto block h-11 text-base bg-[#333] text-white hover:text-[#333] border border-transparent hover:border hover:border-[#333] shadow-none rounded'>Proceed to Checkout</Button>
    </div>
  )
}
export default CheckoutField
