import { Head, useForm, Link } from '@inertiajs/react';
import {
    PhotoIcon, XMarkIcon, ArrowLeftIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

export default function Edit({ product }: any) {
    // පරණ ඉමේජ් එක පෙන්වන්න preview එකක් හදාගන්නවා
    const [preview, setPreview] = useState<string | null>(
        product.image ? `/storage/${product.image}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Laravel වලට Update එකක් බව කියන්න මේක අනිවාර්යයි
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock || '',
        unit: product.unit || 'kg', // දැනට තියෙන unit එක Load වෙනවා
        description: product.description || '',
        image: null as File | null,
    });

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    }, [setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Inertia වල file upload කරන නිසා අපි POST එකක් විදිහට යවලා _method: PUT පාවිච්චි කරනවා
        post(route('seller.products.update', product.id));
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Head title={`Edit Product - ${product.name}`} />

            {/* Header Section */}
            <div className="mb-10">
                <Link href={route('seller.products.index')} className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-2 group">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Inventory
                </Link>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    Edit <span className="text-emerald-600">Product</span>
                </h1>
                <p className="text-gray-500 text-xs font-bold uppercase mt-1 tracking-widest italic">
                    Modifying Product ID: #{product.id}
                </p>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#111827] rounded-[35px] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Product Title</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full bg-gray-50 dark:bg-white/5 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-2xl py-4 px-5 focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-500 outline-none transition-all dark:text-white font-semibold`}
                                    placeholder="e.g. Fresh Carrots"
                                />
                                {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
                            </div>

                            {/* Price, Stock and Unit Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price (LKR)</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold"
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Stock Quantity */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Unit Selection - ඔයා ඇහුව එක මෙතන තියෙන්නේ */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                                    <select
                                        value={data.unit}
                                        onChange={e => setData('unit', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold appearance-none cursor-pointer"
                                    >
                                        <option className="dark:bg-[#111827]" value="kg">Kilograms (kg)</option>
                                        <option className="dark:bg-[#111827]" value="g">Grams (g)</option>
                                        <option className="dark:bg-[#111827]" value="pcs">Pieces (pcs)</option>
                                        <option className="dark:bg-[#111827]" value="bundle">Bundles (මිටි)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-medium resize-none"
                                    placeholder="Describe your product..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Image and Actions */}
                <div className="space-y-6">
                    {/* Thumbnail Upload */}
                    <div className="bg-white dark:bg-[#111827] rounded-[35px] border border-gray-100 dark:border-white/5 p-6 shadow-sm">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Product Image</label>
                        <div className="relative aspect-square rounded-[30px] border-2 border-dashed border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-white/5 hover:border-emerald-500 transition-all flex items-center justify-center">
                            {preview ? (
                                <>
                                    <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                    <button
                                        type="button"
                                        onClick={() => {setPreview(null); setData('image', null);}}
                                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center">
                                    <PhotoIcon className="w-10 h-10 text-emerald-600" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase mt-2">Replace Image</p>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                        {errors.image && <p className="text-red-500 text-[10px] font-black mt-2 text-center uppercase tracking-widest">{errors.image}</p>}
                    </div>

                    {/* Category Selection */}
                    <div className="bg-white dark:bg-[#111827] rounded-[35px] border border-gray-100 dark:border-white/5 p-6 shadow-sm">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Category</label>
                        <select
                            value={data.category}
                            onChange={e => setData('category', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 dark:text-white font-bold appearance-none"
                        >
                            <option className="dark:bg-[#111827]" value="">Select Category</option>
                            <option className="dark:bg-[#111827]" value="Vegetables">Vegetables</option>
                            <option className="dark:bg-[#111827]" value="Fruits">Fruits</option>
                            <option className="dark:bg-[#111827]" value="Grains">Grains</option>
                        </select>
                    </div>

                    {/* Update Button */}
                    <button
                        disabled={processing}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-[25px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
                    >
                        {processing ? 'Updating...' : 'Save Changes'} <CheckCircleIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
