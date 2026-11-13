import { CherryIcon } from "./Navbar";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">
          <CherryIcon size={20} /> Kokwet Memasak
        </p>
        <p className="deco-phrase">dimasak pelan-pelan, disajikan dengan sayang</p>
        <small>Data resep dari TheMealDB</small>
      </div>
    </footer>
  );
}

export default Footer;
