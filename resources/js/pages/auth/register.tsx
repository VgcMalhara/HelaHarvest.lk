import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShoppingBagIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    ShieldCheckIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { useForm, Head, Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';


export default function BuyerRegister() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Buyer Registration" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-[#07130d] dark:via-[#0b1812] dark:to-[#102419] flex items-center justify-center px-4 py-10 lg:px-10 transition-colors duration-300">

                {/* MAIN CARD */}
                <div className="w-full max-w-[1400px] min-h-[850px] bg-white dark:bg-[#111827] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col xl:flex-row border border-gray-100 dark:border-white/10 transition-colors duration-300">

                    {/* LEFT SIDE - Visual Content */}
                    <div className="xl:w-[45%] bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 relative overflow-hidden hidden xl:block">

                        <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full bg-black/10 blur-3xl"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-16 text-white">
                            <div>
                                <div className="w-20 h-20 rounded-[24px] bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                                    <SparklesIcon className="w-10 h-10 text-white" />
                                </div>

                                <h1 className="text-5xl font-black leading-tight mt-10 tracking-tight">
                                    Join the <br /> Fresh Revolution
                                </h1>

                                <p className="mt-8 text-lg text-green-100 leading-relaxed max-w-md">
                                    Create an account to order fresh organic produce directly from farmers across Sri Lanka.
                                </p>

                                {/* FEATURE LIST */}
                                <div className="mt-12 space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition">
                                            <ShieldCheckIcon className="w-6 h-6" />
                                        </div>
                                        <span className="font-semibold text-lg">Secure & Direct Payments</span>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition">
                                            <ShoppingBagIcon className="w-6 h-6" />
                                        </div>
                                        <span className="font-semibold text-lg">Fresh Harvest Alerts</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/10">
                                <p className="text-sm text-green-50 font-medium opacity-80">
                                    By joining, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Form Content */}
                    <div className="flex-1 bg-white dark:bg-[#111827] flex flex-col justify-center transition-colors duration-300">
                        <div className="max-w-[520px] mx-auto w-full px-6 py-12">

                            <div className="mb-10 text-center xl:text-left">
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Create Account
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
                                    Start your journey for a healthier lifestyle
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">

                                {/* FULL NAME */}
                                <InputWrapper label="Full Name" error={errors.name}>
                                    <div className="relative">
                                        <UserIcon className="input-icon" />
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="John Doe"
                                            className="input-field pl-14"
                                            required
                                        />
                                    </div>
                                </InputWrapper>

                                {/* EMAIL */}
                                <InputWrapper label="Email Address" error={errors.email}>
                                    <div className="relative">
                                        <EnvelopeIcon className="input-icon" />
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="name@example.com"
                                            className="input-field pl-14"
                                            required
                                        />
                                    </div>
                                </InputWrapper>

                                {/* PASSWORDS GRID */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputWrapper label="Password" error={errors.password}>
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
                                    </InputWrapper>

                                    <InputWrapper label="Confirm" error={errors.password_confirmation}>
                                        <div className="relative">
                                            <LockClosedIcon className="input-icon" />
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="••••••••"
                                                className="input-field pl-14"
                                                required
                                            />
                                        </div>
                                    </InputWrapper>
                                </div>

                                {/* REGISTER BUTTON */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-[68px] mt-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg shadow-[0_15px_35px_rgba(34,197,94,0.25)] transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                                >
                                    {processing ? 'Creating Account...' : (
                                        <>
                                            <span>Sign Up</span>
                                            <ArrowRightIcon className="w-6 h-6" />
                                        </>
                                    )}
                                </button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium uppercase tracking-widest">or</span>
                                    <div className="flex-grow border-t border-gray-200 dark:border-white/10"></div>
                                </div>

                                {/* LOGIN LINK */}
                                <p className="text-center text-gray-500 dark:text-gray-400 text-base">
                                    Already have an account?
                                    <Link
                                        href="/login"
                                        className="ml-2 font-black text-green-600 hover:text-green-500 underline decoration-2 underline-offset-4"
                                    >
                                        Login here
                                    </Link>
                                </p>

                                {/* BACK TO HOME */}
                                <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                                    <Link href="/" className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition text-sm font-medium">
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        Back to Homepage
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* STYLES */}
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
                    border-color: #22c55e;
                }
                .input-icon {
                    position: absolute;
                    left: 18px;
                    top: 22px;
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

function InputWrapper({ label, error, children }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">
                {label}
            </label>
            {children}
            {error && <p className="text-red-500 text-sm ml-1 font-medium">{error}</p>}
        </div>
    );
}
