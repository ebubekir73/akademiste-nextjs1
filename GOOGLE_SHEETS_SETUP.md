# Google Sheets Entegrasyonu Kurulum Rehberi

Bu rehber, Akademiste kayıt formunun Google Sheets ile entegrasyonunu nasıl kuracağınızı açıklar.

## 1. Google Sheets Hazırlığı

### Adım 1: Yeni Spreadsheet Oluşturun
1. [Google Sheets](https://sheets.google.com) adresine gidin
2. Yeni bir spreadsheet oluşturun
3. Spreadsheet'e "Akademiste Kayıtlar" gibi bir isim verin
4. URL'den Spreadsheet ID'sini kopyalayın
   - URL formatı: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - SPREADSHEET_ID kısmını kopyalayın

### Adım 2: Sheet'i Hazırlayın
1. İlk sheet'in adını "Kayıtlar" olarak değiştirin
2. İlk satıra şu başlıkları ekleyin:
   ```
   Tarih | Öğrenci ad-soyad | Veli ad-soyad | Telefon | Sınıf | Alan | Ders | Öğrenci/Veli
   ```

## 2. Google Apps Script Kurulumu

### Adım 1: Script Projesi Oluşturun
1. [Google Apps Script](https://script.google.com) adresine gidin
2. "Yeni proje" butonuna tıklayın
3. Projeye "Akademiste Form Handler" gibi bir isim verin

### Adım 2: Kodu Ekleyin
1. Varsayılan `Code.gs` dosyasının içeriğini silin
2. Proje klasöründeki `google-apps-script.js` dosyasının içeriğini kopyalayın
3. Google Apps Script editörüne yapıştırın
4. Kod içindeki `SPREADSHEET_ID` değişkenini kendi Spreadsheet ID'nizle değiştirin:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```

### Adım 3: İzinleri Ayarlayın
1. Kod editöründe `setup` fonksiyonunu seçin
2. "Çalıştır" butonuna tıklayın
3. İzin istediğinde "İzinleri gözden geçir" seçeneğini seçin
4. Google hesabınızı seçin
5. "Gelişmiş" linkine tıklayın
6. "Akademiste Form Handler'a git (güvenli değil)" seçeneğini seçin
7. "İzin ver" butonuna tıklayın

### Adım 4: Web App Olarak Deploy Edin
1. Sağ üst köşedeki "Deploy" butonuna tıklayın
2. "Yeni deployment" seçeneğini seçin
3. Tür olarak "Web app" seçin
4. Açıklama ekleyin: "Akademiste Form Handler v1.0"
5. Şu ayarları yapın:
   - **Execute as**: Me (your-email@gmail.com)
   - **Who has access**: Anyone
6. "Deploy" butonuna tıklayın
7. **Web app URL'sini kopyalayın** - Bu URL'yi bir sonraki adımda kullanacaksınız

## 3. Next.js Projesini Yapılandırın

### Adım 1: Environment Variables Ayarlayın
1. Proje klasöründe `.env.local` dosyası oluşturun
2. Şu içeriği ekleyin:
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. `YOUR_SCRIPT_ID` kısmını bir önceki adımda kopyaladığınız Web App URL'sindeki ID ile değiştirin

### Adım 2: Projeyi Çalıştırın
```bash
npm run dev
```

## 4. Test Etme

### Adım 1: Form Testi
1. Tarayıcıda `http://localhost:3000/kayit-formu` adresine gidin
2. Formu doldurun ve gönderin
3. Google Sheets'te yeni satırın eklendiğini kontrol edin

### Adım 2: Admin Panel Testi
1. Tarayıcıda `http://localhost:3000/admin` adresine gidin
2. Kayıtların görüntülendiğini kontrol edin

## 5. Sorun Giderme

### Yaygın Hatalar

#### "Script function not found" Hatası
- Google Apps Script'te doğru fonksiyon adlarının kullanıldığından emin olun
- `doPost` ve `doGet` fonksiyonlarının mevcut olduğunu kontrol edin

#### "Permission denied" Hatası
- Google Apps Script izinlerini tekrar kontrol edin
- Web App deployment ayarlarında "Anyone" seçeneğinin seçili olduğundan emin olun

#### Form gönderilmiyor
- `.env.local` dosyasında `GOOGLE_SCRIPT_URL` değişkeninin doğru olduğundan emin olun
- Tarayıcı konsolunda hata mesajlarını kontrol edin

#### Veriler Google Sheets'e gelmiyor
- Spreadsheet ID'sinin doğru olduğundan emin olun
- Sheet adının "Kayıtlar" olduğunu kontrol edin
- Google Apps Script loglarını kontrol edin

### Debug İpuçları

1. **Google Apps Script Logları**:
   - Google Apps Script editöründe "Executions" sekmesine gidin
   - Son çalıştırmaları ve hata mesajlarını kontrol edin

2. **Tarayıcı Konsolu**:
   - F12 tuşuna basarak geliştirici araçlarını açın
   - Console sekmesinde hata mesajlarını kontrol edin

3. **Network Sekmesi**:
   - Geliştirici araçlarında Network sekmesini açın
   - Form gönderirken API çağrılarını kontrol edin

## 6. Güvenlik Notları

- Google Apps Script Web App URL'sini gizli tutun
- Production ortamında environment variables'ları güvenli bir şekilde saklayın
- Admin paneline erişimi kısıtlamayı düşünün

## 7. İleri Düzey Özellikler

### Email Bildirimleri
Google Apps Script'e email gönderme özelliği ekleyebilirsiniz:

```javascript
function sendNotificationEmail(data) {
  const email = 'admin@akademiste.com';
  const subject = 'Yeni Kayıt Bildirimi';
  const body = `
    Yeni bir kayıt alındı:
    
    Öğrenci: ${data['Öğrenci ad-soyad']}
    Veli: ${data['Veli ad-soyad']}
    Telefon: ${data['Telefon']}
    Sınıf: ${data['Sınıf']}
    Alan: ${data['Alan']}
    Dersler: ${data['Ders']}
  `;
  
  MailApp.sendEmail(email, subject, body);
}
```

### Otomatik Yedekleme
Verileri otomatik olarak yedeklemek için Google Drive API'sini kullanabilirsiniz.

### Veri Analizi
Google Sheets'in pivot table ve grafik özelliklerini kullanarak kayıt verilerini analiz edebilirsiniz.
