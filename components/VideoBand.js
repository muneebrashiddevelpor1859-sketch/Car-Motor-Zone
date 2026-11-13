'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BgVideo from './BgVideo';

export default function VideoBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 1.15]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const x = useTransform(scrollYProgress, [0, 1], ['15%', '-35%']);
  return (
    <section className="band" ref={ref}>
      <motion.div className="band-media" style={{ scale, borderRadius: radius }}>
        <BgVideo lazy poster="/images/band-poster.jpg" src="/videos/band.mp4" />
        <div className="band-shade" />
        <motion.h2 style={{ x }} className="band-text">PRECISION. POWER. PERFECTION. PRECISION. POWER.</motion.h2>
      </motion.div>
    </section>
  );
}
