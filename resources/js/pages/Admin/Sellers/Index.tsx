import { PencilIcon, TrashIcon, UserGroupIcon, PlusIcon, MapPinIcon, BuildingStorefrontIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Head, router, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ sellers }) {

    const handleStatusChange = (id, newStatus) => {
        if (confirm(`Change status to ${newStatus}?`)) {
            router.patch(route('admin.sellers.updateStatus', id), { status: newStatus });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this seller?')) {
            router.delete(route('admin.sellers.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] transition-colors duration-300">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Head title="Manage Sellers" />

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div className="flex items-start gap-5">
                        <div className="hidden sm:flex p-4 bg-white dark:bg-slate-800 shadow-xl shadow-emerald-500/10 rounded-3xl border border-emerald-500/20">
                            <UserGroupIcon className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                SELLER MANAGEMENT
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
                                Showing <span className="text-emerald-500">{sellers.length}</span> registered vendors in HelaHarvest.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('admin.sellers.create')}
                        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/30 active:scale-95 overflow-hidden"
                    >
                        <PlusIcon className="w-5 h-5 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
                        <span>ADD NEW SELLER</span>
                    </Link>
                </div>

                {/* --- TABLE CARD --- */}
                <div className="bg-white dark:bg-[#151b2c] rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="py-6 px-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Seller Details</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Shop Info</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Location</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="py-6 px-8 text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {sellers.map((seller) => (
                                <tr key={seller.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all duration-200">

                                    {/* SELLER & EMAIL */}
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-2 border-white dark:border-slate-600 shadow-sm overflow-hidden flex-shrink-0">
                                                {seller.seller_profile?.profile_image ? (
                                                    <img src={`/storage/${seller.seller_profile.profile_image}`} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl font-black text-slate-400 dark:text-slate-500">
                                                        {seller.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{seller.name}</span>
                                                <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                                                    <EnvelopeIcon className="w-3.5 h-3.5" /> {seller.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* SHOP INFO */}
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                                                <BuildingStorefrontIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">
                                                {seller.seller_profile?.shop_name || 'N/A'}
                                            </span>
                                        </div>
                                    </td>

                                    {/* LOCATION */}
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-slate-700 dark:text-slate-200 font-bold">{seller.seller_profile?.city}</span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-medium">
                                                <MapPinIcon className="w-3 h-3" /> {seller.seller_profile?.district}
                                            </span>
                                        </div>
                                    </td>

                                    {/* STATUS SELECT */}
                                    <td className="py-6 px-8">
                                        <select
                                            value={seller.seller_profile?.status}
                                            onChange={(e) => handleStatusChange(seller.id, e.target.value)}
                                            className={`
                                                text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl border-none ring-1 cursor-pointer focus:ring-2 transition-all
                                                ${seller.status === 'active' ? 'bg-emerald-50 text-emerald-600 ring-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400' : ''}
                                                ${seller.status === 'pending' ? 'bg-amber-50 text-amber-600 ring-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400' : ''}
                                                ${seller.status === 'suspended' ? 'bg-red-50 text-red-600 ring-red-500/30 dark:bg-red-500/10 dark:text-red-400' : ''}
                                            `}
                                        >
                                            <option value="pending" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">PENDING</option>
                                            <option value="active" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ACTIVE</option>
                                            <option value="suspended" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">SUSPENDED</option>
                                        </select>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="py-6 px-8 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={route('admin.sellers.edit', seller.id)}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl transition-all border border-transparent hover:border-emerald-500/20"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(seller.id)}
                                                className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
