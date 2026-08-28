import React from 'react';
import StudioVideo from './StudioVideo';
import './GoldTunnel.css';

interface GoldTunnelProps {
  label?: string;
  videoSrc?: string;
}

export const GoldTunnel: React.FC<GoldTunnelProps> = ({ label = 'TRANSITIONING DOMAIN', videoSrc }) => {
  if (videoSrc) {
    return (
      <StudioVideo src={videoSrc} className="gold-tunnel--video" />
    );
  }

  return (
    <div className="gold-tunnel" aria-hidden="true">
      <div className="gold-tunnel__portal">
        <div className="gold-tunnel__ring gold-tunnel__ring--1" />
        <div className="gold-tunnel__ring gold-tunnel__ring--2" />
        <div className="gold-tunnel__ring gold-tunnel__ring--3" />
        <div className="gold-tunnel__core-glow" />
      </div>
      {label && <span className="gold-tunnel__label">{label}</span>}
    </div>
  );
};

export default GoldTunnel;
