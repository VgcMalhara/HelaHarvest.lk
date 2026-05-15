import {
    ShoppingBagIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ArrowRightIcon,
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

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-[#07130d] dark:via-[#0b1812] dark:to-[#102419] flex items-center justify-center px-4 py-10 transition-colors duration-300">

                {/* MAIN CARD */}
                <div className="w-full max-w-[1200px] min-h-[750px] bg-white dark:bg-[#111827] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-white/10 transition-colors duration-300">

                    {/* LEFT SIDE (Visual) */}
                    <div className="lg:w-[45%] bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 relative overflow-hidden flex flex-col justify-center p-12 text-white">

                        {/* Decorative Circles */}
                        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-black/10 blur-3xl"></div>

                        <div className="relative z-10 space-y-8">
                            <div className="w-20 h-20 rounded-[24px] bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                                <ShoppingBagIcon className="w-10 h-10 text-white" />
                            </div>

                            <h1 className="text-4xl 2xl:text-5xl font-black leading-tight tracking-tight">
                                Welcome Back <br />
                                to HelaHarvest
                            </h1>

                            <p className="text-lg text-green-100 leading-relaxed max-w-md">
                                Sign in to continue your journey. Whether you are buying fresh or selling local, we've got you covered.
                            </p>

                            <div className="pt-8 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">✅</div>
                                    <span className="font-medium">Secure Transactions</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">✅</div>
                                    <span className="font-medium">Direct Farm-to-Table</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE (Form) */}
                    <div className="flex-1 bg-white dark:bg-[#111827] flex flex-col justify-center px-8 py-12 sm:px-16 lg:px-20 transition-colors duration-300">

                        <div className="max-w-[420px] mx-auto w-full">
                            <div className="mb-10">
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Sign In
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
                                    Enter your details to access your account.
                                </p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-sm">
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
                                    {errors.email && <p className="text-red-500 text-sm ml-1">{errors.email}</p>}
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
                                            Password
                                        </label>
                                        {canResetPassword && (
                                            <Link href={route('password.request')} className="text-xs font-bold text-green-600 hover:text-emerald-500">
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
                                    {errors.password && <p className="text-red-500 text-sm ml-1">{errors.password}</p>}
                                </div>

                                {/* REMEMBER ME */}
                                <div className="flex items-center ml-1">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-5 h-5 rounded-lg border-gray-200 dark:border-white/10 text-green-600 focus:ring-green-500 dark:bg-[#1f2937]"
                                    />
                                    <label htmlFor="remember" className="ml-3 text-sm font-semibold text-gray-500 dark:text-gray-400 cursor-pointer">
                                        Keep me logged in
                                    </label>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group w-full h-[68px] rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg shadow-[0_15px_35px_rgba(34,197,94,0.25)] transition-all duration-300 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-3"
                                >
                                    {processing ? 'Signing In...' : (
                                        <>
                                            Sign In
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {/* SIGNUP LINK */}
                                <p className="text-center text-gray-500 dark:text-gray-400 text-base pt-4 font-medium">
                                    New to HelaHarvest?
                                    <Link href={route('register')} className="ml-2 font-black text-green-600 hover:text-green-500 underline underline-offset-4">
                                        Create Account
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS STYLES (Register එකේ තිබ්බ විදිහටම) */}
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
                    border-color: #22c55e;
                    box-shadow: 0 0 0 5px rgba(34,197,94,.12);
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
            `}</style>
        </>
    );
}
