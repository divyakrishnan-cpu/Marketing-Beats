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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border)] p-4 flex justify-between items-center">
          <h2 className="font-semibold text-[var(--text-primary)]">{dateStr}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {events.length === 0 ? (
          <div className="p-4 text-center text-[var(--text-muted)]">
            <p>No content scheduled for this date</p>
            <button className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded text-sm bg-[var(--accent)] text-white hover:opacity-90 transition-opacity">
              <Plus size={16} /> Add Content
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`w-full text-left p-3 rounded border transition-colors cursor-pointer ${
                  event.type === 'request'
                    ? `${typeColors[event.requestType || 'Graphics'].bg} ${typeColors[event.requestType || 'Graphics'].border}`
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-medium text-sm text-[var(--text-primary)]">{event.title}</div>
                {event.platform && (
                  <div className="mt-1 text-xs">
                    <span className={`inline-block px-2 py-1 rounded ${platformColors[event.platform]}`}>
                      {event.platform} - {event.contentType}
                    </span>
                  </div>
                )}
                {event.type === 'request' && event.data.assigned_to && (
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
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

  return (
    <div
      className={`min-h-[120px] border border-[var(--border)] p-2 cursor-pointer transition-colors ${
        isToday
          ? 'bg-[var(--accent-light)] border-[var(--accent)]'
          : isCurrentMonth
            ? 'bg-[var(--bg-card)]'
            : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
      } hover:bg-opacity-75`}
      onClick={() => onDateClick(date)}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`text-sm font-semibold ${
            isToday ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
          }`}
        >
          {dayNum}
        </span>
        <button
          className="p-1 rounded hover:bg-[var(--bg-tertiary)] transition-colors opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add content for', date);
          }}
          title="Add content"
        >
          <Plus size={16} className="text-[var(--text-secondary)]" />
        </button>
      </div>

      <div className="space-y-1">
        {displayEvents.map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className={`text-xs p-1.5 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
              event.type === 'request'
                ? `${typeColors[event.requestType || 'Graphics'].bg} ${typeColors[event.requestType || 'Graphics'].text} ${typeColors[event.requestType || 'Graphics'].border}`
                : `${platformColors[event.platform || 'LinkedIn']} font-medium`
            }`}
          >
            {event.title}
          </div>
        ))}
        {hiddenCount > 0 && (
          <div className="text-xs text-[var(--text-secondary)] font-medium px-1.5 py-1">
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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
            Social Calendar
          </h1>

          {/* Filter Bar */}
          <div className="space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} className="text-[var(--text-secondary)]" />
                </button>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)] min-w-[200px]">
                  {monthYear}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-[var(--bg-tertiary)] rounded-md transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={20} className="text-[var(--text-secondary)]" />
                </button>
              </div>
              <button
                onClick={handleToday}
                className="px-4 py-2 rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition-opacity font-medium text-sm"
              >
                Today
              </button>
            </div>

            {/* Platform Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Platform
              </label>
              <div className="flex gap-2 flex-wrap">
                {platformOptions.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setPlatformFilter(platform)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      platformFilter === platform
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Content Type
              </label>
              <div className="flex gap-2 flex-wrap">
                {typeOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      typeFilter === type
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search content by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-px mb-px">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="bg-[var(--bg-card)] border border-[var(--border)] p-3 text-center font-semibold text-[var(--text-secondary)] text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-[var(--border)] p-px group">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {selectedEvent.title}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">Date</p>
                <p className="text-sm text-[var(--text-primary)]">
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
                    <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                      Type
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {selectedEvent.requestType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                      Status
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {selectedEvent.data.current_stage}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                      Assigned To
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {selectedEvent.data.assigned_to || 'Unassigned'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                      Platform
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {selectedEvent.platform}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                      Content Type
                    </p>
                    <p className="text-sm text-[var(--text-primary)]">
                      {selectedEvent.contentType}
                    </p>
                  </div>
                  {selectedEvent.data.caption && (
                    <div>
                      <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">
                        Caption
                      </p>
                      <p className="text-sm text-[var(--text-primary)]">
                        {selectedEvent.data.caption}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-6 w-full px-4 py-2 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--border)] transition-colors font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
