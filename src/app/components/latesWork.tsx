"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const LatestWork = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure component is only rendered on the client
  }, []);

  if (!isClient) {
    return null; // Prevent server-client mismatch by not rendering on the server
  }

  return (
    <section
      id="latest-works"
      className="max-w-7xl mx-auto w-[90%] mb-8 pb-5 rounded-lg border shadow-lg hover:scale-105 duration-300"
    >
      <h2 className="text-3xl md:text-4xl w-max mx-auto mt-2 text-center text-[#1788ae] border-x-2 border-b-2 px-2 border-[#1788ae]">
        Latest Works
      </h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mt-8 md:mt-12 py-2">
        <a
          href="https://nextcommerce-ten-hazel.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-1/2"
        >
          <Image
            src="/Project1.png"
            width={900}
            height={900}
            className="px-4 hover:scale-105 duration-100 object-contain"
            alt="Project Logo"
            priority // Ensures high performance on load
          />
        </a>
        <div className="w-full md:w-1/2">
          <span className="text-[#fc815c] text-lg">(Event Booking)</span>
          <p className="text-justify mt-2 text-base md:text-lg">
            {/* Replace this with actual project details for better context */}
            This project is a comprehensive event booking application showcasing the integration of modern web technologies.
          </p>
          <ul className="flex flex-wrap gap-2 mt-2">
            {["#react.js", "#express.js", "#node.js", "#swiper.js", "#mongoDB", "#mongoose", "#css", "#javascript", "#figma"].map((tag, index) => (
              <li
                key={index}
                className="border rounded-[50px] border-[#999] px-[10px] py-[5px] text-sm md:text-base"
              >
                {tag}
              </li>
            ))}
          </ul>
          <a
            href="https://nextcommerce-ten-hazel.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 py-2 px-4 bg-[#1788ae] text-white rounded hover:bg-[#126b86] duration-200"
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestWork;




// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// const LatestWork = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Ensure component is only rendered on the client
//   }, []);

//   if (!isClient) {
//     return null; // Prevent server-client mismatch by not rendering on the server
//   }

//   return (
//     <section
//       id="latest-works"
//       className="max-w-7xl mx-auto relative w-[90%] mb-8 pb-5 place-items-center rounded-lg border shadow-[0_0_10px_theme('colors.blue.600')] hover:scale-105 duration-300"
//     >
//       <h2 className="text-4xl w-max mx-auto mt-2 text-center text-[#1788ae] border-x-2 border-b-2 px-2 border-[#1788ae]">
//         Latest Works
//       </h2>
//       <div className="flex gap-[80px] items-center mt-12 py-2">
//         <a
//           href="https://nextcommerce-coral.vercel.app/"
//           target="_blank"
//           className="w-full"
//         >
//           <Image
//             src="/Project1.png"
//             width={900}
//             height={900}
//             className="px-4 hover:scale-105 duration-100"
//             alt="Project Logo"
//           />
//         </a>
//         <div className="w-full ">
//           <span className="text-[#fc815c] text-lg">(Event Booking)</span>
//           <p className="text-justify mt-2">
//             {/* Project details placeholder */}
//           </p>
//           <ul className="flex flex-wrap gap-2 mt-2">
//             {[
//               "#react.js",
//               "#express.js",
//               "#node.js",
//               "#swiper.js",
//               "#mongoDB",
//               "#mongoose",
//               "#css",
//               "#javascript",
//               "#figma",
//             ].map((tag, index) => (
//               <li
//                 key={index}
//                 className="border rounded-[50px] border-[#999] px-[10px] py-[5px]"
//               >
//                 {tag}
//               </li>
//             ))}
//           </ul>
//           <a href="https://nextcommerce-coral.vercel.app/" target="_blank">
//             {/* Button placeholder */}
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default LatestWork;


{/* ----------------Pervious Work -----*/}
{/* <div className="flex gap-[80px] items-center mt-12">
  <div className="w-full">
    <h3 className="text-[#ffe578] font-bold text-4xl">EazyGrad</h3>
    <span className="text-[#ffe578] text-lg">(EdTech Startup)</span>
    <p className="text-justify mt-2">
      Being a lead developer, revamped the site to a highly responsive,
      and interactive website. Created new features and pages. Worked as a
      team with product manager and ux designer.
    </p>

    <ul className="flex flex-wrap gap-2 mt-2">
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #react.js
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #express.js
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #node.js
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #swiper.js
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #mongoDB
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #mongoose
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #css
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #javascript
      </li>
      <li className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
        #figma
      </li>
    </ul>
  </div>
  <a href="#" className="w-full">
    <Image
      className="w-full"
      src="https://anuragsinghbam.netlify.app/images/eazygrad.webp"
      alt="Photo"
      width={400}
      height={400}
      priority // Optionally set to prioritize loading this image
    />
  </a>
</div> */}