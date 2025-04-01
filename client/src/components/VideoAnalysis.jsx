import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoAnalysis = () => {
  const [isBackendRunning, setIsBackendRunning] = useState(false);
  const videoAppUrl = 'http://localhost:5174'; // Video frontend URL

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await axios.get('http://localhost:3000/');
        console.log('Backend response:', response.data);
        if (response.data) {
          setIsBackendRunning(true);
        }
      } catch (error) {
        console.error('Error connecting to video backend:', error);
        setIsBackendRunning(false);
      }
    };

    checkBackend();
    // Poll every 5 seconds to check if backend is running
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-semibold text-white mb-8">Video Analysis</h2>
      
      {!isBackendRunning ? (
        <div className="text-white text-xl">
          Loading Video Analysis...
          <p className="text-sm mt-2 text-red-400">
            Make sure video backend is running on port 3000
          </p>
        </div>
      ) : (
        <iframe
          src={videoAppUrl}
          title="Video Analysis Application"
          className="w-full h-[80vh] rounded-lg shadow-lg"
          style={{ border: 'none' }}
        />
      )}
    </div>
  );
};

export default VideoAnalysis; 