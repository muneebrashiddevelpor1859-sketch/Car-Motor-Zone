'use client';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const services = [
  { ic: '🛢️', t: 'Engine Service', d: 'Oil change, filters, tuning aur full engine health check — company standard ke mutabiq.' },
  { ic: '🧪', t: 'Computer Diagnostics', d: 'Latest scanners se har warning light ki asal wajah, bina andaze ke.' },
  { ic: '✨', t: 'Detailing & Ceramic', d: 'Paint correction, ceramic coating aur interior deep clean — showroom jaisi chamak.' },
  { ic: '🛞', t: 'Brakes & Suspension', d: 'Brake pads, discs, shocks aur alignment — safe aur smooth drive ke liye.' },
  { ic: '❄️', t: 'AC & Electrical', d: 'AC gas, compressor, battery, alternator aur wiring ki mukammal repair.' },
  { ic: '🎨', t: 'Denting & Painting', d: 'Accident repair aur perfect colour matching, factory finish ke sath.' },
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
          Har zaroorat ke liye expert hath.
        </motion.h2>
        <p className="section-sub">Chhoti service se le kar bari repair tak — certified technicians aur genuine parts ke sath.</p>
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
