"use client";
import { Button } from '@/components/ui/button'
import { urlfor } from '@/lib/sanity';
import React from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { ProductCart } from './AddtoBag';


const CheckOutNow = ({name , currency , description , image , price , price_id} : ProductCart) => {
    const { checkoutSingleItem } = useShoppingCart()
    function buyNow(priceId : string) {
      checkoutSingleItem(priceId)
    }
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
        onClick={() =>{ buyNow(product.price_id);
        }}
        >Add To Cart</Button>
    </div>
  )
}

export default CheckOutNow