import NavHeader from './navigation'

const tokenHeader = () => {
  return (
    <header className='relative w-full h-screen overflow-hidden max-lg:h-[700px]'>
      <div className="overlayWrap absolute inset-0 w-full h-full" style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 80%, 0 95%)' }}>
        <video
          src="https://www.qnect.com/hubfs/Untitled.mov"
          autoPlay
          loop
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
      </div>
      <NavHeader />
      <div className='container mx-auto 2xl:pl-40 absolute top-0 max-lg:top-0 max-sm:top-auto max-sm:bottom-[calc(100%_-_56%)] bottom-0 m-auto h-fit flex flex-col text-[#f4cccc] sm:px-6 px-4 w-full [&_h1]:md:text-[70px] sm:[&_h1]:text-[50px] [&_h1]:text-4xl [&_h1]:pl-0 [&_h1]:font-bold [&_h1]:leading-none [&_span]:block'>
        <h1>QuickQnect</h1>
        <p className='pt-3 md:w-[750px] w-full'>
          <span className='mb-2 block'>The software that started it all.</span> 
          Our original cloud-based software connects steel models in Tekla® Structures to meet AISC & CISC requirements within minutes, often seconds. Structural engineering firms and fabricators use this digital infrastructure to deliver fully-connected 3D models, extend design development time, dramatically reduce approval time and increase profits.
        </p>
      </div>
      <div className='absolute z-10 bottom-2 sm:px-3 px-3 w-full flex flex-col sm:flex-row justify-center max-sm:space-y-3 sm:space-x-4 space-x-0 [&_button]:text-lg [&_button]:leading-6 [&_button]:rounded-[10px] [&_button]:shadow-[0px_0px_12px_-3px_#979797] [&_button]:px-3 [&_button]:sm:py-10 [&_button]:py-5 [&_button]:w-full [&_button]:font-bold [&_button]:text-[#333333] [&_button]:bg-white '>
        <button>Speed & Revision Management</button>
        <button>Integrated Connection Engineering & Detailing</button>
        <button>System-level Optimization to Bolt Optimization</button>
      </div>
    </header>
  )
}

export default tokenHeader