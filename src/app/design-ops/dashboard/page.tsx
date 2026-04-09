'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SAMPLE_USERS, SAMPLE_REQUESTS, getStagesForType, getStageTAT, isFinal, isOverdue } from '@/lib/sample-data';
import { Request, RequestType, getTATCategoriesForType } from '@/types';
import RequestModal from '@/components/design-ops/RequestModal';
import DetailPanel from '@/components/design-ops/DetailPanel';

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>(SAMPLE_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Calculate statistics
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

  // Calculate stage-wise TAT averages
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

  // Get overdue and change requests
  const overdueList = requests
    .filter((r) => isOverdue(r))
    .sort((a, b) => new Date(a.need_by).getTime() - new Date(b.need_by).getTime())
    .slice(0, 5);

  const changeRequestsList = requests
    .filter((r) => r.current_stage === 'Change Req')
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header with Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Design Operations Dashboard
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-colors font-medium"
        >
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Requests */}
        <div className="card p-4 border-l-4 border-[var(--accent)]">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Total Requests
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {totalRequests}
          </div>
        </div>

        {/* Completed */}
        <div className="card p-4 border-l-4 border-[var(--success)]">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Completed
          </div>
          <div className="text-2xl font-bold text-[var(--success)]">
            {completedRequests}
          </div>
        </div>

        {/* Active / In Progress */}
        <div className="card p-4 border-l-4 border-[var(--warning)]">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Active
          </div>
          <div className="text-2xl font-bold text-[var(--warning)]">
            {activeRequests}
          </div>
        </div>

        {/* Overdue */}
        <div className="card p-4 border-l-4 border-[var(--error)]">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Overdue
          </div>
          <div className="text-2xl font-bold text-[var(--error)]">
            {overdueRequests}
          </div>
        </div>

        {/* Avg TAT */}
        <div className="card p-4 border-l-4 border-[var(--accent)]">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Avg TAT (days)
          </div>
          <div className="text-2xl font-bold text-[var(--text-primary)]">
            {avgTAT}
          </div>
        </div>

        {/* Change Requests */}
        <div className="card p-4 border-l-4 border-purple-500">
          <div className="text-xs text-[var(--text-secondary)] font-medium mb-1">
            Change Req
          </div>
          <div className="text-2xl font-bold text-purple-500">
            {changeRequests}
          </div>
        </div>
      </div>

      {/* Stage-wise Avg TAT Table */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
          Stage-wise Average TAT
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 font-semibold text-[var(--text-primary)]">
                  Type & Stage
                </th>
                <th className="text-right py-3 px-4 font-semibold text-[var(--text-primary)]">
                  Avg TAT (days)
                </th>
              </tr>
            </thead>
            <tbody>
              {stageAverages.map((item, idx) => {
                let badgeClass = 'badge badge-green';
                if (item.avgDays >= 3 && item.avgDays <= 5) {
                  badgeClass = 'badge badge-yellow';
                } else if (item.avgDays > 5) {
                  badgeClass = 'badge badge-red';
                }

                return (
                  <tr
                    key={idx}
                    className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <td className="py-3 px-4 text-[var(--text-primary)]">
                      {item.stage}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={badgeClass}>{item.avgDays}d</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Requests */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Overdue Requests (Top 5)
          </h2>
          {overdueList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Title
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Type
                    </th>
                    <th className="text-right py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Days Over
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overdueList.map((req) => {
                    const daysOver = Math.floor(
                      (new Date().getTime() - new Date(req.need_by).getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                    return (
                      <tr
                        key={req.id}
                        onClick={() => handleOpenRequest(req)}
                        className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      >
                        <td className="py-2 px-3 text-[var(--text-primary)] truncate font-medium">
                          {req.title}
                        </td>
                        <td className="py-2 px-3 text-[var(--text-secondary)]">
                          {req.type.split(' ')[0]}
                        </td>
                        <td className="py-2 px-3 text-right text-[var(--error)] font-semibold">
                          {daysOver}d
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[var(--text-muted)]">No overdue requests</p>
          )}
        </div>

        {/* Change Requests */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Change Requests (Top 5)
          </h2>
          {changeRequestsList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Title
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Type
                    </th>
                    <th className="text-left py-2 px-3 font-semibold text-[var(--text-primary)]">
                      Assigned To
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {changeRequestsList.map((req) => {
                    const assignedUser = SAMPLE_USERS.find(
                      (u) => u.id === req.assigned_to
                    );
                    return (
                      <tr
                        key={req.id}
                        onClick={() => handleOpenRequest(req)}
                        className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                      >
                        <td className="py-2 px-3 text-[var(--text-primary)] truncate font-medium">
                          {req.title}
                        </td>
                        <td className="py-2 px-3 text-[var(--text-secondary)]">
                          {req.type.split(' ')[0]}
                        </td>
                        <td className="py-2 px-3 text-[var(--text-secondary)]">
                          {assignedUser?.name || '--'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[var(--text-muted)]">No change requests</p>
          )}
        </div>
      </div>

      {/* Modals */}
      <RequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRequest}
      />

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
