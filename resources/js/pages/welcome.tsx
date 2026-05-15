import { Link, Head } from '@inertiajs/react';
import { ShoppingBasket, ArrowRight, ShieldCheck, Leaf, Truck, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
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

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-green-600 transition-colors">Marketplace</a>
                        <a href="#" className="hover:text-green-600 transition-colors">Farmers</a>
                        <a href="#" className="hover:text-green-600 transition-colors">About</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-green-600">Login</Link>
                        <Link href="/seller/register">
                            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 font-bold shadow-lg shadow-green-600/20">
                                Start Selling
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 text-green-700 dark:text-green-500 text-xs font-black uppercase tracking-[0.2em]">
                            <Leaf className="w-4 h-4" />
                            100% Organic & Local
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black text-gray-900 dark:text-white leading-[0.9] tracking-tighter">
                            Freshness <br />
                            <span className="text-green-600">Reimagined.</span>
                        </h1>

                        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-lg leading-relaxed">
                            Connecting Sri Lankan farmers directly to your kitchen. Get the finest local produce delivered with love and care.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="h-16 px-10 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-lg font-bold shadow-2xl shadow-green-600/30 group transition-all">
                                Shop Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-gray-200 dark:border-white/10 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
                                Join as a Seller
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Decorative Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-100 dark:bg-green-900/10 rounded-full blur-[100px] -z-10" />

                        {/* Hero Image Placeholder - Replace with a real high-res veggie image */}
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                             <img
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                                alt="Fresh Vegetables"
                                className="object-cover w-full h-full"
                             />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Features Section --- */}
            <section className="py-24 bg-gray-50 dark:bg-[#080808]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Leaf, title: 'Always Fresh', desc: 'Harvested daily and delivered straight from the farm to maintain maximum nutrients.' },
                            { icon: ShieldCheck, title: 'Verified Farmers', desc: 'Every seller is personally verified to ensure quality and authentic Sri Lankan taste.' },
                            { icon: Truck, title: 'Fast Delivery', desc: 'Specialized cooling logistics to ensure your greens stay green during transit.' }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 bg-white dark:bg-[#111] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all">
                                <div className="w-14 h-14 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-green-600 rounded-[3rem] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-2xl shadow-green-600/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

                        <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                            Ready to grow your <br /> business with us?
                        </h2>
                        <p className="text-green-100 text-lg font-medium max-w-xl mx-auto">
                            Join thousands of Sri Lankan farmers and sellers. Start your digital shop in less than 5 minutes.
                        </p>
                        <Link href="/seller/register" className="inline-block">
                            <Button className="h-16 px-12 bg-white text-green-600 hover:bg-green-50 rounded-2xl text-lg font-extrabold shadow-xl transition-transform active:scale-95">
                                Create Seller Account
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer className="py-12 border-t border-gray-100 dark:border-white/5 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
                    &copy; 2026 HelaHarvest Platform Sri Lanka. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}
