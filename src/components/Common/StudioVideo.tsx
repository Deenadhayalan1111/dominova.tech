import React, { useEffect, useRef, useState } from 'react';
import './StudioVideo.css';

interface StudioVideoProps {
  src: string;
  className?: string;
  children?: React.ReactNode;
}

const StudioVideo: React.FC<StudioVideoProps> = ({ src, className = '', children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const tryPlay = async () => {
      try {
        video.currentTime = 0;  // Always restart from beginning on entry
        await video.play();
        setShowPlayButton(false);
      } catch (error) {
        console.warn('Autoplay prevented:', error);
        setShowPlayButton(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Section entered or re-entered: restart from 0 and play
            tryPlay();
          } else {
            // Section left: pause cleanly, no reset here
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualPlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.currentTime = 0;
      await video.play();
      setShowPlayButton(false);
    } catch (err) {
      console.error('Manual play failed:', err);
    }
  };

  return (
    <div ref={containerRef} className={`studio-video-container ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="studio-video__video"
      />
      <div className="studio-video__overlay"></div>
      {children}

      {showPlayButton && (
        <button className="studio-video__play-btn" onClick={handleManualPlay}>
          ENTER STUDIO
        </button>
      )}
    </div>
  );
};

export default StudioVideo;

