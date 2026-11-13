const Bow = () => (
  <svg className="hero__bow" width="84" height="54" viewBox="0 0 84 54" aria-hidden="true" focusable="false">
    <path d="M42 27C30 6 6 2 4 16s22 18 38 11z" fill="#E9C9C2" stroke="#A8323E" strokeWidth="1.4" />
    <path d="M42 27C54 6 78 2 80 16S58 34 42 27z" fill="#E9C9C2" stroke="#A8323E" strokeWidth="1.4" />
    <path d="M42 27L28 50M42 27l14 23" stroke="#A8323E" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <circle cx="42" cy="27" r="5" fill="#A8323E" />
  </svg>
);

function Hero({ image }) {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <div className="hero__text">
        <p className="deco-phrase">resep manis dari dapur kecil kami</p>
        <h1 id="hero-title">Cooking is an Act of Love.</h1>
        <p className="hero__desc">
          Jelajahi ratusan resep dari berbagai penjuru dunia. Pilih kategori, cari nama
          masakan, lalu masak bersama orang tersayang.
        </p>
        <a href="#recipes" className="btn btn--primary">Find Your Recipe</a>
      </div>

      <div className="hero__visual">
        <Bow />
        {image ? (
          <img src={`${image}/medium`} alt="Hidangan pilihan dari koleksi resep Kokwet Memasak" />
        ) : (
          <div className="hero__placeholder" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}

export default Hero;
