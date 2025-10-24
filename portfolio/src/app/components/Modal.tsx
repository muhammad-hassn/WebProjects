// "use client";
// import React from "react";
// import Image from "next/image";

// const Modal = () => {
//   return (
//     <div id="AboutPage" className="relative w-[90%] mx-auto my-8 max-w-7xl rounded-lg border shadow-lg hover:scale-105 duration-300">
//       <div>
//         <h2 className="font-thin text-[#1788ae] mt-3 text-4xl">ABOUT ME</h2>
//       </div>
//       <div className="flex">
//         <div className="w-1/2">
//           <p className="w-[90%] m-auto text-justify mt-4 text-xl">
//             Hello! I’m Muhammad Hassan, a passionate <span className="font-bold text-[#1788ae]">Python and TypeScript</span> developer with expertise in <span className="font-bold text-[#1788ae]">Next JS and Django</span> framework. Currently, I’m pursuing a degree in Software Engineering from PAF-KIET and specializing in AI Engineering from PIAIC. With a strong foundation in programming and a keen interest in AI, I help business owners and busy web developers design & develop creative websites that fit their vision and attract visitors. Here are some tools I use to build awesome websites:
//           </p>
//           <ul className="flex flex-wrap gap-2 mt-2 w-[90%] m-auto text-justify">
//             {["#javascript", "#Next.js", "#Python", "#node.js", "#TypeScript", "#SQL Server", "#Django", "#Docker", "#html", "#CSS", "#bootstrap", "#tailwind", "#git", "#github", "#aws", "#terminal", "#C Sharp", "#figma"].map(tag => (
//               <li key={tag} className="border rounded-[50px] border-[#999] px-[10px] py-[5px]">
//                 {tag}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="image w-1/3">
//           <Image src="/about.svg" width={1000} height={1000} alt="About Image" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;




"use client";
import React from "react";
import Image from "next/image";

const Modal = () => {
  return (
    <div
      id="AboutPage"
      className="relative w-[90%] mx-auto my-8 max-w-7xl rounded-lg border shadow-lg hover:scale-105 duration-300"
    >
      <div>
        <h2 className="font-thin text-[#1788ae] mt-3 text-3xl md:text-4xl">
          ABOUT ME
        </h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <p className="w-[90%] m-auto text-justify mt-4 text-lg md:text-xl">
            Hello! I’m Muhammad Hassan, a passionate
            <span className="font-bold text-[#1788ae]"> Python and TypeScript</span> developer with expertise in
            <span className="font-bold text-[#1788ae]"> Next JS and Django</span> framework. Currently, I’m pursuing a degree in Software Engineering from PAF-KIET and specializing in AI Engineering from PIAIC. With a strong foundation in programming and a keen interest in AI, I help business owners and busy web developers design & develop creative websites that fit their vision and attract visitors. Here are some tools I use to build awesome websites:
          </p>
          <ul className="flex flex-wrap gap-2 mt-2 w-[90%] m-auto text-justify">
            {[
              "#javascript",
              "#Next.js",
              "#Python",
              "#node.js",
              "#TypeScript",
              "#SQL Server",
              "#Django",
              "#Docker",
              "#html",
              "#CSS",
              "#bootstrap",
              "#tailwind",
              "#git",
              "#github",
              "#aws",
              "#terminal",
              "#C Sharp",
              "#figma",
            ].map((tag) => (
              <li
                key={tag}
                className="border rounded-[50px] border-[#999] px-[10px] py-[5px] text-sm md:text-base"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="image w-full md:w-1/3 mx-auto">
          <Image
            src="/about.svg"
            width={600}
            height={600}
            alt="About Image"
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
