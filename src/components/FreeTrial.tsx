import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

const NewsLetter = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <li className='lg:mt-6 lg:!px-2 !px-0'>
            <button className='border border-[#CF5127] text-[#CF5127] hover:text-white hover:bg-[#CF5127] lg:py-1 py-2 sm:px-0 px-6 w-full rounded-md'>
              Get Free Trial
            </button>
          </li>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[730px] sm:py-16 py-8 bg-white !rounded-xl [&>button>svg]:!w-6 [&>button>svg]:!h-6'>
          <DialogHeader>
            <DialogTitle className='text-center text-[26px] tracking-normal'>
              Access Free Resources
            </DialogTitle>
            <DialogDescription className='text-center text-sm text-[#333] font-normal px-4 py-1 pb-2.5'>
              Simply enter your email address to gain immediate access to a wide range of valuable resources. Get exclusive tools, guides, and content to help you on your journey!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mx-auto text-[13px] [&_input]:bg-[#F3F3F3] [&_input]:p-2 [&_button]:bg-[#275E96] [&_button]:px-8 [&_button]:text-white [&_button]:rounded-r [&>div>input]:rounded-l [&_input]:focus-visible:!outline-0 md:[&_input]:w-[300px] [&_input]:w-full'>
            <div className='flex w-full'>
              <input type='email' placeholder='EMAIL ADDRESS' />
              <button>SUBMIT</button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default NewsLetter