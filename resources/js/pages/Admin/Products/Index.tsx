import {
    TrashIcon, ArchiveBoxIcon, ShoppingBagIcon, EyeIcon,
    ExclamationTriangleIcon, XMarkIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index(props: any) {
    const { products } = props;
    const { delete: destroy } = useForm();

    // Confirmation Modal States
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<{ id: number; name: string } | null>(null);

    // Success Notification States
    const [notification, setNotification] = useState<{ show: boolean; message: string }>({
        show: false,
        message: '',
    });

    // Notification එක auto-hide කරන්න useEffect එකක්
    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 4000); // තත්පර 4කින් auto වැහෙනවා
            return () => clearTimeout(timer);
        }
    }, [notification.show]);

    const triggerDeleteConfirmation = (id: number, name: string) => {
        setProductToDelete({ id, name });
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            const deletedProductName = productToDelete.name;

            destroy(route('admin.products.destroy', productToDelete.id), {
                onSuccess: () => {
                    setIsConfirmOpen(false);
                    setProductToDelete(null);

                    // Delete එක සක්සස් වූ ගමන් Notification එක දානවා
                    setNotification({
                        show: true,
                        message: `"${deletedProductName}" සාර්ථකව ඉවත් කරන ලදී.`
                    });
                }
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 relative">
            <Head title="Global Product Management" />

            {/* Premium Top-Right Floating Success Toast */}
            {notification.show && (
                <div className="fixed top-6 right-6 z-[100] max-w-sm w-full px-4 animate-in slide-in-from-right-10 duration-300">
                    <div className="bg-[#0f172a] text-white rounded-[24px] p-4 shadow-2xl shadow-black/20 border border-white/10 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {/* Emerald Icon Container */}
                            <div className="bg-emerald-500/10 p-2 rounded-xl shrink-0 text-emerald-400 border border-emerald-500/20">
                                <CheckCircleIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Success</span>
                                <p className="text-xs font-bold text-gray-200 leading-relaxed">
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setNotification({ show: false, message: '' })}
                            className="p-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-colors shrink-0 mt-0.5"
                        >
                            <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    Global <span className="text-emerald-600">Products</span>
                </h1>
                <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                    Total Marketplace Items: {products?.length || 0}
                </p>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-[#0f172a] rounded-[30px] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 dark:border-white/5">
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Seller</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price & Stock</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {!products || products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <ArchiveBoxIcon className="w-10 h-10 text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No products listed on the platform</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        {/* Product Info */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ShoppingBagIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">ID: #{product.id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Seller Info */}
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    {product.seller ? product.seller.name : 'Unknown Seller'}
                                                </span>
                                                <span className="text-[9px] text-gray-400 uppercase font-bold">
                                                    Seller ID: #{product.user_id}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Price & Stock */}
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-emerald-600">LKR {product.price}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">
                                                    Stock: {product.stock} {product.unit}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('admin.products.show', product.id)}
                                                    className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-600 rounded-lg transition-colors inline-flex items-center"
                                                    title="View Details"
                                                >
                                                    <EyeIcon className="w-5 h-5" />
                                                </Link>

                                                <button
                                                    onClick={() => triggerDeleteConfirmation(product.id, product.name)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-600 rounded-lg transition-colors inline-flex items-center"
                                                    title="Remove Product"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Delete Confirmation Modal */}
            {isConfirmOpen && productToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-[#0f172a] rounded-[35px] border border-gray-100 dark:border-white/5 max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">

                        <button
                            onClick={() => setIsConfirmOpen(false)}
                            className="absolute top-6 right-6 p-1.5 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full transition-colors"
                        >
                            <XMarkIcon className="w-4 h-4" />
                        </button>

                        <div className="flex flex-col items-center text-center mt-2">
                            <div className="bg-red-50 dark:bg-red-500/10 p-4 rounded-full text-red-600 mb-5 animate-bounce">
                                <ExclamationTriangleIcon className="w-8 h-8" />
                            </div>

                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                Confirm <span className="text-red-600">Deletion</span>
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-3 leading-relaxed">
                                ඔබ ආපසු හැරවිය නොහැකි ලෙස <span className="font-bold text-gray-800 dark:text-gray-200">"{productToDelete.name}"</span> නිශ්පාදනය Marketplace එකෙන් ඉවත් කිරීමට සූදානම් වේ. මෙම ක්‍රියාව අවලංගු කළ නොහැක!
                            </p>
                        </div>

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
