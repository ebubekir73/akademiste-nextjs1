'use client';

import Image from 'next/image';
import Link from 'next/link';

// Koçluk veren öğretmenler
const coachingTeachers = [
  {
    name: "Nehir Türk",
    university: "Koç Ünv. Psikoloji",
    yks: "YKS 2024 EA: 64",
    lessons: "EA Koçluk",
    photo: "/images/nehir-turk.png"
  },
  {
    name: "Elif Demir", 
    university: "Boğaziçi İşletme",
    yks: "YKS 2024 EA: 186",
    lessons: "Koçluk",
    photo: "/images/elif-demir.png"
  },
  {
    name: "Ece Çakıroğlu",
    university: "Boğaziçi Kimya Müh.",
    yks: "YKS 2023 Sayısal: 5578", 
    lessons: "Lise Koçluk, Ortaokul Koçluk",
    photo: "/images/ece-cakiroglu.png"
  }
];

export default function CoachingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">Koçluk Hizmeti</h1>
              <p className="hero-description">
                Hedeflerine ulaşmanda tam da ihtiyacın olan destek. Sana özel derece öğrencisi koçunla birlikte başarıya giden yolda adım adım ilerle.
              </p>
              <Link href="/kayit-formu" className="btn-hero">
                <Image src="/images/videocamera-removebg-preview.png" alt="Play" className="btn-play-icon" width={24} height={24} />
                Ücretsiz Tanışma Görüşmesi
              </Link>
            </div>
            <div className="hero-right">
              <div className="hero-image">
                <Image 
                  src="/images/tutor-isolated-cartoon-illustrations-vector-removebg-preview.png" 
                  alt="Koçluk Hizmeti" 
                  className="tutor-image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Koçlarımız Section */}
      <section className="coaches-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Koçlarımız</h2>
          </div>
          
          <div className="coaches-grid">
            {coachingTeachers.map((teacher, index) => (
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
          <h2 className="section-title">Koçluk Paketleri</h2>
          <div className="pricing-cards single-card">
            <div className="pricing-card featured">
              <h3 className="card-title">Koçluk</h3>
              <div className="card-price">₺ 2600 / Aylık</div>
              <p className="card-description">Hedeflerine ulaşmanda tam da ihtiyacın olan destek.</p>
              <ul className="card-features">
                <li>Sana Özel Derece Öğrencisi Koç</li>
                <li>Akademi Platform&apos;una Sınırsız Erişim</li>
                <li>Sana Özel Günlük Program</li>
              </ul>
              <Link href="/kayit-formu" className="btn-card">
                <Image src="/images/videocamera-removebg-preview.png" alt="Play" className="btn-play-icon" width={24} height={24} />
                Ücretsiz Tanışma Görüşmesi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
