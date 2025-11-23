'use client';

import Image from 'next/image';
import Link from 'next/link';

// Yabancı dil öğretmenleri
const foreignLanguageTeachers = [
  {
    name: "Berkay Çelik",
    university: "Boğaziçi Çeviribilimi",
    yks: "YKS 2023 DİL: 367",
    lessons: "İngilizce",
    photo: "/images/ekip (Hikayeniz) kopyası (56).png"
  },
  {
    name: "Şevval Koca",
    university: "Boğaziçi Çeviribilimi", 
    yks: "YKS 2022 DİL: 493",
    lessons: "Ortaokul-Lise: İngilizce",
    photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151415.465.png"
  },
  {
    name: "Yavuz Selim Satır",
    university: "Türk Alman Bilgisayar Müh.",
    yks: "YKS 2023 Sayısal: 2662",
    lessons: "Almanca",
    photo: "/images/yavuz-selim-satir.png"
  }
];

export default function ForeignLanguagePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">Yabancı Dil Özel Ders</h1>
              <p className="hero-description">
                İngilizce, Almanca, Fransızca dillerinde uzman öğretmenlerle birebir ders. Dil seviyesine özel materyaller.
              </p>
              <Link href="/kayit-formu" className="btn-hero">
                <Image src="/images/videocamera-removebg-preview.png" alt="Play" className="btn-play-icon" width={24} height={24} />
                Ücretsiz Deneme Dersi
              </Link>
            </div>
            <div className="hero-right">
              <div className="hero-image">
                <Image 
                  src="/images/tutor-isolated-cartoon-illustrations-vector-removebg-preview.png" 
                  alt="Yabancı Dil Özel Ders" 
                  className="tutor-image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Öğretmenlerimiz Section */}
      <section className="coaches-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Öğretmenlerimiz</h2>
          </div>
          
          <div className="coaches-grid">
            {foreignLanguageTeachers.map((teacher, index) => (
              <div key={index} className="coach-card">
                <div className="coach-photo">
                  <Image 
                    src={teacher.photo} 
                    alt={teacher.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="coach-info">
                  <h3>{teacher.name}</h3>
                  <div className="coach-university">{teacher.university}</div>
                  <div className="coach-yks">{teacher.yks}</div>
                  <div className="coach-description">{teacher.lessons}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-coaches">
            <Link href="/ogretmenlerimiz" className="btn-view-all">
              <i className="fas fa-users"></i>
              Tüm Öğretmenlerimizi Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <h2 className="section-title">Yabancı Dil Paketleri</h2>
          <div className="pricing-cards single-card">
            <div className="pricing-card featured">
              <h3 className="card-title">Yabancı Dil Özel Ders</h3>
              <div className="card-price">₺ 1400 / Derslik</div>
              <p className="card-description">İngilizce, Almanca, Fransızca dillerinde uzman öğretmenlerle birebir ders.</p>
              <ul className="card-features">
                <li>YDT Hazırlık Uzmanı Öğretmen</li>
                <li>Birebir Ders</li>
                <li>Akademi Platform&apos;una Erişim</li>
                <li>Dil Seviyesine Özel Materyaller</li>
              </ul>
              <Link href="/kayit-formu" className="btn-card">
                <Image src="/images/videocamera-removebg-preview.png" alt="Play" className="btn-play-icon" width={24} height={24} />
                Ücretsiz Deneme Dersi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
