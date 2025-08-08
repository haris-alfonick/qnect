// components/ThankYouSection.js
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import NavHeader from '@/components/navigation';
import Footer from '@/components/footer';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'next/navigation';

export default function ThankYouSection() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || '';
  //const sessionId = searchParams.get('session_id') || '';

  return (
    <>
    <div className='bg-[#111] h-[70px] w-full'>
        <NavHeader />
    </div>
    <section className="md:my-20 my-5 max-md:mb-0 w-fit mx-auto border shadow-[0px_0px_20px_-2px_#ececec] border-gray-100 rounded-2xl flex items-center justify-center bg-white md:px-20 px-6 md:py-10 py-6">
      <div className="text-center max-w-lg">
        <FontAwesomeIcon icon={faCheckCircle} width={60} height={60} className="text-green-500 mx-auto md:text-6xl text-3xl sm:mb-6 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Thank You!</h1>
        <p className="md:text-lg text-base font-medium text-gray-800 mb-4">You’ve Successfully Subscribed to <strong>{plan}</strong>.</p>

        <h2 className="text-xl md:text-2xl font-semibold mb-2">Your Premium Access is Now Active</h2>
        <p className="text-gray-600 mb-6">Enjoy unlimited features and priority support.</p>

        <Link href="https://dev1.qnect.com/cgi-bin/InitiateDBImport/Download.cgi?action=upgrade&ID=QnectRevitSetup.msi"className="inline-block bg-orange-600 text-white text-base font-semibold px-6 py-2.5 rounded-full hover:bg-orange-700 transition">
            Download Now
        </Link>
      </div>
    </section>
    <Footer />
    </>
  );
}
