import { Any } from "next-sanity"

export interface simplifiedProduct{
    _id : string,
    name : string,
    price : number,
    slug : string,
    categoryName : string,
    imageUrl : string
} 
export interface fullProduct{
    _id : string,
    name : string,
    price : number,
    slug : string,
    CategoryName : string,
    image : Any,
    description : string,
    price_id: string
}
