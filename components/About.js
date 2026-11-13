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
            <b><Counter to={15} suffix="+" /></b><span>saal se aap ka bharosa</span>
          </motion.div>
        </div>
        <div>
          <motion.h2 className="section-title" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            Gaari sirf machine nahi, aap ka fakhr hai.
          </motion.h2>
          <p className="section-sub">BJO Motors mein har gaari ko wohi tawajjo milti hai jo showroom mein milti hai. Hamare technicians modern tools, genuine parts aur saaf-suthri pricing ke sath kaam karte hain.</p>
          <div className="checks">
            {['Certified technicians', 'Genuine parts ki guarantee', 'Kaam se pehle clear estimate', 'Har service par warranty'].map((c, i) => (
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
