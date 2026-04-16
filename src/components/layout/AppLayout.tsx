'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { RoleProvider } from './RoleContext';
import { CurrentUserProvider } from './CurrentUserContext';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const [, setShowNewRequest] = useState(false);

  const handleNewRequest = () => {
    setShowNewRequest(true);
  };

  return (
    <CurrentUserProvider>
      <RoleProvider>
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <Sidebar />

          <div className="flex-1 flex flex-col ml-64">
            <Topbar title={title} onNewRequest={handleNewRequest} />

            <main className="flex-1 mt-14">
              <div className="max-w-[1200px] mx-auto px-10 py-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </RoleProvider>
    </CurrentUserProvider>
  );
}
