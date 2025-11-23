'use client';

import { useState, useEffect } from 'react';
import { GoogleSheetsRow } from '@/types/registration';

interface RegistrationRecord extends GoogleSheetsRow {
  id?: number;
}

export default function AdminPage() {
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/registration');
      const result = await response.json();
      
      if (result.success) {
        setRecords(result.data || []);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (records.length === 0) return;

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

    const csvContent = [
      headers.join(','),
      ...records.map(record => [
        record.Tarih,
        record['Öğrenci ad-soyad'],
        record['Veli ad-soyad'],
        record.Telefon,
        record.Sınıf,
        record.Alan,
        record.Ders,
        record['Öğrenci/Veli']
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `kayitlar_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Veriler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error">
          <h2>Hata</h2>
          <p>{error}</p>
          <button onClick={fetchRecords} className="retry-btn">
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Kayıt Yönetimi</h1>
        <div className="admin-actions">
          <button onClick={fetchRecords} className="refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Yenile
          </button>
          <button onClick={exportToCSV} className="export-btn" disabled={records.length === 0}>
            <i className="fas fa-download"></i>
            CSV İndir
          </button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>Toplam Kayıt</h3>
          <p className="stat-number">{records.length}</p>
        </div>
        <div className="stat-card">
          <h3>Bu Ay</h3>
          <p className="stat-number">
            {records.filter(record => {
              const recordDate = new Date(record.Tarih);
              const now = new Date();
              return recordDate.getMonth() === now.getMonth() && 
                     recordDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Bugün</h3>
          <p className="stat-number">
            {records.filter(record => {
              const recordDate = new Date(record.Tarih);
              const today = new Date();
              return recordDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="no-records">
          <i className="fas fa-inbox"></i>
          <h3>Henüz kayıt bulunmuyor</h3>
          <p>İlk kayıt geldiğinde burada görünecek.</p>
        </div>
      ) : (
        <div className="records-table-container">
          <div className="table-responsive">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Öğrenci</th>
                  <th>Veli</th>
                  <th>Telefon</th>
                  <th>Sınıf</th>
                  <th>Alan</th>
                  <th>Dersler</th>
                  <th>Tür</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>{record.Tarih}</td>
                    <td>{record['Öğrenci ad-soyad']}</td>
                    <td>{record['Veli ad-soyad']}</td>
                    <td>
                      <a href={`tel:+90${record.Telefon}`} className="phone-link">
                        {record.Telefon}
                      </a>
                    </td>
                    <td>
                      <span className="grade-badge">{record.Sınıf}</span>
                    </td>
                    <td>
                      <span className="field-badge">{record.Alan}</span>
                    </td>
                    <td>
                      <div className="subjects-list">
                        {record.Ders.split(', ').map((subject, idx) => (
                          <span key={idx} className="subject-tag">{subject}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`type-badge ${record['Öğrenci/Veli'].toLowerCase()}`}>
                        {record['Öğrenci/Veli']}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }

        .admin-header h1 {
          color: #1f2937;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }

        .admin-actions {
          display: flex;
          gap: 12px;
        }

        .refresh-btn, .export-btn, .retry-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .refresh-btn {
          background: #f3f4f6;
          color: #374151;
        }

        .refresh-btn:hover {
          background: #e5e7eb;
        }

        .export-btn {
          background: #10b981;
          color: white;
        }

        .export-btn:hover:not(:disabled) {
          background: #059669;
        }

        .export-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .retry-btn {
          background: #3b82f6;
          color: white;
        }

        .retry-btn:hover {
          background: #2563eb;
        }

        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .stat-card h3 {
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0 0 8px 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stat-number {
          color: #1f2937;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }

        .loading, .error, .no-records {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .no-records i {
          font-size: 3rem;
          color: #d1d5db;
          margin-bottom: 16px;
        }

        .records-table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .records-table {
          width: 100%;
          border-collapse: collapse;
        }

        .records-table th {
          background: #f9fafb;
          color: #374151;
          font-weight: 600;
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          white-space: nowrap;
        }

        .records-table td {
          padding: 16px;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: top;
        }

        .records-table tr:hover {
          background: #f9fafb;
        }

        .phone-link {
          color: #3b82f6;
          text-decoration: none;
        }

        .phone-link:hover {
          text-decoration: underline;
        }

        .grade-badge, .field-badge, .type-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .grade-badge {
          background: #dbeafe;
          color: #1e40af;
        }

        .field-badge {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .type-badge.öğrenci {
          background: #dcfce7;
          color: #166534;
        }

        .type-badge.veli {
          background: #fef3c7;
          color: #92400e;
        }

        .subjects-list {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .subject-tag {
          display: inline-block;
          padding: 2px 6px;
          background: #f1f5f9;
          color: #475569;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .admin-actions {
            justify-content: center;
          }

          .stats-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
