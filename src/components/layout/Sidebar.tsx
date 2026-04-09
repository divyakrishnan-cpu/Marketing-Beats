'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  FolderDown,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  Gauge,
  UserCircle,
  RefreshCw,
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Design Ops',
    items: [
      {
        label: 'Dashboard',
        href: '/design-ops/dashboard',
        icon: <LayoutDashboard size={16} strokeWidth={1.75} />,
      },
      {
        label: 'Social Calendar',
        href: '/design-ops/social-calendar',
        icon: <Calendar size={16} strokeWidth={1.75} />,
      },
      {
        label: 'All Requests',
        href: '/design-ops/requests',
        icon: <ClipboardList size={16} strokeWidth={1.75} />,
      },
      {
        label: 'Downloads / Uploads',
        href: '/design-ops/downloads',
        icon: <FolderDown size={16} strokeWidth={1.75} />,
      },
    ],
  },
  {
    title: 'Performance',
    items: [
      {
        label: 'My Performance',
        href: '/performance/my',
        icon: <UserCircle size={16} strokeWidth={1.75} />,
      },
      {
        label: 'Team Performance',
        href: '/performance/team',
        icon: <Gauge size={16} strokeWidth={1.75} />,
      },
      {
        label: 'Change Requests',
        href: '/performance/change-requests',
        icon: <RefreshCw size={16} strokeWidth={1.75} />,
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'User Management',
        href: '/user-management',
        icon: <Users size={16} strokeWidth={1.75} />,
      },
    ],
  },
];

type RoleType = 'manager' | 'individual';

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<RoleType>('individual');

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  const toggleRole = () => {
    setRole(role === 'manager' ? 'individual' : 'manager');
  };

  return (
    <aside className="gb-sidebar w-64 flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Brand */}
      <div className="px-4 pt-5 pb-4">
        <Link href="/design-ops/dashboard" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center text-white font-semibold text-[13px] flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #346ddb 0%, #6b9aff 100%)' }}
          >
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Marketing Beats
            </div>
            <div className="text-[11px] leading-tight" style={{ color: 'var(--text-faint)' }}>
              Square Yards
            </div>
          </div>
          <ChevronDown size={14} strokeWidth={2} style={{ color: 'var(--text-faint)' }} />
        </Link>
      </div>

      {/* Workspace switcher / role pill */}
      <div className="px-4 mb-3">
        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-between px-3 py-2 rounded-md border text-left transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
              View as
            </div>
            <div className="text-[13px] font-medium" style={{ color: 'var(--text-primary)' }}>
              {role === 'manager' ? 'Manager' : 'Individual'}
            </div>
          </div>
          <div
            className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
            style={{
              backgroundColor: role === 'manager' ? 'var(--accent-light)' : 'var(--bg-tertiary)',
              color: role === 'manager' ? 'var(--accent-text)' : 'var(--text-muted)',
            }}
          >
            {role === 'manager' ? 'MGR' : 'IND'}
          </div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            <h3 className="gb-nav-section-title">{section.title}</h3>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`gb-nav-item ${isActive(item.href) ? 'gb-nav-item-active' : ''}`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive(item.href) ? 'var(--accent)' : 'var(--bg-tertiary)',
                        color: isActive(item.href) ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-[var(--bg-hover)] cursor-pointer transition-colors">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #346ddb 0%, #6b9aff 100%)',
              color: '#fff',
            }}
          >
            DK
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              Divya Krishnan
            </div>
            <div className="text-[11px] truncate" style={{ color: 'var(--text-faint)' }}>
              Head of Design
            </div>
          </div>
          <button className="gb-icon-btn" title="Settings" style={{ width: 26, height: 26 }}>
            <Settings size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  );
}
