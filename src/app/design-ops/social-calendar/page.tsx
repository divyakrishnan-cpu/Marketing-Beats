'use client';

import React, { useState, useMemo } from 'react';
import { SocialCalendarEntry, SocialPlatform, SocialContentType } from '@/types';
import { SAMPLE_REQUESTS } from '@/lib/sample-data';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

// Generate sample social calendar entries
function generateSocialCalendarEntries(): SocialCalendarEntry[] {
  const today = new Date();
  const entries: SocialCalendarEntry[] = [];

  const platforms: SocialPlatform[] = [
    'Instagram',
    'LinkedIn',
    'Facebook',
    'X/Twitter',
    'YouTube',
  ];

  const contentTypes: SocialContentType[] = [
    'Static',
    'Carousel',
    'Reel',
    'Story',
    'Video',
  ];

  const sampleTitles = [
    'Instagram Reel: Property Tour',
    'LinkedIn Post: Market Update',
    'Facebook Carousel: New Listings',
    'X/Twitter Thread: Industry Insights',
    'YouTube Video: How to Find Your Dream Home',
    'Instagram Story: Behind the Scenes',
    'LinkedIn Article: Real Estate Trends',
    'Facebook Post: Client Testimonial',
    'X/Twitter Post: Quick Tip',
    'YouTube Shorts: Property Highlight',
    'Instagram Post: Team Spotlight',
    'LinkedIn Poll: Market Conditions',
    'Facebook Video: Virtual Tour',
    'X/Twitter Update: Market News',
    'Instagram Reels: Decoration Tips',
  ];

  // Generate entries spread across the current month
  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + Math.floor(Math.random() * 30) - 15);

    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
    const title = sampleTitles[i % sampleTitles.length];

    entries.push({
      id: `social-${i}`,
      title,
      platform,
      content_type: contentType,
      scheduled_date: date.toISOString().split('T')[0],
      caption: `Sample caption for ${title}`,
      hashtags: ['#realestate', '#property', '#marketing'],
      created_at: new Date().toISOString(),
    });
  }

  return entries;
}

const SAMPLE_SOCIAL_ENTRIES = generateSocialCalendarEntries();

// Color mappings for request types
const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  Video: { bg: 'bg-blue-50', border: 'border-l-4 border-blue-500', text: 'text-blue-700' },
  'Social Media Graphics': {
    bg: 'bg-green-50',
    border: 'border-l-4 border-green-500',
    text: 'text-green-700',
  },
  Graphics: { bg: 'bg-pink-50', border: 'border-l-4 border-pink-500', text: 'text-pink-700' },
};

// Color mappings for social platforms
const platformColors: Record<SocialPlatform, string> = {
  Instagram: 'bg-pink-100 text-pink-800',
  LinkedIn: 'bg-blue-100 text-blue-800',
  Facebook: 'bg-indigo-100 text-indigo-800',
  'X/Twitter': 'bg-gray-100 text-gray-800',
  YouTube: 'bg-red-100 text-red-800',
};

interface CalendarEvent {
  id: string;
  title: string;
  type: 'request' | 'social';
  date: string;
  requestType?: string;
  platform?: SocialPlatform;
  contentType?: SocialContentType;
  data: any;
}

