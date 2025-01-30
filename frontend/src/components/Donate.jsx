import React from 'react';
import PricingPlan from './PricingPlan';

const Donate = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 p-10'>
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-white mb-12">Support Our Mission</h1>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-stretch">
                    {PricingPlan.map((item, index) => (
                        <div 
                            key={index} 
                            className="relative group rounded-3xl border border-white/10 p-6 sm:px-8 lg:p-12 
                                     flex flex-col justify-between h-full overflow-hidden
                                     backdrop-blur-lg bg-white/10
                                     transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                                     before:absolute before:inset-0 before:bg-gradient-to-br 
                                     before:from-white/5 before:to-white/10 before:opacity-0 
                                     before:transition-opacity hover:before:opacity-100"
                        >
                            {/* Gradient orb effect */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500 rounded-full blur-[100px] opacity-25 group-hover:opacity-50 transition-opacity" />
                            
                            <div className="relative">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-white mb-2">
                                        {item.duration}
                                    </h2>

                                    <p className="mt-2 sm:mt-4">
                                        <strong className="text-4xl font-bold text-white sm:text-5xl">{item.price}</strong>
                                    </p>
                                    
                                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-400 to-blue-400 mx-auto mt-4 rounded-full" />
                                </div>

                                <ul className="mt-8 space-y-4">
                                    {item.offering.map((obj, index) => (
                                        <li key={index} className="flex items-center gap-3 text-white/90">
                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5 text-indigo-300"
                                            > */}
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            {/* </svg> */}
                                            <span className="text-lg">{obj.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={item.link + '?prefilled_email='}
                                target='_blank'
                                className="relative mt-8 block rounded-2xl px-8 py-4 text-center 
                                         text-lg font-semibold transition-all duration-300
                                         bg-gradient-to-r from-indigo-500 to-blue-500 text-white
                                         hover:from-indigo-600 hover:to-blue-600
                                         focus:outline-none focus:ring-2 focus:ring-white/50
                                         transform hover:-translate-y-1 active:translate-y-0
                                         shadow-lg hover:shadow-xl"
                            >
                                Get Started
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Donate;