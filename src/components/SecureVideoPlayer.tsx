// src/components/SecureVideoPlayer.tsx
import { useRef, useEffect } from 'react';

interface SecureVideoPlayerProps {
  videoUrl: string;
  onComplete?: () => void;
}

export const SecureVideoPlayer = ({ videoUrl, onComplete }: SecureVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastValidTime = 0;

    const blockSkip = () => {
      // Allow only sequential playback (±2 seconds tolerance for lag)
      if (video.currentTime > lastValidTime + 2) {
        video.currentTime = lastValidTime;
        video.pause();
        setTimeout(() => video.play(), 800);
      } else {
        lastValidTime = video.currentTime;
      }
    };

    const blockContextMenu = (e: MouseEvent) => e.preventDefault();

    // Completely disable cast / remote playback
    video.disableRemotePlayback = true;
    video.disablePictureInPicture = true;

    // Chrome cast button hide + block media actions
    if ('mediaSession' in navigator) {
      const noop = () => {};
      navigator.mediaSession.setActionHandler('seekforward', noop);
      navigator.mediaSession.setActionHandler('seekbackward', noop);
      navigator.mediaSession.setActionHandler('seekto', noop);
    }

    video.addEventListener('timeupdate', blockSkip);
    video.addEventListener('contextmenu', blockContextMenu);
    video.addEventListener('loadedmetadata', () => {
      video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener('timeupdate', blockSkip);
      video.removeEventListener('contextmenu', blockContextMenu);
    };
  }, [videoUrl]);

  const handleEnded = () => {
    onComplete?.();
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      {/* Invisible blocker */}
      <div className="absolute inset-0 z-20" />

      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        playsInline
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={handleEnded}
        style={{ pointerEvents: 'none' }}
      />

      <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg z-30 text-sm font-medium">
        Training Video Playing...
        <br />
        <small className="text-xs opacity-90">Skipping & Casting Disabled</small>
      </div>
    </div>
  );
};