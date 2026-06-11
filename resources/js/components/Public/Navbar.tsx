import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingBasket, LayoutDashboard, UserPlus, Store, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage().props as any;

    const dashboardUrl = () => {
        if (!auth?.user) return '/login';
        switch (auth.user.role) {
            case 'admin': return '/admin/dashboard';
            case 'seller': return '/seller/dashboard';
            case 'buyer': return '/buyer/dashboard';
            default: return '/dashboard';
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-black tracking-tight text-gray-900 dark:text-white group flex items-center gap-2">
                            <div className="bg-green-600 p-1.5 rounded-lg shadow-md shadow-green-600/10">
                                <ShoppingBasket className="w-5 h-5 text-white" />
                            </div>
                            <span>Hela<span className="text-green-600">Harvest</span></span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 font-medium text-sm">
                        <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                            Home
                        </Link>
                        <Link href="/shop" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                            Marketplace
                        </Link>
                        <Link href="#" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors">
                            Farmers
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/cart" className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-green-600 rounded-xl transition-all relative group">
                            <ShoppingBagIcon className="w-5 h-5 group-hover:scale-105 transition-transform" />
                            <span className="absolute top-1 right-1 bg-green-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white dark:border-[#050505]">
                                3
                            </span>
                        </Link>

                        {auth?.user ? (
                            <Link href={dashboardUrl()}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 text-xs font-bold gap-2 shadow-md shadow-green-600/10 transition-all hover:scale-[1.02]">
                                    <LayoutDashboard className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hidden sm:block text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-green-600 px-2">
                                    Login
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 text-xs font-bold gap-1 shadow-md">
                                            Join <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 mt-2 rounded-2xl">
                                        <DropdownMenuItem asChild className="rounded-xl focus:bg-green-50 focus:text-green-900 p-3 cursor-pointer">
                                            <Link href="/register" className="flex items-center gap-3 w-full">
                                                <UserPlus className="w-5 h-5 text-green-600" />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Become a Buyer</span>
                                                    <span className="text-xs text-gray-500">I want to shop fresh</span>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-xl focus:bg-green-50 focus:text-green-900 p-3 cursor-pointer">
                                            <Link href="/seller/register" className="flex items-center gap-3 w-full">
                                                <Store className="w-5 h-5 text-green-600" />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Become a Seller</span>
                                                    <span className="text-xs text-gray-500">I want to sell produce</span>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}

                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-500 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.03]">
                            {isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-white/[0.05] px-4 pt-2 pb-6 space-y-1 shadow-xl">
                    <Link href="/" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">Home</Link>
                    <Link href="/shop" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">Marketplace</Link>
                    <Link href="#" className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400">Farmers</Link>
                </div>
            )}
        </nav>
    );
}
