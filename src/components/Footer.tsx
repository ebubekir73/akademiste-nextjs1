'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Hızlı Erişim</h3>
            <ul>
              <li><Link href="/">Ana Sayfa</Link></li>
              <li><Link href="/kocluk">Koçluk</Link></li>
              <li><Link href="/ozel-ders">Özel Ders</Link></li>
              <li><Link href="/yabanci-dil">Yabancı Dil Özel Ders</Link></li>
              <li><Link href="/ogretmenlerimiz">Öğretmenlerimiz</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>İletişim</h3>
            <ul>
              <li>
                <a href="tel:+905461940570">
                  <i className="fas fa-phone"></i>
                  +90 (546) 194 05 70
                </a>
              </li>
              <li>
                <a href="mailto:info@bogaziciacademi.co">
                  <i className="fas fa-envelope"></i>
                  info@bogaziciacademi.co
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Mobil Uygulama</h3>
            <div className="app-buttons">
              <button className="download-btn app-store">
                <i className="fab fa-apple"></i>
                <div>
                  <span>App Store'dan</span>
                  <br />
                  <strong>İndir</strong>
                </div>
              </button>
              <button className="download-btn google-play">
                <i className="fab fa-google-play"></i>
                <div>
                  <span>Google Play'den</span>
                  <br />
                  <strong>İndir</strong>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">Copyright © 2025 Boğaziçi Akademi.</p>
        </div>
      </div>
    </footer>
  );
}
