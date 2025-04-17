import { faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative w-full">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-[0px_0px_20px_-4px_#dadde8] md:w-[750px] w-[calc(100%_-_20%)] py-12 text-center z-10 [&_h2]:text-2xl [&_h2]:px-4 [&_h2]:font-bold [&_button]:text-white [&_button]:font-semibold [&_button]:rounded [&_button]:bg-[#CF5127] [&_button]:my-6 [&_button]:py-3 [&_button]:px-6 [&_p]:text-[#333]">
          <h2>If you have questions, please reach out.</h2>
          <Link href="mailto:info@qnect.com">
              <button>EMAIL US</button>
          </Link>
          <p>Or call us at <a href="tel:+1-413-387-4375">+1-413-387-4375</a></p>
      </div>

      <footer className="bg-[#EEEEEE] pb-20 pt-[235px] md:mt-[180px] mt-[130px] px-6 w-full">
        <div className="grid grid-cols-12 gap-y-8 gap-x-5 container mx-auto max-w-7xl border-b-2 border-gray-200 pb-6 [&_p]:text-[#666] [&_p]:text-base [&_h3]:mb-3 sm:[&_h3]:mb-6 [&_h3]:text-lg [&_h3]:text-[#444] [&_h3]:font-bold">
          <div className="sm:col-span-6 col-span-12">
            <h3>About</h3>
            <p>Qnect provides innovative software and services that reduce waste, lower carbon emissions, and maximize time and cost efficiency for the steel construction industry. Our goal is to deliver innovative and sustainable solutions for the construction industry to build a better future.</p>
          </div>

          <div className="sm:col-span-6 col-span-12 lg:pl-10 sm:pl-0 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:sm:mb-6 [&_h3]:lg:mt-0 [&_h3]:mb-3 [&_label]:text-[#333333] [&_label]:text-sm [&_label]:mt-10 [&_label]:font-medium [&_input]:w-full [&_input]:border [&_input]:border-gray-300 [&_input]:rounded [&_input]:p-2 [&_button]:rounded [&_button]:text-white [&_button]:py-3 [&_button]:px-5 [&_button]:font-semibold [&_button]:mt-2 [&_button]:bg-[#85C451]">
            <h3>Subscribe for General Updates</h3>
            <label>EMAIL*</label>
            <input type="email" />
            <button>SUBMIT</button>
          </div>
        </div>

        <div className="grid grid-cols-12 container mx-auto max-w-7xl mt-5">
          <div className="sm:col-span-6 col-span-12 sm:order-1 order-2 sm:text-start text-center sm:[&_p]:w-fit [&_p]:text-[#666]">
            <div>
              <Image src="/images/qnectLogoTwo.jpg"
                  alt=""
                  className="inline pt-2"
                  width={100}
                  height={100}
              />
              <div className="mt-3 md:text-start text-center">
                <Link href="https://www.qnect.com/qnect-privacy-policy" className="sm:w-fit block"><p className="hover:text-[#cf5127]">Privacy Policy</p></Link>
                <p>©2025 Qnect LLC</p>
              </div>
            </div>
          </div>
          <div className="sm:col-span-6 col-span-12 sm:order-2 order-1">
            <div className="flex sm:justify-end justify-center [&>a]:p-1 [&>a]:mx-1">
              <Link href="https://www.facebook.com/qnectllc/"><FontAwesomeIcon icon={faFacebookF} width={12} height={8} /></Link>
              <Link href="https://www.instagram.com/qnect_llc/"><FontAwesomeIcon icon={faInstagram} width={14} height={8} /></Link>
              <Link href="https://www.linkedin.com/company/qnect"><FontAwesomeIcon icon={faLinkedinIn} width={15} height={8} /></Link>
              <Link href="https://www.youtube.com/channel/UCupOkjsCOdiA83g4u2xYFWg"><FontAwesomeIcon icon={faYoutube} width={18} height={8} /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
