'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [akshatFile, setAkshatFile] = useState<File | null>(null);
  const [ashnaFile, setAshnaFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ akshat?: string; ashna?: string }>({});

  const upload = async (file: File, key: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('key', key);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  };

  const handleUpload = async () => {
    if (!akshatFile || !ashnaFile) {
      alert('Please select both files');
      return;
    }

    setUploading(true);
    setResult({});

    try {
      const akshatUrl = await upload(akshatFile, 'founders/akshat.jpg');
      const ashnaUrl = await upload(ashnaFile, 'founders/ashna.jpg');
      setResult({ akshat: akshatUrl, ashna: ashnaUrl });
    } catch (error) {
      alert('Upload failed. Check console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', padding:'40px', background:'#090908', color:'#fff', fontFamily:'system-ui, sans-serif' }}>
      <h1 style={{ fontSize:'32px', marginBottom:'32px' }}>Upload Founder Photos</h1>
      
      <div style={{ display:'grid', gap:'24px', maxWidth:'500px' }}>
        <div>
          <label style={{ display:'block', marginBottom:'8px', fontSize:'14px' }}>Akshat Bhardwaj</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setAkshatFile(e.target.files?.[0] || null)}
            style={{ width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff' }}
          />
        </div>

        <div>
          <label style={{ display:'block', marginBottom:'8px', fontSize:'14px' }}>Ashna Chhabra</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setAshnaFile(e.target.files?.[0] || null)}
            style={{ width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff' }}
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            padding:'14px 24px',
            background:'#e8176a',
            color:'#fff',
            border:'none',
            fontSize:'14px',
            fontWeight:600,
            cursor:uploading ? 'not-allowed' : 'pointer',
            opacity:uploading ? 0.6 : 1,
          }}
        >
          {uploading ? 'Uploading...' : 'Upload to R2'}
        </button>

        {result.akshat && (
          <div style={{ padding:'16px', background:'#111', border:'1px solid #333' }}>
            <p style={{ fontSize:'12px', color:'#888', marginBottom:'4px' }}>Akshat URL:</p>
            <code style={{ fontSize:'12px', wordBreak:'break-all' }}>{result.akshat}</code>
          </div>
        )}

        {result.ashna && (
          <div style={{ padding:'16px', background:'#111', border:'1px solid #333' }}>
            <p style={{ fontSize:'12px', color:'#888', marginBottom:'4px' }}>Ashna URL:</p>
            <code style={{ fontSize:'12px', wordBreak:'break-all' }}>{result.ashna}</code>
          </div>
        )}
      </div>
    </div>
  );
}
