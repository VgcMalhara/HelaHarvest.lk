import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { locations } from '@/data/locations';
import { route } from 'ziggy-js';

import {
    CameraIcon,
    UserIcon,
    MapPinIcon,
    EnvelopeIcon,
    LockClosedIcon,
    BuildingStorefrontIcon,
    ArrowLeftIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function Edit({ seller }) {
    // දැනට ඩේටාබේස් එකේ තියෙන ඉමේජ් එක පෙන්වන්න සෙට් කිරීම
    const initialPreview = seller.seller_profile?.profile_image
        ? `/storage/${seller.seller_profile.profile_image}`
        : null;

    const [preview, setPreview] = useState(initialPreview);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Laravel Multipart FormData Bug එක මඟහරවා ගන්න අනිවාර්යයි!
        name: seller.name || '',
        email: seller.email || '',
        password: '',
        shop_name: seller.seller_profile?.shop_name || '',
        district: seller.seller_profile?.district || '',
        city: seller.seller_profile?.city || '',
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
        // File upload නිසා යවන්නේ POST එකක් විදිහට, හැබැයි Laravel හඳුනාගන්නේ PUT එකක් විදිහටයි
        post(route('admin.sellers.update', seller.id), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title={`Admin - Edit Seller: ${seller.name}`} />

            {/* MAIN BACKGROUND WITH DARK MODE */}
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] p-4 sm:p-6 lg:p-10 transition-colors duration-300">
                <div className="max-w-5xl mx-auto">

                    {/* TOP NAVIGATION BAR */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <Link
                                href={route('admin.sellers.index')}
                                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-600 dark:text-slate-400 dark:hover:text-green-400 transition-colors duration-200 mb-2"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                Back to Sellers List
                            </Link>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                                Edit Vendor Information
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                                Update the profile and business account details for <span className="font-semibold text-green-600 dark:text-green-400">{seller.name}</span>.
                            </p>
                        </div>
                    </div>

                    {/* MAIN FORM CARD */}
                    <form onSubmit={submit} className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                        <div className="p-6 sm:p-10">

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                                {/* LEFT COLUMN: VENDOR IMAGE PREVIEW & UPLOAD */}
                                <div className="flex flex-col items-center pt-4">
                                    <span className="text-sm font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-4">
                                        Vendor Image
                                    </span>

                                    <div className="relative group">
                                        <div className="w-40 h-40 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-slate-700 overflow-hidden bg-gray-50 dark:bg-[#111827] flex items-center justify-center group-hover:border-green-500 dark:group-hover:border-green-400 transition-all duration-300">
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <UserIcon className="w-16 h-16 text-gray-300 dark:text-slate-600" />
                                            )}
                                        </div>

                                        <label className="absolute -bottom-2 -right-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 p-3.5 rounded-2xl shadow-lg cursor-pointer transition active:scale-95">
                                            <CameraIcon className="w-5 h-5 text-white" />
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>

                                    {errors.profile_image && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-3 text-center font-medium">{errors.profile_image}</p>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: ALL FORM TEXT FIELDS */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                        {/* FULL NAME */}
                                        <InputWrapper label="Full Name" error={errors.name}>
                                            <div className="relative">
                                                <UserIcon className="input-icon" />
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    placeholder="Seller's Full Name"
                                                    className="input-field pl-12"
                                                />
                                            </div>
                                        </InputWrapper>

                                        {/* SHOP NAME */}
                                        <InputWrapper label="Shop Name" error={errors.shop_name}>
                                            <div className="relative">
                                                <BuildingStorefrontIcon className="input-icon" />
                                                <input
                                                    type="text"
                                                    value={data.shop_name}
                                                    onChange={(e) => setData('shop_name', e.target.value)}
                                                    placeholder="Business / Shop Name"
                                                    className="input-field pl-12"
                                                />
                                            </div>
                                        </InputWrapper>

                                        {/* EMAIL ADDRESS */}
                                        <div className="sm:col-span-2">
                                            <InputWrapper label="Email Address" error={errors.email}>
                                                <div className="relative">
                                                    <EnvelopeIcon className="input-icon" />
                                                    <input
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        placeholder="vendor@example.com"
                                                        className="input-field pl-12"
                                                    />
                                                </div>
                                            </InputWrapper>
                                        </div>

                                        {/* DISTRICT DROPDOWN */}
                                        <InputWrapper label="District" error={errors.district}>
                                            <div className="relative">
                                                <MapPinIcon className="input-icon" />
                                                <select
                                                    value={data.district}
                                                    onChange={(e) => {
                                                        setData('district', e.target.value);
                                                        setData('city', '');
                                                    }}
                                                    className="input-field pl-12 appearance-none"
                                                >
                                                    <option value="" className="dark:bg-[#1e293b]">Select District</option>
                                                    {Object.keys(locations).sort().map((district) => (
                                                        <option key={district} value={district} className="dark:bg-[#1e293b]">
                                                            {district}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </InputWrapper>

                                        {/* CITY DROPDOWN */}
                                        <InputWrapper label="City" error={errors.city}>
                                            <div className="relative">
                                                <MapPinIcon className="input-icon" />
                                                <select
                                                    value={data.city}
                                                    disabled={!data.district}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    className="input-field pl-12 appearance-none disabled:opacity-50 dark:disabled:bg-slate-800/50"
                                                >
                                                    <option value="" className="dark:bg-[#1e293b]">Select City</option>
                                                    {data.district && locations[data.district].sort().map((city) => (
                                                        <option key={city} value={city} className="dark:bg-[#1e293b]">
                                                            {city}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </InputWrapper>

                                        {/* OPTIONAL PASSWORD */}
                                        <div className="sm:col-span-2">
                                            <InputWrapper
                                                label="Update Password (Leave blank to keep current)"
                                                error={errors.password}
                                            >
                                                <div className="relative">
                                                    <LockClosedIcon className="input-icon" />
                                                    <input
                                                        type="text"
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        placeholder="Enter new password if you want to change it"
                                                        className="input-field pl-12"
                                                    />
                                                </div>
                                            </InputWrapper>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* FOOTER ACTION BUTTONS */}
                        <div className="bg-gray-50 dark:bg-[#1e293b] px-6 py-5 sm:px-10 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 border-t border-gray-100 dark:border-slate-800">
                            <Link
                                href={route('admin.sellers.index')}
                                className="w-full sm:w-auto h-14 px-6 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto h-14 px-8 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-70"
                            >
                                <ArrowPathIcon className={`w-5 h-5 ${processing ? 'animate-spin' : ''}`} />
                                {processing ? 'Updating...' : 'Update Seller Details'}
                            </button>
                        </div>
                    </form>

                </div>
            </div>

            {/* HIGH-QUALITY TAILWIND CUSTOM CLASSES FOR LIGHT & DARK THEMING */}
            <style>{`
                .input-field {
                    width: 100%;
                    height: 56px;
                    border-radius: 14px;
                    border: 1px solid #e2e8f0;
                    background: #ffffff;
                    padding-right: 20px;
                    font-size: 15px;
                    font-weight: 500;
                    outline: none;
                    transition: all .2s ease;
                    color: #0f172a;
                }
                .dark .input-field {
                    background: #111827;
                    border-color: #334155;
                    color: #f8fafc;
                }
                .input-field::placeholder { color: #94a3b8; }
                .dark .input-field::placeholder { color: #475569; }

                .input-field:focus {
                    border-color: #22c55e;
                    box-shadow: 0 0 0 4px rgba(34,197,94,.15);
                }
                .dark .input-field:focus {
                    border-color: #4ade80;
                    box-shadow: 0 0 0 4px rgba(74,222,128,.15);
                }
                .input-icon {
                    position: absolute; left: 14px; top: 17px; width: 20px; height: 20px;
                    color: #94a3b8; transition: color .2s ease;
                }
                .dark .input-icon { color: #475569; }
                .relative:focus-within .input-icon { color: #22c55e; }
                .dark .relative:focus-within .input-icon { color: #4ade80; }
            `}</style>
        </>
    );
}

/* INPUT COMPONENT WRAPPER FOR LESS CODE DUPLICATION */
function InputWrapper({ label, error, children }) {
    return (
        <div className="flex flex-col space-y-2 w-full">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 ml-1">
                {label}
            </label>
            {children}
            {error && <p className="text-red-500 dark:text-red-400 text-xs ml-1 font-medium">{error}</p>}
        </div>
    );
}
