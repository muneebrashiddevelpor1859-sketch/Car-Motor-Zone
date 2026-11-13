'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}
