import React from 'react';
import { assets } from '../assets/assets'; // Ensure the import path is correct

const Footer = () => {
  return (
    <div className=''>
      <div className='container mx-auto flex flex-col sm:grid grid-cols-3 gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='w-32 mb-5' alt="Forever Brand Logo" />
          <p className='w-full md:w-2/3 text-gray-700'>
            "Forever Brand: Timeless elegance, unmatched quality, and innovative designs that elevate your everyday style with lasting sophistication."
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><a href="/" className='hover:text-gray-900'>Home</a></li>
            <li><a href="/about" className='hover:text-gray-900'>About Us</a></li>
            <li><a href="/products" className='hover:text-gray-900'>Delivery</a></li>
            <li><a href="/contact" className='hover:text-gray-900'>Privacy Policy</a></li>
          </ul>
        </div>

        <div>
         <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
         <ul className='flex flex-col gap-1 text-gray-800'>
                <li>+92-315-6415552 </li>
                <li>harisabbas792@gmail.com</li>
         </ul>
        </div>
      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'> Copyright 2024@ Forever.com - All Right Reserved.</p>
        </div>

    </div>
  );
}

export default Footer;
