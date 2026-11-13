# BJO Motors – Next.js Website

## Chalane ka tareeqa
1. `npm install`
2. `.env.example` ko `.env.local` mein copy karein aur apna WhatsApp number likhein (923xxxxxxxxx).
3. `npm run dev` → http://localhost:3000

## Video / Images
- Hero video: `public/videos/hero.mp4` mein apni video rakhein (jab tak nahi hai, poster image nazar aayegi).
- Images Unsplash se hain; apni images `public/images/` mein rakh kar `src="/images/..."` lagayen.

## WhatsApp
- Default: form submit par WhatsApp (wa.me) khulta hai jis mein message pehle se likha hota hai.
- Auto-send ke liye Meta WhatsApp Cloud API ki `WHATSAPP_TOKEN` aur `WHATSAPP_PHONE_ID` `.env.local` mein dalen.
