import {
    ShoppingBagIcon,
    BellIcon,
    UserCircleIcon,
    HomeIcon,
    ClipboardDocumentListIcon,
    HeartIcon,
    MapPinIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

interface User {
    name: string;
    email: string;
}

interface Props {
    auth: { user: User };
    children: ReactNode;
}

export default function BuyerLayout({ auth, children }: Props) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070d0a] transition-colors duration-300 font-sans flex">

            {/* --- SIDEBAR (Desktop Only) --- */}
            <aside className="hidden lg:flex w-72 bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-white/5 flex-col sticky top-0 h-screen z-50">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                            <ShoppingBagIcon className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-black dark:text-white tracking-tight">HelaHarvest</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4 mb-4">Main Menu</div>
                    <SidebarLink href="/buyer/dashboard" icon={HomeIcon} label="Dashboard" active={url.startsWith('/buyer/dashboard')} />
                    <SidebarLink href="/orders" icon={ClipboardDocumentListIcon} label="My Orders" active={url.startsWith('/orders')} />
                    <SidebarLink href="/wishlist" icon={HeartIcon} label="Wishlist" active={url.startsWith('/wishlist')} />
                    <SidebarLink href="/address" icon={MapPinIcon} label="Addresses" active={url.startsWith('/address')} />

                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-4 mt-8 mb-4">Account</div>
                    <SidebarLink href="/profile" icon={Cog6ToothIcon} label="Settings" active={url.startsWith('/profile')} />
                </nav>

                <div className="p-4 border-t border-gray-50 dark:border-white/5">
                    <Link method="post" href={route('logout')} as="button" className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all font-bold">
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* TOP HEADER */}
                <header className="h-20 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">
                    <div className="lg:hidden flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                            <ShoppingBagIcon className="w-5 h-5" />
                        </div>
                        <span className="font-black dark:text-white tracking-tight">HelaHarvest</span>
                    </div>

                    {/* Search bar can stay here */}
                    <div className="hidden sm:flex flex-1 max-w-md ml-8">
                        <div className="w-full relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search..." className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-2 pl-12 text-sm focus:ring-2 focus:ring-emerald-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition relative">
                            <BellIcon className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111827]"></span>
                        </button>
                        <div className="flex items-center gap-3 border-l border-gray-100 dark:border-white/10 pl-4">
                            <p className="hidden md:block text-sm font-black dark:text-white leading-tight">{auth.user.name}</p>
                            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20">
                                {auth.user.name.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-8 lg:p-12 pb-24 lg:pb-12">
                    {children}
                </main>
            </div>

            {/* --- MOBILE BOTTOM NAVIGATION --- */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl border-t border-gray-100 dark:border-white/5 px-6 py-3 flex justify-between items-center z-50">
                <MobileIconLink href="/buyer/dashboard" icon={HomeIcon} active={url === '/buyer/dashboard'} />
                <MobileIconLink href="/orders" icon={ClipboardDocumentListIcon} active={url === '/orders'} />
                <div className="relative -mt-10">
                   <div className="w-14 h-14 bg-emerald-600 rounded-full shadow-xl shadow-emerald-500/40 flex items-center justify-center text-white border-4 border-[#F8FAFC] dark:border-[#070d0a]">
                        <ShoppingBagIcon className="w-7 h-7" />
                   </div>
                </div>
                <MobileIconLink href="/wishlist" icon={HeartIcon} active={url === '/wishlist'} />
                <MobileIconLink href="/profile" icon={UserCircleIcon} active={url === '/profile'} />
            </nav>
        </div>
    );
}

// Helper Components
function SidebarLink({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 ${
                active
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 translate-x-2'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-emerald-600'
            }`}
        >
            <Icon className="w-6 h-6" />
            <span className="text-sm tracking-tight">{label}</span>
        </Link>
    );
}

function MobileIconLink({ href, icon: Icon, active }: { href: string; icon: any; active: boolean }) {
    return (
        <Link href={href} className={`p-2 transition-colors ${active ? 'text-emerald-600' : 'text-gray-400'}`}>
            <Icon className="w-7 h-7" />
        </Link>
    );
}
