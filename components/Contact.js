'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import BgVideo from './BgVideo';

const services = ['Engine Service', 'Computer Diagnostics', 'Detailing & Ceramic', 'Brakes & Suspension', 'AC & Electrical', 'Denting & Painting'];

export default function Contact() {
  const [state, setState] = useState({ loading: false, msg: '', ok: null });

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    setState({ loading: true, msg: '', ok: null });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      if (json.mode === 'link') window.open(json.url, '_blank');
      e.target.reset();
      setState({ loading: false, ok: true, msg: 'Shukriya! Aap ki request WhatsApp par bhej di gayi hai.' });
    } catch (err) {
      setState({ loading: false, ok: false, msg: err.message || 'Kuch masla hua, dobara koshish karein.' });
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="bg"><BgVideo lazy poster="/images/contact-poster.jpg" src="/videos/contact.mp4" /></div>
      <div className="container">
        <div>
          <h2 className="section-title">Apni gaari ki service book karein.</h2>
          <p className="section-sub">Form bharein, details seedhi hamare WhatsApp par aa jayengi aur hum jaldi rabta karenge.</p>
          <div className="info">
            <span>📍 Lahore, Pakistan</span>
            <span>🕘 Pir – Sat: 9:00 AM – 8:00 PM</span>
          </div>
        </div>
        <motion.form className="glass form" onSubmit={submit} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div className="row">
            <input name="name" placeholder="Aap ka naam" required />
            <input name="phone" placeholder="Phone number" required inputMode="tel" />
          </div>
          <input name="car" placeholder="Gaari ka brand aur model (misal: Honda Civic 2020)" />
          <select name="service" defaultValue="">
            <option value="" disabled>Service chunein</option>
            {services.map((s) => <option key={s}>{s}</option>)}
          </select>
          <textarea name="message" placeholder="Masla ya khaas hidayat" />
          <button className="btn btn-gold" disabled={state.loading}>{state.loading ? 'Bhej rahe hain...' : 'Send on WhatsApp'}</button>
          {state.msg && <p className="msg" style={{ color: state.ok ? '#1d7a43' : '#b3261e' }}>{state.msg}</p>}
        </motion.form>
      </div>
    </section>
  );
}
