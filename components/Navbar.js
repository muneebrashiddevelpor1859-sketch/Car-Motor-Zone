'use client';
import { useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [['Brands', '#brands'], ['About', '#about'], ['Services', '#services'], ['3D', '#showroom'], ['Process', '#process'], ['Packages', '#packages'], ['Contact', '#contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  return (
    <>
      <motion.div className="progress" style={{ scaleX: w }} />
      <div className="nav-wrap">
        <motion.nav className={`nav ${scrolled ? 'scrolled' : ''}`} initial={{ y: -90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
          <a href="#top" aria-label="BJO Motors home"><Logo /></a>
          <ul>{links.map(([t, h]) => <li key={h}><a href={h}>{t}</a></li>)}</ul>
          <a href="#contact" className="btn btn-gold nav-cta">Book Now</a>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>
            <span className={open ? 'x' : ''} />
          </button>
        </motion.nav>
        <AnimatePresence>
          {open && (
            <motion.div className="mobile glass" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              {links.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
