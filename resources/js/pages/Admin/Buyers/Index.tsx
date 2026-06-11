// Resources/Js/Pages/Admin/Buyers/Index.jsx

import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    UserIcon,
    EnvelopeIcon,
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    NoSymbolIcon
} from '@heroicons/react/24/outline';

export default function Index({ buyers }) {

    // Status එක Toggle කරන්න (Active/Inactive)
    const toggleStatus = (buyer) => {
        const newStatus = buyer.status === 'active' ? 'inactive' : 'active';
        router.patch(route('admin.buyers.updateStatus', buyer.id), {
            status: newStatus
        });
    };

    // Delete කරන්න
    const deleteBuyer = (id) => {
        if (confirm('මෙම Buyer ව ඉවත් කිරීමට ඔබට සහතිකද?')) {
            router.delete(route('admin.buyers.destroy', id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-6 lg:p-10">
            <Head title="Buyer Management" />

            <div className="max-w-[1400px] mx-auto">
                {/* HEADER AREA */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                            Buyer <span className="text-green-600">Management</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            Manage all registered customers and their account status.
                        </p>
                    </div>

                    <Link
                        href={route('admin.buyers.create')}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-500/20 transition-all active:scale-95"
                    >
                        <PlusIcon className="w-5 h-5" />
                        ADD NEW BUYER
                    </Link>
                </div>

                {/* SEARCH & FILTERS (Optional for now) */}
                <div className="mb-6 relative max-w-md">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="w-full h-14 pl-12 pr-6 rounded-2xl border-none bg-white dark:bg-[#111827] dark:text-white shadow-sm focus:ring-2 focus:ring-green-500 transition-all"
                    />
                </div>

                {/* TABLE CARD */}
                <div className="bg-white dark:bg-[#111827] rounded-[35px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-white/5 border-b dark:border-white/5">
                                    <th className="py-6 px-8 text-xs font-black text-slate-400 uppercase tracking-widest">Buyer Info</th>
                                    <th className="py-6 px-8 text-xs font-black text-slate-400 uppercase tracking-widest">Email</th>
                                    <th className="py-6 px-8 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="py-6 px-8 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-white/5">
                                {buyers.map((buyer) => (
                                    <tr key={buyer.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-500/10 flex items-center justify-center text-green-600">
                                                    <UserIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 dark:text-white text-lg">{buyer.name}</div>
                                                    <div className="text-xs text-slate-400 font-medium">ID: #BYR-{buyer.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                                                <EnvelopeIcon className="w-4 h-4 text-slate-400" />
                                                {buyer.email}
                                            </div>
                                        </td>
                                        <td className="py-6 px-8">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                buyer.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${buyer.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                                                {buyer.status}
                                            </span>
                                        </td>
                                        <td className="py-6 px-8 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Toggle Status Button */}
                                                <button
                                                    onClick={() => toggleStatus(buyer)}
                                                    title={buyer.status === 'active' ? 'Deactivate' : 'Activate'}
                                                    className={`p-3 rounded-xl transition-all ${
                                                        buyer.status === 'active'
                                                        ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                                                        : 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                                                    }`}
                                                >
                                                    {buyer.status === 'active' ? <NoSymbolIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                                                </button>

                                                {/* Edit Button */}
                                                <Link
                                                    href={route('admin.buyers.edit', buyer.id)}
                                                    className="p-3 rounded-xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => deleteBuyer(buyer.id)}
                                                    className="p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
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
        </div>
    );
}
