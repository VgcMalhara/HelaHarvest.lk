import {
    Squares2X2Icon,
    UsersIcon,
    ShoppingBagIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    BuildingStorefrontIcon,
    HomeIcon,                 // 👈 Home Icon එක
    ArrowTopRightOnSquareIcon // 👈 Live Site එකට යන්න ලස්සන External Link Icon එකක්
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';
import type { PageProps } from '@/types';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const navItems = [
        { name: 'Dashboard', icon: Squares2X2Icon, href: route('admin.dashboard') },
        { name: 'Vendors', icon: BuildingStorefrontIcon, href: route('admin.sellers.index') },
        { name: 'Buyers', icon: UsersIcon, href: route('admin.buyers.index') },
        { name: 'Products', icon: ShoppingBagIcon, href: route('admin.products.index') },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#07130d] transition-colors duration-300">
            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 xl:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-white/5 transform transition-transform duration-300 xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col p-6">
                    <div className="flex items-center gap-3 px-2 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
                            <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">HelaHarvest</span>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-500 font-bold hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 transition-all"
                            >
                                <item.icon className="w-6 h-6" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/5">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className="xl:ml-72 flex flex-col min-h-screen">

                {/* --- HEADER BAR --- */}
                <header className="h-20 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="xl:hidden p-2 text-gray-500">
                            {isSidebarOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
                        </button>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white">{title || 'Admin Panel'}</h2>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">

                        {/* --- TOP BAR NAVIGATION BUTTONS (GREEN THEME) --- */}
                        <div className="flex items-center gap-2 border-r border-gray-200 dark:border-white/10 pr-4 h-9">
                            {/* Home Button */}
                            <Link
                                href="/"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all"
                                title="Go to Website Home"
                            >
                                <HomeIcon className="w-4 h-4" />
                                <span className="hidden md:inline">Home</span>
                            </Link>

                            {/* Marketplace Button */}
                            <Link
                                href="/shop"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-green-600 text-white hover:bg-green-700 shadow-sm shadow-green-600/20 transition-all"
                                title="Go to Marketplace"
                            >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                <span className="hidden md:inline">Marketplace</span>
                            </Link>
                        </div>

                        {/* Profile Info */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-gray-900 dark:text-white">{user.name}</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-right">Administrator</p>
                            </div>
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold border-2 border-white dark:border-white/10">
                                {user.name.charAt(0)}
                            </div>
                        </div>

                    </div>
                </header>

                <main className="p-6 lg:p-10 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
