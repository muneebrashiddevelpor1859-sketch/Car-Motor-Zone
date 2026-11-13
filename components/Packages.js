'use client';
import { motion } from 'framer-motion';

const pk = [
  ['Essential', 'Rozana drive ke liye', ['Oil aur filter change', '25-point inspection', 'Fluid top-up', 'Exterior wash']],
  ['Premium', 'Sab se mashhoor', ['Essential ki har cheez', 'Computer diagnostics', 'Brake aur suspension check', 'Interior detailing'], true],
  ['Elite', 'Showroom finish', ['Premium ki har cheez', 'Paint correction', 'Ceramic coating', 'Priority booking']],
];

export default function Packages() {
  return (
    <section id="packages" className="section">
      <div className="services-bg" />
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="section-title">Apni gaari ka package chunein.</h2>
        <p className="section-sub">Qeemat gaari ke model par depend karti hai. Booking par hum clear estimate bhej dete hain.</p>
        <div className="grid">
          {pk.map(([n, s, f, hot], i) => (
            <motion.div key={n} initial={{ opacity: 0, y: 80, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }} whileHover={{ y: -12 }}>
              <div className={`glass card ${hot ? 'hot' : ''}`}>
                {hot && <em className="pill">Most popular</em>}
                <h3>{n}</h3>
                <p>{s}</p>
                <ul className="plist">{f.map((x) => <li key={x}>{x}</li>)}</ul>
                <a href="#contact" className={`btn ${hot ? 'btn-gold' : 'btn-dark'}`} style={{ marginTop: 'auto' }}>Estimate maangein</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
