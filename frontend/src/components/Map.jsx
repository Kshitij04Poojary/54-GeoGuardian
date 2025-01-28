import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MAPTILER_API_KEY = "Tw1eLIXf7BaTijTbOb4a";
const DEFAULT_ZOOM = 13;

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CenterMap = ({ position }) => {
    const map = useMap();
    map.setView(position, DEFAULT_ZOOM);
    return null;
};

const Map = () => {
    const [locations, setLocations] = useState([]);
    const [searchType, setSearchType] = useState("hospitals");
    const [mapCenter, setMapCenter] = useState([19.076, 72.8777]); // Navi Mumbai default
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLocations = async () => {
        if (!searchType.trim()) {
            console.warn("Search type cannot be empty.");
            return;
        }

        const apiUrl = `https://nominatim.openstreetmap.org/search`;
        const params = {
            q: searchType,
            format: "json",
            addressdetails: 1,
            limit: 10,
            countrycodes: "in",
        };

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(apiUrl, { params });
            const locationsData = response.data;

            if (locationsData.length === 0) {
                console.warn("No results found. Showing fallback location.");
                setLocations([]);
                setError(`No results found for "${searchType}".`);
            } else {
                setLocations(locationsData);

                // Calculate centroid for the map center
                const centroidLat = locationsData.reduce((sum, loc) => sum + parseFloat(loc.lat), 0) / locationsData.length;
                const centroidLon = locationsData.reduce((sum, loc) => sum + parseFloat(loc.lon), 0) / locationsData.length;
                setMapCenter([centroidLat, centroidLon]);
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
            setError("An error occurred while fetching locations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, [searchType]);

    return (
        <div>
            <div className="p-4">
                <label htmlFor="searchType" className="mr-2">
                    Search for:
                </label>
                <input
                    type="text"
                    id="searchType"
                    className="p-2 border rounded"
                    placeholder="Enter type, e.g., hospitals"
                    onChange={(e) => setSearchType(e.target.value)}
                />
            </div>

            {loading && <p className="p-4">Loading hospitals...</p>}
            {error && <p className="p-4 text-red-500">{error}</p>}

            <MapContainer
                center={mapCenter}
                zoom={DEFAULT_ZOOM}
                style={{ height: "600px", width: "100%" }}
            >
                <TileLayer
                    url={`https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                />
                <CenterMap position={mapCenter} />
                {locations.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lon]}>
                        <Popup>
                            <strong>{location.display_name}</strong>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;