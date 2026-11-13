// Sari website images ko public/images mein download karta hai (sirf jo pehle se nahi hain).
// Chalane ke liye: npm run images   (npm run dev / build se pehle khud bhi chalta hai)
import { mkdir, writeFile, access } from 'node:fs/promises';

const dir = new URL('../public/images/', import.meta.url);
const base = 'https://images.unsplash.com/';
const files = {
  'car-performance.jpg': 'photo-1492144534655-ae79c964c9d7',
  'workshop.jpg': 'photo-1486262715619-67b85e0b08d3',
  'porsche.jpg': 'photo-1503376780353-7e6692767b70',
  'classic-car.jpg': 'photo-1494976388531-d1058494cdd8',
  'sports-car.jpg': 'photo-1583121274602-3e2820c69888',
};

await mkdir(dir, { recursive: true });
for (const [name, id] of Object.entries(files)) {
  const target = new URL(name, dir);
  try { await access(target); console.log('mojood:', name); continue; } catch {}
  try {
    const res = await fetch(`${base}${id}?w=1600&q=80&auto=format&fit=crop`, { redirect: 'follow' });
    if (!res.ok) throw new Error(res.status);
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    console.log('download hui:', name);
  } catch (e) {
    console.log('FAIL:', name, String(e.message || e), '- apni image isi naam se public/images mein rakh dein.');
  }
}
process.exit(0);
