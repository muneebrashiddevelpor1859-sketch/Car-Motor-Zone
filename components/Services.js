'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const services = [
  { ic: '🛢️', t: 'Engine Service', d: 'Oil and filter changes, tuning, and a complete engine health check to manufacturer standards.' },
  { ic: '🧪', t: 'Computer Diagnostics', d: 'Find the exact cause of every warning light with advanced diagnostic scanners.' },
  { ic: '✨', t: 'Detailing & Ceramic', d: 'Paint correction, ceramic coating, and deep interior cleaning for a showroom shine.' },
  { ic: '🛞', t: 'Brakes & Suspension', d: 'Brake pads, discs, shocks, and wheel alignment for a safe, smooth drive.' },
  { ic: '❄️', t: 'AC & Electrical', d: 'Complete repairs for AC, compressors, batteries, alternators, and wiring.' },
  { ic: '🎨', t: 'Denting & Painting', d: 'Accident repairs with precise colour matching and a factory-quality finish.' },
];

function Tilt({ children, i }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(0)`;
  };
  const leave = () => (ref.current.style.transform = '');
  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.12 }}
    >
      <div ref={ref} className="glass card" onMouseMove={move} onMouseLeave={leave} style={{ transition: 'transform .25s ease-out' }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="services-bg" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          Expert care for every need.
        </motion.h2>
        <p className="section-sub">From routine maintenance to major repairs, trust our certified technicians and genuine parts.</p>
        <div className="grid">
          {services.map((s, i) => (
            <Tilt key={s.t} i={i}>
              <div className="ic">{s.ic}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
