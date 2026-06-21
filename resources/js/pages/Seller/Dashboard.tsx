import { DollarSign, Package, Users, ArrowUpRight } from 'lucide-react';
import React from 'react';

interface Props {
    stats: {
        totalSales: number;
        activeOrders: number;
        visitors: number;
    };
    sellerName: string;
}

export default function Dashboard({ stats, sellerName }: Props) {
    // Stats Array එක Dynamic සහ Dark mode colors එක්ක සකස් කළා
    const statCards = [
        {
            label: 'Total Sales',
            value: `Rs. ${stats.totalSales.toLocaleString()}`,
            icon: DollarSign,
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-50 dark:bg-green-500/10',
            trend: '+12%'
        },
        {
            label: 'Active Orders',
            value: stats.activeOrders.toString().padStart(2, '0'),
            icon: Package,
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
            trend: '+2'
        },
        {
            label: 'Shop Visitors',
            value: stats.visitors.toString(),
            icon: Users,
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
            trend: '+15%'
        },
    ];

    return (
        <div className="space-y-8 antialiased">
            {/* Header Section */}
            <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Hello, {sellerName}! 👋
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-1">
                    Here's an overview of your shop performance.
                </p>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-[#0f172a] p-6 rounded-[2.5rem] border border-gray-100/80 dark:border-white/[0.05] shadow-sm hover:shadow-md dark:hover:shadow-none transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            {/* Icon Wrapper */}
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            {/* Trend Badge */}
                            <span className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2.5 py-1 rounded-xl">
                                {stat.trend}
                            </span>
                        </div>

                        <div className="mt-6">
                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <h3 className="text-3xl font-black text-gray-800 dark:text-white tracking-tight mt-1">
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Placeholder Card */}
            <div className="bg-white dark:bg-[#0f172a] p-8 rounded-[2.5rem] border border-gray-100/80 dark:border-white/[0.05] shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight mb-6">
                    Recent Orders
                </h3>

                <div className="py-12 text-center border-2 border-dashed border-gray-100 dark:border-white/[0.03] rounded-[2rem] bg-gray-50/50 dark:bg-white/[0.01]">
                    <Package className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 dark:text-gray-500 font-medium italic">
                        Orders will appear here once customers start buying.
                    </p>
                </div>
            </div>
        </div>
    );
}
