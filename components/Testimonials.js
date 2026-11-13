'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const t = [
  ['Ahmed R.', 'Honda Civic', 'Kai workshops dekhe lekin BJO jaisi honesty kahin nahi mili. Estimate bilkul sahi nikla.'],
  ['Sara K.', 'Toyota Corolla', 'Detailing ke baad gaari nayi lag rahi thi. Time par delivery bhi di.'],
  ['Usman T.', 'BMW 3 Series', 'Diagnostics se woh masla pakra gaya jo doosri jagah samajh nahi aaya tha.'],
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % t.length), 5000); return () => clearInterval(id); }, []);
  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ margin: '0 auto' }}>Customers kya kehte hain.</h2>
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
