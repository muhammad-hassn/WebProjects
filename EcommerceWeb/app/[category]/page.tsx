import { client } from "@/lib/sanity";
import { simplifiedProduct } from "../interface";
import Image from "next/image";
import Link from "next/link";
async function getdata(category : string) {
    const query = `*[_type == "product" && category->name == "${category}"]{
  _id,
    "imageUrl":image[0].asset->url,
      price,
    name,
    "slug":slug.current,
    "categoryName":category->name
}`;

const data = await client.fetch(query)
return data;
}
export const dynamic = 'force-dynamic'

export default async function Categorypage({params} : {params : {category : string}}){
const data : simplifiedProduct[] = await getdata(params.category)

return(
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products For {params.category}
          </h2>
         
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
}