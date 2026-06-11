import React, { useMemo } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import {
    ShoppingBasket,
    ArrowRight,
    Leaf,
    Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/Components/Public/Navbar'; // 👈 අපේ අලුත් Shared Navbar එක මෙතනට Import කළා

export default function Welcome() {
    // Shared props වලින් auth එක ගන්නවා.
    const { auth } = usePage().props as any;

    const dashboardUrl = useMemo(() => {
        if (!auth?.user) return '/login';

        // Role එක අනුව Dashboard URL එක තීරණය කරනවා
        switch (auth.user.role) {
            case 'admin': return '/admin/dashboard';
            case 'seller': return '/seller/dashboard';
            case 'buyer': return '/buyer/dashboard';
            default: return '/dashboard';
        }
    }, [auth?.user]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] selection:bg-green-100 antialiased font-sans">
            <Head title="HelaHarvest - Fresh From Local Fields" />

            {/* --- 1. SHARED NAVBAR (පරණ කෝඩ් එක වෙනුවට සිම්පල් එකක් දැම්මා) --- */}
            <Navbar />

            {/* --- 2. HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                    {/* Hero Text */}
                    <div className="relative z-10 space-y-8 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                            <Leaf className="w-3.5 h-3.5" />
                            100% Organic & Local
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight">
                            Freshness <br />
                            <span className="text-green-600 dark:text-green-500">Reimagined.</span>
                        </h1>
                        <p className="text-base lg:text-lg text-gray-500 dark:text-gray-400 font-medium max-w-md leading-relaxed mx-auto lg:mx-0">
                            Connecting Sri Lankan farmers directly to your kitchen without middle-men.
                        </p>

                        {/* Call to Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/shop">
                                <Button className="h-14 px-8 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-base font-bold shadow-xl shadow-green-600/10 transition-all hover:scale-[1.02]">
                                    <ShoppingBasket className="mr-2 w-5 h-5" />
                                    Explore Shop
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href={auth?.user ? dashboardUrl : "/seller/register"}>
                                <Button variant="outline" className="h-14 px-8 rounded-2xl text-base font-bold border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                                    <Store className="mr-2 w-5 h-5 text-green-600" />
                                    {auth?.user ? 'My Dashboard' : 'Join as a Seller'}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image Panel */}
                    <div className="relative hidden lg:block">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 border border-gray-100 dark:border-white/5">
                             <img
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                                alt="Fresh Vegetables"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. CTA SECTION --- */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="bg-green-600 dark:bg-green-700 rounded-[2.5rem] p-10 lg:p-20 shadow-2xl shadow-green-600/10 relative overflow-hidden">
                        <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
                            {auth?.user ? `Welcome back, ${auth.user.name.split(' ')[0]}!` : 'Ready to grow your business?'}
                        </h2>
                        <div className="mt-8 flex justify-center">
                            {auth?.user ? (
                                <Link href={dashboardUrl}>
                                    <Button className="h-14 px-10 bg-white text-green-600 hover:bg-green-50 rounded-2xl text-base font-bold shadow-xl transition-all hover:scale-[1.02]">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/seller/register">
                                    <Button className="h-14 px-10 bg-white text-green-600 hover:bg-green-50 rounded-2xl text-base font-bold shadow-xl transition-all hover:scale-[1.02]">
                                        Create Seller Account
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. FOOTER --- */}
            <footer className="py-12 border-t border-gray-100 dark:border-white/5 text-center text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                &copy; {new Date().getFullYear()} HELAHARVEST SRI LANKA. ALL RIGHTS RESERVED.
            </footer>
        </div>
    );
}
