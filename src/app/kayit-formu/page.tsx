'use client';

import { useState } from 'react';
import { RegistrationData, ALAN_SECENEKLERI, DERS_SECENEKLERI, FormErrors } from '@/types/registration';

export default function RegistrationPage() {
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    ogrenciAdSoyad: '',
    veliAdSoyad: '',
    telefon: '',
    sinif: '',
    alan: '',
    ders: [],
    ogrenciVeli: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Başvurunuz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.');
        // Formu sıfırla
        setFormData({
          ogrenciAdSoyad: '',
          veliAdSoyad: '',
          telefon: '',
          sinif: '',
          alan: '',
          ders: [],
          ogrenciVeli: undefined,
          ekNotlar: '',
          aramaIstegi: false
        });
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        alert(result.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubjectChange = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      ders: prev.ders?.includes(subject)
        ? prev.ders.filter(s => s !== subject)
        : [...(prev.ders || []), subject]
    }));
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form">
          <div className="form-header">
            <h1>Kayıt Formu</h1>
            <p>Boğaziçi Akademi&apos;ye hoş geldiniz! Formu doldurarak başvurunuzu tamamlayın.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Kişisel Bilgiler</h3>
              
              <div className="form-group">
                <label htmlFor="ogrenciAdSoyad">Öğrenci Ad Soyad *</label>
                <input
                  type="text"
                  id="ogrenciAdSoyad"
                  value={formData.ogrenciAdSoyad || ''}
                  onChange={(e) => setFormData(prev => ({...prev, ogrenciAdSoyad: e.target.value}))}
                  required
                  className={errors.ogrenciAdSoyad ? 'error' : ''}
                />
                {errors.ogrenciAdSoyad && <span className="error-message">{errors.ogrenciAdSoyad}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="veliAdSoyad">Veli Ad Soyad *</label>
                <input
                  type="text"
                  id="veliAdSoyad"
                  value={formData.veliAdSoyad || ''}
                  onChange={(e) => setFormData(prev => ({...prev, veliAdSoyad: e.target.value}))}
                  required
                  className={errors.veliAdSoyad ? 'error' : ''}
                />
                {errors.veliAdSoyad && <span className="error-message">{errors.veliAdSoyad}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="telefon">Telefon Numarası *</label>
                <div className="phone-input">
                  <div className="country-code">
                    <span>+90</span>
                  </div>
                  <input
                    type="tel"
                    id="telefon"
                    value={formData.telefon || ''}
                    onChange={(e) => setFormData(prev => ({...prev, telefon: e.target.value}))}
                    placeholder="5XX XXX XX XX"
                    required
                    className={errors.telefon ? 'error' : ''}
                  />
                </div>
                {errors.telefon && <span className="error-message">{errors.telefon}</span>}
              </div>


              <div className="form-group">
                <label htmlFor="sinif">Sınıf *</label>
                <select
                  id="sinif"
                  value={formData.sinif || ''}
                  onChange={(e) => setFormData(prev => ({...prev, sinif: e.target.value}))}
                  required
                  className={errors.sinif ? 'error' : ''}
                >
                  <option value="">Sınıf Seçiniz</option>
                  <option value="5">5. Sınıf</option>
                  <option value="6">6. Sınıf</option>
                  <option value="7">7. Sınıf</option>
                  <option value="8">8. Sınıf</option>
                  <option value="9">9. Sınıf</option>
                  <option value="10">10. Sınıf</option>
                  <option value="11">11. Sınıf</option>
                  <option value="12">12. Sınıf</option>
                  <option value="mezun">Mezun</option>
                </select>
                {errors.sinif && <span className="error-message">{errors.sinif}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="alan">Alan *</label>
                <select
                  id="alan"
                  value={formData.alan || ''}
                  onChange={(e) => setFormData(prev => ({...prev, alan: e.target.value}))}
                  required
                  className={errors.alan ? 'error' : ''}
                >
                  <option value="">Alan Seçiniz</option>
                  {ALAN_SECENEKLERI.map(alan => (
                    <option key={alan} value={alan}>{alan}</option>
                  ))}
                </select>
                {errors.alan && <span className="error-message">{errors.alan}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="ogrenciVeli">Öğrenci misiniz veli mi? *</label>
                <select
                  id="ogrenciVeli"
                  value={formData.ogrenciVeli || ''}
                  onChange={(e) => setFormData(prev => ({...prev, ogrenciVeli: e.target.value as 'ogrenci' | 'veli'}))}
                  required
                  className={errors.ogrenciVeli ? 'error' : ''}
                >
                  <option value="">Seçiniz</option>
                  <option value="ogrenci">Öğrenci</option>
                  <option value="veli">Veli</option>
                </select>
                {errors.ogrenciVeli && <span className="error-message">{errors.ogrenciVeli}</span>}
              </div>

            </div>

            <div className="form-section">
              <h3>Ders Tercihleri *</h3>
              <div className="subjects-grid">
                <div className="subject-column">
                  {DERS_SECENEKLERI.slice(0, Math.ceil(DERS_SECENEKLERI.length / 2)).map(subject => (
                    <label key={subject} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.ders?.includes(subject) || false}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span className="checkmark"></span>
                      {subject}
                    </label>
                  ))}
                </div>
                <div className="subject-column">
                  {DERS_SECENEKLERI.slice(Math.ceil(DERS_SECENEKLERI.length / 2)).map(subject => (
                    <label key={subject} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.ders?.includes(subject) || false}
                        onChange={() => handleSubjectChange(subject)}
                      />
                      <span className="checkmark"></span>
                      {subject}
                    </label>
                  ))}
                </div>
              </div>
              {errors.ders && <span className="error-message">{errors.ders}</span>}
            </div>



            <div className="form-submit">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <i className="fas fa-paper-plane"></i>
                {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
