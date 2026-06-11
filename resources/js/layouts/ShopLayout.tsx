import { Link } from '@inertiajs/react';
import Navbar from '@/Components/public/Navbar'; // 👈 අපේ අලුත් Shared Navbar එක මෙතනට Import කළා

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-50/50 dark:bg-[#090d16] min-h-screen flex flex-col text-gray-700 dark:text-gray-300 antialiased font-sans transition-colors duration-300">

            {/* --- 1. SHARED NAVBAR (පරණ දිග කෝඩ් එක වෙනුවට Shared Component එක දැම්මා) --- */}
            <Navbar />

            {/* --- 2. DYNAMIC CONTENT AREA --- */}
            <main className="flex-grow">
                {children}
            </main>

            {/* --- 3. PROFESSIONAL MINIMAL FOOTER --- */}
            <footer className="bg-white dark:bg-[#0f172a] border-t border-gray-100 dark:border-white/[0.04] py-12 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Left Side: Brand Credits */}
                        <div className="flex flex-col items-center md:items-start gap-1">
                            <span className="text-base font-black tracking-tight text-gray-900 dark:text-white">
                                Hela<span className="text-emerald-600 dark:text-emerald-500">Harvest</span>
                            </span>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                                Connecting local farmers directly with consumers.
                            </p>
                        </div>

                        {/* Right Side: Legal Links */}
                        <div className="flex gap-8 text-xs font-medium text-gray-400 dark:text-gray-500">
                            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Support</Link>
                        </div>

                    </div>

                    {/* Bottom Copyright */}
                    <div className="border-t border-gray-100 dark:border-white/[0.03] mt-8 pt-8 text-center text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">
                        &copy; {new Date().getFullYear()} HELAHARVEST.LK. ALL RIGHTS RESERVED.
                    </div>
                </div>
            </footer>

        </div>
    );
}
