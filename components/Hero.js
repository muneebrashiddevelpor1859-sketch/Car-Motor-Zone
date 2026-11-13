'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import BgVideo from './BgVideo';
import Counter from './Counter';

const words = 'Aap ki gaari ka sab se behtareen khayal.'.split(' ');

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const rotY = useTransform(mx, [-1, 1], [-6, 6]);
  const rotX = useTransform(my, [-1, 1], [5, -5]);
  const bgX = useTransform(mx, [-1, 1], [18, -18]);
  const onMove = (e) => { mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1); };

  return (
    <section id="top" className="hero" ref={ref} onMouseMove={onMove}>
      <motion.div className="hero-media" style={{ y, scale, x: bgX }}>
        <BgVideo priority poster="/images/hero-poster.jpg" src="/videos/hero.mp4" mobileSrc="/videos/hero-mobile.mp4" />
      </motion.div>
      <div className="hero-glow" />

      <motion.div className="container hero-inner" style={{ y: textY, opacity: fade, rotateY: rotY, rotateX: rotX, transformPerspective: 1200 }}>
        <motion.span className="badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Lahore ka premium car workshop
        </motion.span>
        <h1>
          {words.map((w, i) => (
            <span className="mask" key={i}>
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.4 + i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}>{w}&nbsp;</motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }}>
          BJO Motors mein service, detailing, diagnostics aur repair ek hi chhat ke neeche. Har brand, har model.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <a href="#contact" className="btn btn-gold">Book a Service</a>
          <a href="#showroom" className="btn btn-ghost">Watch 3D Showroom</a>
        </motion.div>
        <motion.div className="hero-stats" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 1 }}>
          <div className="stat"><b><Counter to={15} suffix="+" /></b><span>Saal ka tajurba</span></div>
          <div className="stat"><b><Counter to={5000} suffix="+" /></b><span>Khush customers</span></div>
          <div className="stat"><b><Counter to={30} suffix="+" /></b><span>Car brands</span></div>
        </motion.div>
      </motion.div>
      <div className="scroll-hint" aria-hidden />
    </section>
  );
}
