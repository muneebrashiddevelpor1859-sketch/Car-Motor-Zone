'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const q = [
  ['Kya har brand ki gaari par kaam hota hai?', 'Ji haan, Japanese, European, Korean aur Chinese brands sab par kaam karte hain.'],
  ['Service mein kitna waqt lagta hai?', 'Routine service usually usi din ho jati hai. Bari repair ka waqt inspection ke baad bata diya jata hai.'],
  ['Kya parts genuine hote hain?', 'Ji, hum genuine ya OEM-quality parts use karte hain aur kaam par warranty dete hain.'],
  ['Booking kaise karein?', 'Neeche wala form bharein, details seedhi hamare WhatsApp par aa jati hain.'],
];

export default function FAQ() {
  const [o, setO] = useState(0);
  return (
    <section className="section">
      <div className="container faq">
        <h2 className="section-title">Aam sawalat.</h2>
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
