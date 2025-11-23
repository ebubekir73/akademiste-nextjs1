# Boğaziçi Akademi - Online Özel Ders Platformu

Bu proje [Next.js](https://nextjs.org) ile geliştirilmiş bir özel ders platformudur.

## Özellikler

- 📝 Kayıt formu sistemi
- 📊 Google Sheets entegrasyonu
- 📱 Responsive tasarım
- 🔔 Otomatik e-posta bildirimleri
- 🎯 TypeScript desteği

## Kurulum

1. Projeyi klonlayın ve bağımlılıkları yükleyin:

```bash
npm install
```

2. Environment dosyasını oluşturun:

```bash
cp .env.example .env.local
```

3. Google Apps Script kurulumu yapın (detaylar aşağıda)

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Google Apps Script Kurulumu

### 1. Google Sheets Hazırlama
- Google Drive'da yeni bir Google Sheets dosyası oluşturun
- Dosya URL'sindeki ID'yi kopyalayın (`/d/` ile `/edit` arasındaki kısım)

### 2. Google Apps Script Kurulumu
1. [script.google.com](https://script.google.com) adresine gidin
2. "Yeni proje" oluşturun
3. `google-apps-script.js` dosyasındaki kodu kopyalayın
4. `SHEET_ID` değişkenine Google Sheets ID'nizi yazın
5. E-posta adreslerini güncelleyin (opsiyonel)

### 3. Web Uygulaması Olarak Deploy Etme
1. "Deploy" > "New deployment" seçin
2. Tür olarak "Web app" seçin
3. "Execute as: Me" seçin
4. "Who has access: Anyone" seçin
5. "Deploy" butonuna tıklayın
6. Verilen URL'yi kopyalayın

### 4. Environment Variable Ayarlama
`.env.local` dosyasını oluşturun ve şu içeriği ekleyin:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Tablo Yapısı

Form verileri aşağıdaki başlıklarla Google Sheets'e kaydedilir:

| Tarih | Öğrenci ad-soyad | Veli ad-soyad | Telefon | Sınıf | Alan | Ders | Öğrenci/Veli |
|-------|------------------|---------------|---------|-------|------|------|--------------|

## API Endpoints

- `POST /api/registration` - Yeni kayıt oluşturur
- `GET /api/registration` - API durumunu kontrol eder

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
