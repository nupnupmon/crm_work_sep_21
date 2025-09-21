import StatCard from '@/components/StatCards';
import Sidebar from '@/components/Sidebar'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
        <Sidebar />
      <div className="ml-20">
        <main className="p-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Number of Leads" 
                    value="20" 
                    subtext="View entire list" 
                    icon="💰" 
                    bgColor="bg-gradient-to-br from-cyan-400 to-cyan-500" 
                />
                <StatCard 
                    title="Number of Clients" 
                    value="750" 
                    subtext="View entire list" 
                    icon="📱" 
                    bgColor="bg-gradient-to-br from-yellow-400 to-yellow-500" 
                />
                <StatCard 
                    title="Number of Potential Clients" 
                    value="150" 
                    subtext="View entire list" 
                    icon="👸" 
                    bgColor="bg-gradient-to-br from-pink-400 to-purple-500" 
                />
            </div>
        </main>
      </div>
    </div>
  )
} 