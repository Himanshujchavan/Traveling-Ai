import React, { useState, useEffect, useRef } from 'react';
import AnimatedLogo from './AnimatedLogo';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing your journey...');
  const logoRef = useRef();

  const loadingMessages = [
    'Preparing your journey...',
    'Checking flight routes...',
    'Finding best destinations...',
    'Optimizing travel plans...',
    'Almost ready to take off...'
  ];

  useEffect(() => {
    // Start logo animation immediately
    const logoTimer = setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.play();
      }
    }, 500);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Update loading text based on progress
        if (newProgress > 80) {
          setLoadingText(loadingMessages[4]);
        } else if (newProgress > 60) {
          setLoadingText(loadingMessages[3]);
        } else if (newProgress > 40) {
          setLoadingText(loadingMessages[2]);
        } else if (newProgress > 20) {
          setLoadingText(loadingMessages[1]);
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center z-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full opacity-10 animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-white rounded-full opacity-10 animate-pulse delay-700"></div>
        
        {/* Floating clouds */}
        <div className="absolute top-16 left-1/3 w-20 h-8 bg-white rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-1/3 w-16 h-6 bg-white rounded-full opacity-20 animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-10 bg-white rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div style={{ width: '33vw', maxWidth: 480 }}>
            <AnimatedLogo 
              ref={logoRef}
              size={"100%"}
              colorPrimary="#FFFFFF"
              colorAccent="#FCD34D"
              colorDark="#1E293B"
              autoPlay={false}
            />
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to PacknGo
          </h2>
          <p className="text-white/80 text-lg animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-white/70 text-sm mt-2">
            <span>0%</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Tagline */}
        <p className="text-white/60 text-sm mt-6 font-medium">
          Your AI-powered travel companion is getting ready...
        </p>
      </div>
    </div>
  );
};

export default Loader;