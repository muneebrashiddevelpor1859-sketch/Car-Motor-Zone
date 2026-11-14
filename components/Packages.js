'use client';
import { motion } from 'framer-motion';

const pk = [
  ['Essential', 'For everyday driving', ['Oil and filter change', '25-point inspection', 'Fluid top-up', 'Exterior wash']],
  ['Premium', 'Our most popular package', ['Everything in Essential', 'Computer diagnostics', 'Brake and suspension check', 'Interior detailing'], true],
  ['Elite', 'A showroom-quality finish', ['Everything in Premium', 'Paint correction', 'Ceramic coating', 'Priority booking']],
];

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="services-bg" />
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="section-title">Choose the right package for your car.</h2>
        <p className="section-sub">Pricing depends on your car's model. We'll provide a clear estimate when you book.</p>
        <div className="grid">
          {pk.map(([n, s, f, hot], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 80, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }} whileHover={{ y: -12 }}>
              <div className={`glass card ${hot ? 'hot' : ''}`}>
                {hot && <em className="pill">Most popular</em>}
                <h3>{n}</h3>
                <p>{s}</p>
                <ul className="plist">{f.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href="#contact" className={`btn ${hot ? 'btn-gold' : 'btn-dark'}`} style={{ marginTop: 'auto' }}>Request an estimate</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
