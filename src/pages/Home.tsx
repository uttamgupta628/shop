
import React from 'react';
import HeroSection from '../components/home/Herosection';
import DealsSection from '../components/home/DealsSection';
import BrowseByCategory from '../components/home/BrowseByCategory';
import MusicExperienceShowcase from '../components/home/MusicExperienceShowcase';
import ExploreProducts from '../components/home/ExploreProducts';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <DealsSection />
      <BrowseByCategory />
      <MusicExperienceShowcase />
      <ExploreProducts />
    </div>
  );
};

export default Home;