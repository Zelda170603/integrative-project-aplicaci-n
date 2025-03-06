import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/Layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        nombre: '',
        foto_fabr: null,
        ubicacion: '',
        descripcion: '',
        direccion: '',
        google_map_direction: '',
        telefono: '',
    });

    const submit = (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        post(route('fabricantes.store'), {
            data: formData,
            onFinish: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register as Manufacturer" />
            <div className="flex min-h-full justify-center py-8 sm:px-6 lg:px-8">
                <div className=" rounded-xl shadow-sm  bg-neutral-900 ">
                    <div className="p-4 sm:p-7">
                        <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">Registro de fabricantes</h1>
                        <form onSubmit={submit} encType="multipart/form-data" className='md:grid grid-cols-2 gap-4 mt-4'>
                            {/* User Data */}
                            <div>
                                <h2 className="text-xl font-bold my-4 text-gray-200">Datos Usuario</h2>
                                <div className='mb-4 '>
                                    <InputLabel htmlFor="email" value="Email" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className='mb-4 '>
                                    <InputLabel htmlFor="password" value="Password" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                            </div>
                            <div>
                                {/* Manufacturer Data */}
                                <h2 className="text-xl text-gray-200 font-bold   my-4">Datos de fabricante</h2>
                                <div>
                                    <InputLabel htmlFor="nombre" value="Manufacturer Name" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="nombre"
                                        name="nombre"
                                        value={data.nombre}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="foto_fabr" value="Photo" className='block text-sm mb-2 dark:text-white' />
                                    <input
                                        type="file"
                                        name="foto_fabr"
                                        id="foto_fabr"
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('foto_fabr', e.target.files[0])}
                                    />
                                    <InputError message={errors.foto_fabr} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="ubicacion" value="Location" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="ubicacion"
                                        name="ubicacion"
                                        value={data.ubicacion}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('ubicacion', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.ubicacion} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="direccion" value="Address" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="direccion"
                                        name="direccion"
                                        value={data.direccion}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('direccion', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.direccion} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="telefono" value="Phone" className='block text-sm mb-2 dark:text-white' />
                                    <TextInput
                                        id="telefono"
                                        name="telefono"
                                        value={data.telefono}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('telefono', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.telefono} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="descripcion" value="Description" className='block text-sm mb-2 dark:text-white' />
                                    <textarea
                                        id="descripcion"
                                        name="descripcion"
                                        value={data.descripcion}
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.descripcion} className="mt-2" />
                                </div>
                            </div>
                            <div className="mt-4 col-span-2 flex justify-center">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Registrarse como fabricante
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
