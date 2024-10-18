"use client";
import { urlfor } from "@/lib/sanity";
import Image from "next/image";
import { useState } from "react";

export interface Iprops {
  images: any[];
}

const ImageGallery = ({ images }: Iprops) => {
  const [bigImage, setBigImage] = useState(images[0]);
  const handlesmallimageClick = (image: any) => {
      setBigImage(image)
  }
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col ">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlfor(image).url()}
              width={300}
              height={300}
              alt="photo"
              onClick={() => handlesmallimageClick(image)}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg lg:col-span-4 bg-gray-100">
<Image
  src={urlfor(bigImage).url()} 
  alt="photo"
  width={500}
  height={500}
  className="w-full h-full object-cover object-center cursor-pointer"
  />
  <span className="absolute left-0 top-0 bg-red-500 rounded-br-lg px-3 py-1.5 text-sm uppercase traking-widest text-white">
Sale
  </span>
      </div>
    </div>
  );
};  

export default ImageGallery;