interface DayDetailPanelProps {
  date: string;
  events: CalendarEvent[];
  onClose: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

function DayDetailPanel({ date, events, onClose, onEventClick }: DayDetailPanelProps) {
  const dateObj = new Date(date);
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', maxWidth: '448px', width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ position: 'sticky', top: 0, backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <h2 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{dateStr}</h2>
          <button
            onClick={onClose}
            style={{
              padding: '4px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'background-color 120ms ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <X size={20} />
          </button>
        </div>

        {events.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p>No content scheduled for this date</p>
            <button style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 500, backgroundColor: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', transition: 'opacity 120ms ease' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
              <Plus size={16} /> Add Content
            </button>
          </div>
        ) : (
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'pointer',
                  transition: 'background-color 120ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-primary)')}
              >
                <div style={{ fontWeight: 500, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>{event.title}</div>
                {event.platform && (
                  <div style={{ marginTop: '4px', fontSize: '12px' }}>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 550, backgroundColor: 'var(--info-bg)', color: 'var(--info)' }}>
                      {event.platform} - {event.contentType}
                    </span>
                  </div>
                )}
                {event.type === 'request' && event.data.assigned_to && (
                  <div style={{ marginTop: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Assigned to: {event.data.assigned_to}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CalendarCellProps {
  dayNum: number | null;
  date: string;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onDateClick: (date: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

function CalendarCell({
  dayNum,
  date,
  events,
  isToday,
  isCurrentMonth,
  onDateClick,
  onEventClick,
}: CalendarCellProps) {
  const displayEvents = events.slice(0, 2);
  const hiddenCount = events.length - displayEvents.length;

  const cellStyle: React.CSSProperties = {
    borderRight: '1px solid var(--border-light)',
    borderBottom: '1px solid var(--border-light)',
    minHeight: '110px',
    padding: '8px',
    backgroundColor: isToday ? 'var(--accent-light)' : isCurrentMonth ? 'var(--bg-card)' : 'var(--bg-tertiary)',
    transition: 'background-color 120ms ease',
    cursor: 'pointer',
    color: isCurrentMonth ? 'var(--text-primary)' : 'var(--text-faint)',
  };

  return (
    <div
      style={cellStyle}
      onClick={() => onDateClick(date)}
      onMouseEnter={(e) => {
        if (isCurrentMonth && !isToday) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
        }
      }}
      onMouseLeave={(e) => {
        if (isCurrentMonth && !isToday) {
          (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: isToday ? 'var(--accent-text)' : 'var(--text-primary)',
          }}
        >
          {dayNum}
        </span>
        <button
          style={{
            padding: '4px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'background-color 120ms ease',
            opacity: 0,
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add content for', date);
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
            (e.currentTarget as HTMLElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.opacity = '0';
          }}
          title="Add content"
        >
          <Plus size={16} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {displayEvents.map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: 500,
              marginBottom: '2px',
              cursor: 'pointer',
              transition: 'opacity 120ms ease',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-block',
              maxWidth: '100%',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
          >
            {event.title}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500, padding: '2px 6px' }}>
            +{hiddenCount} more
          </div>
        )}
      </div>
    </div>
  );
}

export default function SocialCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get month data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Build all events for the month
  const allEvents: CalendarEvent[] = useMemo(() => {
    const events: CalendarEvent[] = [];

    // Add requests as events
    SAMPLE_REQUESTS.forEach((req) => {
      if (req.need_by) {
        events.push({
          id: `req-${req.id}`,
          title: req.title,
          type: 'request',
          date: req.need_by,
          requestType: req.type,
          data: req,
        });
      }
    });

    // Add social calendar entries
    SAMPLE_SOCIAL_ENTRIES.forEach((entry) => {
      events.push({
        id: `social-${entry.id}`,
        title: entry.title,
        type: 'social',
        date: entry.scheduled_date,
        platform: entry.platform,
        contentType: entry.content_type,
        data: entry,
      });
    });

    return events;
  }, []);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      // Month filter
      const eventDate = new Date(event.date);
      if (eventDate.getFullYear() !== year || eventDate.getMonth() !== month) {
        return false;
      }

      // Platform filter
      if (platformFilter !== 'All' && event.platform !== platformFilter) {
        return false;
      }

      // Type filter
      if (
        typeFilter !== 'All' &&
        ((typeFilter === 'Video' && event.requestType !== 'Video') ||
          (typeFilter === 'SMG' && event.requestType !== 'Social Media Graphics') ||
          (typeFilter === 'Graphics' && event.requestType !== 'Graphics'))
      ) {
        return false;
      }

      // Search filter
      if (
        searchQuery &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [allEvents, platformFilter, typeFilter, searchQuery, year, month]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    filteredEvents.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = [];
      }
      map[event.date].push(event);
    });
    return map;
  }, [filteredEvents]);

  const platformOptions: (SocialPlatform | 'All')[] = [
    'All',
    'Instagram',
    'LinkedIn',
    'Facebook',
    'X/Twitter',
    'YouTube',
  ];

  const typeOptions = ['All', 'Video', 'SMG', 'Graphics'];

  // Generate calendar grid
  const calendarDays: Array<{ dayNum: number | null; date: string; isCurrentMonth: boolean }> =
    [];

  // Add previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    calendarDays.push({
      dayNum: null,
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    calendarDays.push({
      dayNum: i,
      date: date.toISOString().split('T')[0],
      isCurrentMonth: true,
    });
  }

  // Add next month's days to fill grid
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i);
    calendarDays.push({
      dayNum: null,
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false,
    });
  }

