import React, { useState } from 'react';
import { Target, MapPin, AlertTriangle, Wind, Waves } from 'lucide-react';
import axios from 'axios';
const CoordinateDisplay = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showTarget, setShowTarget] = useState(false);
    const [intensity, setIntensity] = useState(null);
    const [image, setImage] = useState('');
    const [iscyclone, setIscyclone] = useState(false);
    const [landslidedanger, setIslandSlideDanger] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [floodProb, setFloodedProb] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:5008/api/main/cyclone/images', {
                latitude,
                longitude,
            }, { withCredentials: true });

            const response2 = await axios.post('http://127.0.0.1:5008/api/main/cyclone/csv', {
                latitude,
                longitude,
            }, { withCredentials: true });

            const response3 = await axios.post('http://127.0.0.1:5008/api/main/landslide/csv', {
                latitude,
                longitude,
            }, { withCredentials: true });

            const response4 = await axios.get('http://127.0.0.1:5008/api/main/flood/images', { withCredentials: true });
            // console.log(response4.data);

            setIscyclone(response2.data === 1);

            const { data: predictionData, image: imgBase64 } = response.data;
            setImage(imgBase64);
            setIslandSlideDanger(response3.data.data);

            setIntensity(predictionData);
            setFloodedProb(response4.data.probability);

            setShowTarget(true);
            if (
                response4.data.probability > 0.7 ||
                response2.data.data === 1 ||
                response3.data.data === "Medium" ||
                response3.data.data === "High" ||
                response3.data.data === "Very High" ||
                response.data.data > 34
            ) {
                const alertMessage = `Alert! 
                ${response4.data.probability > 0.7 ? "Flood risk is high." : ""}
                ${response2.data.data === 1 ? "Cyclone detected." : ""}
                ${["Medium", "High", "Very High"].includes(response3.data.data) ? `Landslide risk: ${response3.data.data}.` : ""}
                ${response.data.data > 34 ? `Cyclone wind speed detected: ${response.data.data} knots.` : ""}`
                .trim();
            
                await axios.post('http://localhost:8000/api/broadcast/broadcast', {
                  message: alertMessage
                });
            
                console.log(alertMessage);
            }
            
        } catch (error) {
            console.error('There was an error with the request:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Geographic Risk Analysis
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                                            Latitude
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="any"
                                                value={latitude}
                                                onChange={(e) => setLatitude(e.target.value)}
                                                placeholder="Enter latitude"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                                required
                                            />
                                            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                                            Longitude
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="any"
                                                value={longitude}
                                                onChange={(e) => setLongitude(e.target.value)}
                                                placeholder="Enter longitude"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                                required
                                            />
                                            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Target className="w-5 h-5" />
                                            <span>Analyze Location</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {showTarget && (
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <MapPin className="w-5 h-5 text-blue-500" />
                                                <h3 className="font-medium text-gray-700">Location</h3>
                                            </div>
                                            <p className="text-gray-600">{latitude}°, {longitude}°</p>
                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Waves className="w-5 h-5 text-purple-500" />
                                                <h3 className="font-medium text-gray-700">Flood</h3>
                                            </div>
                                            <p className="text-gray-600">{floodProb > 0.5 ? "Yes" : "No"}</p>

                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <Wind className="w-5 h-5 text-orange-500" />
                                                <h3 className="font-medium text-gray-700">Cyclone Status</h3>
                                            </div>
                                            <p className={`${iscyclone ? 'text-red-500 font-medium' : 'text-green-500'}`}>
                                                {iscyclone ? "Cyclone forecasted" : "No cyclone"}
                                            </p>
                                            <p className="text-gray-600">{intensity + " knots" || 'Analyzing...'}</p>

                                        </div>

                                        <div className="bg-white p-4 rounded-lg shadow-sm">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                                <h3 className="font-medium text-gray-700">Landslide Risk</h3>
                                            </div>
                                            <p className="text-gray-600">
                                                {landslidedanger !== null ? landslidedanger : "Analyzing..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            {image && (
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Satellite Imagery</h2>
                                    <img
                                        src={`data:image/png;base64,${image}`}
                                        alt="Location satellite view"
                                        className="w-full h-auto rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoordinateDisplay;