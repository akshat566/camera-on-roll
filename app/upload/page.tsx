'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState('videos/showreel.mp4');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const upload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('key', key);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Upload failed');
      }

      const data = await res.json();
      setResult(data.url);
    } catch (error: any) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ minHeight:'100vh', padding:'40px', background:'#090908', color:'#fff', fontFamily:'system-ui, sans-serif' }}>
      <h1 style={{ fontSize:'32px', marginBottom:'32px' }}>Upload to R2</h1>
      
      <div style={{ display:'grid', gap:'24px', maxWidth:'500px' }}>
        <div>
          <label style={{ display:'block', marginBottom:'8px', fontSize:'14px' }}>File</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            style={{ width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff' }}
          />
          {file && <p style={{ fontSize:'12px', color:'#888', marginTop:'4px' }}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>}
        </div>

        <div>
          <label style={{ display:'block', marginBottom:'8px', fontSize:'14px' }}>R2 Key (path)</label>
          <input
            type="text"
            value={key}
            onChange={e => setKey(e.target.value)}
            style={{ width:'100%', padding:'12px', background:'#111', border:'1px solid #333', color:'#fff', fontSize:'14px' }}
          />
        </div>

        <button
          onClick={upload}
          disabled={uploading || !file}
          style={{
            padding:'14px 24px',
            background:'#e8176a',
            color:'#fff',
            border:'none',
            fontSize:'14px',
            fontWeight:600,
            cursor:uploading || !file ? 'not-allowed' : 'pointer',
            opacity:uploading || !file ? 0.6 : 1,
          }}
        >
          {uploading ? 'Uploading...' : 'Upload to R2'}
        </button>

        {result && (
          <div style={{ padding:'16px', background:'#111', border:'1px solid #333' }}>
            <p style={{ fontSize:'12px', color:'#888', marginBottom:'4px' }}>Uploaded URL:</p>
            <code style={{ fontSize:'12px', wordBreak:'break-all' }}>{result}</code>
          </div>
        )}
      </div>
    </div>
  );
}
