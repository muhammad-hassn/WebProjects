
import { client, urlfor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData() {
  try {
    const query = "*[_type == 'heroImage'][0]";
    const data = await client.fetch(query);

    if (!data) {
      console.error("No data found for hero image.");
      return null; // Return null if no data is found
    }

    return data;
  } catch (error) {
    console.error("Error fetching hero image data:", error);
    return null; // Return null in case of an error
  }
}

const Hero = async () => {
  const data  = await getData();
  return (
    <>
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl text-black md:mb-8 md:text-6xl">
            Top fashion for a top Price
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell exclusive and hight quality product for you.We are the best
            so come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0 ">
            <Image
              src={urlfor(data.image1).url()}
              alt="hero image"
              width={500}
              height={500}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src={urlfor(data.image2).url()}
              className="w-full h-full object-cover object-center"
              alt="hero image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
<Link href="/Men" 
className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200" >
Men
</Link>
<Link href="/Women" 
className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200" >
Women
</Link>
<Link href="/Teens" 
className="flex items-center justify-center w-1/3 text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200" >
Teens
</Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;
