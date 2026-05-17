import { Head, useForm, Link } from '@inertiajs/react';
import {
    PhotoIcon, XMarkIcon, ArrowLeftIcon, CheckCircleIcon, CubeIcon, TagIcon
} from '@heroicons/react/24/outline';
import { useState, useCallback } from 'react';

export default function Create() {
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '',
        price: '',
        stock: '',
        unit: 'kg', // Default unit එක
        description: '',
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
        post(route('seller.products.store'));
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 transition-colors duration-300">
            <Head title="Add New Product" />

            {/* Header */}
            <div className="mb-10">
                <Link href={route('seller.products.index')} className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-2 group">
                    <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                </Link>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">New <span className="text-emerald-600">Product</span></h1>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-8 shadow-sm">
                        <div className="space-y-6">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Product Title</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className={`w-full bg-gray-50 dark:bg-white/5 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-2xl py-4 px-5 focus:bg-white dark:focus:bg-gray-800 focus:border-emerald-500 outline-none transition-all dark:text-white font-semibold`}
                                    placeholder="e.g. Organic Carrots" />
                                {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
                            </div>

                            {/* Price, Stock, Unit Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Price (LKR)</label>
                                    <input type="number" value={data.price} onChange={e => setData('price', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Quantity</label>
                                    <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold" placeholder="0" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Unit</label>
                                    <select value={data.unit} onChange={e => setData('unit', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-bold appearance-none cursor-pointer">
                                        <option className="dark:bg-[#0f172a]" value="kg">Kilograms (kg)</option>
                                        <option className="dark:bg-[#0f172a]" value="g">Grams (g)</option>
                                        <option className="dark:bg-[#0f172a]" value="pcs">Pieces (pcs)</option>
                                        <option className="dark:bg-[#0f172a]" value="bundle">Bundles (මිටි)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea rows={4} value={data.description} onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-white/5 border-2 border-transparent rounded-2xl py-4 px-5 focus:border-emerald-500 outline-none dark:text-white font-medium resize-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-6 shadow-sm">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Thumbnail</label>
                        <div className="relative aspect-square rounded-[30px] border-2 border-dashed border-gray-200 dark:border-white/10 overflow-hidden bg-gray-50 dark:bg-white/5 hover:border-emerald-500 transition-all flex items-center justify-center">
                            {preview ? (
                                <>
                                    <img src={preview} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => {setPreview(null); setData('image', null);}} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg"><XMarkIcon className="w-4 h-4" /></button>
                                </>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center">
                                    <PhotoIcon className="w-10 h-10 text-emerald-600" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                        {errors.image && <p className="text-red-500 text-[10px] font-black mt-2 text-center uppercase tracking-widest">{errors.image}</p>}
                    </div>

                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 p-6 shadow-sm">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Category</label>
                        <select value={data.category} onChange={e => setData('category', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl py-4 px-5 dark:text-white font-bold appearance-none">
                            <option className="dark:bg-[#0f172a]" value="">Select Category</option>
                            <option className="dark:bg-[#0f172a]" value="Vegetables">Vegetables</option>
                            <option className="dark:bg-[#0f172a]" value="Fruits">Fruits</option>
                            <option className="dark:bg-[#0f172a]" value="Grains">Grains</option>
                        </select>
                    </div>

                    <button disabled={processing} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-[25px] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3">
                        {processing ? 'Saving...' : 'Publish Now'} <CheckCircleIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}
