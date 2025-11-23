'use client';

import Image from 'next/image';
import Link from 'next/link';

// Özel ders veren en iyi öğretmenler
const privateLessonTeachers = [
  {
    name: "Zeynep Dinç",
    university: "Boğaziçi Endüstri Müh.",
    yks: "YKS 2023 SAY: 491",
    lessons: "Ortaokul: Matematik, Fen, Türkçe | Lise: Matematik, Fizik, Kimya, Biyoloji",
    photo: "/images/ekip (Hikayeniz) kopyası (50).png"
  },
  {
    name: "Kerem Emre Yergin",
    university: "Boğaziçi Elektrik-Elektronik",
    yks: "YKS 2024 SAY: 1803",
    lessons: "TYT-AYT: Matematik, Fizik",
    photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151544.471.png"
  },
  {
    name: "Osman Yaman",
    university: "Çapa Tıp",
    yks: "YKS 2021 SAY: 2083",
    lessons: "AYT-TYT: Matematik, Geometri, Biyoloji, Kimya, Fizik",
    photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T152244.937.png"
  }
];

export default function PrivateLessonsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">Özel Ders</h1>
              <p className="hero-description">
                Derece öğrencisi öğretmenlerle birebir özel ders. Kişiye özel ders materyalleri ve akademi platformuna erişim.
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
                  alt="Özel Ders" 
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
            {privateLessonTeachers.map((teacher, index) => (
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
          <h2 className="section-title">Özel Ders Paketleri</h2>
          <div className="pricing-cards single-card">
            <div className="pricing-card featured">
              <h3 className="card-title">Özel Ders</h3>
              <div className="card-price">
                <div style={{textDecoration: 'line-through', color: '#999'}}>₺ 950 / Derslik</div>
                <div style={{fontSize: '1.2em', marginTop: '5px'}}>2 Ders ve Üzeri: ₺850 / Derslik</div>
              </div>
              <p className="card-description">Derece öğrencisi öğretmenlerle birebir özel ders.</p>
              <ul className="card-features">
                <li>Derece Öğrencisi Öğretmen</li>
                <li>Birebir Ders</li>
                <li>Akademi Platform&apos;una Erişim</li>
                <li>Kişiye Özel Ders Materyalleri</li>
                <li>2 Ders ve Üzeri: Ücretsiz Koçluk</li>
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
