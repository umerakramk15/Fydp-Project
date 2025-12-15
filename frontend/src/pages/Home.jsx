import React from 'react'
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import CategoriesSection from '../components/CategoriesSection'; // Add this line
import FeaturedBrands from '../components/FeaturedBrands'; // Add this line

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <CategoriesSection />
      <LatestCollection />
      <BestSeller />
      <FeaturedBrands />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home;