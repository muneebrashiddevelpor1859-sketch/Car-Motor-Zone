'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useInView, useScroll, useMotionValueEvent, motion } from 'framer-motion';

const Parts3D = dynamic(() => import('./Parts3D'), { ssr: false, loading: () => <div className="canvas-loading">3D parts load ho rahe hain...</div> });

const tabs = [
  ['Alloy Rim', 'Rim ki repair, polishing aur powder coating. Gaari ka look pehle jaisa, balke behtar.'],
  ['Brake Disc', 'Disc skimming, pads aur caliper service. Safe braking, har mausam mein.'],
  ['Engine Gears', 'Timing, gearbox aur engine ki mukammal overhaul genuine parts ke sath.'],
];

export default function PartsLab() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '200px 0px' });
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => (progress.current = v));

  return (
    <section className="section parts" ref={ref}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Har purze ka khayal, 3D mein.
        </motion.h2>
        <p className="section-sub">Mouse se hilayein, ya neeche se purza chunein.</p>
        <div className="glass parts-stage">
          {inView ? <Parts3D active={active} progress={progress} running /> : <div className="canvas-loading">3D parts load ho rahe hain...</div>}
        </div>
        <div className="parts-tabs">
          {tabs.map(([t], i) => (
            <button key={t} className={i === active ? 'on' : ''} onClick={() => setActive(i)}>{t}</button>
          ))}
        </div>
        <motion.p key={active} className="parts-desc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>{tabs[active][1]}</motion.p>
      </div>
    </section>
  );
}
