'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SafeImg from './SafeImg';
import Counter from './Counter';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  return (
    <section id="about" className="section" ref={ref}>
      <div className="container about">
        <div className="about-imgs">
          <SafeImg motionImg style={{ y: y1 }} className="a1" alt="Workshop" src="/images/workshop.jpg" />
          <SafeImg motionImg style={{ y: y2 }} className="a2" alt="Car detailing" src="/images/car-performance.jpg" />
          <motion.div className="glass badge-card" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <b><Counter to={15} suffix="+" /></b><span>years of your trust</span>
          </motion.div>
        </div>
        <div>
          <motion.h2 className="section-title" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            Your car is more than a machine; it's a source of pride.
          </motion.h2>
          <p className="section-sub">At BJO Motors, every car receives the same attention it gets in a showroom. Our technicians use modern tools and genuine parts, with clear, upfront pricing.</p>
          <div className="checks">
            {['Certified technicians', 'Genuine parts guaranteed', 'Clear estimates before work begins', 'Warranty on every service'].map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <i>✓</i>{c}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
