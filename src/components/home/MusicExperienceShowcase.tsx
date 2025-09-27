import React, { useState, useEffect } from 'react';
import headPhone from '../../assets/headphone.png';

const MusicExperienceShowcase: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <section className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 mx-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          
          {/* Left Content */}
          <div className="space-y-12 px-26">
            {/* Categories Badge */}
            <div className="inline-block">
              <span className="bg-green-500 text-black px-4 py-2 rounded text-sm font-semibold">
                Categories
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-6xl lg:text-5xl font-bold leading-tight mb-8">
                Enhance Your
                <br />
                Music Experience
              </h2>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {formatTime(timeLeft.hours)}
                </div>
                <div className="text-xs mt-2 text-gray-400">Hours</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {formatTime(timeLeft.days)}
                </div>
                <div className="text-xs mt-2 text-gray-400">Days</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {formatTime(timeLeft.minutes)}
                </div>
                <div className="text-xs mt-2 text-gray-400">Minutes</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
                  {formatTime(timeLeft.seconds)}
                </div>
                <div className="text-xs mt-2 text-gray-400">Seconds</div>
              </div>
            </div>

            {/* Buy Now Button */}
            <div className="pt-4">
              <button className="bg-green-500 hover:bg-green-600 text-black font-semibold px-12 py-4 rounded-lg transition-colors text-lg">
                Buy Now!
              </button>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-gray-700/20 to-transparent rounded-full blur-3xl scale-150"></div>
              
              {/* Product Image */}
              <div className="relative z-10">
                <img
                  src={headPhone}
                  alt="Premium Wireless Headphones"
                  className="w-80 h-80 lg:w-120 lg:h-120 object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 -left-4 opacity-20">
                <div className="w-32 h-32 border border-gray-600 rounded-full"></div>
              </div>
              
              <div className="absolute bottom-8 -right-4 opacity-20">
                <div className="w-24 h-24 border border-gray-600 rounded-full"></div>
              </div>
              
              <div className="absolute top-1/2 -right-8 opacity-20">
                <div className="w-16 h-16 border border-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicExperienceShowcase;