'use client';

export default function FloatingElements() {
  return (
    <>
      {/* Floating Call Button */}
      <a href="/arama-formu" className="floating-call">
        <i className="fas fa-phone"></i>
        <span>Sizi Arayalım</span>
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
