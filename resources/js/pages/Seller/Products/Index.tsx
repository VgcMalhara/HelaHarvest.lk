import { Head, Link, useForm } from '@inertiajs/react';
import {
    PlusIcon, PencilSquareIcon, TrashIcon,
    ArchiveBoxIcon, EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

export default function Index(props: any) {
    const { products } = props;
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('මෙම නිශ්පාදනය ඉවත් කිරීමට ඔබට සහතිකද?')) {
            destroy(route('seller.products.destroy', id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <Head title="Inventory Management" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                        Product <span className="text-emerald-600">Inventory</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
                        Total Items: {products?.length || 0}
                    </p>
                </div>
                <Link
                    href={route('seller.products.create')}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                    <PlusIcon className="w-4 h-4 stroke-[3]" /> Add New
                </Link>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-[#0f172a] rounded-[30px] border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 dark:border-white/5">
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</th>
                                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                            {!products || products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <ArchiveBoxIcon className="w-10 h-10 text-gray-200 mb-4" />
                                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No products found in your inventory</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                products.map((product: any) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-xs">N/A</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">ID: #{product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm font-black text-gray-900 dark:text-white">
                                            LKR {product.price}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className={`text-sm font-bold ${product.stock < 10 ? 'text-red-500' : 'dark:text-gray-300'}`}>
                                                    {product.stock} {product.unit}
                                                </span>
                                                {product.stock < 10 && (
                                                    <span className="text-[8px] font-black uppercase text-red-500 tracking-tighter">Low Stock</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('seller.products.edit', product.id)}
                                                    className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-600 rounded-lg transition-colors"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="p-2 hover:bg-red-50 dark:hover:bg-red-500/20 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
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
        </div>
    );
}
