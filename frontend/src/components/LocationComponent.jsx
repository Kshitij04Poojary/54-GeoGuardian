import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          setError("Error getting location: " + err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Location Coordinates</h1>
      {error && <p>{error}</p>}
      {coordinates ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationComponent;
