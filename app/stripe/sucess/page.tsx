import { Button } from '@/components/ui/button'
import { CheckCheck } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SucessStripe = () => {
  return (
    <div className='h-screen'>
        <div className='mt-32 md:max-w-[50vw] mx-auto'>
        <CheckCheck className='text-green-600 w-16 h-16 mx-auto my-6' />
        <div className='text-center'>
        <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>Payment Done!</h3>
        <p className='text-600 my-2'>Thank you for your perchase We hope you enjoy it.</p>
        <p>Have a Greate day!</p>
        <Button className='mt-5' asChild>
        <Link  href="/">
            GO BACK
            </Link>
        </Button>
        </div>
        </div>
    </div>
  )
}

export default SucessStripe