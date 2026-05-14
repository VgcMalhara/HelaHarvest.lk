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
    // Stats Array එක Dynamic කරමු
    const statCards = [
        { label: 'Total Sales', value: `Rs. ${stats.totalSales.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100', trend: '+12%' },
        { label: 'Active Orders', value: stats.activeOrders.toString().padStart(2, '0'), icon: Package, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+2' },
        { label: 'Shop Visitors', value: stats.visitors.toString(), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+15%' },
    ];

    return (
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">Hello, {sellerName}! 👋</h2>
                    <p className="text-gray-500 font-medium">Here's an overview of your shop performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statCards.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-start justify-between">
                                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    {stat.trend}
                                </span>
                            </div>
                            <div className="mt-5">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                <h3 className="text-3xl font-black text-gray-800 mt-1">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Orders Placeholder */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h3>
                    <div className="py-10 text-center border-2 border-dashed border-gray-50 rounded-[2rem]">
                        <p className="text-gray-400 italic">Orders will appear here once customers start buying.</p>
                    </div>
                </div>
            </div>
    );
}
