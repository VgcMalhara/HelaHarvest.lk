import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import { route } from 'ziggy-js';

// TypeScript Interface එකක් දාගත්තම කෝඩ් එක වඩාත් පැහැදිලියි
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

    // Live Search එක Lag වෙන්නේ නැතිවෙන්න Debounce එකක් දානවා (300ms)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Categories ටික clean කරලා dynamic අරගන්නවා
    const categories = useMemo(() => {
        if (!products || products.length === 0) return ['All'];

        // Trim කරලා, මුල් අකුර Capitalize කරලා unique සෙට් එකක් ගන්නවා
        const uniqueCategories = Array.from(
            new Set(
                products
                    .map((p) => p.category?.trim())
                    .filter(Boolean)
            )
        );

        return ['All', ...uniqueCategories];
    }, [products]);

    // Optimized filtering logic (Debounced search එකෙන් දුවන්නේ)
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        const searchLower = debouncedSearch.toLowerCase().trim();

        return products.filter((product) => {
            const matchesSearch = !searchLower || product.name.toLowerCase().includes(searchLower);
            const matchesCat = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCat;
        });
    }, [products, debouncedSearch, selectedCategory]);

    return (
        <>
            <Head title="Marketplace" />

            {/* --- 1. HERO HEADER --- */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-800 text-white rounded-b-[40px] px-6 py-20 text-center mb-16 shadow-xl shadow-green-900/5 relative overflow-hidden">
                <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
                        Hela<span className="text-green-300">Harvest</span> Shop
                    </h1>
                    <p className="text-green-100/80 text-sm max-w-md mx-auto font-medium leading-relaxed">
                        නැවුම් අස්වැන්න අතරමැදියන්ගෙන් තොරව සෘජුවම ගොවි බිමෙන් ඔබේ නිවසටම.
                    </p>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* --- 2. MAIN CONTENT GRID --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">

                {/* Sidebar Filters */}
                <div className="lg:col-span-1 bg-white dark:bg-[#0f172a] rounded-[24px] border border-gray-200/60 dark:border-white/[0.05] p-6 space-y-6 h-fit sticky top-24 shadow-sm">
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-transparent focus:border-green-500 dark:focus:border-green-500 focus:bg-white rounded-xl px-4 py-3 pl-11 text-xs font-semibold outline-none transition-all"
                        />
                        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Category List */}
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3 px-1">Categories</span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-green-600 text-white shadow-md shadow-green-600/10'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.02] hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-[#0f172a] rounded-[24px] border border-gray-200/60 dark:border-white/[0.05] shadow-sm">
                            <ShoppingBagIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-sm font-semibold text-gray-400">No harvest items found matching your filter.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-[#0f172a] rounded-[24px] border border-gray-200/60 dark:border-white/[0.05] overflow-hidden group hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-none transition-all duration-300 flex flex-col">

                                    {/* Product Image */}
                                    <div className="aspect-square bg-gray-50 dark:bg-white/[0.01] overflow-hidden relative border-b border-gray-100 dark:border-white/[0.02]">
                                        <img
                                            src={product.image ? `/storage/${product.image}` : '/images/placeholder.jpg'}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                            alt={product.name}
                                            loading="lazy" // Page load speed එක වැඩි කරන්න lazy load දාන්න
                                        />
                                        <span className="absolute top-4 left-4 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md text-[10px] font-bold text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
                                            {product.category}
                                        </span>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-6 flex flex-col flex-grow space-y-4">
                                        <div className="flex-grow space-y-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors tracking-tight line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 font-medium">
                                                Farmer: <span className="text-gray-500 dark:text-gray-300">{product.user?.name || 'Hela Farmer'}</span>
                                            </p>
                                        </div>

                                        {/* Stock & Price Row */}
                                        <div className="flex items-baseline justify-between border-t border-gray-100 dark:border-white/[0.05] pt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price</span>
                                                <span className="text-lg font-black text-green-600 dark:text-green-500">LKR {product.price}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Available</span>
                                                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{product.stock} {product.unit}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        {/* global ziggy helper එක කෙලින්ම route() විදිහට වැඩ කරන නිසා import නැතුව පාවිච්චි කලා */}
                                        <Link
                                            href={route('shop.products.show', product.id)}
                                            className="w-full bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-center py-3 rounded-xl text-xs font-bold transition-all group-hover:bg-green-600 group-hover:text-white shadow-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
