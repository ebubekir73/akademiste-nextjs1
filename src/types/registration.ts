// Kayıt formu için veri tipleri
export interface RegistrationData {
  tarih: string; // Tarih
  ogrenciAdSoyad: string; // Öğrenci ad-soyad
  veliAdSoyad: string; // Veli ad-soyad
  telefon: string; // Telefon
  sinif: string; // Sınıf
  alan: string; // Alan (Sayısal/Eşit Ağırlık/Sözel/TM vb.)
  ders: string[]; // Ders (seçilen dersler)
  ogrenciVeli: 'ogrenci' | 'veli'; // Öğrenci/Veli
  email?: string; // E-posta (opsiyonel)
  ekNotlar?: string; // Ek notlar (opsiyonel)
  aramaIstegi?: boolean; // Arama isteği (opsiyonel)
}

// Google Sheets için format
export interface GoogleSheetsRow {
  Tarih: string;
  'Öğrenci ad-soyad': string;
  'Veli ad-soyad': string;
  Telefon: string;
  Sınıf: string;
  Alan: string;
  Ders: string;
  'Öğrenci/Veli': string;
  'Form Tipi'?: string;
  'Arama Talebi'?: string;
  'İlgi Alanı'?: string;
  'Uygun Saat'?: string;
  'Ek Notlar'?: string;
}

// API Response tipi
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Form validation için
export interface FormErrors {
  ogrenciAdSoyad?: string;
  veliAdSoyad?: string;
  telefon?: string;
  sinif?: string;
  alan?: string;
  ders?: string;
  ogrenciVeli?: string;
}

// Alan seçenekleri
export const ALAN_SECENEKLERI = [
  'Sayısal',
  'Eşit Ağırlık', 
  'Sözel',
  'TM (Türkçe-Matematik)',
  'Dil',
  'Diğer'
] as const;

// Ders seçenekleri
export const DERS_SECENEKLERI = [
  'Matematik',
  'Fizik',
  'Kimya',
  'Biyoloji',
  'Fen Bilgisi',
  'Türkçe',
  'Edebiyat',
  'Tarih',
  'Coğrafya',
  'İngilizce',
  'Almanca',
  'Fransızca',
  'Geometri',
  'Felsefe',
  'Din'
] as const;

export type AlanType = typeof ALAN_SECENEKLERI[number];
export type DersType = typeof DERS_SECENEKLERI[number];
