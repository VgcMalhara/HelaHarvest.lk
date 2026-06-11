// Resources/Js/Pages/Admin/Buyers/Create.jsx

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.buyers.store'));
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] p-6 lg:p-10 flex items-center justify-center">
            <Head title="Create New Buyer" />

            <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-[40px] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden">

                {/* HEADER */}
                <div className="p-10 pb-0 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                            Add New <span className="text-green-600">Buyer</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Create a new customer account manually.</p>
                    </div>
                    <Link
                        href={route('admin.buyers.index')}
                        className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">

                    {/* FULL NAME */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Enter buyer's full name"
                                className={`w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 transition-all ${errors.name ? 'ring-2 ring-rose-500' : 'focus:ring-green-500'}`}
                            />
                        </div>
                        {errors.name && <p className="text-rose-500 text-xs font-bold ml-1">{errors.name}</p>}
                    </div>

                    {/* EMAIL ADDRESS */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                        <div className="relative">
                            <EnvelopeIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="buyer@example.com"
                                className={`w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-rose-500' : 'focus:ring-green-500'}`}
                            />
                        </div>
                        {errors.email && <p className="text-rose-500 text-xs font-bold ml-1">{errors.email}</p>}
                    </div>

                    {/* PASSWORD GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Password</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-rose-500' : 'focus:ring-green-500'}`}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm Password</label>
                            <div className="relative">
                                <LockClosedIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-green-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                    {errors.password && <p className="text-rose-500 text-xs font-bold ml-1">{errors.password}</p>}

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full h-16 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg shadow-xl shadow-green-500/20 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {processing ? (
                                <span className="animate-pulse">CREATING ACCOUNT...</span>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-6 h-6" />
                                    <span>CREATE BUYER</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
