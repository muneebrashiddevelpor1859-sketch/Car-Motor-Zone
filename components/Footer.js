import Logo from './Logo';

export default function Footer() {
  const n = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (
    <>
      <footer className="footer">
        <div className="container">
          <Logo light />
          <span>© {new Date().getFullYear()} BJO Motors. All rights reserved.</span>
        </div>
      </footer>
      <a className="wa" href={`https://wa.me/${n}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </>
  );
}
