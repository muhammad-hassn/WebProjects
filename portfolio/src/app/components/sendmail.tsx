import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the ContactForm to avoid hydration issues
const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false });

const Contact = () => {
  // Handle hydration error by ensuring proper client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Render nothing on the server side during hydration

  return (
    <section className="max-w-screen-xl mx-auto px-4 pb-12">
      <h2 className="text-3xl sm:text-[40px] bg-[#111] relative z-10 font-bold px-4 py-2 w-max mx-auto text-center text-[#1788ae] sm:border-2 border-[#1788ae] rounded-md">
        Let&apos;s Connect
      </h2>
      
      <div className="flex flex-col md:flex-row items-center mt-10">
        <div className="w-full flex justify-center md:justify-start">
          <Image src='/mail.svg' width={400} height={400} alt='mail Image' />
        </div>
        <div className="w-full mt-8 md:mt-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
