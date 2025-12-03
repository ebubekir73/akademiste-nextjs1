'use client';

import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Teacher {
  name: string;
  university: string;
  yks: string;
  lessons: string;
  photo: string;
}

function TeachersPageContent() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Subject Database - Sistematik kategorizasyon
  const subjectDatabase = {
    // Sayısal Dersler
    matematik: {
      name: 'Matematik',
      category: 'sayisal',
      keywords: ['matematik', 'geometri', 'tyt matematik', 'ayt matematik'],
      levels: ['ortaokul', 'lise', 'tyt', 'ayt']
    },
    fizik: {
      name: 'Fizik',
      category: 'sayisal',
      keywords: ['fizik', 'mekanik', 'tyt fizik', 'ayt fizik'],
      levels: ['lise', 'tyt', 'ayt']
    },
    kimya: {
      name: 'Kimya',
      category: 'sayisal',
      keywords: ['kimya', 'organik kimya', 'tyt kimya', 'ayt kimya'],
      levels: ['lise', 'tyt', 'ayt']
    },
    biyoloji: {
      name: 'Biyoloji',
      category: 'sayisal',
      keywords: ['biyoloji', 'genetik', 'tyt biyoloji', 'ayt biyoloji'],
      levels: ['lise', 'tyt', 'ayt']
    },
    fen: {
      name: 'Fen Bilgisi',
      category: 'sayisal',
      keywords: ['fen', 'fen bilgisi'],
      levels: ['ortaokul']
    },
    
    // Sözel Dersler
    turkce: {
      name: 'Türkçe',
      category: 'sozel',
      keywords: ['türkçe', 'tyt türkçe', 'dil bilgisi'],
      levels: ['ortaokul', 'lise', 'tyt']
    },
    edebiyat: {
      name: 'Edebiyat',
      category: 'sozel',
      keywords: ['edebiyat', 'ayt edebiyat'],
      levels: ['lise', 'ayt']
    },
    tarih: {
      name: 'Tarih',
      category: 'sozel',
      keywords: ['tarih', 'çağdaş türk', 'dünya tarihi'],
      levels: ['lise', 'ayt']
    },
    cografya: {
      name: 'Coğrafya',
      category: 'sozel',
      keywords: ['coğrafya'],
      levels: ['lise', 'ayt']
    },
    sosyal: {
      name: 'Sosyal Bilgiler',
      category: 'sozel',
      keywords: ['sosyal', 'sosyal bilgiler'],
      levels: ['ortaokul']
    },
    
    // Dil Dersleri
    ingilizce: {
      name: 'İngilizce',
      category: 'dil',
      keywords: ['ingilizce', 'yds', 'ielts', 'toefl'],
      levels: ['ortaokul', 'lise', 'yds']
    },
    almanca: {
      name: 'Almanca',
      category: 'dil',
      keywords: ['almanca'],
      levels: ['lise', 'yds']
    },
    fransizca: {
      name: 'Fransızca',
      category: 'dil',
      keywords: ['fransızca'],
      levels: ['lise', 'yds']
    },
    
    // Özel Hizmetler
    kocluk: {
      name: 'Koçluk',
      category: 'ozel',
      keywords: ['koçluk', 'koç', 'rehberlik', 'motivasyon'],
      levels: ['ortaokul', 'lise', 'tyt', 'ayt']
    },
    
    // Üniversite Kategorileri
    bogazici: {
      name: 'Boğaziçi Üniversitesi',
      category: 'universite',
      keywords: ['boğaziçi'],
      levels: ['universite']
    },
    tip: {
      name: 'Tıp Fakültesi',
      category: 'fakulte',
      keywords: ['tıp'],
      levels: ['universite']
    },
    muhendislik: {
      name: 'Mühendislik',
      category: 'fakulte',
      keywords: ['müh', 'mühendislik', 'endüstri', 'makine', 'elektrik', 'bilgisayar', 'kimya müh'],
      levels: ['universite']
    }
  };

  const levels = {
    ortaokul: { name: 'Ortaokul', keywords: ['5. sınıf', '6. sınıf', '7. sınıf', '8. sınıf', 'ortaokul', 'lgs'] },
    lise: { name: 'Lise', keywords: ['9. sınıf', '10. sınıf', '11. sınıf', '12. sınıf', 'lise', 'yks', 'tyt', 'ayt'] }
  };

  const teachersData: Teacher[] = [
    {
      name: "Ece Çakıroğlu",
      university: "Boğaziçi Kimya Müh.",
      yks: "YKS 2023 Sayısal: 5578",
      lessons: "Lise Koçluk, Ortaokul Koçluk",
      photo: "/images/ece-cakiroglu.png"
    },
    {
      name: "Talha Bora Akpınar",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 Sayısal: 19749",
      lessons: "YKS Sayısal Koçluk",
      photo: "/images/talha-bora-akpinar.png"
    },
    {
      name: "Yavuz Selim Satır",
      university: "Türk Alman Bilgisayar Müh.",
      yks: "YKS 2023 Sayısal: 2662",
      lessons: "Almanca",
      photo: "/images/yavuz-selim-satir.png"
    },
    {
      name: "Nehir Türk",
      university: "Koç Ünv. Psikoloji",
      yks: "YKS 2024 EA: 64",
      lessons: "EA Koçluk",
      photo: "/images/nehir-turk.png"
    },
    {
      name: "Şebnem Sayar",
      university: "Boğaziçi İşletme",
      yks: "YKS 2025 EA: 34",
      lessons: "Lise Matematik",
      photo: "/images/sebnem-sayar.png"
    },
    {
      name: "Abdulsamet Yıldırım",
      university: "Akdeniz Tıp",
      yks: "YKS 2023 SAY: 7536",
      lessons: "Lise/Ortaokul: Matematik, Biyoloji, Kimya, Fen",
      photo: "/images/abdulsamet-yildirim.png"
    },
    {
      name: "Doğa Nehir Demirkan",
      university: "Ankara Medipol Diş Hek.",
      yks: "YKS 2023 SAY: 40848",
      lessons: "Lise/Ortaokul: Matematik, Biyoloji, Kimya",
      photo: "/images/doga-nehir-demirkan.png"
    },
    {
      name: "Abdullah Akın Gündüz",
      university: "İzmir Demokrasi Tıp",
      yks: "YKS 2023 SAY: 19957",
      lessons: "Lise: Matematik, Geometri, Fizik, Kimya, Biyoloji",
      photo: "/images/abdullah-akin-gunduz.png"
    },
    {
      name: "Furkan Kaan Sarban",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19830",
      lessons: "İlkokul/Ortaokul: Matematik, Fen",
      photo: "/images/furkan-kaan-sarban.png"
    },
    {
      name: "Ümeyir Adar Parin",
      university: "Galatasaray Bilgisayar Müh.",
      yks: "YKS 2025 SAY: 5804",
      lessons: "Lise: Matematik, Kimya, Fizik",
      photo: "/images/umeyir-adar-parin.png"
    },
    {
      name: "Furkan Deveci",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19857",
      lessons: "Lise/Ortaokul: Matematik, Geometri, Kimya, Biyoloji, Fen",
      photo: "/images/furkan-deveci.png"
    },
    {
      name: "Meriç Yıldız",
      university: "Ankara Tıp",
      yks: "YKS 2024 SAY: 3144",
      lessons: "Lise/Ortaokul: Kimya, Fizik, Biyoloji, Türkçe, Matematik, Fen",
      photo: "/images/meric-yildiz.png"
    },
    {
      name: "İrem Öncü",
      university: "Mersin Tıp",
      yks: "YKS 2024 SAY: 13777",
      lessons: "Ortaokul: Matematik",
      photo: "/images/irem-oncu.png"
    },
    {
      name: "Arif Barın Barış",
      university: "Ankara Medipol Tıp",
      yks: "YKS 2022 EA: 893",
      lessons: "Lise: Kimya, Biyoloji, Matematik",
      photo: "/images/arif-barın-baris.png"
    },
    {
      name: "Mehmet Emre Kuru",
      university: "Bülent Ecevit Tıp",
      yks: "YKS 2022 SAY: 23533",
      lessons: "Tıp Fakültesi",
      photo: "/images/mehmet-emre-kuru.png"
    },
    {
      name: "Sevgi Egin",
      university: "İTÜ Gemi Müh.",
      yks: "YKS 2023 SAY: 11053",
      lessons: "Mühendislik",
      photo: "/images/sevgi-egin.png"
    },
    {
      name: "Furkan Özbilici",
      university: "Mersin Tıp",
      yks: "YKS 2024 SAY: 12159",
      lessons: "Tıp Fakültesi",
      photo: "/images/furkan-ozbilici.png"
    },
    {
      name: "Ebrar Özyurt",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19724",
      lessons: "Ortaokul: Matematik",
      photo: "/images/ebrar-ozyurt.png"
    },
    {
      name: "Sena Bozacı",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 18676",
      lessons: "Lise/Ortaokul: Matematik, Türkçe, Fen, Biyoloji",
      photo: "/images/sena-bozaci.png"
    },
    {
      name: "Ceylin Karahan",
      university: "Sabancı Malzeme Müh.",
      yks: "YKS 2023 Dil: 1031",
      lessons: "Malzeme Mühendisliği",
      photo: "/images/ceylin-karahan.png"
    },
    {
      name: "Cafer Berkay Kılıç",
      university: "İzmir Demokrasi Tıp",
      yks: "YKS 2023 SAY: 19497",
      lessons: "Lise/Ortaokul: Matematik",
      photo: "/images/cafer-berkay-kilic.png"
    },
    {
      name: "Şahin Aydın",
      university: "Çapa Tıp",
      yks: "YKS 2022 SAY: 2604",
      lessons: "Tıp Fakültesi",
      photo: "/images/sahin-aydin.png"
    },
    {
      name: "Enes Faruk Başalan",
      university: "Boğaziçi Psikoloji",
      yks: "YKS 2024 EA: 1736",
      lessons: "Lise/Ortaokul: Matematik, Geometri",
      photo: "/images/enes-faruk-basalan.png"
    },
    {
      name: "İzzet Alp Dağbaşı",
      university: "YTÜ Elektrik Elektronik",
      yks: "YKS 2022 SAY: 46136",
      lessons: "Ortaokul: Matematik, Fen, Türkçe, Sosyal",
      photo: "/images/izzet-alp-dagbasi.png"
    },
    {
      name: "Kayra Kara",
      university: "Cerrahpaşa Tıp",
      yks: "YKS 2024 SAY: 2478",
      lessons: "Ortaokul: Matematik, Fen, Türkçe, Sosyal",
      photo: "/images/kayra-kara.png"
    },
    {
      name: "Ece Bağ",
      university: "Mersin Tıp",
      yks: "YKS 2024 SAY: 12354",
      lessons: "Lise: Biyoloji, Kimya",
      photo: "/images/ece-bag.png"
    },
    {
      name: "Elif Demir",
      university: "Boğaziçi İşletme",
      yks: "YKS 2024 EA: 186",
      lessons: "Koçluk",
      photo: "/images/elif-demir.png"
    },
    {
      name: "Gökhan Can Özdemir",
      university: "Boğaziçi Makine Müh.",
      yks: "YKS 2025 SAY: 2314",
      lessons: "Lise/Ortaokul: Matematik, Fen, Türkçe, Sosyal",
      photo: "/images/gokhan-can-ozdemir.png"
    },
    {
      name: "Arda Karakaya",
      university: "Hacettepe Tıp",
      yks: "YKS 2024 SAY: 1154",
      lessons: "Ortaokul: Matematik",
      photo: "/images/arda-karakaya.png"
    },
    {
      name: "Osman Furkan Öğünç",
      university: "Boğaziçi İktisat",
      yks: "YKS 2024 EA: 527",
      lessons: "Lise/Ortaokul: Matematik, Coğrafya, Edebiyat, Fen, Türkçe, Sosyal, İngilizce",
      photo: "/images/osman-furkan-ogunc.png"
    },
    {
      name: "Özgür Kırs",
      university: "Boğaziçi İngiliz Dili ve Edebiyatı",
      yks: "YKS 2023 Dil: 2549",
      lessons: "İngilizce",
      photo: "/images/ozgur-kirs.png"
    },
    {
      name: "Elif Ceren Akdulum",
      university: "KTÜ Tıp",
      yks: "YKS 2023 SAY: 18632",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/elif-ceren-akdulum.png"
    },
    {
      name: "Umutcan Kırdar",
      university: "Altınbaş Tıp",
      yks: "YKS 2022 SAY: 30684",
      lessons: "İlkokul/Ortaokul: Tüm Dersler, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası (46).png"
    },
    {
      name: "Hüseyin Yalçın",
      university: "Cerrahpaşa Tıp",
      yks: "YKS 2025 SAY: 2214",
      lessons: "Lise: Matematik, Fizik, Kimya, Geometri | Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (47).png"
    },
    {
      name: "Zeynep Sude Kahraman",
      university: "Boğaziçi Psikoloji",
      yks: "YKS 2023 EA: 186",
      lessons: "Ortaokul: Matematik | Lise: Matematik, Geometri, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası (48).png"
    },
    {
      name: "Enes Arda Baranak",
      university: "Boğaziçi Tarih",
      yks: "YKS 2023 SÖZ: 298",
      lessons: "Ortaokul/Lise: TYT Türkçe, Edebiyat, Tarih",
      photo: "/images/ekip (Hikayeniz) kopyası (49).png"
    },
    {
      name: "Zeynep Dinç",
      university: "Boğaziçi Endüstri Müh.",
      yks: "YKS 2023 SAY: 491",
      lessons: "Ortaokul: Matematik, Fen, Türkçe | Lise: Matematik, Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (50).png"
    },
    {
      name: "Faruk Özgür",
      university: "Boğaziçi İktisat",
      yks: "YKS 2023 EA: 539",
      lessons: "Ortaokul: Matematik, Fen, Türkçe, Sosyal | Lise: TYT-AYT Türkçe, Sosyal",
      photo: "/images/ekip (Hikayeniz) kopyası (51).png"
    },
    {
      name: "Furkan Benek",
      university: "Çapa Tıp",
      yks: "YKS 2021 SAY: 2405",
      lessons: "Lise ve Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (52).png"
    },
    {
      name: "Güzel Eylül Ünyıldız",
      university: "Galatasaray Matematik",
      yks: "YKS 2023 SAY: 26684",
      lessons: "Ortaokul: Matematik | Lise: TYT-AYT Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (53).png"
    },
    {
      name: "Reyhan Şirikçi",
      university: "Bülent Ecevit Tıp",
      yks: "YKS 2022 SAY: 17279",
      lessons: "Koçluk | TYT/AYT Matematik, Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (54).png"
    },
    {
      name: "Özgür Ertin",
      university: "Dokuz Eylül Tıp",
      yks: "YKS 2022 SAY: 6500",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (55).png"
    },
    {
      name: "Berkay Çelik",
      university: "Boğaziçi Çeviribilimi",
      yks: "YKS 2023 DİL: 367",
      lessons: "İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası (56).png"
    },
    {
      name: "Ali Boran Tişkaya",
      university: "Boğaziçi İşletme",
      yks: "YKS 2024 EA: 253",
      lessons: "Ortaokul: Matematik, Fen | TYT Matematik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (57).png"
    },
    {
      name: "İbrahim Hakan Öner",
      university: "Çapa Tıp",
      yks: "YKS 2023 SAY: 4788",
      lessons: "Ortaokul: Matematik | TYT-AYT Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (58).png"
    },
    {
      name: "İmran Bilgin",
      university: "Nişantaşı Tıp",
      yks: "YKS 2024 SAY: 46808",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (59).png"
    },
    {
      name: "Efe Başıbüyük",
      university: "Kahramanmaraş Tıp",
      yks: "YKS 2023 SAY: 29723",
      lessons: "LGS: Matematik, Fen, Türkçe | TYT: Matematik, Fizik, Kimya, Biyoloji | AYT: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (60).png"
    },
    {
      name: "Selin Tansel Binbaşı",
      university: "Boğaziçi Kimya",
      yks: "YKS 2023 SAY: 12182",
      lessons: "TYT/AYT Fizik, Kimya",
      photo: "/images/ekip (Hikayeniz) kopyası (61).png"
    },
    {
      name: "Murat Fidan",
      university: "Çapa Tıp",
      yks: "YKS 2021 SAY: 2404",
      lessons: "Ortaokul: Matematik, Fen | TYT: Matematik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (62).png"
    },
    {
      name: "Elif Dinç",
      university: "Bahçeşehir Diş Hek.",
      yks: "YKS 2021 SAY: 22990",
      lessons: "TYT: Matematik, Biyoloji, Kimya | Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (63).png"
    },
    {
      name: "Ömer Faruk Var",
      university: "Hacettepe Tıp",
      yks: "YKS 2025 SAY: 368",
      lessons: "AYT-TYT: Matematik, Fizik, Kimya, Biyoloji | Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (64).png"
    },
    {
      name: "Selman İlhan İlter",
      university: "Marmara Psikoloji",
      yks: "YKS 2025 EA: 11904",
      lessons: "TYT-AYT-Ortaokul: Matematik | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (65).png"
    },
    {
      name: "Hamza Anıs",
      university: "Boğaziçi Endüstri Müh.",
      yks: "YKS 2025 SAY: 1699",
      lessons: "AYT-TYT: Kimya, Fizik, Matematik | Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (66).png"
    },
    {
      name: "Hamza Ayaz",
      university: "Boğaziçi Psikoloji",
      yks: "YKS 2024 EA: 1717",
      lessons: "TYT-LGS: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (67).png"
    },
    {
      name: "Elin Yamanlı",
      university: "Bezmialem Tıp",
      yks: "YKS 2022 SAY: 43996",
      lessons: "LGS Türkçe | Fransızca (A1-B2)",
      photo: "/images/ekip (Hikayeniz) kopyası (68).png"
    },
    {
      name: "Fatima Alım",
      university: "Marmara Sosyoloji",
      yks: "YKS 2025 SÖZ: 3330",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (69).png"
    },
    {
      name: "Arda Kolat",
      university: "Medeniyet Tıp",
      yks: "YKS 2023 SAY: 10195",
      lessons: "TYT-AYT: Biyoloji | Ortaokul: Fen, Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (70).png"
    },
    {
      name: "Fatih Alpay Kocaman",
      university: "Yeditepe Genetik ve Biyomüh.",
      yks: "YKS 2023 SAY: 41829",
      lessons: "TYT-AYT: Matematik, Kimya, Fizik, Biyoloji | Ortaokul: Matematik, Türkçe, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (71).png"
    },
    {
      name: "Bayram Anlı",
      university: "Özyeğin Yönetim Bilişim Sistemleri",
      yks: "YKS 2023 EA: 991",
      lessons: "Ortaokul: Matematik, Fen, Türkçe, Sosyal | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (72).png"
    },
    {
      name: "Elif Aslı Güneykaya",
      university: "Boğaziçi Kimya Öğretmenliği",
      yks: "YKS 2023 SAY: 54324",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (73).png"
    },
    {
      name: "Enes Furkan Gözüdik",
      university: "Boğaziçi Matematik",
      yks: "YKS 2024 SAY: 7926",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (74).png"
    },
    {
      name: "Fatih Şengöz",
      university: "YTÜ Biyomedikal Müh.",
      yks: "YKS 2025 SAY: 54588",
      lessons: "7-8 Sınıf: Matematik, Fen | TYT: Matematik, Kimya, Biyoloji, Türkçe | AYT: Biyoloji | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (75).png"
    },
    {
      name: "Ahmet Buğra Özdemir",
      university: "KTÜ Diş Hek.",
      yks: "YKS 2023 SAY: 35091",
      lessons: "Ortaokul: Matematik, Türkçe, Fen, Sosyal | TYT: Matematik, Biyoloji, Kimya, Fizik, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası (76).png"
    },
    {
      name: "Duru Gençer",
      university: "Université Toulouse Kimya",
      yks: "YKS 2023 SAY: 46406",
      lessons: "TYT-AYT: Kimya | Fransızca (A1-B1)",
      photo: "/images/ekip (Hikayeniz) kopyası (77).png"
    },
    {
      name: "Emirhan Bozkan",
      university: "Çapa Tıp",
      yks: "YKS 2022 SAY: 2818",
      lessons: "Ortaokul: Matematik, Türkçe, Fen | TYT: Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (78).png"
    },
    {
      name: "Elif Ertingü",
      university: "YTÜ Kimya Müh.",
      yks: "YKS 2024 SAY: 15586",
      lessons: "İlkokul-Ortaokul: Matematik, Fen, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası (80).png"
    },
    {
      name: "Sudenaz Erbinç",
      university: "İTÜ İnşaat Müh.",
      yks: "YKS 2023 SAY: 28542",
      lessons: "Ortaokul: Matematik, Fen, Türkçe | TYT: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (81).png"
    },
    {
      name: "Uğur Ali Akar",
      university: "Hacettepe Tıp",
      yks: "YKS 2024 SAY: 1169",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (82).png"
    },
    {
      name: "Alper Eren Yıldız",
      university: "KTÜ Diş Hek.",
      yks: "YKS 2023 SAY: 36006",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (83).png"
    },
    {
      name: "Yaşar Eren Mert",
      university: "İzmir Demokrasi Tıp",
      yks: "YKS 2023 SAY: 22456",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (84).png"
    },
    {
      name: "Merve Bodur",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19646",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (85).png"
    },
    {
      name: "Halil İbrahim Özkan",
      university: "İzmir Demokrasi Tıp",
      yks: "YKS 2023 SAY: 21821",
      lessons: "Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (86).png"
    },
    {
      name: "Fatma Gizem Yıldız",
      university: "Çukurova Hukuk",
      yks: "YKS 2022 EA: 22142",
      lessons: "5-6-7 Sınıf: Matematik | LGS İnkılap",
      photo: "/images/ekip (Hikayeniz) kopyası (87).png"
    },
    {
      name: "Abdulsamet Tavacı",
      university: "KTÜ Diş Hek.",
      yks: "YKS 2023 SAY: 34524",
      lessons: "AYT: Matematik | TYT: Kimya, Biyoloji, Fizik, Matematik | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası (88).png"
    },
    {
      name: "Yusuf Salih Özdemir",
      university: "KTÜ Diş Hek.",
      yks: "YKS 2023 SAY: 35043",
      lessons: "Ortaokul: Matematik, Fen, Türkçe | TYT: Matematik, Fizik, Biyoloji, Kimya",
      photo: "/images/ekip (Hikayeniz) kopyası (89).png"
    },
    {
      name: "Yusuf Emir Akhan",
      university: "Bezmialem Tıp",
      yks: "YKS 2023 SAY: 19568",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (90).png"
    },
    {
      name: "Başar Işıldakoğlu",
      university: "İstanbul Tarih",
      yks: "YKS 2022 SÖZ: 7610",
      lessons: "AYT: Tarih, Coğrafya | TYT: Tarih | LGS: İnkılap",
      photo: "/images/ekip (Hikayeniz) kopyası (91).png"
    },
    {
      name: "Nisanur Öz",
      university: "Bezmialem Tıp",
      yks: "YKS 2022 SAY: 10809",
      lessons: "Ortaokul: Matematik, Türkçe, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (92).png"
    },
    {
      name: "Yusuf Eren Ersun",
      university: "Boğaziçi Felsefe",
      yks: "YKS 2024 EA: 3249",
      lessons: "LGS: Matematik, Türkçe, Sosyal, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası (93).png"
    },
    {
      name: "Yağmur Ece Dikici",
      university: "Namık Kemal Tıp",
      yks: "YKS 2022 SAY: 15533",
      lessons: "Ortaokul: Fen | TYT-AYT: Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (94).png"
    },
    {
      name: "Deha Atay",
      university: "Ankara Tıp",
      yks: "YKS 2022 SAY: 3951",
      lessons: "AYT-TYT: Matematik, Geometri, Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası (95).png"
    },
    {
      name: "Burhan Düzgün",
      university: "Çapa Tıp",
      yks: "YKS 2022 SAY: 3580",
      lessons: "Ortaokul-TYT: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası (97).png"
    },
    {
      name: "Cemalettin Gürcününoğlu",
      university: "Sabahattin Zaim Özel Eğitim",
      yks: "YKS 2024 SÖZ: 3995",
      lessons: "AYT-TYT: Edebiyat, Türkçe, Coğrafya, Tarih, Din | Ortaokul: Sosyal, Din, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası (98).png"
    },
    {
      name: "İlayda Bahar",
      university: "Akdeniz Tıp",
      yks: "YKS 2023 SAY: 7449",
      lessons: "TYT: Kimya, Biyoloji, Türkçe | AYT: Biyoloji | Ortaokul: Türkçe, Fen, Sosyal",
      photo: "/images/ekip (Hikayeniz) kopyası (99).png"
    },
    {
      name: "Bekir Demirci",
      university: "Türk Alman Mekatronik",
      yks: "YKS 2021 SAY: 24878",
      lessons: "TYT-AYT: Türkçe, Matematik, Geometri | Almanca, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası (100).png"
    },
    {
      name: "Esma Ural",
      university: "Boğaziçi Çeviribilimi",
      yks: "YKS 2023 DİL: 822",
      lessons: "TYT: Biyoloji | LGS: Fen | B1 İngilizce | YDT Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T145829.606.png"
    },
    {
      name: "Zeynep Parla Parmaksız",
      university: "Bezmialem Tıp",
      yks: "YKS 2023 SAY: 5290",
      lessons: "Ortaokul: Türkçe, Matematik, Fen, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T145945.068.png"
    },
    {
      name: "Eylül Nida Sever",
      university: "Boğaziçi Çeviribilimi",
      yks: "YKS 2023 SÖZ: 383",
      lessons: "TYT: Biyoloji, Türkçe | YDT-LGS: İngilizce | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T150745.620.png"
    },
    {
      name: "İrem İnci Günay",
      university: "İSTÜN Tıp",
      yks: "YKS 2022 DİL: 842",
      lessons: "İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T150939.324.png"
    },
    {
      name: "Arda Santurkaya",
      university: "İTÜ Endüstri Müh.",
      yks: "YKS 2025 SAY: 2275",
      lessons: "TYT-AYT: Matematik, Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151026.305.png"
    },
    {
      name: "Şevval Koca",
      university: "Boğaziçi Çeviribilimi",
      yks: "YKS 2022 DİL: 493",
      lessons: "Ortaokul-Lise: İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151415.465.png"
    },
    {
      name: "Alara İrem Özmen",
      university: "Boğaziçi Kimya Müh.",
      yks: "YKS 2023 SAY: 5876",
      lessons: "Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151500.408.png"
    },
    {
      name: "Kerem Emre Yergin",
      university: "Boğaziçi Elektrik-Elektronik",
      yks: "YKS 2024 SAY: 1803",
      lessons: "TYT-AYT: Matematik, Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151544.471.png"
    },
    {
      name: "Kübra Barlas",
      university: "Mersin Tıp",
      yks: "YKS 2024 SAY: 12465",
      lessons: "AYT-TYT: Biyoloji, Kimya, Fizik | Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151637.330.png"
    },
    {
      name: "Mert Tokuş",
      university: "YTÜ Gemi İnşaatı ve Denizcilik",
      yks: "YKS 2023 SAY: 34240",
      lessons: "TYT-AYT: Matematik | Ortaokul: Matematik, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151734.543.png"
    },
    {
      name: "Sefa Temiz",
      university: "Boğaziçi Psikoloji",
      yks: "YKS 2023 EA: 479",
      lessons: "TYT: Matematik, Türkçe | AYT: Edebiyat, Coğrafya | Ortaokul: Türkçe, Sosyal",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T151847.373.png"
    },
    {
      name: "Emir Baran Kayabaşı",
      university: "Çapa Tıp",
      yks: "YKS 2023 SAY: 3010",
      lessons: "8. Sınıf: Matematik, Fen | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T152043.526.png"
    },
    {
      name: "İrem Keskin",
      university: "Sağlık Bilimleri Diş Hek.",
      yks: "YKS 2024 SAY: 30716",
      lessons: "Ortaokul: Matematik, Fen, Türkçe | TYT-AYT: Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T152142.732.png"
    },
    {
      name: "Osman Yaman",
      university: "Çapa Tıp",
      yks: "YKS 2021 SAY: 2083",
      lessons: "AYT-TYT: Matematik, Geometri, Biyoloji, Kimya, Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T152244.937.png"
    },
    {
      name: "İpek Deniz Yıldız",
      university: "Boğaziçi Moleküler Biyoloji ve Genetik",
      yks: "YKS 2025 SAY: 12716",
      lessons: "İlkokul-Ortaokul: Türkçe, Matematik, Fen, Sosyal, İnkılap",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T153820.544.png"
    },
    {
      name: "Yunus Emre Küçük",
      university: "Çapa Tıp",
      yks: "YKS 2021 SAY: 2364",
      lessons: "İlkokul-Ortaokul: Matematik, Fen, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T211709.457.png"
    },
    {
      name: "Livza Aşar",
      university: "Yıldırım Beyazıt Tıp",
      yks: "YKS 2024 SAY: 7319",
      lessons: "10. Sınıf: Matematik, Kimya | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212107.103.png"
    },
    {
      name: "Nil Ceyda Demirkan",
      university: "Yıldırım Beyazıt Tıp",
      yks: "YKS 2023 SAY: 6406",
      lessons: "TYT: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212158.873.png"
    },
    {
      name: "Büşra Zeynep Bahar",
      university: "Boğaziçi Psikoloji",
      yks: "YKS 2023 EA: 262",
      lessons: "TYT: Türkçe, Sosyal, Kimya, Biyoloji | AYT: Tarih, Coğrafya, Edebiyat | Ortaokul: Türkçe, İnkılap, Matematik, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212259.399.png"
    },
    {
      name: "Nuri Akbulut",
      university: "Kocaeli Tıp",
      yks: "YKS 2023 SAY: 10984",
      lessons: "Ortaokul: Matematik, Fen | TYT: Matematik, Biyoloji | AYT: Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212440.312.png"
    },
    {
      name: "Ayberk Karagöz",
      university: "Yeditepe Yönetim Bilişim Sistemleri",
      yks: "YKS 2023 EA: 1853",
      lessons: "Ortaokul-TYT: Türkçe, Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212537.335.png"
    },
    {
      name: "Roni Duman",
      university: "Boğaziçi Matematik",
      yks: "YKS 2023 SAY: 6957",
      lessons: "Tüm Sınıflar: Matematik | Ortaokul: Fen | AYT: Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212657.524.png"
    },
    {
      name: "Selcan Altay",
      university: "Gaziosmanpaşa Tıp",
      yks: "YKS 2022 SAY: 26474",
      lessons: "7. Sınıf: Matematik, Fen | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212810.098.png"
    },
    {
      name: "Sıla Körpınar",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 20189",
      lessons: "İlkokul-Ortaokul: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T212857.188.png"
    },
    {
      name: "Kerem Anıç",
      university: "Boğaziçi Fizik",
      yks: "YKS 2023 SAY: 8280",
      lessons: "TYT-AYT: Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T213043.103.png"
    },
    {
      name: "Nazlı Buse Duran",
      university: "Boğaziçi Kimya Öğretmenliği",
      yks: "YKS 2023 SAY: 57549",
      lessons: "9-10-11. Sınıf: Kimya | 10-11. Sınıf: Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T213546.058.png"
    },
    {
      name: "Nur Ebrar Demirci",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19145",
      lessons: "TYT: Matematik, Kimya | Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T213626.190.png"
    },
    {
      name: "Vehbi Emre Demirci",
      university: "Marmara Makine Müh.",
      yks: "YKS 2023 SAY: 37861",
      lessons: "İlkokul-Ortaokul: Matematik, Fen, İngilizce, Almanca | TYT-AYT: Kimya | TYT: Matematik, Fizik | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214213.431.png"
    },
    {
      name: "Fatma Sudenaz Çalışır",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19170",
      lessons: "7-8. Sınıf: Matematik, Fen, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214300.247.png"
    },
    {
      name: "Eren Yankayış",
      university: "YTÜ Endüstri Müh.",
      yks: "YKS 2023 SAY: 10579",
      lessons: "TYT-AYT: Matematik, Fizik, Kimya, Biyoloji | TYT: Türkçe, Tarih, Felsefe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214345.078.png"
    },
    {
      name: "Selim Avcı",
      university: "İstanbul Diş Hek.",
      yks: "YKS 2022 SAY: 18758",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214440.207.png"
    },
    {
      name: "Bengisu Emiroğlu",
      university: "Yeditepe Sanat ve Kültür Yönetimi",
      yks: "YKS 2024 SÖZ: 1423",
      lessons: "İlkokul-Ortaokul: Türkçe | TYT: Sosyal, Türkçe | AYT: Coğrafya, Din, Felsefe | Koçluk | İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214552.318.png"
    },
    {
      name: "Ayşegül Mavi",
      university: "Altınbaş Diş Hek.",
      yks: "YKS 2022 SAY: 53691",
      lessons: "5-6-7. Sınıf: Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214653.800.png"
    },
    {
      name: "Mert Ali Kabasakal",
      university: "Koç Bilgisayar Müh.",
      yks: "YKS 2023 SAY: 609",
      lessons: "Tüm Sınıflar: İngilizce | TYT: Matematik | Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T214911.109.png"
    },
    {
      name: "Şerif Yiğit Sakur",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 19815",
      lessons: "Tüm Sınıflar: Matematik, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T215009.174.png"
    },
    {
      name: "Kadir Yılmaz",
      university: "Çapa Tıp",
      yks: "YKS 2022 SAY: 2857",
      lessons: "Ortaokul: Matematik, Fen, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T215056.096.png"
    },
    {
      name: "Bilal Berk Şahin",
      university: "Boğaziçi Makine Müh.",
      yks: "YKS 2023 TYT: 216",
      lessons: "Ortaokul-TYT: Matematik | TYT: Fizik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T215140.237.png"
    },
    {
      name: "Işılay Keçeci",
      university: "Cerrahpaşa Tıp",
      yks: "YKS 2024 SAY: 1126",
      lessons: "Matematik, Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T215257.504.png"
    },
    {
      name: "Oğuz Bakan",
      university: "Cerrahpaşa Tıp",
      yks: "YKS 2024 SAY: 512",
      lessons: "AYT: Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T215337.603.png"
    },
    {
      name: "Arda Topçu",
      university: "Boğaziçi Matematik Öğretmenliği",
      yks: "YKS 2023 SAY: 33800",
      lessons: "TYT-AYT: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221103.413.png"
    },
    {
      name: "Şevval Naz Yaşar",
      university: "Altınbaş Diş Hek.",
      yks: "YKS 2023 SAY: 34316",
      lessons: "İlkokul-Ortaokul: Matematik, Fen, İngilizce | Lise: Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221200.738.png"
    },
    {
      name: "Muhammet Ali Boz",
      university: "Çapa Tıp",
      yks: "YKS 2021 SAY: 2794",
      lessons: "TYT-AYT: Matematik | TYT: Türkçe | Ortaokul: Türkçe, Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221343.369.png"
    },
    {
      name: "Mete Özkan",
      university: "Namık Kemal Tıp",
      yks: "YKS 2023 SAY: 15437",
      lessons: "Ortaokul: Matematik, Fen | Lise: Matematik, Fizik, Kimya, Biyoloji",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221512.919.png"
    },
    {
      name: "Ahmet Duran Er",
      university: "Hacettepe Matematik",
      yks: "YKS 2023 SAY: 29010",
      lessons: "TYT-AYT-Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221610.049.png"
    },
    {
      name: "Nihan Gerişlioğlu",
      university: "Boğaziçi Politika",
      yks: "YKS 2023 EA: 429",
      lessons: "Ortaokul & 9. Sınıf: Matematik, Türkçe",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221803.405.png"
    },
    {
      name: "Kaan Malan",
      university: "Boğaziçi İşletme",
      yks: "YKS 2023 EA: 426",
      lessons: "Lise: Matematik | Ortaokul: Türkçe, Matematik, Fen",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221910.834.png"
    },
    {
      name: "Arda Şimşek",
      university: "Boğaziçi İşletme",
      yks: "YKS 2023 EA: 438",
      lessons: "Ortaokul: Matematik",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T221956.515.png"
    },
    {
      name: "Ayşe Sude Aydın",
      university: "Boğaziçi Uluslararası Ticaret",
      yks: "YKS 2023 EA: 832",
      lessons: "Koçluk",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T222124.015.png"
    },
    {
      name: "Alperen Tüysüz",
      university: "Boğaziçi Edebiyat",
      yks: "YKS 2023 SÖZ: 757",
      lessons: "Edebiyat | Ortaokul: Türkçe, İngilizce",
      photo: "/images/ekip (Hikayeniz) kopyası - 2025-11-02T222247.363.png"
    }
  ];

  useEffect(() => {
    setTeachers(teachersData);
    setFilteredTeachers(teachersData);

    // Check for filter parameter in URL
    const filterParam = searchParams.get('filter');
    if (filterParam && filterParam !== 'all') {
      handleFilter(filterParam);
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.filter-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filterBySubject = (subjectKey: string) => {
    const subject = subjectDatabase[subjectKey as keyof typeof subjectDatabase];
    if (!subject) return [];

    return teachers.filter(teacher => {
      const lessonsLower = teacher.lessons.toLowerCase();
      const nameLower = teacher.name.toLowerCase();
      const universityLower = teacher.university.toLowerCase();
      
      return subject.keywords.some(keyword => 
        lessonsLower.includes(keyword.toLowerCase()) || 
        nameLower.includes(keyword.toLowerCase()) ||
        universityLower.includes(keyword.toLowerCase())
      );
    });
  };

  const filterByLevel = (levelKey: string) => {
    const level = levels[levelKey as keyof typeof levels];
    if (!level) return [];

    return teachers.filter(teacher => {
      const lessonsLower = teacher.lessons.toLowerCase();
      const universityLower = teacher.university.toLowerCase();
      
      return level.keywords.some(keyword => 
        lessonsLower.includes(keyword.toLowerCase()) ||
        universityLower.includes(keyword.toLowerCase())
      );
    });
  };

  const handleFilter = (filterType: string) => {
    let newFilters: string[];
    
    if (filterType === 'all') {
      // Clear all filters
      newFilters = [];
    } else {
      // Toggle filter
      if (activeFilters.includes(filterType)) {
        newFilters = activeFilters.filter(f => f !== filterType);
      } else {
        newFilters = [...activeFilters, filterType];
      }
    }
    
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters: string[]) => {
    if (filters.length === 0) {
      setFilteredTeachers(teachers);
      return;
    }

    let filtered: Teacher[] = teachers;
    
    // Apply each filter
    filters.forEach(filterType => {
      if (filterType === 'ortaokul' || filterType === 'lise') {
        const levelFiltered = filterByLevel(filterType);
        filtered = filtered.filter(teacher => levelFiltered.includes(teacher));
      } else if (filterType === 'ingilizce') {
        // İngilizce filtresi için yabancı dil öğretmenlerini göster
        const foreignLanguageFiltered = teachers.filter(teacher => {
          const lessonsLower = teacher.lessons.toLowerCase();
          return lessonsLower.includes('almanca') || 
                 lessonsLower.includes('fransızca') || 
                 lessonsLower.includes('ingilizce') ||
                 lessonsLower.includes('yabancı dil') ||
                 lessonsLower.includes('yds') ||
                 lessonsLower.includes('dil');
        });
        filtered = filtered.filter(teacher => foreignLanguageFiltered.includes(teacher));
      } else {
        const subjectFiltered = filterBySubject(filterType);
        filtered = filtered.filter(teacher => subjectFiltered.includes(teacher));
      }
    });
    
    setFilteredTeachers(filtered);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilteredTeachers(teachers);
    setOpenDropdown(null);
  };

  // Get filter display name
  const getFilterDisplayName = (filter: string) => {
    const filterNames: { [key: string]: string } = {
      'all': 'Tümü',
      'ortaokul': 'Ortaokul',
      'lise': 'Lise',
      'matematik': 'Matematik',
      'fizik': 'Fizik',
      'kimya': 'Kimya',
      'biyoloji': 'Biyoloji',
      'fen': 'Fen Bilgisi',
      'turkce': 'Türkçe',
      'edebiyat': 'Edebiyat',
      'tarih': 'Tarih',
      'cografya': 'Coğrafya',
      'sosyal': 'Sosyal Bilgiler',
      'ingilizce': 'İngilizce',
      'almanca': 'Almanca',
      'fransizca': 'Fransızca',
      'kocluk': 'Koçluk',
      'bogazici': 'Boğaziçi Üniversitesi',
      'tip': 'Tıp Fakültesi',
      'muhendislik': 'Mühendislik'
    };
    return filterNames[filter] || filter;
  };

  // Apply filters when teachers data changes
  useEffect(() => {
    if (teachers.length > 0) {
      applyFilters(activeFilters);
    }
  }, [teachers, activeFilters]);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <section className="teachers-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tüm Öğretmenlerimiz</h2>
          <div className="filter-container">
            <button 
              className={`filter-btn clear-all ${activeFilters.length === 0 ? 'active' : ''}`} 
              onClick={() => handleFilter('all')}
            >
              <i className="fas fa-list"></i>
              Tümü
            </button>
            
            <div className={`filter-dropdown ${openDropdown === 'kademe' ? 'active' : ''}`}>
              <button className="dropdown-btn" onClick={() => toggleDropdown('kademe')}>
                <span>Kademeye Göre</span>
                <i className={`fas fa-chevron-down ${openDropdown === 'kademe' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className="dropdown-content">
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('ortaokul') ? 'active' : ''}`} 
                  onClick={() => handleFilter('ortaokul')}
                >
                  Ortaokul
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('lise') ? 'active' : ''}`} 
                  onClick={() => handleFilter('lise')}
                >
                  Lise
                </button>
              </div>
            </div>
            
            <div className={`filter-dropdown ${openDropdown === 'ders' ? 'active' : ''}`}>
              <button className="dropdown-btn" onClick={() => toggleDropdown('ders')}>
                <span>Ders Kategorileri</span>
                <i className={`fas fa-chevron-down ${openDropdown === 'ders' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className="dropdown-content">
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('matematik') ? 'active' : ''}`} 
                  onClick={() => handleFilter('matematik')}
                >
                  Matematik
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('fizik') ? 'active' : ''}`} 
                  onClick={() => handleFilter('fizik')}
                >
                  Fizik
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('kimya') ? 'active' : ''}`} 
                  onClick={() => handleFilter('kimya')}
                >
                  Kimya
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('biyoloji') ? 'active' : ''}`} 
                  onClick={() => handleFilter('biyoloji')}
                >
                  Biyoloji
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('fen') ? 'active' : ''}`} 
                  onClick={() => handleFilter('fen')}
                >
                  Fen Bilgisi
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('turkce') ? 'active' : ''}`} 
                  onClick={() => handleFilter('turkce')}
                >
                  Türkçe
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('edebiyat') ? 'active' : ''}`} 
                  onClick={() => handleFilter('edebiyat')}
                >
                  Edebiyat
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('tarih') ? 'active' : ''}`} 
                  onClick={() => handleFilter('tarih')}
                >
                  Tarih
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('cografya') ? 'active' : ''}`} 
                  onClick={() => handleFilter('cografya')}
                >
                  Coğrafya
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('sosyal') ? 'active' : ''}`} 
                  onClick={() => handleFilter('sosyal')}
                >
                  Sosyal Bilgiler
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('ingilizce') ? 'active' : ''}`} 
                  onClick={() => handleFilter('ingilizce')}
                >
                  İngilizce
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('almanca') ? 'active' : ''}`} 
                  onClick={() => handleFilter('almanca')}
                >
                  Almanca
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('fransizca') ? 'active' : ''}`} 
                  onClick={() => handleFilter('fransizca')}
                >
                  Fransızca
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('kocluk') ? 'active' : ''}`} 
                  onClick={() => handleFilter('kocluk')}
                >
                  Koçluk
                </button>
              </div>
            </div>
            
            <div className={`filter-dropdown ${openDropdown === 'universite' ? 'active' : ''}`}>
              <button className="dropdown-btn" onClick={() => toggleDropdown('universite')}>
                <span>Üniversiteye Göre</span>
                <i className={`fas fa-chevron-down ${openDropdown === 'universite' ? 'rotate-180' : ''}`}></i>
              </button>
              <div className="dropdown-content">
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('bogazici') ? 'active' : ''}`} 
                  onClick={() => handleFilter('bogazici')}
                >
                  Boğaziçi Üniversitesi
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('tip') ? 'active' : ''}`} 
                  onClick={() => handleFilter('tip')}
                >
                  Tıp Fakültesi
                </button>
                <button 
                  className={`filter-btn checkbox-filter ${activeFilters.includes('muhendislik') ? 'active' : ''}`} 
                  onClick={() => handleFilter('muhendislik')}
                >
                  Mühendislik
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Display */}
        <div className="active-filter-display">
          <div className="active-filters-container">
            {activeFilters.length === 0 ? (
              <div className="active-filter-badge">
                <i className="fas fa-list"></i>
                <span>Filtre: <strong>Tümü</strong></span>
              </div>
            ) : (
              <div className="multiple-filters">
                <div className="filter-label">
                  <i className="fas fa-filter"></i>
                  <span>Aktif Filtreler:</span>
                </div>
                <div className="filter-badges">
                  {activeFilters.map(filter => (
                    <div key={filter} className="active-filter-badge">
                      <span><strong>{getFilterDisplayName(filter)}</strong></span>
                      <button 
                        className="clear-single-filter-btn" 
                        onClick={() => handleFilter(filter)}
                        title={`${getFilterDisplayName(filter)} filtresini kaldır`}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                  <button 
                    className="clear-all-filters-btn" 
                    onClick={clearAllFilters}
                    title="Tüm filtreleri temizle"
                  >
                    <i className="fas fa-trash"></i>
                    Tümünü Temizle
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="teacher-count">
            <span>{filteredTeachers.length} öğretmen bulundu</span>
          </div>
        </div>
        
        <div className="teachers-grid">
          {filteredTeachers.map((teacher, index) => (
            <div key={index} className="teacher-card">
              <div className="teacher-photo">
                <Image 
                  src={teacher.photo} 
                  alt={teacher.name}
                  width={120}
                  height={120}
                />
              </div>
              <div className="teacher-info">
                <h3>{teacher.name}</h3>
                <div className="teacher-university">{teacher.university}</div>
                <div className="teacher-yks">{teacher.yks}</div>
                <div className="teacher-lessons">
                  {teacher.lessons.split(',').map((lesson, lessonIndex) => (
                    <span key={lessonIndex} className="lesson-bubble">
                      {lesson.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTeachers.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
            <p>Bu filtreye uygun öğretmen bulunamadı.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function TeachersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeachersPageContent />
    </Suspense>
  );
}
