const brands = ['Toyota', 'Honda', 'Suzuki', 'BMW', 'Mercedes', 'Audi', 'KIA', 'Hyundai', 'Porsche', 'Range Rover', 'Lexus', 'Nissan', 'MG', 'Changan', 'Haval', 'Volkswagen'];

export default function Brands() {
  const list = [...brands, ...brands];
  return (
    <section id="brands" className="brands" aria-label="Car brands">
      <div className="marquee">
        {list.map((b, i) => (
          <div className="brand" key={i}><i>{b[0]}</i>{b.toUpperCase()}</div>
        ))}
      </div>
    </section>
  );
}
