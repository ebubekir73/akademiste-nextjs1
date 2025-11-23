import { NextRequest, NextResponse } from 'next/server';
import { RegistrationData, GoogleSheetsRow, ApiResponse } from '@/types/registration';

// Google Sheets'e veri göndermek için fonksiyon
async function sendToGoogleSheets(data: GoogleSheetsRow): Promise<boolean> {
  try {
    // Google Apps Script Web App URL'ini buraya ekleyin
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      return false;
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Google Sheets API error:', response.statusText);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    return false;
  }
}

// Form verilerini doğrulama fonksiyonu
function validateFormData(data: Partial<RegistrationData>): { isValid: boolean; errors: any } {
  const errors: any = {};

  if (!data.ogrenciAdSoyad?.trim()) {
    errors.ogrenciAdSoyad = 'Öğrenci adı soyadı gereklidir';
  }

  if (!data.veliAdSoyad?.trim()) {
    errors.veliAdSoyad = 'Veli adı soyadı gereklidir';
  }

  if (!data.telefon?.trim()) {
    errors.telefon = 'Telefon numarası gereklidir';
  } else if (!/^[0-9]{10}$/.test(data.telefon.replace(/\s/g, ''))) {
    errors.telefon = 'Geçerli bir telefon numarası giriniz';
  }

  if (!data.sinif) {
    errors.sinif = 'Sınıf seçimi gereklidir';
  }

  if (!data.alan) {
    errors.alan = 'Alan seçimi gereklidir';
  }

  if (!data.ders || data.ders.length === 0) {
    errors.ders = 'En az bir ders seçimi gereklidir';
  }

  if (!data.ogrenciVeli) {
    errors.ogrenciVeli = 'Öğrenci/Veli seçimi gereklidir';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<RegistrationData> = await request.json();

    // Form verilerini doğrula
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        message: 'Form verilerinde hatalar var',
        errors: validation.errors
      } as ApiResponse, { status: 400 });
    }

    // Tarih bilgisini ekle
    const now = new Date();
    const tarih = now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Google Sheets formatına dönüştür
    const sheetsData: GoogleSheetsRow = {
      'Tarih': tarih,
      'Öğrenci ad-soyad': body.ogrenciAdSoyad!,
      'Veli ad-soyad': body.veliAdSoyad!,
      'Telefon': body.telefon!,
      'Sınıf': body.sinif!,
      'Alan': body.alan!,
      'Ders': body.ders!.join(', '),
      'Öğrenci/Veli': body.ogrenciVeli === 'ogrenci' ? 'Öğrenci' : 'Veli'
    };

    // Google Sheets'e gönder
    const success = await sendToGoogleSheets(sheetsData);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Başvurunuz başarıyla alındı!'
      } as ApiResponse);
    } else {
      return NextResponse.json({
        success: false,
        message: 'Başvuru kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.'
      } as ApiResponse, { status: 500 });
    }

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Sunucu hatası oluştu'
    } as ApiResponse, { status: 500 });
  }
}

// GET endpoint - kayıtları listele (admin paneli için)
export async function GET(request: NextRequest) {
  try {
    // Bu endpoint sadece admin erişimi için olmalı
    // Şimdilik basit bir implementasyon
    
    return NextResponse.json({
      success: true,
      message: 'Kayıtlar başarıyla alındı',
      data: [] // Gerçek implementasyonda Google Sheets'ten veri çekilecek
    } as ApiResponse);

  } catch (error) {
    console.error('Get registrations error:', error);
    return NextResponse.json({
      success: false,
      message: 'Kayıtlar alınırken hata oluştu'
    } as ApiResponse, { status: 500 });
  }
}