  const monthYear = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
    setSelectedEvent(event);
  };

  const dayDetailEvents = selectedDate
    ? eventsByDate[selectedDate] || []
    : [];

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      {/* Page Header with Title and Description */}
      <div className="gb-page-header flex items-start justify-between gap-6 px-6 py-8 max-w-7xl mx-auto">
        <div>
          <h1 className="gb-page-title">Social Calendar</h1>
          <p className="gb-page-description">Plan and schedule social posts across all platforms. Click any day to add or edit content.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ padding: '0 24px 24px', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Month Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={handlePrevMonth}
                className="gb-icon-btn"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)', minWidth: '200px', textAlign: 'center' }}>
                {monthYear}
              </h2>
              <button
                onClick={handleNextMonth}
                className="gb-icon-btn"
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <button
              onClick={handleToday}
              className="gb-btn gb-btn-primary"
            >
              Today
            </button>
          </div>

          {/* Platform Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Platform
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {platformOptions.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setPlatformFilter(platform)}
                  className="gb-btn gb-btn-secondary"
                  style={
                    platformFilter === platform
                      ? { backgroundColor: 'var(--accent-light)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }
                      : undefined
                  }
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Content Type
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {typeOptions.map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className="gb-btn gb-btn-secondary"
                  style={
                    typeFilter === type
                      ? { backgroundColor: 'var(--accent-light)', color: 'var(--accent-text)', borderColor: 'var(--accent)' }
                      : undefined
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search content by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gb-input"
            />
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ padding: '24px', maxWidth: '80rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className="gb-card" style={{ overflow: 'hidden' }}>
          {/* Weekday Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-tertiary)' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                style={{
                  padding: '10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {calendarDays.map((day, idx) => {
              const isToday =
                day.isCurrentMonth &&
                new Date(day.date).toDateString() === today.toDateString();
              const dayEvents = eventsByDate[day.date] || [];

              return (
                <CalendarCell
                  key={idx}
                  dayNum={day.dayNum}
                  date={day.date}
                  events={dayEvents}
                  isToday={isToday}
                  isCurrentMonth={day.isCurrentMonth}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Day Detail Panel */}
      {selectedDate && (
        <DayDetailPanel
          date={selectedDate}
          events={dayDetailEvents}
          onClose={() => setSelectedDate(null)}
          onEventClick={handleEventClick}
        />
      )}

      {/* Event Detail Alert (simple for now) */}
      {selectedEvent && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}>
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)', maxWidth: '448px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                style={{
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'background-color 120ms ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>Date</p>
                <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {selectedEvent.type === 'request' ? (
                <>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                      Type
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      {selectedEvent.requestType}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                      Status
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      {selectedEvent.data.current_stage}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                      Assigned To
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      {selectedEvent.data.assigned_to || 'Unassigned'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                      Platform
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      {selectedEvent.platform}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                      Content Type
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      {selectedEvent.contentType}
                    </p>
                  </div>
                  {selectedEvent.data.caption && (
                    <div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '4px' }}>
                        Caption
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        {selectedEvent.data.caption}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="gb-btn gb-btn-secondary"
              style={{ marginTop: '24px', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
