'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const q = [
  ['Do you work on every car brand?', 'Yes. We service Japanese, European, Korean, and Chinese car brands.'],
  ['How long does a service take?', 'Routine services are usually completed the same day. We’ll provide a timeline for larger repairs after inspection.'],
  ['Do you use genuine parts?', 'Yes. We use genuine or OEM-quality parts and provide a warranty on our work.'],
  ['How do I book an appointment?', 'Fill out the form below and your details will be sent directly to us on WhatsApp.'],
];

export default function FAQ() {
  const [o, setO] = useState(0);
  return (
    <section className="section">
      <div className="container faq">
        <h2 className="section-title">Frequently asked questions.</h2>
        <div>
          {q.map(([a, b], i) => (
            <div key={a} className="glass faq-item">
              <button onClick={() => setO(o === i ? -1 : i)} aria-expanded={o === i}>{a}<span>{o === i ? '−' : '+'}</span></button>
              <AnimatePresence initial={false}>
                {o === i && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>{b}</motion.p>}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
