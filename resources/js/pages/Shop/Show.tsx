import {
    ShoppingBagIcon,
    ArrowLeftIcon,
    ChevronRightIcon,
    ShieldCheckIcon,
    TruckIcon,
    UserIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
// 👈 Layout එක persistent විදිහට පල්ලෙහායින් සෙට් කරනවා

interface ProductShowProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock: number;
        unit: string;
        category: string;
        image: string | null;
        user?: {
            name: string;
            location?: string;
        };
    };
}

export default function Show({ product }: ProductShowProps) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (type: 'inc' | 'dec') => {
        if (type === 'inc' && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        } else if (type === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <> {/* 👈 ShopLayout ටැග් එක අයින් කරලා Fragments (<></>) දැම්මා */}
            <Head title={`${product.name} - HelaHarvest`} />

            {/* Layout එකෙන් එන Navbar එකට යට නොවෙන්න pt-28 දාලා තියෙන්නේ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

                {/* --- 1. BREADCRUMBS & BACK TO SHOP --- */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide">
                        <Link href={route('shop.index')} className="hover:text-green-600 transition-colors">Shop</Link>
                        <ChevronRightIcon className="w-3 h-3" />
                        <span className="text-gray-500 dark:text-gray-400">{product.category}</span>
                        <ChevronRightIcon className="w-3 h-3" />
                        <span className="text-gray-900 dark:text-white truncate max-w-[150px]">{product.name}</span>
                    </div>

                    <Link
                        href={route('shop.index')}
                        className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors bg-white dark:bg-[#0f172a] px-4 py-2 rounded-xl border border-gray-200/60 dark:border-white/[0.05] shadow-sm"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Shop
                    </Link>
                </div>

                {/* --- 2. MAIN PRODUCT DETAIL CARD --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white dark:bg-[#0f172a] rounded-[32px] border border-gray-200/60 dark:border-white/[0.05] p-6 sm:p-8 lg:p-12 shadow-xl shadow-gray-100/40 dark:shadow-none">

                    {/* LEFT SIDE: PRODUCT IMAGE */}
                    <div className="lg:col-span-5">
                        <div className="aspect-square bg-gray-50 dark:bg-white/[0.01] rounded-[24px] border border-gray-100 dark:border-white/[0.02] overflow-hidden relative group shadow-inner">
                            <img
                                src={product.image ? `/storage/${product.image}` : '/images/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE: PRODUCT DETAILS & ACTIONS */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                        <div className="space-y-6">

                            {/* Product Title & Farmer Info */}
                            <div className="space-y-3">
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                    {product.name}
                                </h1>

                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-transparent">
                                        <UserIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        <span>Farmer: <strong className="text-gray-800 dark:text-gray-200">{product.user?.name || 'Hela Farmer'}</strong></span>
                                    </div>

                                    {product.user?.location && (
                                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-transparent">
                                            <MapPinIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span>{product.user.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-500/[0.03] dark:to-transparent border-l-4 border-green-600 p-4 rounded-r-xl">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-0.5">Price per {product.unit}</span>
                                <div className="text-3xl font-black text-green-600 dark:text-green-500">
                                    LKR {product.price}.00
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Harvest Description</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    {product.description || 'මෙම නිෂ්පාදනය සඳහා තවමත් විස්තරයක් ඇතුළත් කර නොමැත. වැඩි විස්තර සඳහා ගොවි මහතා සම්බන්ධ කරගන්න.'}
                                </p>
                            </div>
                        </div>

                        {/* Quantity Selector, Stock and Cart Action */}
                        <div className="border-t border-gray-100 dark:border-white/[0.05] pt-6 space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">

                                {/* Quantity Selector */}
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block">Select Quantity</span>
                                    <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-white/5 p-1 w-fit">
                                        <button
                                            onClick={() => handleQuantityChange('dec')}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg text-gray-500 hover:bg-white dark:hover:bg-white/5 active:scale-95 transition-all"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-bold text-sm text-gray-900 dark:text-white">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange('inc')}
                                            className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg text-gray-500 hover:bg-white dark:hover:bg-white/5 active:scale-95 transition-all"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Availability</span>
                                    {product.stock > 0 ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                                            {product.stock} {product.unit} In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2">
                                <button
                                    disabled={product.stock <= 0}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/10 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
                                >
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Add to Shopping Bag
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

// 👈 මෙන්න Inertia එකට Persistent Layout එක බින්දු කරන්න ඔයා පාවිච්චි කරන ක්‍රමය:
Show.layout = (page: any) => <ShopLayout children={page} />;
