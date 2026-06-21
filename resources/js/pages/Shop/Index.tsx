import {
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    UserIcon,
    AdjustmentsHorizontalIcon,
    FunnelIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { route } from 'ziggy-js';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    unit: string;
    image?: string;
    user?: {
        name: string;
    };
}

interface IndexProps {
    products: Product[];
}

export default function Index({ products = [] }: IndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'in-stock'>('all');

    // Debounce for high-performance search
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Find the highest price to set dynamic ranges if needed
    const highestProductPrice = useMemo(() => {
        if (!products.length) return 1000;
        return Math.max(...products.map(p => p.price));
    }, [products]);

    // Extract Unique Categories dynamically
    const categories = useMemo(() => {
        if (!products.length) return ['All'];
        const unique = Array.from(new Set(products.map((p) => p.category?.trim()).filter(Boolean)));
        return ['All', ...unique];
    }, [products]);

    // Advanced Filtering Logic
    const filteredProducts = useMemo(() => {
        const searchLower = debouncedSearch.toLowerCase().trim();
        return products.filter((product) => {
            const matchesSearch = !searchLower || product.name.toLowerCase().includes(searchLower);
            const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesPrice = maxPrice === '' || product.price <= maxPrice;
            const matchesStatus = statusFilter === 'all' || product.stock > 0;

            return matchesSearch && matchesCat && matchesPrice && matchesStatus;
        });
    }, [products, debouncedSearch, selectedCategory, maxPrice, statusFilter]);

    // Split out a "Featured Product" (e.g., the first item) to give a high-end platform feel
    const [featuredProduct, regularProducts] = useMemo(() => {
        if (filteredProducts.length === 0) return [null, []];
        return [filteredProducts[0], filteredProducts.slice(1)];
    }, [filteredProducts]);

    return (
        <>
            <Head title="Marketplace - HelaHarvest" />

            <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300 pb-24 text-slate-900 dark:text-slate-100 font-sans">

                {/* --- 1. PREMIUM HERO SECTION WITH STATS --- */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#00A63E] via-[#008732] to-[#004d1c] text-white rounded-b-[50px] px-4 py-20 lg:py-28 text-center shadow-2xl shadow-[#00A63E]/10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
                    <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

                    <div className="max-w-4xl mx-auto space-y-6 relative z-10">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 text-green-300 font-bold text-xs tracking-widest uppercase border border-white/10 backdrop-blur-md">
                            ⚡ Direct Farm-To-Table Digital Hub
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none">
                            Fresh Harvest <br className="sm:hidden" /> <span className="text-green-300">Marketplace</span>
                        </h1>
                        <p className="text-green-100/80 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                            ලංකාවේ වටෙන්ම ඉන්න ගොවි මහතුන්ගේ නැවුම් එළවළු, පළතුරු සහ ධාන්‍ය වර්ග අතරමැදියන්ගෙන් තොරව එකම තැනකින් මිලදී ගන්න.
                        </p>

                        {/* Micro Platform Stats */}
                        <div className="pt-6 grid grid-cols-3 gap-4 max-w-md mx-auto border-t border-white/10 mt-8">
                            <div>
                                <div className="text-xl sm:text-2xl font-black">{products.length}</div>
                                <div className="text-[10px] text-green-200/60 uppercase font-bold tracking-wider">Total Items</div>
                            </div>
                            <div className="border-x border-white/10">
                                <div className="text-xl sm:text-2xl font-black">{categories.length - 1}</div>
                                <div className="text-[10px] text-green-200/60 uppercase font-bold tracking-wider">Categories</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-black">Verified</div>
                                <div className="text-[10px] text-green-200/60 uppercase font-bold tracking-wider">100% Farmers</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 2. MAIN HUB CONTENT --- */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* ADVANCED SIDEBAR FILTERING INTERFACE */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#0b0f19] rounded-[32px] border border-slate-100 dark:border-slate-900 p-6 space-y-8 h-fit lg:sticky lg:top-8 shadow-sm transition-colors">

                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60">
                            <h2 className="text-base font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <FunnelIcon className="w-4 h-4 text-[#00A63E]" /> Filters Panel
                            </h2>
                            {(searchQuery || selectedCategory !== 'All' || maxPrice !== '' || statusFilter !== 'all') && (
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setMaxPrice(''); setStatusFilter('all'); }}
                                    className="text-xs font-bold text-red-500 hover:underline"
                                >
                                    Reset All
                                </button>
                            )}
                        </div>

                        {/* Search field */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Search Keywords</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="e.g. Carrots, Rice..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-transparent focus:border-[#00A63E] dark:focus:border-[#00A63E] rounded-xl pl-11 pr-4 text-xs font-semibold outline-none transition-all text-slate-900 dark:text-white focus:ring-4 focus:ring-[#00A63E]/10"
                                />
                                <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Categories Group Wrapper */}
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1 block">Categories</label>
                            <div className="space-y-1">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-[#00A63E]/10 text-[#00A63E] dark:bg-[#00A63E]/20'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                                        }`}
                                    >
                                        <span>{cat === 'All' ? '📌 Show All' : cat}</span>
                                        {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#00A63E]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget Filtering Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Max Price (LKR)</label>
                                <span className="text-xs font-extrabold text-[#00A63E]">{maxPrice ? `Under ${maxPrice}` : 'Any Price'}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={highestProductPrice}
                                value={maxPrice || highestProductPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-[#00A63E] cursor-pointer"
                            />
                        </div>

                        {/* Stock Availability Toggle Switch */}
                        <div className="space-y-2.5 pt-2">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1 block">Availability</label>
                            <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-[#121824] p-1 rounded-xl border border-slate-100 dark:border-transparent">
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('all')}
                                    className={`py-2 text-[11px] font-black uppercase tracking-wider rounded-lg text-center transition-all ${statusFilter === 'all' ? 'bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-white shadow-sm' : 'text-slate-400'}`}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStatusFilter('in-stock')}
                                    className={`py-2 text-[11px] font-black uppercase tracking-wider rounded-lg text-center transition-all ${statusFilter === 'in-stock' ? 'bg-white dark:bg-[#0b0f19] text-[#00A63E] shadow-sm' : 'text-slate-400'}`}
                                >
                                    In Stock
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* INTERACTIVE PRODUCTS VIEWPORT */}
                    <div className="lg:col-span-3 space-y-8">

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-24 bg-white dark:bg-[#0b0f19] rounded-[32px] border border-slate-100 dark:border-slate-900 shadow-sm transition-colors">
                                <ShoppingBagIcon className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                                <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Harvest Items Found</h3>
                                <p className="text-sm font-medium text-slate-400 mt-1 max-w-xs mx-auto">We couldn't find matching items. Try resetting the filters or tweaking your keywords.</p>
                            </div>
                        ) : (
                            <>
                                {/* FEATURED HERO CARD (Premium Component Layout) */}
                                {featuredProduct && selectedCategory === 'All' && !searchQuery && (
                                    <div className="w-full bg-white dark:bg-[#0b0f19] rounded-[32px] border border-slate-100 dark:border-slate-900 overflow-hidden shadow-sm flex flex-col md:flex-row group transition-all duration-300 hover:shadow-md">
                                        <div className="md:w-[45%] relative aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-50 dark:bg-slate-900">
                                            <img
                                                src={featuredProduct.image ? `/storage/${featuredProduct.image}` : '/images/placeholder.jpg'}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                alt={featuredProduct.name}
                                            />
                                            <span className="absolute top-4 left-4 bg-[#00A63E] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
                                                ★ Trending Harvest
                                            </span>
                                        </div>
                                        <div className="p-8 flex flex-col justify-between flex-1 space-y-6">
                                            <div className="space-y-3">
                                                <span className="text-xs font-black text-[#00A63E] uppercase tracking-wider bg-[#00A63E]/5 px-3 py-1 rounded-md">{featuredProduct.category}</span>
                                                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">{featuredProduct.name}</h3>
                                                <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
                                                    <UserIcon className="w-4 h-4 text-slate-400" />
                                                    Farmer: <span className="text-slate-700 dark:text-slate-300 font-bold">{featuredProduct.user?.name || 'Hela Farmer'}</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-5">
                                                <div>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Direct Price</span>
                                                    <span className="text-3xl font-black text-[#00A63E]">LKR {featuredProduct.price}</span>
                                                    <span className="text-xs text-slate-400 font-bold"> / per {featuredProduct.unit}</span>
                                                </div>
                                                <Link
                                                    href={route('shop.products.show', featuredProduct.id)}
                                                    className="h-14 px-6 rounded-xl bg-gradient-to-r from-[#00A63E] to-[#00782d] text-white text-xs font-black tracking-wider uppercase shadow-md shadow-[#00A63E]/10 hover:opacity-95 flex items-center justify-center transition-all"
                                                >
                                                    Get Deals
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* REGULAR PRODUCTS GRID ROW */}
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
                                        {selectedCategory !== 'All' || searchQuery ? `Filtered Results (${filteredProducts.length})` : 'All Available Harvest'}
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {(selectedCategory !== 'All' || searchQuery ? filteredProducts : regularProducts).map((product) => (
                                            <div
                                                key={product.id}
                                                className="bg-white dark:bg-[#0b0f19] rounded-[28px] border border-slate-100 dark:border-slate-900 overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                                            >
                                                {/* Top Image Frame */}
                                                <div className="aspect-[1.1] bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden">
                                                    <img
                                                        src={product.image ? `/storage/${product.image}` : '/images/placeholder.jpg'}
                                                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                                                        alt={product.name}
                                                        loading="lazy"
                                                    />
                                                    {/* Category Floating Tag */}
                                                    <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#0b0f19]/90 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-white/5 shadow-sm">
                                                        {product.category}
                                                    </span>

                                                    {/* Out of Stock Blur Overlay logic */}
                                                    {product.stock <= 0 && (
                                                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center">
                                                            <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                                                                <XCircleIcon className="w-3.5 h-3.5" /> Sold Out
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Meta Description Info */}
                                                <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                                                    <div className="space-y-1">
                                                        <h3 className="font-extrabold text-slate-950 dark:text-white text-base group-hover:text-[#00A63E] transition-colors tracking-tight line-clamp-1">
                                                            {product.name}
                                                        </h3>
                                                        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                                                            <UserIcon className="w-3.5 h-3.5" />
                                                            <span>Farmer: <span className="text-slate-600 dark:text-slate-300 font-bold">{product.user?.name || 'Hela Farmer'}</span></span>
                                                        </div>
                                                    </div>

                                                    {/* Price Tag Row Container */}
                                                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3">
                                                        <div>
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
                                                            <span className="text-lg font-black text-[#00A63E]">LKR {product.price}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold">/{product.unit}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Stock</span>
                                                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md mt-0.5 inline-block ${product.stock > 0 ? 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60' : 'text-red-400 bg-red-500/5'}`}>
                                                                {product.stock > 0 ? `${product.stock} ${product.unit}` : 'Unavailable'}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Link Trigger action button */}
                                                    <Link
                                                        href={route('shop.products.show', product.id)}
                                                        className="w-full h-11 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 text-center flex items-center justify-center text-xs font-black tracking-wider uppercase transition-all duration-200 group-hover:bg-[#00A63E] group-hover:text-white shadow-sm"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}
