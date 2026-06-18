import { useState } from 'react';
import Checkbox from '@/Components/ui/Checkbox';
import InputError from '@/Components/ui/InputError';
import Label from '@/Components/ui/Label';
import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthCard from '@/Components/auth/AuthCard';
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
        <GuestLayout><AuthCard>
            <Head title="Masuk" />

            <div className="text-center mb-6">
                <h2 className="font-serif text-2xl font-extrabold text-white mb-1">Portal Masuk</h2>
                <p className="text-xs font-semibold text-[#E8192C] tracking-widest uppercase">Sistem Manajemen Aset</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="email" value="Email" />

                    <Input
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
                    <Label htmlFor="password" value="Password" />

                    <Input
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
                    <Label htmlFor="captcha" value="Kode Verifikasi" />
                    <div className="flex items-center gap-3 mt-1.5 max-sm:flex-col max-sm:items-stretch">
                        <Input
                            id="captcha"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            name="captcha"
                            value={data.captcha}
                            className="flex-grow min-w-0"
                            onChange={(e) => setData('captcha', e.target.value)}
                            placeholder="Masukkan kode"
                            required
                        />
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 shrink-0 max-sm:justify-between max-sm:p-1.5">
                            <img
                                src={currentCaptchaUrl}
                                alt="Captcha"
                                className="h-9 w-auto rounded-lg object-contain px-2"
                            />
                            <button
                                type="button"
                                onClick={refreshCaptcha}
                                className="flex items-center justify-center p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
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
                        <span className="text-xs text-zinc-400 ml-2">
                            Ingat saya di perangkat ini
                        </span>
                    </label>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 max-sm:flex-col-reverse max-sm:items-stretch">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs text-zinc-400 hover:text-red-500 hover:underline transition-all duration-200 max-sm:text-center"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}

                    <Button disabled={processing} className="max-sm:w-full">
                        Masuk
                    </Button>
                </div>
            </form>
        </AuthCard></GuestLayout>
    );
}
