'use client';
import { motion } from 'framer-motion';

// Local image; agar file na mile to hero-poster dikha deta hai (khali jagah nahi rehti).
export default function SafeImg({ src, alt, motionImg = false, ...rest }) {
  const props = { src, alt, loading: 'lazy', decoding: 'async', onError: (e) => { if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = 1; e.currentTarget.src = '/images/band-poster.jpg'; } }, ...rest };
  return motionImg ? <motion.img {...props} /> : <img {...props} />;
}
