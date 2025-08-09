import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

// Register plugin (safe to call even if SSR guard is used when component is client-only)
if (typeof window !== 'undefined') gsap.registerPlugin && gsap.registerPlugin(MotionPathPlugin);

const AnimatedLogo = forwardRef(function AnimatedLogo(props, ref) {
  const root = useRef(null);
  const plane = useRef(null);
  const path = useRef(null);
  const title = useRef(null);
  const tagline = useRef(null);
  const clouds = useRef([]);
  const contrail = useRef(null);
  const tl = useRef(null);

  useImperativeHandle(ref, () => ({
    play: () => play(),
    reset: () => reset(),
  }));

  useEffect(() => {
    // Create timeline
    tl.current = gsap.timeline({ paused: true });

    // 1) Draw the curved flight path (stroke-dasharray trick)
    const pathEl = path.current;
    const pathLength = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = pathLength;
    pathEl.style.strokeDashoffset = pathLength;

    // 2) Animate clouds floating
    clouds.current.forEach((cloud, index) => {
      if (cloud) {
        gsap.set(cloud, { x: -50 - (index * 30), opacity: 0.6 });
        gsap.to(cloud, {
          x: 400,
          duration: 8 + (index * 2),
          repeat: -1,
          ease: 'none',
          delay: index * 1.5
        });
      }
    });


    tl.current
      // Draw flight path
      .to(pathEl, { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, 0)

      // Contrail appears
      .fromTo(contrail.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.7, duration: 1.1, ease: 'power1.inOut' },
        0.2
      )

      // Plane entrance effect (scale in, fade in)
      .fromTo(
        plane.current,
        { scale: 0.7, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.5
      )

      // Move plane along path using MotionPathPlugin
      .to(
        plane.current,
        {
          duration: 2.2,
          ease: 'power1.inOut',
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
          },
        },
        0.7
      )

      // Plane settle
      .to(plane.current, { scale: 1, duration: 0.4, ease: 'power1.out' }, 1.8)

      // Title reveal with enhanced effect
      .fromTo(
        title.current,
        { y: 20, opacity: 0, filter: 'blur(8px)', scale: 0.9 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', filter: 'blur(0px)', scale: 1 },
        2.0
      )

      // Tagline fade in
      .fromTo(
        tagline.current,
        { y: 10, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 0.9, duration: 0.9, ease: 'power1.out', filter: 'blur(0px)' },
        2.3
      );

    // Continuous plane hover animation (smoother and starts after main anim)
    tl.current.to(plane.current, {
      y: '+=6',
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    }, '+=0.7');

    // Autostart if prop.autoPlay
    if (props.autoPlay) tl.current.play();

    return () => {
      if (tl.current && tl.current.kill) {
        tl.current.kill();
      }
      tl.current = null;
    };
  }, [props.autoPlay]);

  function play() {
    if (tl.current) tl.current.play();
  }

  function reset() {
    if (!tl.current) return;
    tl.current.pause(0);
    gsap.set([plane.current, path.current, title.current, tagline.current, contrail.current], { clearProps: 'all' });
  }

  // Styling variables (accept simple props override)
  const primary = props.colorPrimary || '#0EA5E9'; // sky blue
  const accent = props.colorAccent || '#F59E0B'; // orange
  const dark = props.colorDark || '#0F172A';

  return (
    <div 
      ref={root} 
      className="flex items-center gap-4 pointer-events-auto relative" 
      aria-hidden={props['aria-hidden'] ?? false}
      style={{ transformOrigin: 'center' }}
    >
      {/* SVG logo */}
      <svg
        width={props.size || 200}
        height={
          typeof props.size === 'string'
            ? props.size
            : props.size
              ? Math.round((props.size * 100) / 200)
              : 100
        }
        viewBox="0 0 400 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="PacknGo logo"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="50%" stopColor={primary} />
            <stop offset="100%" stopColor="#4169E1" />
          </linearGradient>
          
          <linearGradient id="planeGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E5E7EB" />
            <stop offset="50%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#D1D5DB" />
          </linearGradient>

          <linearGradient id="contrailGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="30%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>

          <filter id="planeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.3" />
          </filter>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background clouds */}
        <g opacity="0.4">
          <ellipse ref={el => clouds.current[0] = el} cx="50" cy="25" rx="25" ry="8" fill="white" opacity="0.6" />
          <ellipse ref={el => clouds.current[1] = el} cx="150" cy="35" rx="20" ry="6" fill="white" opacity="0.5" />
          <ellipse ref={el => clouds.current[2] = el} cx="250" cy="20" rx="30" ry="10" fill="white" opacity="0.7" />
        </g>

        {/* Curved flight path */}
        <path
          ref={path}
          d="M20 70 C100 20, 200 15, 320 45"
          stroke="url(#skyGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
          filter="url(#glow)"
        />

        {/* Contrail/vapor trail */}
        <path
          ref={contrail}
          d="M20 70 C100 20, 200 15, 320 45"
          stroke="url(#contrailGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0"
          style={{ transformOrigin: 'left center' }}
        />

        {/* Realistic airplane */}
        <g ref={plane} transform="translate(20,70)" filter="url(#planeShadow)">
          {/* Main fuselage */}
          <ellipse cx="0" cy="0" rx="25" ry="4" fill="url(#planeGradient)" />
          
          {/* Cockpit */}
          <ellipse cx="20" cy="0" rx="8" ry="3" fill="#1E40AF" opacity="0.8" />
          
          {/* Main wings */}
          <path d="M-5 0 L-15 -12 L5 -8 L15 -4 L5 4 L-15 8 Z" fill="url(#planeGradient)" />
          
          {/* Wing details */}
          <path d="M-10 -8 L0 -6 L10 -3" stroke={dark} strokeWidth="1" opacity="0.3" />
          <path d="M-10 4 L0 3 L10 2" stroke={dark} strokeWidth="1" opacity="0.3" />
          
          {/* Tail */}
          <path d="M-20 0 L-30 -8 L-25 -2 L-30 4 Z" fill="url(#planeGradient)" />
          
          {/* Vertical stabilizer */}
          <path d="M-25 0 L-32 -12 L-28 -10 L-22 -2 Z" fill="url(#planeGradient)" />
          
          {/* Engine details */}
          <circle cx="5" cy="-6" r="2" fill={accent} opacity="0.8" />
          <circle cx="5" cy="6" r="2" fill={accent} opacity="0.8" />
          
          {/* Navigation lights */}
          <circle cx="15" cy="-8" r="1" fill="#EF4444" opacity="0.9" />
          <circle cx="15" cy="8" r="1" fill="#10B981" opacity="0.9" />
          <circle cx="-28" cy="0" r="1" fill="white" opacity="0.9" />
          
          {/* Propeller blur effect */}
          <ellipse cx="25" cy="0" rx="3" ry="8" fill="gray" opacity="0.3" />
        </g>

        {/* Text (title + tagline) */}
        <g transform="translate(20, 15)">
          <text
            ref={title}
            x="80"
            y="25"
            fontFamily="Poppins, Inter, system-ui, -apple-system, 'Segoe UI', Roboto"
            fontWeight="800"
            fontSize="24"
            fill={dark}
            style={{ opacity: 0, transformOrigin: '0 0' }}
            filter="url(#glow)"
          >
            PacknGo
          </text>

          <text
            ref={tagline}
            x="80"
            y="45"
            fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto"
            fontWeight="600"
            fontSize="12"
            fill={primary}
            style={{ opacity: 0, transformOrigin: '0 0' }}
          >
            Plan. Pack. Go.
          </text>
        </g>
      </svg>
    </div>
  );
});

export default AnimatedLogo;