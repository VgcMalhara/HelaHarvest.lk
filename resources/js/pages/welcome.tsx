import React, { useMemo } from 'react';
import { Link, Head, usePage } from '@inertiajs/react'; // usePage එකතු කළා
import {
    ShoppingBasket,
    ArrowRight,
    ShieldCheck,
    Leaf,
    Truck,
    Store,
    UserPlus,
    ChevronDown,
    LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Welcome() {
    // Shared props වලින් auth එක ගන්නවා. මේක හැමවෙලේම අලුත් දත්ත අල්ලගන්නවා.
    const { auth } = usePage().props as any;

    const dashboardUrl = useMemo(() => {
        if (!auth?.user) return '/login';

        // Role එක අනුව URL එක තීරණය කරනවා
        switch (auth.user.role) {
            case 'admin': return '/admin/dashboard';
            case 'seller': return '/seller/dashboard';
            case 'buyer': return '/buyer/dashboard';
            default: return '/dashboard';
        }
    }, [auth?.user]);

    // Debugging සඳහා
    console.log("Current User:", auth?.user);

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] selection:bg-green-100">
            <Head title="HelaHarvest - Fresh From Local Fields" />

            {/* --- Navbar --- */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 p-1.5 rounded-lg">
                            <ShoppingBasket className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">HelaHarvest</span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-green-600 transition-colors">Marketplace</a>
                        <a href="#" className="hover:text-green-600 transition-colors">Farmers</a>
                        <a href="#" className="hover:text-green-600 transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* auth.user තියෙනවා නම් විතරක් Dashboard එක පෙන්වනවා */}
                        {auth?.user ? (
                            <Link href={dashboardUrl}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 font-bold shadow-lg shadow-green-600/20 gap-2 transition-all">
                                    <LayoutDashboard className="w-4 h-4" />
                                    Go to Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hidden sm:block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-green-600 px-4">
                                    Login
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 font-bold shadow-lg shadow-green-600/20 gap-2">
                                            Create Account
                                            <ChevronDown className="w-4 h-4 opacity-70" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 mt-2 rounded-2xl border-gray-100 dark:border-white/10 shadow-2xl">
                                        <DropdownMenuItem asChild className="rounded-xl focus:bg-green-50 p-3">
                                            <Link href="/register" className="flex items-center gap-3 w-full">
                                                <UserPlus className="w-5 h-5 text-green-600" />
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Become a Buyer</span>
                                                    <span className="text-xs text-gray-500">I want to shop fresh</span>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="rounded-xl focus:bg-green-50 p-3">
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
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-[0.2em] mx-auto lg:mx-0">
                            <Leaf className="w-4 h-4" />
                            100% Organic & Local
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter">
                            Freshness <br />
                            <span className="text-green-600">Reimagined.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-500 dark:text-gray-400 font-medium max-w-lg leading-relaxed mx-auto lg:mx-0">
                            Connecting Sri Lankan farmers directly to your kitchen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/register">
                                <Button className="h-16 px-10 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-bold shadow-2xl transition-all">
                                    <ShoppingBasket className="mr-2 w-5 h-5" />
                                    Shop Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href={auth?.user ? dashboardUrl : "/seller/register"}>
                                <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-gray-200">
                                    <Store className="mr-2 w-5 h-5 text-green-600" />
                                    {auth?.user ? 'My Dashboard' : 'Join as a Seller'}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" alt="Fresh Vegetables" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="bg-green-600 rounded-[3rem] p-10 lg:p-20 shadow-2xl">
                        <h2 className="text-3xl lg:text-5xl font-black text-white">
                            {auth?.user ? `Welcome back, ${auth.user.name.split(' ')[0]}!` : 'Ready to grow your business?'}
                        </h2>
                        <div className="mt-8 flex justify-center">
                            {auth?.user ? (
                                <Link href={dashboardUrl}>
                                    <Button className="h-16 px-12 bg-white text-green-600 hover:bg-green-50 rounded-2xl text-lg font-extrabold shadow-xl">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/seller/register">
                                    <Button className="h-16 px-12 bg-white text-green-600 hover:bg-green-50 rounded-2xl text-lg font-extrabold shadow-xl">
                                        Create Seller Account
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">&copy; 2026 HelaHarvest Sri Lanka.</p>
            </footer>
        </div>
    );
}
