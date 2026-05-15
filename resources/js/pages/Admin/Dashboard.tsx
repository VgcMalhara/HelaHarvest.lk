import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Stats {
    total_users: number;
    total_vendors: number;
    active_listings: number;
    recent_orders: number;
}

interface DashboardProps extends PageProps {
    stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        { label: 'Total Users', value: stats.total_users, icon: '👥', color: 'bg-blue-500' },
        { label: 'Sellers', value: stats.total_vendors, icon: '👨‍🌾', color: 'bg-green-500' },
        { label: 'Listings', value: stats.active_listings, icon: '📦', color: 'bg-orange-500' },
        { label: 'Orders', value: stats.recent_orders, icon: '💰', color: 'bg-purple-500' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card) => (
                    <div key={card.label} className="bg-white dark:bg-[#111827] p-8 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm">
                        <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-inherit opacity-80 text-white`}>
                            {card.icon}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest">{card.label}</p>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{card.value}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-[#111827] rounded-[40px] border border-gray-100 dark:border-white/5 shadow-sm p-8">
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="p-6 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 text-gray-400 hover:border-green-500 hover:text-green-600 transition-all font-bold text-left">
                        + Review Pending Vendors
                    </button>
                    <button className="p-6 rounded-3xl border-2 border-dashed border-gray-100 dark:border-white/5 text-gray-400 hover:border-green-500 hover:text-green-600 transition-all font-bold text-left">
                        + System Statistics Report
                    </button>
                </div>
            </div>
        </>
    );
}
