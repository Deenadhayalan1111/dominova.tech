import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollVideo.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoProps {
  src: string;
  className?: string;
  pin?: boolean;
  children?: React.ReactNode;
}

const ScrollVideo: React.FC<ScrollVideoProps> = ({ src, className = '', pin = true, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current || !isMetadataLoaded || reducedMotion) return;

    const video = videoRef.current;
    
    // Ensure video is not playing
    video.pause();

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=400%', // Keep the scroll distance for the text animations
      pin: pin,
      onEnter: async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn('Video autoplay prevented:', error);
        }
      },
      onEnterBack: async () => {
        try {
          // Optional: resume if scrolled back up
          if (video.paused && !video.ended) {
             await video.play();
          }
        } catch (error) {
           console.warn('Video autoplay prevented:', error);
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isMetadataLoaded, reducedMotion, pin]);

  const handleLoadedMetadata = () => {
    setIsMetadataLoaded(true);
  };

  if (reducedMotion) {
    return (
      <div className={`scroll-video-fallback ${className}`}>
        <video 
          ref={videoRef}
          src={src} 
          muted 
          playsInline 
          className="scroll-video__video"
          poster=""
          controls
        />
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`scroll-video-container ${className}`}>
      <div className="scroll-video__viewport">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleLoadedMetadata}
          className="scroll-video__video"
        />
        <div className="scroll-video__overlay"></div>
        {children}
      </div>
    </div>
  );
};

export default ScrollVideo;
