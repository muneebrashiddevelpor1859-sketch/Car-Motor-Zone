'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const t = [
  ['Ahmed R.', 'Honda Civic', 'I visited many workshops, but none were as honest as BJO. The estimate was spot on.'],
  ['Sara K.', 'Toyota Corolla', 'My car looked brand new after the detailing. It was delivered right on time, too.'],
  ['Usman T.', 'BMW 3 Series', 'Their diagnostics found an issue that other workshops couldn’t figure out.'],
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % t.length), 5000); return () => clearInterval(id); }, []);
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ margin: '0 auto' }}>What our customers say.</h2>
        <div className="testi">
          <AnimatePresence mode="wait">
            <motion.div key={i} className="glass testi-card" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.6 }}>
              <div className="stars">★★★★★</div>
              <p>“{t[i][2]}”</p>
              <b>{t[i][0]}</b><span>{t[i][1]}</span>
            </motion.div>
          </AnimatePresence>
          <div className="dots">{t.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}</div>
        </div>
      </div>
    </section>
  );
}
