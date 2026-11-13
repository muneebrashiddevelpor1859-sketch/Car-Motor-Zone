import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, phone, car, service, message } = await req.json();
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: 'Naam aur phone number zaroori hain.' }, { status: 400 });
  }

  const text =
    `*Nayi Booking - BJO Motors*\n` +
    `Naam: ${name}\nPhone: ${phone}\nGaari: ${car || '-'}\nService: ${service || '-'}\nMessage: ${message || '-'}`;

  const to = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  // 1) WhatsApp Cloud API (agar keys set hain)
  if (token && phoneId && to) {
    try {
      const r = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body: text } }),
      });
      if (r.ok) return NextResponse.json({ ok: true, mode: 'api' });
    } catch (e) {}
  }

  // 2) Fallback: wa.me link (client isay khol dega)
  return NextResponse.json({
    ok: true,
    mode: 'link',
    url: `https://wa.me/${to}?text=${encodeURIComponent(text)}`,
  });
}
