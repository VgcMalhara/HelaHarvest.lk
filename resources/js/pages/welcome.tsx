import React, { useMemo } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import {
    ShoppingBasket,
    ArrowRight,
    Leaf,
    Store,
    ShieldCheck,
    Truck,
    Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/Components/Public/Navbar';

export default function Welcome() {
    const { auth } = usePage().props as any;

    const dashboardUrl = useMemo(() => {
        if (!auth?.user) return '/login';

        switch (auth.user.role) {
            case 'admin': return '/admin/dashboard';
            case 'seller': return '/seller/dashboard';
            case 'buyer': return '/buyer/dashboard';
            default: return '/dashboard';
        }
    }, [auth?.user]);

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] selection:bg-green-100 dark:selection:bg-green-900/30 antialiased font-sans transition-colors duration-300">
            {/* --- SEO & META OPTIMIZATION --- */}
            <Head>
                <title>HelaHarvest - Fresh From Local Fields to Your Home</title>
                <meta name="description" content="Connecting Sri Lankan farmers directly with smart buyers. Buy 100% organic fruits, vegetables and fresh harvest without middle-men." />
                <meta name="keywords" content="helaharvest, sri lanka agriculture, organic food online, farm to home colombo, buy vegetables sri lanka" />
                <meta property="og:title" content="HelaHarvest - Fresh From Local Fields" />
                <meta property="og:description" content="Connecting Sri Lankan farmers directly to your kitchen. Purely local, organic, and fresh." />
            </Head>

            {/* --- SHARED NAVBAR --- */}
            <Navbar />

            {/* MAIN CONTENT INNER (SEO Semantic Tag) */}
            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-10 pb-16 overflow-hidden bg-gray-950">

                    {/* Background Paddy Field Image Container */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/paddy-field-hero.png" // 👈 කලින් පියවරේදී දාපු කුඹුරු යායේ පින්තූරය
                            alt="Beautiful Sri Lankan Paddy Field Background"
                            className="object-cover w-full h-full opacity-35 dark:opacity-20"
                            loading="eager"
                        />
                        {/* Smooth Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent dark:from-[#050505] dark:via-[#050505]/90 dark:to-transparent z-1" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050505] via-transparent to-transparent z-1" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                            {/* Left Side: Hero Text */}
                            <div className="space-y-6 sm:space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0 backdrop-blur-sm">
                                    <Leaf className="w-3.5 h-3.5 animate-bounce" />
                                    100% Organic & Purely Local
                                </div>

                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                                    Freshness <br className="hidden sm:inline" />
                                    <span className="text-green-600 dark:text-green-500">Reimagined.</span>
                                </h1>

                                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-medium max-w-md leading-relaxed mx-auto lg:mx-0">
                                    Connecting hard-working Sri Lankan farmers directly to your kitchen. Fresh harvest, transparent prices, and zero middle-men.
                                </p>

                                {/* Call to Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start max-w-xs sm:max-w-none mx-auto">
                                    <Link href="/shop" className="w-full sm:w-auto">
                                        <Button className="w-full h-14 px-8 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-base font-bold shadow-xl shadow-green-600/20 transition-all hover:scale-[1.02]">
                                            <ShoppingBasket className="mr-2 w-5 h-5" />
                                            Explore Shop
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <Link href={auth?.user ? dashboardUrl : "/seller/register"} className="w-full sm:w-auto">
                                        <Button variant="outline" className="w-full h-14 px-8 rounded-2xl text-base font-bold border-gray-300 dark:border-white/10 text-gray-800 dark:text-gray-200 bg-white/40 dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 backdrop-blur-sm transition-all">
                                            <Store className="mr-2 w-5 h-5 text-green-600 dark:text-green-400" />
                                            {auth?.user ? 'My Dashboard' : 'Join as a Seller'}
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Side: Farmer 4:5 Portrait Card */}
                            <div className="relative order-1 lg:order-2 px-4 sm:px-12 lg:px-0 z-20">
                                <div className="relative aspect-[4/5] max-w-[380px] sm:max-w-[420px] mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-gray-900/50 backdrop-blur-sm">
                                    <img
                                        src="/images/farmer-portrait.png" // 👈 උඩින් ජෙනරේට් කරපු Farmer පින්තූරය public/images/farmer-portrait.png නමින් සේව් කරලා මෙතනට ලින්ක් කරන්න මචං.
                                        alt="Sri Lankan Farmer holding fresh harvest"
                                        className="object-cover object-center w-full h-full transform hover:scale-105 transition-transform duration-700"
                                        loading="eager"
                                    />
                                    {/* Vignette Effect for the image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- VALUE PROPOSITION / FEATURES SECTION --- */}
                <section className="py-16 bg-gray-50/50 dark:bg-white/[0.01] border-y border-gray-100 dark:border-white/5 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="flex gap-4 items-start p-4">
                                <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">Verified Quality</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">100% fresh organic food curated directly from local standard farm lands.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-4">
                                <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">Fast Delivery</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">Direct farm-to-door delivery tracking systems ensuring top tier freshness.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-4 sm:col-span-2 lg:col-span-1 max-w-md sm:mx-auto lg:mx-0">
                                <div className="p-3 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base">Empowering Farmers</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium leading-relaxed">Every purchase directly supports rural families by skipping corporate middlemen.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- CTA SECTION --- */}
                <section className="py-20 sm:py-28 relative z-10">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 dark:from-green-700 dark:to-emerald-900 rounded-[2.5rem] p-8 sm:p-12 lg:p-20 shadow-2xl shadow-green-600/10 relative overflow-hidden">
                            <div className="relative z-10 space-y-6">
                                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                                    {auth?.user ? `Welcome back, ${auth.user.name.split(' ')[0]}!` : 'Ready to grow your farming business?'}
                                </h2>
                                <p className="text-xs sm:text-sm text-green-100/80 font-medium max-w-md mx-auto leading-relaxed">
                                    Join the HelaHarvest network today and experience authentic farm commerce right from your screen.
                                </p>
                                <div className="pt-4 flex justify-center">
                                    {auth?.user ? (
                                        <Link href={dashboardUrl} className="w-full sm:w-auto px-4">
                                            <Button className="w-full sm:w-auto h-14 px-10 bg-white text-green-700 hover:bg-green-50 rounded-2xl text-base font-bold shadow-xl transition-all hover:scale-[1.02]">
                                                Back to Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/seller/register" className="w-full sm:w-auto px-4">
                                            <Button className="w-full sm:w-auto h-14 px-10 bg-white text-green-700 hover:bg-green-50 rounded-2xl text-base font-bold shadow-xl transition-all hover:scale-[1.02]">
                                                Create Seller Account
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                        </div>
                    </div>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-gray-100 dark:border-white/5 text-center text-[11px] text-gray-400 dark:text-gray-500 font-bold tracking-widest uppercase px-4 relative z-10">
                &copy; {new Date().getFullYear()} HELAHARVEST SRI LANKA. ALL RIGHTS RESERVED.
            </footer>
        </div>
    );
}
