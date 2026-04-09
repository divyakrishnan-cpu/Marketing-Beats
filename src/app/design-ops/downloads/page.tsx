'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { Request } from '@/types';
import { SAMPLE_REQUESTS } from '@/lib/sample-data';

interface ImportRow {
  Type: string;
  'Requested By': string;
  Title: string;
  Description: string;
  Requestor: string;
  'Need By': string;
  'Reference Link': string;
}

interface ParsedRequest extends Request {
  stage_timestamps?: Record<string, string>;
}

export default function DownloadsUploadsPage() {
  const [importedRequests, setImportedRequests] = useState<Request[]>([]);
  const [previewData, setPreviewData] = useState<ImportRow[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Generate CSV template
  const downloadTemplate = () => {
    const headers = ['Type', 'Requested By', 'Title', 'Description', 'Requestor', 'Need By', 'Reference Link'];

    const sampleRows = [
      ['Video', 'Social Team', 'Product Demo', 'Create product demo video', 'John Doe', '2026-04-15', 'https://example.com/demo'],
      ['Graphics', 'Marketing', 'Banner Set', 'Design web banners', 'Jane Smith', '2026-04-20', 'https://example.com/banners'],
      ['Social Media Graphics', 'Social Team', 'Instagram Templates', 'Design Instagram story templates', 'Alice Brown', '2026-04-18', 'https://example.com/instagram'],
      ['Video', 'Management', 'Company Overview', 'Create company overview video', 'Bob Wilson', '2026-05-01', 'https://example.com/overview'],
      ['Graphics', 'Paid Campaign', 'Ad Creatives', 'Design Facebook ad creatives', 'Carol Davis', '2026-04-25', 'https://example.com/ads'],
    ];

    const csv = [
      headers.join(','),
      ...sampleRows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'social_calendar_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as ImportRow[];
        setPreviewData(rows.slice(0, 10));
        setIsProcessing(false);
      },
      error: (error: any) => {
        console.error('CSV parse error:', error);
        setIsProcessing(false);
        alert('Error parsing file: ' + error.message);
      },
    });
  };

  // Convert rows to Request objects
  const handleImport = () => {
    const newRequests = previewData.map((row, index) => {
      const id = `req-${Date.now()}-${index}`;
      return {
        id,
        type: (row.Type as any) || 'Graphics',
        requested_by: (row['Requested By'] as any) || 'Others',
        title: row.Title || 'Untitled',
        description: row.Description || '',
        requestor_name: row.Requestor || 'Unknown',
        need_by: row['Need By'] || new Date().toISOString().split('T')[0],
        reference_link: row['Reference Link'] || '',
        current_stage: 'Assigned',
        revisions: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Request;
    });

    setImportedRequests(newRequests);
    setPreviewData([]);
    setFileName('');
    alert(`Successfully imported ${newRequests.length} entries!`);
  };

  // Export all requests
  const handleExportAll = () => {
    const headers = ['Type', 'Requested By', 'Title', 'Description', 'Requestor', 'Need By', 'Reference Link'];

    const rows = [
      ...SAMPLE_REQUESTS.map(req => [
        req.type,
        req.requested_by,
        req.title,
        req.description || '',
        req.requestor_name,
        req.need_by,
        req.reference_link || '',
      ]),
      ...importedRequests.map(req => [
        req.type,
        req.requested_by,
        req.title,
        req.description || '',
        req.requestor_name,
        req.need_by,
        req.reference_link || '',
      ]),
    ];

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `marketing-requests-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancel = () => {
    setPreviewData([]);
    setFileName('');
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Downloads & Uploads</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Import Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Import Social Calendar</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Import your social calendar data using a CSV or XLS file. Download our template to get started with the correct format.
              </p>

              {/* Download Template Button */}
              <button
                onClick={downloadTemplate}
                className="w-full mb-6 px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-colors border border-[var(--border)]"
              >
                Download Template
              </button>

              {/* Drop Zone */}
              {previewData.length === 0 ? (
                <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center mb-6 hover:border-[var(--accent)] transition-colors cursor-pointer group"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <svg
                    className="mx-auto h-12 w-12 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="mt-2 text-[var(--text-primary)] font-medium">Click to upload CSV / XLS</p>
                  <p className="text-[var(--text-muted)] text-sm">Supports .csv and .xls</p>

                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-sm text-[var(--text-secondary)] mb-3">Preview (first 10 rows)</p>
                  <div className="overflow-x-auto border border-[var(--border)] rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-[var(--bg-tertiary)] border-b border-[var(--border)]">
                        <tr>
                          <th className="px-3 py-2 text-left text-[var(--text-primary)] font-medium">Type</th>
                          <th className="px-3 py-2 text-left text-[var(--text-primary)] font-medium">Title</th>
                          <th className="px-3 py-2 text-left text-[var(--text-primary)] font-medium">Requestor</th>
                          <th className="px-3 py-2 text-left text-[var(--text-primary)] font-medium">Need By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr key={idx} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]">
                            <td className="px-3 py-2 text-[var(--text-primary)]">{row.Type}</td>
                            <td className="px-3 py-2 text-[var(--text-primary)] truncate">{row.Title}</td>
                            <td className="px-3 py-2 text-[var(--text-primary)]">{row.Requestor}</td>
                            <td className="px-3 py-2 text-[var(--text-primary)]">{row['Need By']}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {previewData.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={handleImport}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Import {previewData.length} Entries
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isProcessing}
                    className="flex-1 px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--bg-secondary)] transition-colors border border-[var(--border)] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Imported Requests Preview */}
            {importedRequests.length > 0 && (
              <div className="card p-6 bg-[var(--bg-secondary)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recently Imported</h3>
                <div className="space-y-2">
                  {importedRequests.map(req => (
                    <div key={req.id} className="p-3 bg-[var(--bg-primary)] rounded border border-[var(--border)]">
                      <p className="font-medium text-[var(--text-primary)]">{req.title}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{req.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Export Section */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Export Data</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Export all your request data in CSV format for backup, analysis, or sharing with your team.
              </p>

              <button
                onClick={handleExportAll}
                className="w-full px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity mb-6"
              >
                Export All Requests
              </button>

              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Template Columns Reference</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Type</p>
                    <p className="text-xs text-[var(--text-secondary)]">Video / Social Media Graphics / Graphics</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Requested By</p>
                    <p className="text-xs text-[var(--text-secondary)]">Team name (Social Team, Management, Sales Team, etc.)</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Title</p>
                    <p className="text-xs text-[var(--text-secondary)]">Short descriptive title of the request</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Description</p>
                    <p className="text-xs text-[var(--text-secondary)]">Brief description of the requirement</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Requestor</p>
                    <p className="text-xs text-[var(--text-secondary)]">Name of the person who requested</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Need By</p>
                    <p className="text-xs text-[var(--text-secondary)]">Due date in YYYY-MM-DD format</p>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)] text-sm">Reference Link</p>
                    <p className="text-xs text-[var(--text-secondary)]">Optional URL for additional context</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Total Requests</h3>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {SAMPLE_REQUESTS.length + importedRequests.length}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {SAMPLE_REQUESTS.length} sample + {importedRequests.length} imported
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
