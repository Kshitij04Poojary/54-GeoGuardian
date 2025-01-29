import React from 'react';

const FirstAidCard = ({ id, title, image, onClick }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div 
      onClick={() => onClick(id)}
      className="group relative w-full h-80 overflow-hidden rounded-xl cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-blue-500 bg-white shadow-lg"
    >
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="w-full h-full absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Card Image */}
      <img
        src={image}
        alt={title}
        onLoad={() => setImageLoaded(true)}
        className={`
          w-full h-full object-cover transition-transform duration-500 
          group-hover:scale-105 
          ${imageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Title Container */}
      <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-3xl font-semibold text-white">
          {title}
        </h3>
        
        {/* Click hint */}
        <p className="text-m text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Click to view details →
        </p>
      </div>

      {/* Accessibility */}
      <span className="sr-only">View details for {title}</span>
    </div>
  );
};

export default FirstAidCard;