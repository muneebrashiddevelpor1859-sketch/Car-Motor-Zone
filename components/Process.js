'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  ['Booking', 'Form ya WhatsApp par apni gaari aur masla bataein.'],
  ['Inspection', 'Computer scan aur 50-point check, saath hi clear estimate.'],
  ['Repair & Care', 'Certified technicians genuine parts ke sath kaam karte hain.'],
  ['Delivery', 'Final quality check, wash aur warranty ke sath gaari wapas.'],
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section id="process" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <h2 className="section-title">Chaar aasaan qadam.</h2>
        <div className="timeline" ref={ref}>
          <div className="tl-line"><motion.div style={{ height: h }} /></div>
          {steps.map(([t, d], i) => (
            <motion.div key={t} className={`tl-item ${i % 2 ? 'right' : ''}`} initial={{ opacity: 0, x: i % 2 ? 80 : -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8 }}>
              <div className="glass tl-card"><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
