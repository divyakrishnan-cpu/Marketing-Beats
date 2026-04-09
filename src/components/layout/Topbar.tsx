'use client';
import { Search, Sun, Moon, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface TopbarProps {
  title: string;
  onNewRequest?: () => void;
}

export default function Topbar({ title, onNewRequest }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border)] flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-40">
      {/* Left: Title */}
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h1>

      {/* Right: Search, Theme Toggle, New Request */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:flex">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="input-base pl-10 pr-4 w-64 text-sm"
          />
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors text-[var(--text-secondary)]"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
        )}

        {/* New Request Button */}
        <button
          onClick={onNewRequest}
          className="topbar-button button-primary gap-2"
        >
          <Plus size={18} />
          <span>New Request</span>
        </button>
      </div>
    </div>
  );
}
