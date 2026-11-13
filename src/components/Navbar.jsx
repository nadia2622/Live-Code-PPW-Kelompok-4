import { useState } from "react";

export const CherryIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <path d="M16 4c-2 5-3 9-5 14M16 4c1 5 5 9 6 14" fill="none" stroke="#64734A" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M16 4c3-1 6-1 8 1-3 1-6 1-8-1z" fill="#64734A" />
    <circle cx="10" cy="22" r="6" fill="#A8323E" />
    <circle cx="22" cy="22" r="6" fill="#A8323E" />
    <circle cx="8.3" cy="20" r="1.4" fill="#FAF5EB" opacity=".6" />
    <circle cx="20.3" cy="20" r="1.4" fill="#FAF5EB" opacity=".6" />
  </svg>
);

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <a href="#home" className="navbar__logo" onClick={close}>
          <CherryIcon />
          <span>Kokwet Memasak</span>
        </a>

        <button
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Tutup" : "Menu"}
        </button>

        <nav id="main-nav" className={`navbar__links ${open ? "is-open" : ""}`} aria-label="Navigasi utama">
          <a href="#home" onClick={close}>Home</a>
          <a href="#categories" onClick={close}>Categories</a>
          <a href="#recipes" onClick={close}>Recipes</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
