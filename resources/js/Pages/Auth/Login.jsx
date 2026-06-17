import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword, captchaUrl }) {
    const [currentCaptchaUrl, setCurrentCaptchaUrl] = useState(captchaUrl);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        captcha: '',
    });

    const refreshCaptcha = async () => {
        try {
            const response = await fetch('/refresh-captcha');
            const resData = await response.json();
            setCurrentCaptchaUrl(resData.captcha);
            setData('captcha', ''); // Clear captcha input
        } catch (err) {
            console.error('Failed to refresh captcha', err);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            onError: () => refreshCaptcha(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk" />

            <div className="auth-title-container">
                <h2>Portal Masuk</h2>
                <p>Sistem Manajemen Aset</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Captcha Section */}
                <div className="mt-4">
                    <InputLabel htmlFor="captcha" value="Kode Verifikasi" />
                    <div className="captcha-row">
                        <TextInput
                            id="captcha"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="captcha"
                            value={data.captcha}
                            className="captcha-input"
                            onChange={(e) => setData('captcha', e.target.value)}
                            placeholder="Masukkan kode"
                            required
                        />
                        <div className="captcha-image-wrapper">
                            <img
                                src={currentCaptchaUrl}
                                alt="Captcha"
                            />
                            <button
                                type="button"
                                onClick={refreshCaptcha}
                                className="flex items-center justify-center p-2 rounded-md hover:bg-white/10 text-white transition"
                                title="Perbarui Captcha"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <InputError message={errors.captcha} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="remember-text">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                <div className="auth-actions-container">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                        >
                            Lupa kata sandi?
                        </Link>
                    )}

                    <PrimaryButton disabled={processing}>
                        Masuk
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
