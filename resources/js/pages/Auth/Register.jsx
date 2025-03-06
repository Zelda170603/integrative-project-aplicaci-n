import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div class="flex min-h-full justify-center py-8 sm:px-6 lg:px-8">
                <div className="bg-white border max-w-sm border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                           

                            <div className="mt-5">
                               
                                <form onSubmit={submit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <InputLabel htmlFor="name" value="Name"  className='block text-sm mb-2 dark:text-white' />

                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div >
                                            <InputLabel htmlFor="email" value="Email"  className='block text-sm mb-2 dark:text-white'/>

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="password" value="Password"
                                             className='block text-sm mb-2 dark:text-white' />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel
                                                htmlFor="password_confirmation"
                                                value="Confirm Password"
                                                className='block text-sm mb-2 dark:text-white'
                                            />

                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                               className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData('password_confirmation', e.target.value)
                                                }
                                                required
                                            />

                                            <InputError
                                                message={errors.password_confirmation}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="mt-4 flex items-center justify-end">
                                            <Link
                                                href={route('login')}
                                                className="rounded-md text-sm text-gray-300 underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Already registered?
                                            </Link>

                                            <PrimaryButton className="ms-4" disabled={processing}>
                                                Register
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout >
    );
}
