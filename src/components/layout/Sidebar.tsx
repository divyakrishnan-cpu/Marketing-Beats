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
        icon: <LayoutDashboard size={20} />,
      },
      {
        label: 'Social Calendar',
        href: '/design-ops/social-calendar',
        icon: <Calendar size={20} />,
      },
      {
        label: 'All Requests',
        href: '/design-ops/requests',
        icon: <ClipboardList size={20} />,
        badge: 5,
      },
      {
        label: 'Downloads / Uploads',
        href: '/design-ops/downloads',
        icon: <FolderDown size={20} />,
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'User Management',
        href: '/user-management',
        icon: <Users size={20} />,
      },
    ],
  },
];

type RoleType = 'manager' | 'individual';

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<RoleType>('individual');

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const toggleRole = () => {
    setRole(role === 'manager' ? 'individual' : 'manager');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen border-r border-slate-800 fixed left-0 top-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">
            M
          </div>
          <div>
            <div className="font-bold text-white">Marketing</div>
            <div className="text-sm text-blue-400 font-semibold">Beats</div>
            <div className="text-xs text-slate-400">Square Yards</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        {navSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-nav-item ${
                    isActive(item.href)
                      ? 'sidebar-nav-item-active'
                      : 'sidebar-nav-item-inactive'
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="badge badge-blue text-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-slate-800 p-4">
        <div className="mb-4">
          <div className="text-sm font-semibold text-white mb-1">
            Divya Krishnan
          </div>
          <div className="text-xs text-slate-400 mb-3">Head of Design</div>
          <button
            onClick={toggleRole}
            className={`w-full py-1.5 px-3 rounded-md text-xs font-semibold transition-colors ${
              role === 'manager'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
            }`}
          >
            {role === 'manager' ? 'MGR' : 'IND'} Mode
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-slate-300 hover:bg-slate-800 transition-colors"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 p-2 rounded-md text-slate-300 hover:bg-slate-800 transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
