import {
    ShoppingBagIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { useForm, Head, Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login - HelaHarvest" />

            <div className="min-h-screen bg-slate-50 dark:bg-[#030712] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300 relative">

                {/* Ambient Background Glows using #00A63E */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-[#00A63E]/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#00A63E]/10 rounded-full blur-[100px] pointer-events-none" />

                {/* MAIN CARD CONTAINER */}
                <div className="w-full max-w-[1150px] bg-white dark:bg-[#111827] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.06)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-white/10 min-h-[720px] transition-colors duration-300">

                    {/* LEFT SIDE (Visual Brand Panel) */}
                    <div className="lg:w-[43%] relative overflow-hidden flex flex-col justify-between p-10 sm:p-12 text-white bg-[#004d1c] min-h-[300px] lg:min-h-auto">

                        {/* Background Gradients using your exact green color */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00A63E] via-[#00782d] to-[#004d1c]" />
                            <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 rounded-full bg-black/10 blur-3xl" />
                        </div>

                        {/* Top Action - Back Button Inside layout */}
                        <div className="relative z-10">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 dark:bg-black/20 hover:bg-white/20 text-white font-bold text-xs tracking-wider uppercase backdrop-blur-xl border border-white/10 transition-all active:scale-[0.98]"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>

                        {/* Middle Content Branding */}
                        <div className="relative z-10 space-y-6 my-auto pt-4 lg:pt-0">
                            <div className="w-16 h-16 rounded-[22px] bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                                <ShoppingBagIcon className="w-8 h-8 text-white" />
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                                    Welcome Back <br /> to HelaHarvest
                                </h1>
                                <p className="text-base text-green-100/90 leading-relaxed max-w-sm font-medium">
                                    Sign in to continue your journey. Whether you are buying fresh or selling local, we've got you covered.
                                </p>
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-sm font-semibold text-green-100/90">
                                    <span className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center text-xs">✅</span> Secure Transactions
                                </div>
                                <div className="flex items-center gap-3 text-sm font-semibold text-green-100/90">
                                    <span className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center text-xs">✅</span> Direct Farm-to-Table
                                </div>
                            </div>
                        </div>

                        {/* Bottom Feature Footer */}
                        <div className="relative z-10 hidden lg:block pt-4 border-t border-white/10 text-xs text-green-200/40 font-bold uppercase tracking-widest">
                            Verified Local Platform
                        </div>
                    </div>

                    {/* RIGHT SIDE (Interactive Sign-In Form) */}
                    <div className="flex-1 bg-white dark:bg-[#111827] flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-20 transition-colors duration-300">
                        <div className="max-w-[420px] w-full mx-auto space-y-10">

                            <div>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Sign In
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg font-medium">
                                    Enter your details to access your account.
                                </p>
                            </div>

                            {status && (
                                <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 text-[#00A63E] font-bold text-sm border border-[#00A63E]/10">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* EMAIL */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <EnvelopeIcon className="input-icon" />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="chiran@example.com"
                                            className="input-field pl-14"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm font-semibold mt-1 ml-1">{errors.email}</p>}
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                                            Password
                                        </label>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-xs font-bold text-[#00A63E] hover:text-[#00782d] transition-colors">
                                                Forgot Password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <LockClosedIcon className="input-icon" />
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className="input-field pl-14"
                                            required
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm font-semibold mt-1 ml-1">{errors.password}</p>}
                                </div>

                                {/* REMEMBER ME */}
                                <div className="flex items-center ml-1 pt-1">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-5 h-5 rounded-lg border-gray-200 dark:border-white/10 text-[#00A63E] focus:ring-[#00A63E] dark:bg-[#1f2937] focus:ring-offset-0 custom-checkbox cursor-pointer"
                                    />
                                    <label htmlFor="remember" className="ml-3 text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-pointer select-none">
                                        Keep me logged in
                                    </label>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group w-full h-[64px] sm:h-[68px] rounded-2xl bg-gradient-to-r from-[#00A63E] to-[#00782d] hover:from-[#00782d] hover:to-[#004d1c] text-white font-black text-lg shadow-[0_15px_35px_rgba(0,166,62,0.2)] transition-all duration-300 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3 mt-2"
                                >
                                    {processing ? 'Signing In...' : (
                                        <>
                                            Sign In
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {/* SIGNUP LINK */}
                                <p className="text-center text-gray-500 dark:text-gray-400 text-base pt-3 font-medium">
                                    New to HelaHarvest?
                                    <Link href={route('register')} className="ml-2 font-black text-[#00A63E] hover:text-[#00782d] dark:text-[#00A63E] underline underline-offset-4 transition-colors">
                                        Create Account
                                    </Link>
                                </p>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- REUSABLE INLINE CSS (MATCHING REGISTER SCREEN) --- */}
            <style>{`
                .input-field {
                    width: 100%;
                    height: 68px;
                    border-radius: 22px;
                    border: 1px solid #e5e7eb;
                    background: #f9fafb;
                    padding-right: 20px;
                    font-size: 16px;
                    font-weight: 500;
                    outline: none;
                    transition: all .25s ease;
                    color: #111827;
                }
                .dark .input-field {
                    background: #1f2937;
                    border-color: rgba(255,255,255,.08);
                    color: white;
                }
                .input-field:focus {
                    background: white;
                    border-color: #00A63E;
                    box-shadow: 0 0 0 5px rgba(0, 166, 62, 0.12);
                }
                .dark .input-field:focus {
                    background: #111827;
                }
                .input-icon {
                    position: absolute;
                    left: 18px;
                    top: 23px;
                    width: 22px;
                    height: 22px;
                    color: #9ca3af;
                }
                .dark .input-icon {
                    color: #6b7280;
                }
                .custom-checkbox:checked {
                    background-color: #00A63E !important;
                    border-color: #00A63E !important;
                }
            `}</style>
        </>
    );
}
