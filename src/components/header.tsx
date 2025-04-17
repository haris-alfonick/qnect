import NavHeader from './navigation'

const Header = () => {
  return (
    <header className='relative w-full h-screen overflow-hidden max-lg:h-[600px]'>
      <div className="overlayWrap absolute inset-0 w-full h-full" style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 80%, 0 95%)' }}>
        <video
          src="https://4536105.fs1.hubspotusercontent-na1.net/hubfs/4536105/66%20Hudson%20Trimmed.mov"
          autoPlay
          loop
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
      </div>
      <NavHeader />
      <div className='container mx-auto 2xl:pl-40 absolute top-0 max-lg:top-0 max-sm:top-auto max-sm:bottom-[calc(100%_-_56%)] bottom-0 m-auto h-fit flex flex-col text-[#f4cccc] sm:px-6 px-4 w-full [&_h1]:md:text-[70px] sm:[&_h1]:text-[50px] [&_h1]:text-4xl [&_h1]:pl-0 [&_h1]:font-bold [&_h1]:leading-none [&_span]:block'>
        <h1>Qnect for <span>Autodesk® Revit®</span></h1>
        <p className='pt-3'>
          <span className='mb-2 block'>Goodbye steel RFIs.</span> 
          Qnect for Autodesk®
          Revit® discovers steel issues within the BIM environment so structural
          <span className='block max-md:!inline'>engineers can resolve them early in design.</span>
        </p>
      </div>
      <div className='absolute z-10 bottom-2 sm:px-6 px-4 w-full flex flex-col sm:flex-row justify-center max-sm:space-y-3 sm:space-x-4 space-x-0 [&_button]:text-lg [&_button]:rounded-[10px] [&_button]:shadow-[0px_0px_12px_-3px_#979797] [&_button]:px-3 [&_button]:sm:py-10 [&_button]:py-5 [&_button]:w-full [&_button]:font-bold [&_button]:text-[#333333] [&_button]:bg-white '>
        <button>Quality</button>
        <button>Constructability</button>
        <button>Time Savings</button>
      </div>
    </header>
  )
}

export default Header