import React, { useRef, useState } from 'react';
import { Menu, X, AlertTriangle, Globe, Brain, Clock } from 'lucide-react';
import Card from '../components/Card';
import Testimonials from '../components/Testimonials';
import EarthCanvas from '../components/Earth';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const features = [
    {
      title: "Real-time Monitoring",
      description: "24/7 global surveillance systems tracking potential disasters",
      icon: <Clock className="w-6 h-6" />,
      img: 'https://tse2.mm.bing.net/th?id=OIP.juDo8a_p5VtZ7imXbO5ErQHaEK&pid=Api&P=0&h=180',
      imagePosition: "right"
    },
    {
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms for early warning systems",
      icon: <Brain className="w-6 h-6" />,
      img: "https://tse2.mm.bing.net/th?id=OIP.aj48y9KXH2xOZ46X9NvKJQHaEo&pid=Api&P=0&h=180",
      imagePosition: "left"
    },
    {
      title: "Global Coverage",
      description: "Comprehensive monitoring across all continents",
      icon: <Globe className="w-6 h-6" />,
      img: "https://tse2.mm.bing.net/th?id=OIP.eqqnIaxaDi5VypDVyMaUHwHaE7&pid=Api&P=0&h=180",
      imagePosition: "right"
    }
  ];

  const disasterTypes = [
    { name: "Earthquake", description: "Seismic activity monitoring", img: "https://www.top5.com/wp-content/uploads/2013/07/destructive-earthquakes-6.jpg" },
    { name: "Flood", description: "Water level tracking", img: "https://www.hindustantimes.com/ht-img/img/2023/07/13/1600x900/An-inundated-area-in-Delhi-after-Yamuna-breached-l_1689225114409.jpg" },
    { name: "Wildfire", description: "Heat detection systems" },
    { name: "Hurricane", description: "Storm path prediction" },
    { name: "Tsunami", description: "Ocean monitoring" }
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
            <div className="flex-shrink-0 flex items-center">
              <AlertTriangle className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">DisasterGuard</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="transition-colors">Home</a>
              <a href="#features" className="transition-colors">Features</a>
              <a href="#disasters" className="transition-colors">Disasters</a>
              <a href="#about" className="transition-colors">About Us</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="px-4 py-2 text-white rounded-lg border-2 border-blue-800 transition-colors cursor-pointer">
                Login
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer">
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">DisasterGuard</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Protecting Lives Through Advanced Disaster Detection
          </p>
        </div>
      </section>

      <section>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Transactions every 24 hours</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base/7 text-gray-600">Assets under holding</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
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
              <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Learn More
              </button>
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
                      image={disaster.img}
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
              Get Started
            </button>
            <button className="px-8 py-3 border border-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors text-lg w-full md:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;