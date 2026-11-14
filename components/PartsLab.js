'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useInView, useScroll, useMotionValueEvent, motion } from 'framer-motion';

const Parts3D = dynamic(() => import('./Parts3D'), { ssr: false, loading: () => <div className="canvas-loading">Loading 3D parts...</div> });

const tabs = [
  ['Alloy Rim', 'Rim repairs, polishing, and powder coating to restore—and even improve—your car’s look.'],
  ['Brake Disc', 'Disc skimming, brake pad replacement, and caliper servicing for safe braking in every season.'],
  ['Engine Gears', 'Complete timing, gearbox, and engine overhauls using genuine parts.'],
];

export default function PartsLab() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const inView = useInView(stageRef, { amount: 0.25 });
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => (progress.current = v));

  return (
    <section className="section parts" ref={ref}>
      <div className="container">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Every part, brought to life in 3D.
        </motion.h2>
        <p className="section-sub">Move your mouse to explore, or select a part below.</p>
        <div ref={stageRef} className="glass parts-stage">
          {inView ? <Parts3D active={active} progress={progress} running /> : <div className="canvas-loading">Loading 3D parts...</div>}
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
