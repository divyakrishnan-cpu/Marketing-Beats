'use client';

import React, { useState, useMemo } from 'react';
import { List, Columns3, CalendarDays, X } from 'lucide-react';
import { Request, RequestType } from '@/types';
import {
  SAMPLE_REQUESTS,
  SAMPLE_USERS,
  getUserById,
  formatDate,
  getInitials,
  isOverdue,
  getDaysUntilDue,
  isFinalStage,
  getTotalTAT,
  getStagesForType
} from '@/lib/sample-data';

type ViewType = 'list' | 'kanban' | 'calendar';
type SortField = 'need_by' | 'created_at' | null;

export default function AllRequestsPage() {
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilters, setTypeFilters] = useState<RequestType[]>([]);
  const [stageFilters, setStageFilters] = useState<string[]>([]);
  const [sortField, setSortField] = useState<SortField>('need_by');
  const [sortAscending, setSortAscending] = useState(true);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date('2026-04-01'));
  const [draggedRequest, setDraggedRequest] = useState<Request | null>(null);

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    let filtered = SAMPLE_REQUESTS.filter(req => {
      const matchesSearch =
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.requestor_name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilters.length === 0 || typeFilters.includes(req.type);
      const matchesStage = stageFilters.length === 0 || stageFilters.includes(req.current_stage);

      return matchesSearch && matchesType && matchesStage;
    });

    // Sort
    if (sortField) {
      filtered.sort((a, b) => {
        let aVal: any = a[sortField as keyof Request];
        let bVal: any = b[sortField as keyof Request];

        if (!aVal || !bVal) return 0;

        if (sortField === 'need_by' || sortField === 'created_at') {
          aVal = new Date(aVal as string).getTime();
          bVal = new Date(bVal as string).getTime();
        }

        if (aVal < bVal) return sortAscending ? -1 : 1;
        if (aVal > bVal) return sortAscending ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, typeFilters, stageFilters, sortField, sortAscending]);

  // Get all unique stages across filtered requests
  const allStages = useMemo(() => {
    const stages = new Set<string>();
    SAMPLE_REQUESTS.forEach(req => {
      stages.add(req.current_stage);
    });
    return Array.from(stages).sort();
  }, []);

  // Kanban columns - only stages with requests
  const kanbanStages = useMemo(() => {
    const stagesWithRequests = new Set<string>();
    filteredRequests.forEach(req => {
      stagesWithRequests.add(req.current_stage);
    });
    return Array.from(stagesWithRequests).sort();
  }, [filteredRequests]);

  // Type color map for badges
  const typeColors: Record<RequestType, { badge: string; dot: string }> = {
    Video: { badge: 'gb-badge-blue', dot: 'var(--info)' },
    'Social Media Graphics': { badge: 'gb-badge-green', dot: 'var(--success)' },
    Graphics: { badge: 'gb-badge-yellow', dot: 'var(--warning)' }
  };

  // Stage badge classes map
  const stageBadgeClasses: Record<string, string> = {
    'Done': 'gb-badge-green',
    'Uploaded': 'gb-badge-green',
    'Change Req': 'gb-badge-red',
    'Assigned': 'gb-badge-blue',
    'Ready to Upload': 'gb-badge-yellow',
    'Design Done': 'gb-badge-yellow',
    'Editing Done': 'gb-badge-yellow',
    'Shoot Done': 'gb-badge-yellow',
    'Design In Progress': 'gb-badge-blue',
    'Editing In Progress': 'gb-badge-blue',
    'Content': 'gb-badge-blue',
    'Planning': 'gb-badge-blue',
    'Shooting Scheduled': 'gb-badge-blue'
  };

  const toggleTypeFilter = (type: RequestType) => {
    setTypeFilters(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleStageFilter = (stage: string) => {
    setStageFilters(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(true);
    }
  };

  const handleDragStart = (e: React.DragEvent, request: Request) => {
    setDraggedRequest(request);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    if (draggedRequest) {
      // In a real app, update the request stage in the database
      console.log(`Moving ${draggedRequest.id} to stage: ${newStage}`);
      setDraggedRequest(null);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const requestsByDate = useMemo(() => {
    const map: Record<string, Request[]> = {};
    filteredRequests.forEach(req => {
      if (!map[req.need_by]) map[req.need_by] = [];
      map[req.need_by].push(req);
    });
    return map;
  }, [filteredRequests]);

  const renderListView = () => (
    <div className="gb-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="gb-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Requested By</th>
              <th>Requestor</th>
              <th>Stage</th>
              <th>Design POC</th>
              <th
                onClick={() => handleSort('need_by')}
                style={{ cursor: 'pointer' }}
              >
                Need By {sortField === 'need_by' && (sortAscending ? '↑' : '↓')}
              </th>
              <th>TAT</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => {
              const assignee = getUserById(req.assigned_to);
              const isRowOverdue = isOverdue(req.need_by);
              return (
                <tr
                  key={req.id}
                  onClick={() => setSelectedRow(selectedRow === req.id ? null : req.id)}
                  style={{
                    backgroundColor: isRowOverdue ? 'var(--error-bg)' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                    {req.title}
                  </td>
                  <td>
                    <span className={`gb-badge ${typeColors[req.type].badge}`}>
                      {req.type === 'Social Media Graphics' ? 'SMG' : req.type}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {req.requested_by}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {req.requestor_name}
                  </td>
                  <td>
                    <span className={`gb-badge ${stageBadgeClasses[req.current_stage] || 'gb-badge-gray'}`}>
                      {req.current_stage}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {assignee ? assignee.name : 'Unassigned'}
                  </td>
                  <td style={{ fontWeight: 500, color: isRowOverdue ? 'var(--error)' : 'var(--text-secondary)' }}>
                    {formatDate(req.need_by)}
                    {isRowOverdue && <span style={{ marginLeft: '8px', fontWeight: 'bold', color: 'var(--error)' }}>OVERDUE</span>}
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {getTotalTAT(req)}h
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: '12px 14px', backgroundColor: 'var(--bg-tertiary)', borderTop: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-secondary)' }}>
        {filteredRequests.length} of {SAMPLE_REQUESTS.length} requests
      </div>
    </div>
  );

  const renderKanbanView = () => (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4 min-w-max">
        {kanbanStages.map(stage => {
          const stageRequests = filteredRequests.filter(r => r.current_stage === stage);
          return (
            <div
              key={stage}
              className="flex-shrink-0 w-80 gb-card"
              style={{ display: 'flex', flexDirection: 'column' }}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, stage)}
            >
              <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {stage}
                  <span className="gb-badge gb-badge-blue" style={{ marginLeft: '8px' }}>{stageRequests.length}</span>
                </h3>
              </div>
              <div style={{ maxHeight: '384px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
                {stageRequests.map(req => {
                  const assignee = getUserById(req.assigned_to);
                  const daysUntilDue = getDaysUntilDue(req.need_by);
                  const isOverdueReq = daysUntilDue < 0;
                  const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;

                  return (
                    <div
                      key={req.id}
                      draggable
                      onDragStart={e => handleDragStart(e, req)}
                      className="gb-card gb-card-hover"
                      style={{ padding: '12px', cursor: 'move' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                        <span className={`gb-badge ${typeColors[req.type].badge}`}>
                          {req.type === 'Social Media Graphics' ? 'SMG' : req.type}
                        </span>
                      </div>
                      <h4 style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {req.title}
                      </h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        {req.requestor_name}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {assignee && (
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: 'white', backgroundColor: typeColors[req.type].dot }}>
                              {getInitials(assignee.name)}
                            </div>
                          )}
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {assignee ? assignee.name.split(' ')[0] : 'Unassigned'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: isOverdueReq ? 'var(--error)' : isDueSoon ? 'var(--warning)' : 'var(--text-muted)' }}>
                          {isOverdueReq ? 'OVERDUE' : isDueSoon ? 'Due soon' : formatDate(req.need_by)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const today = new Date('2026-04-08');
    const isCurrentMonth = currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();

    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    return (
      <div className="gb-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={prevMonth}
              className="gb-icon-btn"
            >
              ←
            </button>
            <button
              onClick={nextMonth}
              className="gb-icon-btn"
            >
              →
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', padding: '8px 0' }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {days.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  style={{ minHeight: '80px', backgroundColor: 'var(--bg-secondary)', opacity: 0.5, borderRadius: 'var(--radius-md)' }}
                />
              );
            }

            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const requestsOnDay = requestsByDate[dateStr] || [];
            const isToday = isCurrentMonth && day === today.getDate();

            return (
              <div
                key={day}
                style={{
                  minHeight: '80px',
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${isToday ? 'var(--accent)' : 'var(--border)'}`,
                  padding: '8px',
                  overflow: 'hidden',
                  backgroundColor: isToday ? 'var(--accent-light)' : 'var(--bg-card)'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 600, color: isToday ? 'var(--accent-text)' : 'var(--text-muted)', marginBottom: '4px' }}>
                  {day}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {requestsOnDay.slice(0, 3).map(req => (
                    <div
                      key={req.id}
                      style={{
                        fontSize: '11px',
                        padding: '4px 6px',
                        borderRadius: '4px',
                        color: 'white',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        backgroundColor: typeColors[req.type].dot
                      }}
                      title={req.title}
                    >
                      {req.type === 'Social Media Graphics' ? 'SMG' : req.type === 'Video' ? 'Video' : 'Gfx'}
                    </div>
                  ))}
                  {requestsOnDay.length > 3 && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      +{requestsOnDay.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Page Header */}
      <div className="gb-page-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ flex: 1 }}>
            <h1 className="gb-page-title">All Requests</h1>
            <p className="gb-page-description">Browse, filter, and manage every design request across Graphics and Video workflows.</p>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {filteredRequests.length} of {SAMPLE_REQUESTS.length} requests
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="gb-tabs" style={{ marginBottom: '24px' }}>
        {[
          { id: 'list' as const, icon: List, label: 'List' },
          { id: 'kanban' as const, icon: Columns3, label: 'Kanban' },
          { id: 'calendar' as const, icon: CalendarDays, label: 'Calendar' }
        ].map(view => {
          const Icon = view.icon;
          return (
            <div
              key={view.id}
              onClick={() => setCurrentView(view.id)}
              className={`gb-tab ${currentView === view.id ? 'gb-tab-active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Icon size={16} />
              {view.label}
            </div>
          );
        })}
      </div>

      {/* Filters Section */}
      <div style={{ marginBottom: '24px' }}>
        {/* Search Bar */}
        <div className="gb-search" style={{ marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by title, ID, or requestor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Type Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Type:</span>
          {['All', 'Video', 'Social Media Graphics', 'Graphics'].map(type => {
            const isActive = type === 'All' ? typeFilters.length === 0 : typeFilters.includes(type as RequestType);
            return (
              <button
                key={type}
                onClick={() => {
                  if (type === 'All') {
                    setTypeFilters([]);
                  } else {
                    toggleTypeFilter(type as RequestType);
                  }
                }}
                className={`gb-btn ${isActive ? 'gb-btn-primary' : 'gb-btn-secondary'}`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Stage Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Stage:</span>
          {['All', 'Assigned', 'In Progress', 'Review', 'Completed', 'Change Req'].map(stage => {
            const isActive = stage === 'All' ? stageFilters.length === 0 : stageFilters.includes(stage);
            return (
              <button
                key={stage}
                onClick={() => {
                  if (stage === 'All') {
                    setStageFilters([]);
                  } else {
                    toggleStageFilter(stage);
                  }
                }}
                className={`gb-btn ${isActive ? 'gb-btn-primary' : 'gb-btn-secondary'}`}
              >
                {stage}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Content */}
      <div>
        {currentView === 'list' && renderListView()}
        {currentView === 'kanban' && renderKanbanView()}
        {currentView === 'calendar' && renderCalendarView()}
      </div>
    </div>
  );
}
