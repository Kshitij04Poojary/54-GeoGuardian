import { useState } from "react";

const Card = ({ title, img }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative w-64 h-80 overflow-hidden rounded-xl cursor-pointer border-2 border-transparent transition-all duration-300 bg-white shadow-lg flex-shrink-0">
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="w-full h-full absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Card Image */}
      <img
        src={img}
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
      </div>

    </div>
  );
};

export default Card;