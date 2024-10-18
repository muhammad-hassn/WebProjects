"use client";
import { Button } from '@/components/ui/button'
import { urlfor } from '@/lib/sanity';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export interface ProductCart{
    name  : string;
    price : number ; 
    description : string;
    image : any;
    currency : string;
    price_id : string;
}

const AddtoBag = ({name , currency , description , image , price , price_id} : ProductCart) => {
    const {addItem , handleCartClick} = useShoppingCart()

    const product = {
        name : name,
        description : description,
        price : price ,
        currency : currency,
        image : urlfor(image).url(),
        price_id : price_id,
    }
  return (
    <div>
        <Button
        onClick={() =>{ addItem(product), handleCartClick();
        }}
        >Add To Cart</Button>
    </div>
  )
}

export default AddtoBag