'use client';

import { X, CheckCircle, Circle, ChevronRight } from 'lucide-react';
import { Request, User, getTATCategoriesForType } from '@/types';
import { getStagesForType, getStageTAT, isOverdue } from '@/lib/sample-data';

interface DetailPanelProps {
  request: Request & { stage_timestamps?: Record<string, string> };
  users: User[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: Request) => void;
}

export default function DetailPanel({ request, users, isOpen, onClose, onUpdate }: DetailPanelProps) {
  if (!isOpen) {
    return null;
  }

  const stages = getStagesForType(request.type);
  const currentStageIndex = stages.indexOf(request.current_stage as any);
  const nextStage = currentStageIndex < stages.length - 1 ? stages[currentStageIndex + 1] : null;
  const isFinal = request.current_stage === 'Done' || request.current_stage === 'Uploaded';

  const handleAdvanceStage = () => {
    if (nextStage) {
      const today = new Date().toISOString().split('T')[0];
      const timestamps = request.stage_timestamps || {};
      const updated: Request = {
        ...request,
        current_stage: nextStage as any,
        updated_at: today,
        stage_timestamps: {
          ...timestamps,
          [nextStage]: today,
        },
      };
      onUpdate(updated);
    }
  };

  const handleMarkComplete = () => {
    const finalStage = stages[stages.length - 1];
    const today = new Date().toISOString().split('T')[0];
    const timestamps = request.stage_timestamps || {};
    const updated: Request = {
      ...request,
      current_stage: finalStage as any,
      updated_at: today,
      stage_timestamps: {
        ...timestamps,
        [finalStage]: today,
      },
    };
    onUpdate(updated);
  };

  const handlePOCChange = (pocType: string, userId: string) => {
    const updated: Request = {
      ...request,
      [pocType]: userId || undefined,
      updated_at: new Date().toISOString().split('T')[0],
    };
    onUpdate(updated);
  };

  const assignedUser = users.find((u) => u.id === request.assigned_to);
  const tatCategories = getTATCategoriesForType(request.type);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-[540px] bg-[var(--bg-card)] border-l border-[var(--border)] shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3 flex-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold badge badge-blue">
              {request.type}
            </span>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] truncate">
              {request.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors flex-shrink-0"
            title="Close"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Workflow Stepper */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Workflow</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {stages.map((stage, idx) => {
                const isActive = stage === request.current_stage;
                const isDone = idx < currentStageIndex;

                return (
                  <div key={stage} className="flex items-center gap-1 flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                          isDone
                            ? 'bg-[var(--success)] text-white'
                            : isActive
                            ? 'bg-[var(--accent)] text-white'
                            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle size={16} />
                        ) : isActive ? (
                          <Circle size={16} />
                        ) : (
                          <Circle size={16} />
                        )}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] whitespace-nowrap mt-1 max-w-[60px]">
                        {stage.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                    {idx < stages.length - 1 && (
                      <ChevronRight size={14} className="text-[var(--border)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Advance Stage Button */}
          {nextStage && !isFinal && (
            <button
              onClick={handleAdvanceStage}
              className="w-full px-4 py-2 rounded-md bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-colors"
            >
              Advance to {nextStage}
            </button>
          )}

          {/* Stage-wise TAT Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">TAT Breakdown</h3>
            <div className="grid grid-cols-2 gap-2">
              {tatCategories.map((cat) => {
                const tat = request.stage_timestamps
                  ? getStageTAT(request, stages[0], cat.stage)
                  : 0;
                return (
                  <div
                    key={cat.stage}
                    className="p-2 rounded-md bg-[var(--bg-tertiary)] text-xs"
                  >
                    <div className="font-medium text-[var(--text-primary)]">
                      {tat}d
                    </div>
                    <div className="text-[var(--text-muted)] truncate">
                      {cat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Request Details */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Status:</span>
                <span className={`font-medium px-2 py-0.5 rounded text-xs ${
                  isFinal ? 'badge badge-green' : 'badge badge-blue'
                }`}>
                  {request.current_stage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Requested By:</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {request.requested_by}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Requestor:</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {request.requestor_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Created:</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {new Date(request.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Need By:</span>
                <span
                  className={`font-medium ${
                    isOverdue(request)
                      ? 'text-[var(--error)]'
                      : 'text-[var(--text-primary)]'
                  }`}
                >
                  {new Date(request.need_by).toLocaleDateString()}
                  {isOverdue(request) && ' (Overdue)'}
                </span>
              </div>
              {request.description && (
                <div>
                  <span className="text-[var(--text-secondary)]">Description:</span>
                  <p className="text-[var(--text-primary)] mt-1 whitespace-pre-wrap">
                    {request.description}
                  </p>
                </div>
              )}
              {request.reference_link && (
                <div>
                  <span className="text-[var(--text-secondary)]">Reference:</span>
                  <a
                    href={request.reference_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] hover:underline text-xs"
                  >
                    {request.reference_link}
                  </a>
                </div>
              )}
              {request.shoot_date && (
                <div className="flex justify-between">
                  <span className="text-[var(--text-secondary)]">Shoot Date:</span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {new Date(request.shoot_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Revisions:</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {request.revisions}
                </span>
              </div>
            </div>
          </div>

          {/* POC Assignment */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
              POC Assignment
            </h3>
            <div className="space-y-3">
              {/* Design POC / Main Assigned */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">
                  Assigned To
                </label>
                <select
                  value={request.assigned_to || ''}
                  onChange={(e) =>
                    handlePOCChange('assigned_to', e.target.value)
                  }
                  className="w-full input-base text-sm"
                >
                  <option value="">-- Select --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Social POC */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">
                  Social POC
                </label>
                <select
                  value={request.social_poc || ''}
                  onChange={(e) =>
                    handlePOCChange('social_poc', e.target.value)
                  }
                  className="w-full input-base text-sm"
                >
                  <option value="">-- Select --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Video POC */}
              {request.type === 'Video' && (
                <div>
                  <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">
                    Video POC
                  </label>
                  <select
                    value={request.video_poc || ''}
                    onChange={(e) =>
                      handlePOCChange('video_poc', e.target.value)
                    }
                    className="w-full input-base text-sm"
                  >
                    <option value="">-- Select --</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Upload POC */}
              <div>
                <label className="text-xs font-medium text-[var(--text-secondary)] block mb-1">
                  Upload POC
                </label>
                <select
                  value={request.upload_poc || ''}
                  onChange={(e) =>
                    handlePOCChange('upload_poc', e.target.value)
                  }
                  className="w-full input-base text-sm"
                >
                  <option value="">-- Select --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--border)] p-4 bg-[var(--bg-secondary)] space-y-2">
          {!isFinal && (
            <button
              onClick={handleMarkComplete}
              className="w-full px-4 py-2 rounded-md bg-[var(--success)] text-white text-sm font-medium hover:opacity-90 transition-colors"
            >
              Mark Complete
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-md border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
