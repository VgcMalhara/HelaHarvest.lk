import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { locations } from '@/data/locations';
import { route } from 'ziggy-js';

import {
    CameraIcon,
    ShoppingBagIcon,
    UserIcon,
    MapPinIcon,
    EnvelopeIcon,
    LockClosedIcon,
    BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';

export default function SellerRegister() {

    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        shop_name: '',
        district: '',
        city: '',
        profile_image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        setData('profile_image', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.register.post'));
    };

    return (
        <>
            <Head title="Seller Registration" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-[#07130d] dark:via-[#0b1812] dark:to-[#102419] flex items-center justify-center px-4 py-10 lg:px-10 transition-colors duration-300">

                {/* MAIN CARD */}
                <div className="w-full max-w-[1700px] min-h-[950px] bg-white dark:bg-[#111827] rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col xl:flex-row border border-gray-100 dark:border-white/10 transition-colors duration-300">

                    {/* LEFT SIDE */}
                    <div className="xl:w-[42%] bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 relative overflow-hidden">

                        {/* BG EFFECTS */}
                        <div className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full bg-black/10 blur-3xl"></div>

                        <div className="relative z-10 h-full flex flex-col justify-between p-10 lg:p-16 text-white">

                            {/* TOP */}
                            <div>

                                <div className="w-24 h-24 rounded-[28px] bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                                    <ShoppingBagIcon className="w-12 h-12" />
                                </div>

                                <h1 className="text-5xl 2xl:text-6xl font-black leading-tight mt-10 tracking-tight">
                                    Start Selling
                                    <br />
                                    with HelaHarvest
                                </h1>

                                <p className="mt-8 text-lg text-green-100 leading-relaxed max-w-xl">
                                    Join Sri Lanka’s fastest-growing marketplace and
                                    grow your local business with thousands of customers.
                                </p>

                                {/* FEATURES */}
                                <div className="mt-14 space-y-5">

                                    <FeatureCard
                                        emoji="🚚"
                                        title="Islandwide Delivery"
                                        desc="Deliver products all around Sri Lanka"
                                    />

                                    <FeatureCard
                                        emoji="📈"
                                        title="Grow Your Income"
                                        desc="Reach more customers and increase sales"
                                    />

                                    <FeatureCard
                                        emoji="🔒"
                                        title="Trusted Platform"
                                        desc="Safe and secure seller ecosystem"
                                    />

                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="pt-10 border-t border-white/10">

                                <p className="text-sm text-green-100">
                                    Trusted by local farmers, grocery stores, and vendors.
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <div className="flex -space-x-3">
                                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
                                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
                                        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white"></div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-lg">2,500+</h4>

                                        <p className="text-sm text-green-100">
                                            Active sellers
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex-1 bg-white dark:bg-[#111827] transition-colors duration-300">

                        <div className="h-full flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 2xl:px-24">

                            {/* HEADER */}
                            <div className="mb-10">

                                <h2 className="text-4xl 2xl:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                    Create Seller Account
                                </h2>

                                <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg">
                                    Fill in your information to continue
                                </p>

                            </div>

                            {/* FORM */}
                            <form onSubmit={submit} className="space-y-8">

                                {/* PROFILE */}
                                <div className="flex justify-center xl:justify-start">

                                    <div className="relative group">

                                        <div className="w-36 h-36 rounded-[32px] border-2 border-dashed border-green-200 dark:border-white/15 overflow-hidden bg-gray-50 dark:bg-[#1f2937] flex items-center justify-center group-hover:border-green-500 transition-all duration-300">

                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <UserIcon className="w-16 h-16 text-gray-300 dark:text-gray-500" />
                                            )}

                                        </div>

                                        <label className="absolute -bottom-3 -right-3 bg-green-600 hover:bg-green-700 p-4 rounded-2xl shadow-2xl cursor-pointer transition active:scale-95">

                                            <CameraIcon className="w-6 h-6 text-white" />

                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>

                                    </div>

                                </div>

                                {/* INPUTS */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

                                    {/* NAME */}
                                    <InputWrapper label="Full Name" error={errors.name}>

                                        <div className="relative">

                                            <UserIcon className="input-icon" />

                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData('name', e.target.value)
                                                }
                                                placeholder="John Doe"
                                                className="input-field pl-14"
                                            />
                                        </div>

                                    </InputWrapper>

                                    {/* SHOP */}
                                    <InputWrapper label="Shop Name" error={errors.shop_name}>

                                        <div className="relative">

                                            <BuildingStorefrontIcon className="input-icon" />

                                            <input
                                                type="text"
                                                value={data.shop_name}
                                                onChange={(e) =>
                                                    setData('shop_name', e.target.value)
                                                }
                                                placeholder="My Grocery Shop"
                                                className="input-field pl-14"
                                            />
                                        </div>

                                    </InputWrapper>

                                    {/* EMAIL */}
                                    <div className="xl:col-span-2">

                                        <InputWrapper label="Email Address" error={errors.email}>

                                            <div className="relative">

                                                <EnvelopeIcon className="input-icon" />

                                                <input
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData('email', e.target.value)
                                                    }
                                                    placeholder="example@gmail.com"
                                                    className="input-field pl-14"
                                                />
                                            </div>

                                        </InputWrapper>

                                    </div>

                                    {/* DISTRICT */}
                                    <InputWrapper label="District">

                                        <div className="relative">

                                            <MapPinIcon className="input-icon" />

                                            <select
                                                value={data.district}
                                                onChange={(e) => {
                                                    setData('district', e.target.value);
                                                    setData('city', '');
                                                }}
                                                className="input-field pl-14 appearance-none"
                                            >
                                                <option value="">
                                                    Select District
                                                </option>

                                                {Object.keys(locations)
                                                    .sort()
                                                    .map((district) => (
                                                        <option
                                                            key={district}
                                                            value={district}
                                                        >
                                                            {district}
                                                        </option>
                                                    ))}
                                            </select>

                                        </div>

                                    </InputWrapper>

                                    {/* CITY */}
                                    <InputWrapper label="City">

                                        <div className="relative">

                                            <MapPinIcon className="input-icon" />

                                            <select
                                                value={data.city}
                                                disabled={!data.district}
                                                onChange={(e) =>
                                                    setData('city', e.target.value)
                                                }
                                                className="input-field pl-14 appearance-none disabled:opacity-50"
                                            >
                                                <option value="">
                                                    Select City
                                                </option>

                                                {data.district &&
                                                    locations[data.district]
                                                        .sort()
                                                        .map((city) => (
                                                            <option
                                                                key={city}
                                                                value={city}
                                                            >
                                                                {city}
                                                            </option>
                                                        ))}
                                            </select>

                                        </div>

                                    </InputWrapper>

                                    {/* PASSWORD */}
                                    <InputWrapper label="Password">

                                        <div className="relative">

                                            <LockClosedIcon className="input-icon" />

                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData('password', e.target.value)
                                                }
                                                placeholder="********"
                                                className="input-field pl-14"
                                            />
                                        </div>

                                    </InputWrapper>

                                    {/* CONFIRM */}
                                    <InputWrapper label="Confirm Password">

                                        <div className="relative">

                                            <LockClosedIcon className="input-icon" />

                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="********"
                                                className="input-field pl-14"
                                            />
                                        </div>

                                    </InputWrapper>

                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-[68px] rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-lg shadow-[0_15px_35px_rgba(34,197,94,0.25)] transition-all duration-300 active:scale-[0.99] disabled:opacity-70"
                                >
                                    {processing ? 'Creating Account...' : 'Create Seller Account'}
                                </button>

                                {/* LOGIN */}
                                <p className="text-center text-gray-500 dark:text-gray-400 text-base">

                                    Already have an account?

                                    <Link
                                        href="/login"
                                        className="ml-2 font-bold text-green-600 hover:text-green-500"
                                    >
                                        Sign In
                                    </Link>

                                </p>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* STYLES */}
            <style>{`
                .input-field{
                    width:100%;
                    height:68px;
                    border-radius:22px;
                    border:1px solid #e5e7eb;
                    background:#f9fafb;
                    padding-right:20px;
                    font-size:16px;
                    font-weight:500;
                    outline:none;
                    transition:all .25s ease;
                    color:#111827;
                }

                .dark .input-field{
                    background:#1f2937;
                    border-color:rgba(255,255,255,.08);
                    color:white;
                }

                .input-field::placeholder{
                    color:#9ca3af;
                }

                .dark .input-field::placeholder{
                    color:#6b7280;
                }

                .input-field:focus{
                    background:white;
                    border-color:#22c55e;
                    box-shadow:0 0 0 5px rgba(34,197,94,.12);
                }

                .dark .input-field:focus{
                    background:#111827;
                    border-color:#22c55e;
                }

                .input-icon{
                    position:absolute;
                    left:18px;
                    top:22px;
                    width:22px;
                    height:22px;
                    color:#9ca3af;
                }

                .dark .input-icon{
                    color:#6b7280;
                }
            `}</style>
        </>
    );
}

/* FEATURE CARD */
function FeatureCard({ emoji, title, desc }) {
    return (
        <div className="flex items-center gap-5 bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">

            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
                {emoji}
            </div>

            <div>
                <h4 className="font-bold text-lg">
                    {title}
                </h4>

                <p className="text-green-100 text-sm">
                    {desc}
                </p>
            </div>

        </div>
    );
}

/* INPUT WRAPPER */
function InputWrapper({ label, error, children }) {
    return (
        <div className="space-y-3">

            <label className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 ml-1">
                {label}
            </label>

            {children}

            {error && (
                <p className="text-red-500 text-sm ml-1">
                    {error}
                </p>
            )}

        </div>
    );
}
