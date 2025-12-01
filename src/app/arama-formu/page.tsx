'use client';

import { useState } from 'react';

interface CallFormData {
  adSoyad: string;
  telefon: string;
  sinif?: string;
  ilgiAlani?: string;
  notlar?: string;
  uygunSaat?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CallFormPage() {
  const [formData, setFormData] = useState<CallFormData>({
    adSoyad: '',
    telefon: '',
    sinif: '',
    ilgiAlani: '',
    notlar: '',
    uygunSaat: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Basit validasyon
    const newErrors: FormErrors = {};
    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = 'Ad Soyad gereklidir';
    }
    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Telefon numarası gereklidir';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Arama formu için özel API endpoint'i kullanabilirsiniz
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'arama-talebi',
          ogrenciAdSoyad: formData.adSoyad,
          veliAdSoyad: formData.adSoyad,
          aramaIstegi: true
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Arama talebiniz başarıyla alındı! En kısa sürede sizinle iletişime geçeceğiz.');
        // Formu sıfırla
        setFormData({
          adSoyad: '',
          telefon: '',
          sinif: '',
          ilgiAlani: '',
          notlar: '',
          uygunSaat: ''
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

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-form">
          <div className="form-header">
            <h1>Arama Formu</h1>
            <p>Sizinle iletişime geçmemiz için gerekli bilgileri doldurun. En kısa sürede sizi arayacağız!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>İletişim Bilgileri</h3>
              
              <div className="form-group">
                <label htmlFor="adSoyad">Ad Soyad *</label>
                <input
                  type="text"
                  id="adSoyad"
                  value={formData.adSoyad}
                  onChange={(e) => setFormData(prev => ({...prev, adSoyad: e.target.value}))}
                  required
                  className={errors.adSoyad ? 'error' : ''}
                />
                {errors.adSoyad && <span className="error-message">{errors.adSoyad}</span>}
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
                    value={formData.telefon}
                    onChange={(e) => setFormData(prev => ({...prev, telefon: e.target.value}))}
                    placeholder="5XX XXX XX XX"
                    required
                    className={errors.telefon ? 'error' : ''}
                  />
                </div>
                {errors.telefon && <span className="error-message">{errors.telefon}</span>}
              </div>


              <div className="form-group">
                <label htmlFor="sinif">Sınıf</label>
                <select
                  id="sinif"
                  value={formData.sinif || ''}
                  onChange={(e) => setFormData(prev => ({...prev, sinif: e.target.value}))}
                >
                  <option value="">Sınıf Seçiniz (Opsiyonel)</option>
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
              </div>

              <div className="form-group">
                <label htmlFor="ilgiAlani">İlgi Alanı</label>
                <select
                  id="ilgiAlani"
                  value={formData.ilgiAlani || ''}
                  onChange={(e) => setFormData(prev => ({...prev, ilgiAlani: e.target.value}))}
                >
                  <option value="">İlgi Alanı Seçiniz (Opsiyonel)</option>
                  <option value="ozel-ders">Özel Ders</option>
                  <option value="kocluk">Koçluk</option>
                  <option value="yabanci-dil">Yabancı Dil</option>
                  <option value="genel-bilgi">Genel Bilgi</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="uygunSaat">Uygun Arama Saati</label>
                <select
                  id="uygunSaat"
                  value={formData.uygunSaat || ''}
                  onChange={(e) => setFormData(prev => ({...prev, uygunSaat: e.target.value}))}
                >
                  <option value="">Uygun Saat Seçiniz (Opsiyonel)</option>
                  <option value="09:00-12:00">09:00 - 12:00</option>
                  <option value="12:00-15:00">12:00 - 15:00</option>
                  <option value="15:00-18:00">15:00 - 18:00</option>
                  <option value="18:00-21:00">18:00 - 21:00</option>
                  <option value="her-zaman">Her Zaman Uygun</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notlar">Ek Notlar</label>
                <textarea
                  id="notlar"
                  value={formData.notlar || ''}
                  onChange={(e) => setFormData(prev => ({...prev, notlar: e.target.value}))}
                  placeholder="Özel istekleriniz veya sorularınız varsa buraya yazabilirsiniz..."
                  rows={4}
                />
              </div>
            </div>

            <div className="form-submit">
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <i className="fas fa-phone"></i>
                {isSubmitting ? 'Gönderiliyor...' : 'Arama Talebini Gönder'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
