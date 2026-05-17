import { Link, Head, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    ShoppingBasket,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    UserCircle
} from 'lucide-react';
import React, { useState } from 'react';

export default function SellerLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { url } = usePage(); // දැනට ඉන්න page එක අනුව link highligh කරන්න

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/seller/dashboard' },
        { name: 'Products', icon: ShoppingBasket, href: '/seller/products' },
        { name: 'Orders', icon: ClipboardList, href: '/seller/orders' },
        { name: 'Settings', icon: Settings, href: '/seller/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] flex transition-colors duration-300">
            <Head title={title ? `${title} | Seller` : 'Seller Dashboard'} />

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f172a] border-r border-gray-200 dark:border-white/5 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-8 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-200 dark:shadow-none transition-transform group-hover:scale-110">
                                <ShoppingBasket className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-gray-800 dark:text-white tracking-tight uppercase">HelaHarvest</span>
                        </Link>
                        <button className="lg:hidden text-gray-500" onClick={() => setIsSidebarOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 space-y-1.5 mt-4">
                        {menuItems.map((item) => {
                            const isActive = url.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 font-bold group ${
                                        isActive
                                        ? 'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-800 dark:hover:text-white'
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-50 dark:border-white/5">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all font-black uppercase text-xs tracking-widest"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout Session
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header / Top Nav */}
                <header className="h-20 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-30 transition-colors">
                    <button
                        className="p-2.5 lg:hidden text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-xl hover:scale-105 transition-transform"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        {/* Notifications */}
                        <button className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full relative transition-all active:scale-90">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]"></span>
                        </button>

                        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

                        {/* Profile Info */}
                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">Chiran</p>
                                <p className="text-[9px] text-green-600 dark:text-green-400 font-black uppercase tracking-[0.2em]">Verified Seller</p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center border-2 border-white dark:border-white/10 shadow-sm transition-transform group-hover:scale-110">
                                <UserCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <main className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
