'use client';

import { useState } from 'react';
import { Plus, TrendingUp, AlertCircle, CheckCircle2, Clock, RefreshCw, Activity } from 'lucide-react';
import {
  SAMPLE_USERS,
  SAMPLE_REQUESTS,
  getStagesForType,
  getStageTAT,
  isFinal,
  isOverdue,
} from '@/lib/sample-data';
import { Request, RequestType } from '@/types';
import RequestModal from '@/components/design-ops/RequestModal';
import DetailPanel from '@/components/design-ops/DetailPanel';

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>(SAMPLE_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const totalRequests = requests.length;
  const completedRequests = requests.filter((r) => isFinal(r)).length;
  const activeRequests = requests.filter((r) => !isFinal(r)).length;
  const overdueRequests = requests.filter((r) => isOverdue(r)).length;
  const changeRequests = requests.filter((r) => r.current_stage === 'Change Req').length;

  const avgTAT = Math.round(
    requests.reduce((sum, r) => {
      if (!r.stage_timestamps || !r.stage_timestamps['Assigned']) return sum;
      const created = new Date(r.created_at);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - created.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return sum + diffDays;
    }, 0) / Math.max(totalRequests, 1)
  );

  const handleSaveRequest = (newRequest: Partial<Request>) => {
    const id = 'req-' + Math.random().toString(36).substr(2, 9);
    const fullRequest: Request = {
      id,
      type: newRequest.type || 'Graphics',
      requested_by: newRequest.requested_by || 'Social Team',
      title: newRequest.title || '',
      description: newRequest.description,
      requestor_name: newRequest.requestor_name || '',
      requestor_id: newRequest.requestor_id,
      need_by: newRequest.need_by || '',
      reference_link: newRequest.reference_link,
      current_stage: newRequest.current_stage || 'Assigned',
      assigned_to: newRequest.assigned_to,
      social_poc: newRequest.social_poc,
      video_poc: newRequest.video_poc,
      upload_poc: newRequest.upload_poc,
      shoot_date: newRequest.shoot_date,
      revisions: newRequest.revisions || 0,
      created_at: newRequest.created_at || new Date().toISOString().split('T')[0],
      updated_at: newRequest.updated_at || new Date().toISOString().split('T')[0],
      stage_timestamps: newRequest.stage_timestamps || {},
    };
    setRequests([...requests, fullRequest]);
    setIsModalOpen(false);
  };

  const handleUpdateRequest = (updated: Request) => {
    setRequests(requests.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedRequest(null);
    setIsPanelOpen(false);
  };

  const handleOpenRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsPanelOpen(true);
  };

  const calculateStageAverages = () => {
    const tatData: Array<{ stage: string; type: RequestType; avgDays: number }> = [];
    const types: RequestType[] = ['Graphics', 'Social Media Graphics', 'Video'];

    types.forEach((type) => {
      const typeRequests = requests.filter((r) => r.type === type);
      const stages = getStagesForType(type);

      stages.forEach((stage) => {
        const daysArray = typeRequests
          .filter((r) => r.stage_timestamps && r.stage_timestamps[stages[0]] && r.stage_timestamps[stage])
          .map((r) => getStageTAT(r, stages[0], stage));

        if (daysArray.length > 0) {
          const avgDays = Math.round(daysArray.reduce((a, b) => a + b, 0) / daysArray.length);
          tatData.push({
            stage: `${type.split(' ')[0]}: ${stage}`,
            type,
            avgDays,
          });
        }
      });
    });

    return tatData;
  };

  const stageAverages = calculateStageAverages();

  const overdueList = requests
    .filter((r) => isOverdue(r))
    .sort((a, b) => new Date(a.need_by).getTime() - new Date(b.need_by).getTime())
    .slice(0, 5);

  const changeRequestsList = requests
    .filter((r) => r.current_stage === 'Change Req')
    .slice(0, 5);

  const stats = [
    { label: 'Total Requests', value: totalRequests, icon: Activity, accent: 'var(--accent)' },
    { label: 'Completed', value: completedRequests, icon: CheckCircle2, accent: 'var(--success)' },
    { label: 'Active', value: activeRequests, icon: Clock, accent: 'var(--warning)' },
    { label: 'Overdue', value: overdueRequests, icon: AlertCircle, accent: 'var(--error)' },
    { label: 'Avg TAT (days)', value: avgTAT, icon: TrendingUp, accent: 'var(--accent)' },
    { label: 'Change Req', value: changeRequests, icon: RefreshCw, accent: '#9333ea' },
  ];

  return (
    <div>
      {/* Page header */}
      <div className="gb-page-header flex items-start justify-between gap-6">
        <div>
          <h1 className="gb-page-title">Design Operations</h1>
          <p className="gb-page-description">
            Track design throughput, turnaround times, and team capacity across Graphics and Video workflows.
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="gb-btn gb-btn-primary">
          <Plus size={14} strokeWidth={2.25} />
          New Request
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {stats.map(({ label, value, icon: Icon, accent }) => (
          <div key={label} className="gb-stat-card">
            <div className="flex items-start justify-between mb-1">
              <div className="gb-stat-label">{label}</div>
              <Icon size={14} strokeWidth={1.75} style={{ color: accent }} />
            </div>
            <div className="gb-stat-value" style={{ color: accent }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Stage TAT */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="gb-section-title" style={{ marginBottom: 0 }}>
            Stage-wise Average TAT
          </h2>
          <span className="text-[12px]" style={{ color: 'var(--text-faint)' }}>
            Across all in-flight and completed requests
          </span>
        </div>
        <div className="gb-card overflow-hidden">
          <table className="gb-table">
            <thead>
              <tr>
                <th>Type & Stage</th>
                <th style={{ textAlign: 'right' }}>Avg TAT</th>
              </tr>
            </thead>
            <tbody>
              {stageAverages.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: 'center', color: 'var(--text-faint)', padding: '24px' }}>
                    No stage data yet
                  </td>
                </tr>
              ) : (
                stageAverages.map((item, idx) => {
                  let badgeClass = 'gb-badge gb-badge-green';
                  if (item.avgDays >= 3 && item.avgDays <= 5) badgeClass = 'gb-badge gb-badge-yellow';
                  else if (item.avgDays > 5) badgeClass = 'gb-badge gb-badge-red';

                  return (
                    <tr key={idx}>
                      <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{item.stage}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={badgeClass}>{item.avgDays}d</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Two-column tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h2 className="gb-section-title">Overdue (Top 5)</h2>
          <div className="gb-card overflow-hidden">
            {overdueList.length > 0 ? (
              <table className="gb-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th style={{ textAlign: 'right' }}>Days Over</th>
                  </tr>
                </thead>
                <tbody>
                  {overdueList.map((req) => {
                    const daysOver = Math.floor(
                      (new Date().getTime() - new Date(req.need_by).getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    return (
                      <tr key={req.id} onClick={() => handleOpenRequest(req)} style={{ cursor: 'pointer' }}>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{req.title}</td>
                        <td>{req.type.split(' ')[0]}</td>
                        <td style={{ textAlign: 'right' }}>
                          <span className="gb-badge gb-badge-red">{daysOver}d</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="px-5 py-10 text-center text-[13px]" style={{ color: 'var(--text-faint)' }}>
                <CheckCircle2 size={20} strokeWidth={1.75} className="mx-auto mb-2" style={{ color: 'var(--success)' }} />
                Nothing overdue. Nice work.
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="gb-section-title">Change Requests (Top 5)</h2>
          <div className="gb-card overflow-hidden">
            {changeRequestsList.length > 0 ? (
              <table className="gb-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {changeRequestsList.map((req) => {
                    const assignedUser = SAMPLE_USERS.find((u) => u.id === req.assigned_to);
                    return (
                      <tr key={req.id} onClick={() => handleOpenRequest(req)} style={{ cursor: 'pointer' }}>
                        <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{req.title}</td>
                        <td>{req.type.split(' ')[0]}</td>
                        <td>{assignedUser?.name || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="px-5 py-10 text-center text-[13px]" style={{ color: 'var(--text-faint)' }}>
                <CheckCircle2 size={20} strokeWidth={1.75} className="mx-auto mb-2" style={{ color: 'var(--success)' }} />
                No active change requests.
              </div>
            )}
          </div>
        </section>
      </div>

      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveRequest} />

      {selectedRequest && (
        <DetailPanel
          request={selectedRequest}
          users={SAMPLE_USERS}
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            setSelectedRequest(null);
          }}
          onUpdate={handleUpdateRequest}
        />
      )}
    </div>
  );
}
