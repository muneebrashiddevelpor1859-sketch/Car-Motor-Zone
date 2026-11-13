'use client';
import { motion } from 'framer-motion';
import SafeImg from './SafeImg';

const items = [
  ['/images/car-performance.jpg', 'Performance Cars'],
  ['/images/workshop.jpg', 'Expert Workshop'],
  ['/images/porsche.jpg', 'Luxury Detailing'],
  ['/images/classic-car.jpg', 'Classic Care'],
  ['/images/sports-car.jpg', 'Sports Cars'],
];

export default function Gallery() {
  return (
    <section id="gallery" className="section" style={{ perspective: 1400 }}>
      <div className="container">
        <h2 className="section-title">Hamara kaam, hamari pehchan.</h2>
        <div className="gallery">
          {items.map(([src, t], i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, rotateY: i % 2 ? 28 : -28, rotateX: 10, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <SafeImg src={src} alt={t} />
              <span>{t}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
