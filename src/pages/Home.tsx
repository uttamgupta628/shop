
import React from 'react';
import HeroSection from '../components/home/Herosection';
import DealsSection from '../components/home/DealsSection';
import BrowseByCategory from '../components/home/BrowseByCategory';
import MusicExperienceShowcase from '../components/home/MusicExperienceShowcase';
import ExploreProducts from '../components/home/ExploreProducts';
import AboutPage from '../components/about';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutPage/>
      <DealsSection />
      <BrowseByCategory />
      <MusicExperienceShowcase />
      <ExploreProducts />
    </div>
  );
};

export default Home;