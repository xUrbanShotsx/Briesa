import { UserSidebar } from '@/components/layout/UserSidebar'
import { TopBar } from '@/components/layout/TopBar'
import { AIAssistant } from '@/components/ai/AIAssistant'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#000' }}>
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar variant="user" />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <AIAssistant />
    </div>
  )
}
