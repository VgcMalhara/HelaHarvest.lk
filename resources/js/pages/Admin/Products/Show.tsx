import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ArrowLeftIcon, TrashIcon, ShoppingBagIcon,
    UserIcon, CalendarDaysIcon, TagIcon,
    ExclamationTriangleIcon, XMarkIcon
} from '@heroicons/react/24/outline';

export default function Show(props: any) {
    const { product } = props;
    const { delete: destroy } = useForm();

    // Confirmation Modal එක පාලනය කරන්න State එක
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Modal එක ඇතුළේ "Yes, Delete" ක්ලික් කළාම ක්‍රියාත්මක වන Function එක
    const handleConfirmDelete = () => {
        destroy(route('admin.products.destroy', product.id), {
            onSuccess: () => {
                setIsConfirmOpen(false);
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <Head title={`Product Details - ${product.name}`} />

            {/* Back Button */}
            <div className="mb-8">
                <Link
                    href={route('admin.products.index')}
                    className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 group w-fit"
                >
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Global Products
                </Link>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left side: Image */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-4 shadow-sm sticky top-6">
                        <div className="aspect-square rounded-[25px] overflow-hidden bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 relative">
                            {product.image ? (
                                <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt={product.name} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <ShoppingBagIcon className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side: Product & Seller Details */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Product Info Card */}
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1">
                                <TagIcon className="w-3 h-3" /> {product.category}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                ID: #{product.id}
                            </span>
                        </div>

                        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2">
                            {product.name}
                        </h1>

                        <hr className="my-6 border-gray-100 dark:border-white/5" />

                        <div className="space-y-2">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Description</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium leading-relaxed whitespace-pre-line">
                                {product.description || 'No description provided for this product.'}
                            </p>
                        </div>

                        {/* Pricing & Stock Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Marketplace Price</p>
                                <p className="text-2xl font-black text-emerald-600">LKR {product.price}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Stock Level</p>
                                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                                    {product.stock} <span className="text-sm font-medium text-gray-400">{product.unit}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Seller Information Card */}
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-emerald-600" /> Seller Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Store Owner Name</p>
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-0.5">
                                    {product.seller ? product.seller.name : 'Unknown Seller'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Registered Email</p>
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-0.5">
                                    {product.seller?.email || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Seller Account ID</p>
                                <p className="text-sm font-medium text-gray-500 mt-0.5">#{product.user_id}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                                    <CalendarDaysIcon className="w-3 h-3" /> Product Listed Date
                                </p>
                                <p className="text-sm font-medium text-gray-500 mt-0.5">
                                    {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone Actions */}
                    <div className="bg-red-50/30 dark:bg-red-500/5 rounded-[35px] border border-red-100/50 dark:border-red-500/10 p-6 flex items-center justify-between gap-4">
                        <div>
                            <h4 className="text-sm font-black text-red-600 uppercase tracking-tight">Danger Zone</h4>
                            <p className="text-xs font-medium text-gray-400 dark:text-gray-500">If this listing violates terms, you can permanently remove it.</p>
                        </div>
                        {/* Custom Delete එක Trigger කරන Button එක */}
                        <button
                            onClick={() => setIsConfirmOpen(true)}
                            className="bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-red-600/10"
                        >
                            <TrashIcon className="w-4 h-4" /> Delete Product
                        </button>
                    </div>

                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {isConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsConfirmOpen(false)}
                            className="absolute top-6 right-6 p-1.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full transition-colors"
                        >
                            <XMarkIcon className="w-4 h-4" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col items-center text-center mt-2">
                            <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-full text-red-600 mb-5 animate-bounce">
                                <ExclamationTriangleIcon className="w-8 h-8" />
                            </div>

                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                Confirm <span className="text-red-600">Deletion</span>
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-3 leading-relaxed">
                                ඔබ ආපසු හැරවිය නොහැකි ලෙස <span className="font-bold text-gray-800 dark:text-gray-200">"{product.name}"</span> නිශ්පාදනය Marketplace එකෙන් ඉවත් කිරීමට සූදානම් වේ. මෙම ක්‍රියාව අවලංගු කළ නොහැක!
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <button
                                onClick={() => setIsConfirmOpen(false)}
                                className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all"
                            >
                                No, Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-600 hover:bg-red-500 text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-red-600/20 active:scale-95"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
