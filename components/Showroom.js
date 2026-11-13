'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent, motion, useTransform, useInView } from 'framer-motion';
import { PAINTS } from './paints';

const Car3D = dynamic(() => import('./Car3D'), { ssr: false, loading: () => <div className="canvas-loading">3D showroom load ho raha hai...</div> });

const feats = ['Engine tuning aur performance upgrade', 'Ceramic coating aur paint protection', 'Premium interior detailing'];

export default function Showroom() {
  const ref = useRef(null);
  const wrap = useRef(null);
  const near = useInView(wrap, { margin: '300px 0px' });
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
          <h2 className="section-title">Scroll karein, gaari ghumayein.</h2>
          <p className="section-sub">Scroll ke sath gaari ghoomti hai, camera qareeb aata hai aur paint ka rang badalta hai. Jaisa hum aap ki gaari ke sath perfection se kaam karte hain.</p>
          <div className="swatches">
            {PAINTS.map((p, i) => (
              <div key={p.name} className={i === idx ? 'on' : ''}><i style={{ background: p.hex }} />{p.name}</div>
            ))}
          </div>
          <div className="feat">
            {feats.map((f) => <div key={f} className="glass shine">{f}</div>)}
          </div>
        </motion.div>
        <div className="canvas-wrap" ref={wrap}><Car3D progress={progress} active={near} /></div>
      </div>
    </section>
  );
}
