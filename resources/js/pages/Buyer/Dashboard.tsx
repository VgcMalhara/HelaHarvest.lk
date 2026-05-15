import {
    ShoppingBagIcon,
    HeartIcon,
    MapPinIcon,
    ClockIcon,
    ArrowRightIcon,
    SparklesIcon,
    CheckBadgeIcon,
    TruckIcon
} from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

export default function Dashboard({ auth }: PageProps) {
    return (
        <>
            <Head title="Buyer Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* --- WELCOME HERO SECTION --- */}
                <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-br from-emerald-600 to-green-700 p-8 md:p-12 text-white shadow-2xl shadow-emerald-500/20">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <SparklesIcon className="w-4 h-4" />
                            Premium Buyer
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                            Welcome back, {auth.user.name.split(' ')[0]}! <br/>
                            Ready for some <span className="text-emerald-200">Fresh Harvest?</span>
                        </h1>
                        <p className="mt-4 text-emerald-50 max-w-lg font-medium opacity-90">
                            Discover the finest organic produce sourced directly from local farms around Ja-Ela today.
                        </p>
                    </div>
                    {/* Decorative Background Patterns */}
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-20%] left-[10%] w-64 h-64 bg-black/10 rounded-full blur-2xl"></div>
                </div>

                {/* --- QUICK STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={ClockIcon}
                        label="Active Orders"
                        value="03"
                        color="text-blue-600"
                        bg="bg-blue-50 dark:bg-blue-900/20"
                    />
                    <StatCard
                        icon={HeartIcon}
                        label="Wishlist Items"
                        value="12"
                        color="text-rose-600"
                        bg="bg-rose-50 dark:bg-rose-900/20"
                    />
                    <StatCard
                        icon={CheckBadgeIcon}
                        label="Total Savings"
                        value="LKR 1,250"
                        color="text-emerald-600"
                        bg="bg-emerald-50 dark:bg-emerald-900/20"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* --- RECENT SHIPMENTS (LEFT) --- */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white dark:bg-[#111827] rounded-[30px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black dark:text-white tracking-tight">Active Shipments</h3>
                                <button className="text-emerald-600 font-bold text-sm hover:underline">View All Orders</button>
                            </div>

                            {/* Tracking Card */}
                            <div className="group relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-emerald-500/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-white dark:bg-[#1f2937] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <TruckIcon className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black dark:text-white">Organic Veggie Pack</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-wider">Order #HH-7821 • Arriving Today</p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">In Transit</p>
                                        <p className="text-sm font-bold dark:text-white">Near Ja-Ela Hub</p>
                                    </div>
                                    <button className="bg-emerald-600 text-white p-3 rounded-xl shadow-lg shadow-emerald-500/20">
                                        <ArrowRightIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- CATEGORY EXPLORER --- */}
                        <div className="bg-white dark:bg-[#111827] rounded-[30px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                            <h3 className="text-xl font-black dark:text-white tracking-tight mb-6">Explore Categories</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {['Vegetables', 'Fruits', 'Grains', 'Spices'].map((cat) => (
                                    <div key={cat} className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-center hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all cursor-pointer group">
                                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                            <ShoppingBagIcon className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <span className="text-sm font-bold dark:text-gray-300">{cat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR CONTENT (RIGHT) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Saved Addresses Card */}
                        <div className="bg-white dark:bg-[#111827] rounded-[30px] p-8 border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <MapPinIcon className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-black dark:text-white tracking-tight">Delivery Address</h3>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                No. 123, Negombo Road,<br/>
                                Ja-Ela, Western Province,<br/>
                                Sri Lanka.
                            </p>
                            <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                                Edit Address
                            </button>
                        </div>

                        {/* Promotion Card */}
                        <div className="bg-black rounded-[30px] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-lg font-black italic">HelaHarvest <span className="text-emerald-400">Pro</span></h4>
                                <p className="text-gray-400 text-xs mt-2 font-medium">Free delivery on every order and exclusive direct-from-farm deals.</p>
                                <button className="mt-6 w-full bg-emerald-600 py-3 rounded-xl text-sm font-black hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                                    Upgrade LKR 990/mo
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

// Reusable Stat Card Component
interface StatCardProps {
    icon: any;
    label: string;
    value: string;
    color: string;
    bg: string;
}

function StatCard({ icon: Icon, label, value, color, bg }: StatCardProps) {
    return (
        <div className="bg-white dark:bg-[#111827] p-6 rounded-[30px] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{label}</p>
            <p className="text-2xl font-black dark:text-white leading-none">{value}</p>
        </div>
    );
}
