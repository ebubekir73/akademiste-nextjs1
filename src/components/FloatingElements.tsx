'use client';

export default function FloatingElements() {
  return (
    <>
      {/* Floating Call Button */}
      <a href="/kayit-formu" className="floating-call">
        <span>Ücretsiz Deneme Dersi</span>
      </a>

      {/* Floating Instagram Button */}
      <a 
        href="https://www.instagram.com/akademibogazici" 
        target="_blank" 
        className="floating-instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </>
  );
}
