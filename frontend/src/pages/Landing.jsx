import React, { useRef, useState } from 'react';
import { Menu, X, AlertTriangle, Globe, Brain, Clock } from 'lucide-react';
import Card from '../components/Card';
import Testimonials from '../components/Testimonials';

import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const features = [
    {
      title: "Real-time Image Detection",
      description: "Surveillance systems tracking potential disasters",
      icon: <Clock className="w-6 h-6" />,
      img: 'data:image/jpeg;base64,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',
      imagePosition: "right"
    },
    {
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms for early warning systems",
      icon: <Brain className="w-6 h-6" />,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEq6FUz4BmqnCVzTHP0Nx9xhvheLumgDwjqg&s",
      imagePosition: "left"
    },
    {
      title: "Pan India Coverage",
      description: "Comprehensive monitoring across the country making us Aatmanirbhar",
      icon: <Globe className="w-6 h-6" />,
      img: "data:image/jpeg;base64,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",
      imagePosition: "right"
    }
  ];

  const disasterTypes = [
    { name: "Earthquake", description: "Seismic activity monitoring", img: "https://www.top5.com/wp-content/uploads/2013/07/destructive-earthquakes-6.jpg" },
    { name: "Flood", description: "Water level tracking", img: "https://www.hindustantimes.com/ht-img/img/2023/07/13/1600x900/An-inundated-area-in-Delhi-after-Yamuna-breached-l_1689225114409.jpg" },
    { name: "Cyclone", description: "Storm path prediction", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Low_pressure_system_over_Iceland.jpg/800px-Low_pressure_system_over_Iceland.jpg"},
    { name: "Landslide", description: "Slope monitoring", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimOy0pTQpQwq6_J-uATc2tcidGgX_cXzfpA&s"}
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full z-50 border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
          <div className="p-6">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 animate-pulse" />
            <div className="flex flex-col">
              <h2 className="font-bold text-2xl tracking-wide">
                Geo
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600">
                  Guardian
                </span>
              </h2>
            </div>
          </div>
        </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-lg">
              <a href="#home" className="transition-colors">Home</a>
              <a href="#features" className="transition-colors">Features</a>
              <a href="#disasters" className="transition-colors">Disasters</a>
              <a href="#about" className="transition-colors">About Us</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-white rounded-lg border-2 border-blue-800 transition-colors cursor-pointer"
                onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                onClick={() => navigate('/register')}>
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Home</a>
                <a href="#features" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Features</a>
                <a href="#disasters" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Disasters</a>
                <a href="#about" className="block px-3 py-2 hover:bg-gray-800 rounded-md">About Us</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <img
          src="https://www.hdwallpapers.in/download/planet_earth_stars-1920x1080.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">GeoGuardian</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Protecting Lives Through Advanced Disaster Detection and Prevention
          </p>
        </div>
      </section>

      <section>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Transactions every 24 hours</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">4 lakh</dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Assets under holding</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">₹1 crore</dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">New users annually</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Types of disasters */}
      <section className="w-full bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between">
            {/* Left side content */}
            <div className="md:w-1/3 md:top-24 mb-12 md:mb-0 pr-8">
              <h2 className="text-4xl font-bold text-white mb-6">
                Monitor Natural Disasters
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Our advanced monitoring systems track multiple types of natural disasters worldwide, providing early warnings and real-time updates to help protect communities.
              </p>
            </div>

            {/* Right side scrolling cards */}
            <div className="md:w-2/3">
              {/* Gradient fade effect for scroll indication */}
              <div className="relative">
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-gray-800 to-transparent z-10" />

                {/* Scrollable container with drag functionality */}
                <div
                  ref={scrollContainerRef}
                  className={`
                  flex space-x-6 overflow-x-hidden scrollbar-hide pb-6 pl-12 pr-4
                  ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                `}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  {disasterTypes.map((disaster, index) => (
                    <Card
                      key={index}
                      title={disaster.name}
                      img={disaster.img}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`flex ${feature.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center justify-around mb-20 last:mb-0`}
            >
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold ml-2">{feature.title}</h3>
                </div>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </div>
              <div className={`md:w-1/2`}>
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-[60%] rounded-lg hover:transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-gray-300 text-lg mb-8">
            Be part of our mission to protect communities worldwide through advanced disaster prevention.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button className="px-8 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors text-lg w-full md:w-auto">
              Donate
            </button>
            <button className="px-8 py-3 border border-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors text-lg w-full md:w-auto">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;