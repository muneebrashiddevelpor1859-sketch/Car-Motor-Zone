'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion, useTransform, useInView } from 'framer-motion';
import { PAINTS } from './paints';

const Car3D = dynamic(() => import('./Car3D'), { ssr: false, loading: () => <div className="canvas-loading">Loading 3D showroom...</div> });

const feats = ['Engine tuning and performance upgrades', 'Ceramic coating and paint protection', 'Premium interior detailing'];

export default function Showroom() {
  const ref = useRef(null);
  const wrap = useRef(null);
  const near = useInView(wrap, { amount: 0.25 });
  const progress = useRef(0);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => { progress.current = v; setIdx(Math.round(v * (PAINTS.length - 1))); });
  const x = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const op = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="showroom" className="showroom" ref={ref}>
      <div className="sticky container">
        <motion.div style={{ x, opacity: op }}>
          <h2 className="section-title">Scroll to explore the car.</h2>
          <p className="section-sub">As you scroll, the car rotates, the camera moves closer, and the paint colour changes—showcasing the precision we bring to every vehicle.</p>
          <div className="swatches">
            {PAINTS.map((p, i) => (
              <div key={p.name} className={i === idx ? 'on' : ''}><i style={{ background: p.hex }} />{p.name}</div>
            ))}
          </div>
          <div className="feat">
            {feats.map((f) => <div key={f} className="glass shine">{f}</div>)}
          </div>
        </motion.div>
        <div className="canvas-wrap" ref={wrap}>
          {near ? <Car3D progress={progress} active /> : <div className="canvas-loading">Loading 3D showroom...</div>}
        </div>
      </div>
    </section>
  );
}
