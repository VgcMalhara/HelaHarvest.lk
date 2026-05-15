import { Link, Head } from '@inertiajs/react';
import { LayoutDashboard, ShoppingBasket, ClipboardList, Settings, LogOut, Menu, X, Bell, UserCircle } from 'lucide-react';
import React, { useState } from 'react';

export default function SellerLayout({ children, title }: { children: React.ReactNode, title?: string }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/seller/dashboard' },
        { name: 'Products', icon: ShoppingBasket, href: '/seller/products' },
        { name: 'Orders', icon: ClipboardList, href: '/seller/orders' },
        { name: 'Settings', icon: Settings, href: '/seller/settings' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            <Head title={title ? `${title} | Seller` : 'Seller Dashboard'} />

            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="p-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-200">
                                <ShoppingBasket className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-black text-gray-800 tracking-tight">HelaHarvest</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3.5 text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-2xl transition-all duration-200 font-semibold group">
                                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-50">
                        <Link href="/logout" method="post" as="button" className="flex items-center gap-3 w-full px-4 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold">
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header / Top Nav */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-30">
                    <button className="p-2 lg:hidden text-gray-600 bg-gray-100 rounded-xl" onClick={() => setIsSidebarOpen(true)}>
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="ml-auto flex items-center gap-4">
                        <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800 uppercase">Chiran</p>
                                <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Seller</p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                <UserCircle className="w-7 h-7 text-green-600" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Page Content */}
                <main className="p-6 sm:p-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
