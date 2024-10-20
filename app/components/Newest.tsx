
import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function GetData() {
  const query = `*[_type == 'product'][0...4]| order(_createdAT desc){
  _id,
    price,
    name,
    "slug":slug.current,
    "categoryName":category->name,
    "imageUrl" : image[0].asset->url,   
}`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = 'force-dynamic'

const Newest = async () => {
  const data: simplifiedProduct[] = await GetData();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Newest Products
          </h2>
          <Link
            className="text-primary text-xl font-semibold items-center flex gap-x-1"
            href="/all"
          >
            See All
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((prodeuct) => (
            <div key={prodeuct._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg-h-80">
                <Image
                  src={prodeuct.imageUrl}
                  alt="product Image"
                  className="w-full h-full object-cover object-center lg:w-full lg:h-full"
                  priority
                  width={300}
                  height={300}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg text-gray-700">
                    <Link href={`prodeuct/${prodeuct.slug}`}>
                      {prodeuct.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-medium text-gray-500">
                    {prodeuct.categoryName}
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  ${prodeuct.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newest;
