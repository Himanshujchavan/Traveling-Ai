import React from "react";

export const AnimatedScene = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full min-h-[600px] overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 ${className}`}>
      <style jsx>{`
        @keyframes fly {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-fly {
          animation: fly 15s linear infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      {/* Sun */}
      <div className="absolute top-16 right-20">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <defs>
            <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(45 100% 85%)" />
              <stop offset="30%" stopColor="hsl(45 100% 75%)" />
              <stop offset="70%" stopColor="hsl(40 100% 65%)" />
              <stop offset="100%" stopColor="hsl(35 100% 55%)" />
            </radialGradient>
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Sun rays */}
          <g stroke="hsl(45 100% 70% / 0.6)" strokeWidth="3" strokeLinecap="round">
            <line x1="60" y1="10" x2="60" y2="25" className="animate-pulse" />
            <line x1="60" y1="95" x2="60" y2="110" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
            <line x1="10" y1="60" x2="25" y2="60" className="animate-pulse" style={{ animationDelay: "1s" }} />
            <line x1="95" y1="60" x2="110" y2="60" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
            <line x1="25.8" y1="25.8" x2="36.2" y2="36.2" className="animate-pulse" style={{ animationDelay: "0.2s" }} />
            <line x1="83.8" y1="83.8" x2="94.2" y2="94.2" className="animate-pulse" style={{ animationDelay: "0.7s" }} />
            <line x1="94.2" y1="25.8" x2="83.8" y2="36.2" className="animate-pulse" style={{ animationDelay: "1.2s" }} />
            <line x1="36.2" y1="83.8" x2="25.8" y2="94.2" className="animate-pulse" style={{ animationDelay: "1.7s" }} />
          </g>
          {/* Sun body */}
          <circle cx="60" cy="60" r="25" fill="url(#sunGradient)" filter="url(#sunGlow)" className="animate-pulse" style={{ animationDuration: "4s" }} />
          <circle cx="60" cy="60" r="20" fill="hsl(45 100% 80% / 0.8)" />
          <circle cx="60" cy="60" r="15" fill="hsl(45 100% 85% / 0.6)" />
        </svg>
      </div>
      {/* Buildings Silhouette - Bigger */}
      <div className="absolute bottom-0 w-full h-4/5">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYEnd slice">
          <defs>
            <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(210 45% 12%)" />
              <stop offset="50%" stopColor="hsl(210 40% 18%)" />
              <stop offset="100%" stopColor="hsl(210 35% 15%)" />
            </linearGradient>
            <linearGradient id="buildingLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(210 40% 25%)" />
              <stop offset="100%" stopColor="hsl(210 45% 20%)" />
            </linearGradient>
          </defs>
          {/* Building silhouettes */}
          <g>
            <rect x="0" y="250" width="120" height="350" fill="url(#buildingGradient)" />
            <rect x="120" y="300" width="60" height="300" fill="hsl(210 40% 15%)" />
            <polygon points="0,250 60,220 120,250" fill="hsl(210 45% 22%)" />
            <rect x="180" y="150" width="135" height="450" fill="url(#buildingLight)" />
            <rect x="202" y="120" width="90" height="480" fill="hsl(210 38% 20%)" />
            <polygon points="180,150 247,120 315,150" fill="hsl(210 42% 25%)" />
            <rect x="315" y="200" width="150" height="400" fill="hsl(210 40% 18%)" />
            <rect x="345" y="170" width="90" height="430" fill="hsl(210 45% 16%)" />
            <rect x="465" y="130" width="120" height="470" fill="url(#buildingGradient)" />
            <rect x="480" y="100" width="90" height="500" fill="hsl(210 50% 22%)" />
            <polygon points="465,130 525,100 585,130" fill="hsl(210 55% 28%)" />
            <rect x="585" y="180" width="105" height="420" fill="hsl(210 40% 19%)" />
            <rect x="615" y="150" width="45" height="450" fill="hsl(210 45% 17%)" />
            <rect x="690" y="220" width="75" height="380" fill="hsl(210 38% 21%)" />
            <rect x="765" y="80" width="150" height="520" fill="url(#buildingLight)" />
            <rect x="795" y="50" width="90" height="550" fill="hsl(210 45% 20%)" />
            <polygon points="765,80 840,50 915,80" fill="hsl(210 50% 26%)" />
            <rect x="915" y="160" width="127" height="440" fill="hsl(210 40% 18%)" />
            <rect x="940" y="140" width="82" height="460" fill="hsl(210 42% 16%)" />
            <rect x="1042" y="200" width="135" height="400" fill="url(#buildingGradient)" />
            <rect x="1072" y="180" width="75" height="420" fill="hsl(210 40% 19%)" />
            <rect x="1177" y="120" width="23" height="480" fill="hsl(210 40% 16%)" />
          </g>
          {/* Windows */}
          <g>
            <g fill="hsl(45 85% 70% / 0.8)">
              {/* Office windows pattern */}
              <rect x="20" y="280" width="9" height="12" />
              <rect x="35" y="290" width="9" height="12" />
              <rect x="50" y="280" width="9" height="12" />
              <rect x="65" y="300" width="9" height="12" />
              <rect x="80" y="280" width="9" height="12" />
              <rect x="200" y="180" width="8" height="10" />
              <rect x="215" y="180" width="8" height="10" />
              <rect x="230" y="180" width="8" height="10" />
              <rect x="245" y="180" width="8" height="10" />
              <rect x="260" y="180" width="8" height="10" />
              <rect x="200" y="200" width="8" height="10" />
              <rect x="215" y="200" width="8" height="10" />
              <rect x="230" y="200" width="8" height="10" />
              <rect x="245" y="200" width="8" height="10" />
              <rect x="260" y="200" width="8" height="10" />
              <rect x="200" y="220" width="8" height="10" />
              <rect x="215" y="220" width="8" height="10" />
              <rect x="230" y="220" width="8" height="10" />
              <rect x="245" y="220" width="8" height="10" />
              <rect x="260" y="220" width="8" height="10" />
              <rect x="345" y="230" width="9" height="14" />
              <rect x="370" y="250" width="9" height="14" />
              <rect x="395" y="230" width="9" height="14" />
              <rect x="420" y="270" width="9" height="14" />
              <rect x="495" y="160" width="6" height="18" />
              <rect x="510" y="180" width="6" height="18" />
              <rect x="525" y="160" width="6" height="18" />
              <rect x="540" y="200" width="6" height="18" />
              <rect x="555" y="160" width="6" height="18" />
              <rect x="810" y="120" width="8" height="12" />
              <rect x="825" y="140" width="8" height="12" />
              <rect x="840" y="120" width="8" height="12" />
              <rect x="855" y="160" width="8" height="12" />
              <rect x="870" y="120" width="8" height="12" />
              <rect x="960" y="190" width="8" height="10" />
              <rect x="980" y="210" width="8" height="10" />
              <rect x="1000" y="190" width="8" height="10" />
              <rect x="1090" y="230" width="8" height="12" />
              <rect x="1110" y="250" width="8" height="12" />
              <rect x="1130" y="230" width="8" height="12" />
            </g>
            <g fill="hsl(205 70% 65% / 0.6)">
              <rect x="825" y="180" width="8" height="12" />
              <rect x="855" y="200" width="8" height="12" />
              <rect x="870" y="180" width="8" height="12" />
            </g>
          </g>
        </svg>
      </div>
      {/* Animated Airplane (same as logo) */}
      <div className="absolute top-1/4 left-0 animate-fly">
        <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="planeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="50%" stopColor="#F3F4F6" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>

            <filter id="planeShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.3" />
            </filter>
          </defs>
          
          {/* Realistic airplane (same as logo) */}
          <g transform="translate(60,30)" filter="url(#planeShadow)">
            {/* Main fuselage */}
            <ellipse cx="0" cy="0" rx="25" ry="4" fill="url(#planeGradient)" />
            
            {/* Cockpit */}
            <ellipse cx="20" cy="0" rx="8" ry="3" fill="#1E40AF" opacity="0.8" />
            
            {/* Main wings */}
            <path d="M-5 0 L-15 -12 L5 -8 L15 -4 L5 4 L-15 8 Z" fill="url(#planeGradient)" />
            
            {/* Wing details */}
            <path d="M-10 -8 L0 -6 L10 -3" stroke="#0F172A" strokeWidth="1" opacity="0.3" />
            <path d="M-10 4 L0 3 L10 2" stroke="#0F172A" strokeWidth="1" opacity="0.3" />
            
            {/* Tail */}
            <path d="M-20 0 L-30 -8 L-25 -2 L-30 4 Z" fill="url(#planeGradient)" />
            
            {/* Vertical stabilizer */}
            <path d="M-25 0 L-32 -12 L-28 -10 L-22 -2 Z" fill="url(#planeGradient)" />
            
            {/* Engine details */}
            <circle cx="5" cy="-6" r="2" fill="#F59E0B" opacity="0.8" />
            <circle cx="5" cy="6" r="2" fill="#F59E0B" opacity="0.8" />
            
            {/* Navigation lights */}
            <circle cx="15" cy="-8" r="1" fill="#EF4444" opacity="0.9" className="animate-pulse" />
            <circle cx="15" cy="8" r="1" fill="#10B981" opacity="0.9" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <circle cx="-28" cy="0" r="1" fill="white" opacity="0.9" className="animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Propeller blur effect */}
            <ellipse cx="25" cy="0" rx="3" ry="8" fill="gray" opacity="0.3" />
          </g>
        </svg>
      </div>
      {/* Realistic Floating Clouds - Better Sky Distribution */}
      <div className="absolute top-1/8 left-1/5 animate-float">
        <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-md">
          <defs>
            <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 98% / 0.9)" />
              <stop offset="50%" stopColor="hsl(0 0% 95% / 0.7)" />
              <stop offset="100%" stopColor="hsl(0 0% 90% / 0.5)" />
            </linearGradient>
          </defs>
          <g fill="url(#cloudGradient1)">
            <circle cx="30" cy="36" r="18" />
            <circle cx="54" cy="30" r="22" />
            <circle cx="78" cy="36" r="17" />
            <circle cx="96" cy="42" r="12" />
            <circle cx="42" cy="42" r="15" />
            <circle cx="66" cy="42" r="16" />
          </g>
        </svg>
      </div>
      <div className="absolute top-1/12 right-1/4 animate-float" style={{ animationDelay: '-1s' }}>
        <svg width="100" height="50" viewBox="0 0 100 50" className="drop-shadow-sm">
          <defs>
            <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 96% / 0.8)" />
              <stop offset="100%" stopColor="hsl(0 0% 88% / 0.4)" />
            </linearGradient>
          </defs>
          <g fill="url(#cloudGradient2)">
            <circle cx="25" cy="30" r="15" />
            <circle cx="47" cy="25" r="18" />
            <circle cx="69" cy="30" r="13" />
            <circle cx="56" cy="37" r="14" />
          </g>
        </svg>
      </div>
      <div className="absolute top-1/6 left-2/3 animate-float" style={{ animationDelay: '-2s' }}>
        <svg width="110" height="55" viewBox="0 0 110 55" className="drop-shadow-md">
          <defs>
            <linearGradient id="cloudGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 97% / 0.85)" />
              <stop offset="100%" stopColor="hsl(0 0% 92% / 0.6)" />
            </linearGradient>
          </defs>
          <g fill="url(#cloudGradient3)">
            <circle cx="27" cy="34" r="17" />
            <circle cx="51" cy="28" r="20" />
            <circle cx="75" cy="34" r="15" />
            <circle cx="39" cy="40" r="12" />
            <circle cx="63" cy="40" r="13" />
          </g>
        </svg>
      </div>
      {/* Additional atmospheric clouds - Spread across sky */}
      <div className="absolute top-1/10 left-1/2 animate-float" style={{ animationDelay: '-0.5s', animationDuration: '8s' }}>
        <svg width="80" height="40" viewBox="0 0 80 40" className="drop-shadow-sm">
          <g fill="hsl(0 0% 94% / 0.6)">
            <circle cx="20" cy="25" r="10" />
            <circle cx="40" cy="21" r="13" />
            <circle cx="60" cy="25" r="9" />
            <circle cx="33" cy="29" r="8" />
          </g>
        </svg>
      </div>
      <div className="absolute top-1/5 right-1/6 animate-float" style={{ animationDelay: '-3s', animationDuration: '10s' }}>
        <svg width="90" height="45" viewBox="0 0 90 45" className="drop-shadow-sm">
          <g fill="hsl(0 0% 96% / 0.7)">
            <circle cx="22" cy="28" r="12" />
            <circle cx="45" cy="23" r="15" />
            <circle cx="68" cy="28" r="11" />
            <circle cx="35" cy="33" r="9" />
            <circle cx="55" cy="33" r="10" />
          </g>
        </svg>
      </div>
      <div className="absolute top-1/7 left-1/6 animate-float" style={{ animationDelay: '-1.5s', animationDuration: '9s' }}>
        <svg width="85" height="43" viewBox="0 0 85 43" className="drop-shadow-sm">
          <g fill="hsl(0 0% 95% / 0.65)">
            <circle cx="21" cy="27" r="11" />
            <circle cx="42" cy="22" r="14" />
            <circle cx="63" cy="27" r="10" />
            <circle cx="33" cy="32" r="8" />
            <circle cx="52" cy="32" r="9" />
          </g>
        </svg>
      </div>
      <div className="absolute top-1/4 right-2/5 animate-float" style={{ animationDelay: '-4s', animationDuration: '12s' }}>
        <svg width="75" height="38" viewBox="0 0 75 38" className="drop-shadow-sm">
          <g fill="hsl(0 0% 93% / 0.55)">
            <circle cx="19" cy="24" r="9" />
            <circle cx="37" cy="20" r="12" />
            <circle cx="55" cy="24" r="8" />
            <circle cx="30" cy="28" r="7" />
            <circle cx="46" cy="28" r="8" />
          </g>
        </svg>
      </div>
    </div>
  );
};
