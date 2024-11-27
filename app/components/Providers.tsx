"use client";
import { CartProvider } from "use-shopping-cart";
import { ReactNode } from "react";
export default function Providers({children} : {children : ReactNode}){
return(
<CartProvider 
mode="payment" 
cartMode="client-only"
stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string }
successUrl="https://nextcommerce-ten-hazel.vercel.app/stripe/sucess"
cancelUrl="https://nextcommerce-ten-hazel.vercel.app/stripe/error"
currency="USD"
billingAddressCollection={false}
shouldPersist={true}
language="en-US"
>
    {children}
</CartProvider>
);
}
