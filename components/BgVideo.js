'use client';
import { useEffect, useRef, useState } from 'react';

// Poster (local image) foran dikhta hai, video tayar hote hi nikhar kar aa jati hai.
// mobile: chhoti video; lazy: scroll ke qareeb aane par load.
export default function BgVideo({ src, mobileSrc, poster, lazy = false, priority = false }) {
  const [ready, setReady] = useState(false);
  const [url, setUrl] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const pick = () => setUrl(mobileSrc && window.matchMedia('(max-width: 700px)').matches ? mobileSrc : src);
    if (!lazy) { pick(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { pick(); io.disconnect(); } }, { rootMargin: '400px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [src, mobileSrc, lazy]);

  return (
    <div ref={ref} className="bgv">
      {poster && <img className="poster" alt="" src={poster} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />}
      {url && (
        <video
          key={url} src={url} autoPlay muted loop playsInline preload="auto"
          onPlaying={() => setReady(true)}
          style={{ opacity: ready ? 1 : 0, transition: 'opacity .8s ease' }}
        />
      )}
    </div>
  );
}
