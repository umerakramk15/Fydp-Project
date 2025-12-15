import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-center'>
        <img className='w-full md:max-w-[450px] rounded-lg shadow-lg' src={assets.about_img} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to Forever! Our mission is to provide timeless, high-quality fashion that enhances your everyday wardrobe. At Forever, we believe in the power of style to express individuality and confidence. Our diverse collection caters to every taste and occasion, ensuring that you always feel your best. We are committed to delivering unparalleled customer satisfaction and fostering a community where fashion is celebrated. Join us on a journey to a forever stylish you. 🛍️✨
          </p>
          <p>
            At Forever, we are passionate about sustainability and ethical fashion. We source our materials responsibly, ensuring that our products not only look good but also do good for the environment. Our commitment to sustainable practices means that you can shop with confidence, knowing that each piece in your wardrobe supports a greener planet. Join us in making a positive impact on the world, one stylish outfit at a time. 🌿👗💚
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Welcome to Forever! Our mission is to provide timeless, high-quality fashion that enhances your everyday wardrobe. At Forever, we believe in the power of style to express individuality and confidence. Our diverse collection caters to every taste and occasion.
          </p>
        </div>
      </div>

      <div className='text-xl py-4 text-center'> 
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-10'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-700'>
            Quality Assurance (QA) is a systematic process designed to evaluate and improve the quality of products, services, and processes.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-700'>
            Convenience is the key to enhancing user experience and satisfaction. It's about making tasks easy, fast, and hassle-free, enabling users to achieve their goals with minimal effort in an increasingly fast-paced world.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-700'>
            Exceptional customer service is the cornerstone of successful businesses, characterized by prompt, empathetic, and personalized interactions. It involves actively listening to customers' needs, addressing their concerns efficiently, and providing solutions that leave a lasting positive impression.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
}

export default About;
