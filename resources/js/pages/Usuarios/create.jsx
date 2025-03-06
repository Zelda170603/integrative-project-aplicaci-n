import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Layouts/Layout';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        estado: 'activo',  // Por defecto se puede establecer como "activo"
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            email: formData.email,
            estado: formData.estado,
            password: formData.password,
        };

        // Enviar datos usando Inertia y manejar éxito o error
        Inertia.post('Admin/usuarios', data);
    };

    return (
        <Layout>
            <div className="p-4 sm:p-7">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Crear Usuario
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Llena los campos para crear un nuevo usuario
                </p>

                <div className="mt-5">
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="name">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Nombre del usuario"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Correo electrónico"
                                required
                            />
                        </div> 

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="estado">
                                Estado
                            </label>
                            <select
                                id="estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 mt-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                            Crear Usuario
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CreateUser;
