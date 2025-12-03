'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number>(0); // İlk FAQ açık olsun

  const handleFaqClick = (index: number) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  useEffect(() => {
    // Check if URL has #pricing hash and scroll to it
    if (window.location.hash === '#pricing') {
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // App Store and Google Play buttons for "Yakında" message
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadHandlers: Array<{ element: Element; handler: (e: Event) => void }> = [];
    
    const handleDownloadClick = (e: Event) => {
      e.preventDefault();
      const alertDiv = document.createElement('div');
      alertDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px 40px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); z-index: 10000; text-align: center; font-family: 'Inter', sans-serif; border: 2px solid #3B82F6;">
          <div style="font-size: 1.5rem; font-weight: 700; color: #3B82F6; margin-bottom: 10px;">Mobil Uygulama</div>
          <div style="font-size: 1.1rem; color: #666; margin-bottom: 20px;">Yakında App Store ve Google Play'de!</div>
          <button onclick="this.parentElement.parentElement.remove()" style="background: #3B82F6; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem;">Tamam</button>
        </div>
        <div onclick="this.parentElement.remove()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999;"></div>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => { 
        if (alertDiv.parentElement) { 
          alertDiv.remove(); 
        } 
      }, 5000);
    };
    
    downloadButtons.forEach(button => {
      button.addEventListener('click', handleDownloadClick);
      downloadHandlers.push({ element: button, handler: handleDownloadClick });
    });

    // Cleanup function
    return () => {
      downloadHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <h1 className="hero-title">Derece Öğrencilerinden Birebir Özel Ders</h1>
              <p className="hero-description">
                Türkiye&apos;nin en başarılı öğrencilerinden birebir özel ders alın, sınav sürecinizi bir üst seviyeye taşıyın.<br />
                Her öğrenciye özel ücretsiz koçluk desteğiyle, hedefinize ulaşmak artık çok daha kolay.
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
                  alt="Online Özel Ders" 
                  className="tutor-image"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teachers Showcase Section */}
      <section className="teachers-showcase">
        <div className="container">
          <div className="teachers-showcase-header">
            <h2 className="section-title">Öğretmenlerimiz</h2>
            <p className="section-subtitle">Boğaziçi Akademi'nin başarılı öğretmen kadrosu</p>
          </div>
          <div className="teachers-showcase-wrapper">
            <div className="teachers-showcase-track">
              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/ece-cakiroglu.png" 
                    alt="Ece Çakıroğlu" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Ece Çakıroğlu</h3>
                  <p className="teacher-showcase-university">Boğaziçi Kimya Müh.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/talha-bora-akpinar.png" 
                    alt="Talha Bora Akpınar" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Talha Bora Akpınar</h3>
                  <p className="teacher-showcase-university">Namık Kemal Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/yavuz-selim-satir.png" 
                    alt="Yavuz Selim Satır" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Yavuz Selim Satır</h3>
                  <p className="teacher-showcase-university">Türk Alman Bilgisayar Müh.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/nehir-turk.png" 
                    alt="Nehir Türk" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Nehir Türk</h3>
                  <p className="teacher-showcase-university">Koç Ünv. Psikoloji</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/sebnem-sayar.png" 
                    alt="Şebnem Sayar" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Şebnem Sayar</h3>
                  <p className="teacher-showcase-university">Boğaziçi İşletme</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/abdulsamet-yildirim.png" 
                    alt="Abdulsamet Yıldırım" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Abdulsamet Yıldırım</h3>
                  <p className="teacher-showcase-university">Akdeniz Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/doga-nehir-demirkan.png" 
                    alt="Doğa Nehir Demirkan" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Doğa Nehir Demirkan</h3>
                  <p className="teacher-showcase-university">Ankara Medipol Diş Hek.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/abdullah-akin-gunduz.png" 
                    alt="Abdullah Akın Gündüz" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Abdullah Akın Gündüz</h3>
                  <p className="teacher-showcase-university">İzmir Demokrasi Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/furkan-kaan-sarban.png" 
                    alt="Furkan Kaan Sarban" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Furkan Kaan Sarban</h3>
                  <p className="teacher-showcase-university">Namık Kemal Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/umeyir-adar-parin.png" 
                    alt="Ümeyir Adar Parin" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Ümeyir Adar Parin</h3>
                  <p className="teacher-showcase-university">Galatasaray Bilgisayar Müh.</p>
                </div>
              </div>

              {/* Duplicate for seamless loop */}
              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/ece-cakiroglu.png" 
                    alt="Ece Çakıroğlu" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Ece Çakıroğlu</h3>
                  <p className="teacher-showcase-university">Boğaziçi Kimya Müh.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/talha-bora-akpinar.png" 
                    alt="Talha Bora Akpınar" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Talha Bora Akpınar</h3>
                  <p className="teacher-showcase-university">Namık Kemal Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/yavuz-selim-satir.png" 
                    alt="Yavuz Selim Satır" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Yavuz Selim Satır</h3>
                  <p className="teacher-showcase-university">Türk Alman Bilgisayar Müh.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/nehir-turk.png" 
                    alt="Nehir Türk" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Nehir Türk</h3>
                  <p className="teacher-showcase-university">Koç Ünv. Psikoloji</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/sebnem-sayar.png" 
                    alt="Şebnem Sayar" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Şebnem Sayar</h3>
                  <p className="teacher-showcase-university">Boğaziçi İşletme</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/abdulsamet-yildirim.png" 
                    alt="Abdulsamet Yıldırım" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Abdulsamet Yıldırım</h3>
                  <p className="teacher-showcase-university">Akdeniz Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/doga-nehir-demirkan.png" 
                    alt="Doğa Nehir Demirkan" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Doğa Nehir Demirkan</h3>
                  <p className="teacher-showcase-university">Ankara Medipol Diş Hek.</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/abdullah-akin-gunduz.png" 
                    alt="Abdullah Akın Gündüz" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Abdullah Akın Gündüz</h3>
                  <p className="teacher-showcase-university">İzmir Demokrasi Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/furkan-kaan-sarban.png" 
                    alt="Furkan Kaan Sarban" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Furkan Kaan Sarban</h3>
                  <p className="teacher-showcase-university">Namık Kemal Tıp</p>
                </div>
              </div>

              <div className="teacher-showcase-card">
                <div className="teacher-showcase-photo">
                  <Image 
                    src="/images/umeyir-adar-parin.png" 
                    alt="Ümeyir Adar Parin" 
                    width={150} 
                    height={150}
                    className="teacher-image"
                  />
                </div>
                <div className="teacher-showcase-info">
                  <h3 className="teacher-showcase-name">Ümeyir Adar Parin</h3>
                  <p className="teacher-showcase-university">Galatasaray Bilgisayar Müh.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="teachers-showcase-cta">
            <Link href="/ogretmenlerimiz" className="btn-teachers-showcase">
              Tüm Öğretmenlerimizi Görün
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials-header">
            <h2 className="section-title">Öğrenci Yorumları</h2>
            <p className="section-subtitle">Başarılı öğrencilerimizin deneyimlerini okuyun</p>
          </div>
          <div className="testimonials-wrapper">
            <div className="testimonials-track">
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Kızım Zeynep&apos;in hedefi hep Boğaziçi&apos;ydi ama bu kadar yüksek bir sıralama yapabileceğini tahmin etmemiştik. Boğaziçi Akademi hocaları sadece ders anlatmadı, planlı çalışmayı öğretti. Her hafta deneme analizi, moral desteği, rehberlik... Şimdi Boğaziçi EEM&apos;de, emeği geçen herkese minnettarız.&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Ayşe Demir (Veli)</h4>
                    <span>Zeynep - Boğaziçi Üniversitesi Elektrik-Elektronik Mühendisliği - YKS (1.113)</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Oğlum Arda için bu süreç oldukça stresliydi. Boğaziçi Akademi&apos;nin koçluk sistemi ve düzenli geri bildirimleri sayesinde çalışma düzeni oturdu. Özellikle deneme analizi toplantıları çok faydalıydı. Hedefimiz olan İTÜ Endüstri&apos;ye yerleşti, daha ne isteyelim!&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Selim Karaca (Veli)</h4>
                    <span>Arda - İTÜ Endüstri Mühendisliği - YKS (2.031)</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Kızım Elif tıp istiyordu ama motivasyonunu korumakta zorlanıyordu. Boğaziçi Akademi ekibi birebir ilgilenerek onu adım adım hedefe taşıdı. Haftalık takip sistemi, moral görüşmeleri ve gerçekçi planlamalarıyla fark yarattılar. Sonuç: Cerrahpaşa Tıp!&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Mehmet Aydın (Veli)</h4>
                    <span>Elif - İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi - YKS (928)</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Oğlum Eren, Boğaziçi Akademi&apos;nin LGS programıyla hem konulara hem denemelere çok iyi hazırlandı. Özellikle düzenli online analizler ve rehberlik görüşmeleri bizi çok rahatlattı. Sınav günü stres yapmadı, hedefi olan İstanbul Erkek Lisesi&apos;ne yerleşti. Her şey için teşekkür ederiz.&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Gülşen Yılmaz (Veli)</h4>
                    <span>Eren - İstanbul Erkek Lisesi - LGS (0.1% dilim)</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Kızım Duru başta çok tedirgindi ama Boğaziçi Akademi hocaları onunla birebir ilgilendi. Disiplinli ama pozitif bir hazırlık süreci geçirdik. Motivasyonu hiç düşmedi, Kabataş Erkek Lisesi&apos;ni kazandı. Hem biz hem kızımız çok mutluyuz.&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Levent Kaya (Veli)</h4>
                    <span>Duru - Kabataş Erkek Lisesi - LGS (0.1% dilim)</span>
                  </div>
                </div>
              </div>
              {/* Duplicate slides for seamless loop */}
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Kızım Zeynep&apos;in hedefi hep Boğaziçi&apos;ydi ama bu kadar yüksek bir sıralama yapabileceğini tahmin etmemiştik. Boğaziçi Akademi hocaları sadece ders anlatmadı, planlı çalışmayı öğretti. Her hafta deneme analizi, moral desteği, rehberlik... Şimdi Boğaziçi EEM&apos;de, emeği geçen herkese minnettarız.&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Ayşe Demir (Veli)</h4>
                    <span>Zeynep - Boğaziçi Üniversitesi Elektrik-Elektronik Mühendisliği - YKS (1.113)</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <p>&quot;Oğlum Arda için bu süreç oldukça stresliydi. Boğaziçi Akademi&apos;nin koçluk sistemi ve düzenli geri bildirimleri sayesinde çalışma düzeni oturdu. Özellikle deneme analizi toplantıları çok faydalıydı. Hedefimiz olan İTÜ Endüstri&apos;ye yerleşti, daha ne isteyelim!&quot;</p>
                  </div>
                  <div className="testimonial-author">
                    <h4>Selim Karaca (Veli)</h4>
                    <span>Arda - İTÜ Endüstri Mühendisliği - YKS (2.031)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YKS Statistics Section */}
      <section className="yks-statistics">
        <div className="container">
          <div className="yks-stats-header">
            <h2 className="section-title">Başarı İstatistiklerimiz</h2>
            <p className="section-subtitle">Öğrencilerimizin elde ettiği başarılar</p>
          </div>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">47</div>
              <div className="stat-label">LGS %1</div>
              <div className="stat-description">Öğrencimiz</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">YKS İlk 100</div>
              <div className="stat-description">Öğrencimiz</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">89</div>
              <div className="stat-label">YKS İlk 10.000</div>
              <div className="stat-description">Öğrencimiz</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">347</div>
              <div className="stat-label">YKS İlk 100.000</div>
              <div className="stat-description">Öğrencimiz</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section">
        <div className="container">
          <h2 className="section-title">Neden Bizi Tercih Etmelisiniz?</h2>
          <p className="section-subtitle">Geleneksel özel ders ile Boğaziçi Akademi farkını keşfedin</p>
          
          <div className="comparison-table">
            <div className="comparison-header-row">
              <div className="category-header">Özellikler</div>
              <div className="traditional-header">
                <div className="comparison-icon traditional-icon">
                  <i className="fas fa-home"></i>
                </div>
                <h3>Geleneksel Özel Ders</h3>
              </div>
              <div className="bogazici-header">
                <div className="comparison-icon bogazici-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h3>Boğaziçi Akademi</h3>
              </div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Ders Yeri</div>
              <div className="traditional-cell">Öğretmenin/Öğrencinin evi</div>
              <div className="bogazici-cell">Evinizin konforunda online</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Ders Saatleri</div>
              <div className="traditional-cell">Sabit program, değiştirmek zor</div>
              <div className="bogazici-cell">İstediğiniz saat, esnek program</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Öğretmen Seçimi</div>
              <div className="traditional-cell">Sınırlı seçenek</div>
              <div className="bogazici-cell">İster deneyimli öğretmenlerden, ister derece öğrencilerden seçim</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Öğretmen Değişikliği</div>
              <div className="traditional-cell">Çok zor ve zahmetli</div>
              <div className="bogazici-cell">İstediğiniz zaman kolayca</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Ders Materyali</div>
              <div className="traditional-cell">Fiziksel kitaplar</div>
              <div className="bogazici-cell">Ücretsiz dijital materyaller</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Akran Desteği</div>
              <div className="traditional-cell">Genelde yok</div>
              <div className="bogazici-cell">Akran öğrencilerden ders alın</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Performans Takibi</div>
              <div className="traditional-cell">Manuel ve sınırlı</div>
              <div className="bogazici-cell">Detaylı raporlama sistemi</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">Ücret</div>
              <div className="traditional-cell">Genelde daha pahalı</div>
              <div className="bogazici-cell">Uygun fiyat, paket avantajları</div>
            </div>

            <div className="comparison-row">
              <div className="category-cell">İlk Ders</div>
              <div className="traditional-cell">Ücretli</div>
              <div className="bogazici-cell">Tamamen ücretsiz deneme</div>
            </div>
          </div>

          <div className="comparison-cta">
            <Link href="/kayit-formu" className="btn-comparison">
              Hemen Ücretsiz Deneyin
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="pricing-cards">
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

            <div className="pricing-card">
              <h3 className="card-title">Koçluk</h3>
              <div className="card-price">₺ 2800 / Aylık</div>
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

            <div className="pricing-card">
              <h3 className="card-title">Yabancı Dil Özel Ders</h3>
              <div className="card-price">₺ 1400 / Derslik</div>
              <p className="card-description">Almanca, Fransızca dillerinde uzman öğretmenlerle birebir ders.</p>
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

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="faq-title">Sıkça Sorulan Sorular</h2>
          <p className="faq-subtitle">Boğaziçi Akademi hakkında merak edilenleri senin için derledik.</p>
          
          <div className="faq-items">
            {[
              {
                question: "Boğaziçi Akademi nedir?",
                answer: "Boğaziçi Akademi, Türkiye'nin en iyi öğrencilerini ortaokul-lise öğrencileriyle buluşturan bir özel ders platformudur. Yalnızca özel ders değil, sınav sürecinde karşılaştığın tüm zorlukları atlatman için yanındayız."
              },
              {
                question: "Boğaziçi Akademi misyonu nedir?",
                answer: "Misyonumuz, eksik hissettiği alanda destek almak isteyen öğrenciyi o alanda derece yapmış öğrenciye buluşturmaktır."
              },
              {
                question: "Boğaziçi Akademi'den kimler faydalanabilir?",
                answer: "Boğaziçi Akademi'den 5,6,7,8,9,10,11,12. Sınıflar ve mezun arkadaşlarımız faydalanabilir."
              },
              {
                question: "Öğretmenle nasıl iletişim kurabilirim?",
                answer: "Ders talebinin hemen ardından öğretmenimiz seninle iletişime geçecektir. 7/24 telefon üzerinden iletişim kurabilirsin. İster çözemediğin soruları yolla ister sınav sürecine dair aklına takılan herhangi bir soruyu sor. Biz senin her türlü yanındayız."
              },
              {
                question: "Boğaziçi Akademi öğretmenlerini nasıl seçer?",
                answer: "Boğaziçi Akademi Öğretmenleri yaptıkları derecelere göre titizlikle seçildikten sonra mülakat sürecinden geçerler. Uygun olan öğretmenlerimiz sistem hakkında bilgilendirildikten sonra sizlerle buluşurlar."
              },
              {
                question: "Boğaziçi Akademi herhangi bir kuruma bağlı mı?",
                answer: "Boğaziçi Akademi tamamen öğrencilerin oluşturduğu bir kuruluştur."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div className="faq-question" onClick={() => handleFaqClick(index)}>
                  <span>{faq.question}</span>
                  <i className={`fas ${activeFaq === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-section">
            <p>Cevaplar sizin için yeterli değil mi? Uzman ekibimize ulaşabilir ve sorularınızın cevaplarını en kısa sürede alabilirsiniz.</p>
            <Link href="/kayit-formu" className="btn-contact">Bize Ulaşın</Link>
          </div>
        </div>
      </section>
    </>
  );
}