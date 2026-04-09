'use client';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const [showNewRequest, setShowNewRequest] = useState(false);

  const handleNewRequest = () => {
    setShowNewRequest(true);
    // This could trigger a modal or navigate to a new request page
    // For now, just toggle the state
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Topbar */}
        <Topbar title={title} onNewRequest={handleNewRequest} />

        {/* Main Content */}
        <main className="flex-1 overflow-auto mt-16 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
