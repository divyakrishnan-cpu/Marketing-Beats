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

  // Type color map
  const typeColors: Record<RequestType, { badge: string; dot: string }> = {
    Video: { badge: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
    'Social Media Graphics': { badge: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    Graphics: { badge: 'bg-pink-100 text-pink-800', dot: 'bg-pink-500' }
  };

  // Stage color map
  const stageColors: Record<string, string> = {
    'Done': 'bg-green-100 text-green-800 border-t-4 border-green-500',
    'Uploaded': 'bg-green-100 text-green-800 border-t-4 border-green-500',
    'Change Req': 'bg-red-100 text-red-800 border-t-4 border-red-500',
    'Assigned': 'bg-blue-100 text-blue-800 border-t-4 border-blue-500',
    'Ready to Upload': 'bg-yellow-100 text-yellow-800 border-t-4 border-yellow-500',
    'Design Done': 'bg-yellow-100 text-yellow-800 border-t-4 border-yellow-500',
    'Editing Done': 'bg-yellow-100 text-yellow-800 border-t-4 border-yellow-500',
    'Shoot Done': 'bg-yellow-100 text-yellow-800 border-t-4 border-yellow-500',
    'Design In Progress': 'bg-blue-50 text-blue-900 border-t-4 border-blue-400',
    'Editing In Progress': 'bg-blue-50 text-blue-900 border-t-4 border-blue-400',
    'Content': 'bg-blue-50 text-blue-900 border-t-4 border-blue-400',
    'Planning': 'bg-blue-50 text-blue-900 border-t-4 border-blue-400',
    'Shooting Scheduled': 'bg-blue-50 text-blue-900 border-t-4 border-blue-400'
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
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Requested By
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Requestor
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Design POC
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider cursor-pointer hover:bg-[var(--bg-tertiary)]"
                onClick={() => handleSort('need_by')}
              >
                Need By {sortField === 'need_by' && (sortAscending ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                TAT
              </th>
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
                  className={`border-b border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer ${
                    isRowOverdue ? 'bg-red-50 dark:bg-red-950' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-[var(--text-primary)]">
                    {req.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`badge ${typeColors[req.type].badge} text-xs`}>
                      {req.type === 'Social Media Graphics' ? 'SMG' : req.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {req.requested_by}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {req.requestor_name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`badge ${stageColors[req.current_stage] || 'bg-gray-100 text-gray-800'}`}>
                      {req.current_stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {assignee ? assignee.name : 'Unassigned'}
                  </td>
                  <td className={`px-6 py-4 text-sm font-medium ${isRowOverdue ? 'text-red-600' : 'text-[var(--text-secondary)]'}`}>
                    {formatDate(req.need_by)}
                    {isRowOverdue && <span className="ml-2 text-red-600 font-bold">OVERDUE</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                    {getTotalTAT(req)}h
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-3 bg-[var(--bg-secondary)] border-t border-[var(--border)] text-sm text-[var(--text-secondary)]">
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
              className="flex-shrink-0 w-80 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, stage)}
            >
              <div className="p-4 border-b border-[var(--border)]">
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {stage}
                  <span className="ml-2 badge badge-blue text-xs">{stageRequests.length}</span>
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto space-y-3 p-4">
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
                      className="p-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-md cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className={`badge ${typeColors[req.type].badge} text-xs`}>
                          {req.type === 'Social Media Graphics' ? 'SMG' : req.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-[var(--text-primary)] mb-1 line-clamp-2">
                        {req.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mb-3">
                        {req.requestor_name}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          {assignee && (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${typeColors[req.type].dot.replace('bg-', 'bg-')}`}>
                              {getInitials(assignee.name)}
                            </div>
                          )}
                          <span className="text-xs text-[var(--text-secondary)]">
                            {assignee ? assignee.name.split(' ')[0] : 'Unassigned'}
                          </span>
                        </div>
                        <span className={`text-xs font-medium ${isOverdueReq ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-[var(--text-muted)]'}`}>
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
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-md transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-[var(--bg-secondary)] rounded-md transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold text-xs text-[var(--text-muted)] py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="min-h-20 bg-[var(--bg-secondary)] opacity-50 rounded-md"
                />
              );
            }

            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const requestsOnDay = requestsByDate[dateStr] || [];
            const isToday = isCurrentMonth && day === today.getDate();

            return (
              <div
                key={day}
                className={`min-h-20 rounded-md border p-2 overflow-hidden ${
                  isToday
                    ? 'bg-[var(--accent-light)] border-[var(--accent)]'
                    : 'bg-[var(--bg-card)] border-[var(--border)]'
                }`}
              >
                <div className="text-xs font-semibold text-[var(--text-primary)] mb-1">
                  {day}
                </div>
                <div className="space-y-1">
                  {requestsOnDay.slice(0, 3).map(req => (
                    <div
                      key={req.id}
                      className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${typeColors[req.type].dot.replace('bg-', 'bg-')}`}
                      title={req.title}
                    >
                      {req.type === 'Social Media Graphics' ? 'SMG' : req.type === 'Video' ? 'Video' : 'Gfx'}
                    </div>
                  ))}
                  {requestsOnDay.length > 3 && (
                    <div className="text-xs text-[var(--text-muted)]">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">All Design Requests</h1>
        <div className="text-sm text-[var(--text-muted)]">
          {filteredRequests.length} of {SAMPLE_REQUESTS.length} requests
        </div>
      </div>

      {/* View Switcher and Filters */}
      <div className="space-y-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-4">
        {/* View Switcher */}
        <div className="flex gap-2">
          {[
            { id: 'list' as const, icon: List, label: 'List View' },
            { id: 'kanban' as const, icon: Columns3, label: 'Kanban View' },
            { id: 'calendar' as const, icon: CalendarDays, label: 'Calendar View' }
          ].map(view => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  currentView === view.id
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <Icon size={18} />
                {view.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search by title, ID, or requestor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-base w-full"
          />
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-[var(--text-secondary)]">Type:</span>
          {['All', 'Video', 'Social Media Graphics', 'Graphics'].map(type => (
            <button
              key={type}
              onClick={() => {
                if (type === 'All') {
                  setTypeFilters([]);
                } else {
                  toggleTypeFilter(type as RequestType);
                }
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                type === 'All'
                  ? typeFilters.length === 0
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                  : typeFilters.includes(type as RequestType)
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Stage Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-[var(--text-secondary)]">Stage:</span>
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
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                }`}
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
