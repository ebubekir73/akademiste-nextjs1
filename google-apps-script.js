/**
 * Google Apps Script - Akademiste Kayıt Formu Entegrasyonu
 * 
 * Bu kodu Google Apps Script editöründe kullanın:
 * 1. script.google.com adresine gidin
 * 2. Yeni proje oluşturun
 * 3. Bu kodu yapıştırın
 * 4. Spreadsheet ID'sini güncelleyin
 * 5. Web App olarak deploy edin
 */

// Google Sheets ID'sini buraya yazın
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Kayıtlar'; // Sheet adı

/**
 * Web App'ten gelen POST isteklerini işler
 */
function doPost(e) {
  try {
    // CORS başlıklarını ayarla
    const response = {
      success: false,
      message: '',
      timestamp: new Date().toISOString()
    };

    // İstek verilerini parse et
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      response.message = 'Geçersiz JSON verisi';
      return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Spreadsheet'i aç
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Sheet yoksa oluştur
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Başlık satırını ekle
      const headers = [
        'Tarih',
        'Öğrenci ad-soyad', 
        'Veli ad-soyad',
        'Telefon',
        'Sınıf',
        'Alan',
        'Ders',
        'Öğrenci/Veli'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Başlık satırını formatla
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
    }

    // Veriyi satır olarak hazırla
    const rowData = [
      data['Tarih'] || new Date().toLocaleDateString('tr-TR'),
      data['Öğrenci ad-soyad'] || '',
      data['Veli ad-soyad'] || '',
      data['Telefon'] || '',
      data['Sınıf'] || '',
      data['Alan'] || '',
      data['Ders'] || '',
      data['Öğrenci/Veli'] || ''
    ];

    // Yeni satırı ekle
    sheet.appendRow(rowData);

    // Başarı yanıtı
    response.success = true;
    response.message = 'Kayıt başarıyla eklendi';
    response.rowNumber = sheet.getLastRow();

    // Log kaydet
    console.log('Yeni kayıt eklendi:', {
      row: response.rowNumber,
      data: rowData
    });

    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('doPost hatası:', error);
    
    const errorResponse = {
      success: false,
      message: 'Sunucu hatası: ' + error.toString(),
      timestamp: new Date().toISOString()
    };

    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET isteklerini işler (test amaçlı)
 */
function doGet(e) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: 'Sheet bulunamadı'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Son 10 kaydı al
    const lastRow = sheet.getLastRow();
    const startRow = Math.max(2, lastRow - 9); // Başlık satırını atla
    
    let data = [];
    if (lastRow > 1) {
      const range = sheet.getRange(startRow, 1, lastRow - startRow + 1, 8);
      const values = range.getValues();
      
      data = values.map(row => ({
        tarih: row[0],
        ogrenciAdSoyad: row[1],
        veliAdSoyad: row[2],
        telefon: row[3],
        sinif: row[4],
        alan: row[5],
        ders: row[6],
        ogrenciVeli: row[7]
      }));
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Veriler başarıyla alındı',
        data: data,
        totalRows: lastRow - 1 // Başlık satırını sayma
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('doGet hatası:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Veri alınırken hata oluştu: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test fonksiyonu - manuel olarak çalıştırılabilir
 */
function testFunction() {
  const testData = {
    'Tarih': new Date().toLocaleDateString('tr-TR'),
    'Öğrenci ad-soyad': 'Test Öğrenci',
    'Veli ad-soyad': 'Test Veli',
    'Telefon': '5551234567',
    'Sınıf': '10',
    'Alan': 'Sayısal',
    'Ders': 'Matematik, Fizik',
    'Öğrenci/Veli': 'Öğrenci'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  console.log('Test sonucu:', result.getContent());
}

/**
 * Spreadsheet'i temizleme fonksiyonu (dikkatli kullanın!)
 */
function clearSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (sheet && sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).clearContent();
    console.log('Sheet temizlendi');
  }
}

/**
 * Kurulum fonksiyonu - ilk çalıştırmada kullanın
 */
function setup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('Spreadsheet bulundu:', spreadsheet.getName());
    
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      console.log('Yeni sheet oluşturuldu:', SHEET_NAME);
    }
    
    // Başlık satırını kontrol et ve gerekirse ekle
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Tarih',
        'Öğrenci ad-soyad', 
        'Veli ad-soyad',
        'Telefon',
        'Sınıf',
        'Alan',
        'Ders',
        'Öğrenci/Veli'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Başlık formatı
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      
      console.log('Başlık satırı eklendi');
    }
    
    console.log('Kurulum tamamlandı!');
    
  } catch (error) {
    console.error('Kurulum hatası:', error);
  }
}