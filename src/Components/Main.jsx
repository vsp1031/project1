import React from 'react';
import { notifications } from '../Constants'
import { check } from '../assets';
import { useState, useEffect } from 'react';

const App = () => {

  const apiKey = 'a086ea06de4a8974f0f7c7faf80ed387';

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Initial search term

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a location');
      return; 
      // Prevent unnecessary API call
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Invalid location or failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="container mx-auto p-4">

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 shadow rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Important notifications</h3>
          <ul className='flex flex-col'>
            {notifications.map((item, index) => (
            <li key={index} className='mb-4'>
                <div className='flex mb-[0.1rem]'>
                  <img src={check} className='mr-2'/>
                  {item.title}
                </div>
                <p className='ml-8'>{item.msg}</p>
            </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-200 shadow rounded-lg p-4">
          <h3>Weather</h3>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search location"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyUp={handleKeyUp}
              className="rounded-lg border border-gray-300 px-3 py-1.5 mr-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-[#8ebf24] text-white px-3 py-1.5 rounded-lg font-medium focus:outline-none hover:bg-[#2e590e]"
            >
              Search
            </button>
          </div>
          {isLoading && <p>Loading weather data...</p>}
          {error && <p>Error: {error}</p>}
          {weatherData && (
            <>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                width="100"
                height="100"
              />
              <p>
                City: {weatherData.name}
              </p>
              <p>
                Temperature: {Math.round(weatherData.main.temp)}°C
              </p>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-200 shadow rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Box 3</h3>
          <p>This is the third box content.</p>
        </div>
        <div className="bg-gray-200 shadow rounded-lg p-4">
          <h3 className="text-lg font-medium mb-2">Box 4</h3>
          <p>This is the fourth box content.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
