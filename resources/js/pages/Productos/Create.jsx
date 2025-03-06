import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Layouts/Layout';


const Create = () => {
    const [formData, setFormData] = useState({
        nombre_prod: '',
        descripcion: '',
        precio: '',
        color: '',
        grupo_usuarios: '',
        existencias: '',
        tipo_producto: 'protesis',
        foto_prod: null,  // Single image
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle single image file
        if (files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],  // Save only one file
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nombre_prod', formData.nombre_prod);
        data.append('descripcion', formData.descripcion);
        data.append('precio', formData.precio);
        data.append('color', formData.color);
        data.append('grupo_usuarios', formData.grupo_usuarios);
        data.append('existencias', formData.existencias);
        data.append('tipo_producto', formData.tipo_producto);


        if (formData.foto_prod) {
            data.append('foto_prod', formData.foto_prod);
        }

        // Post data using Inertia and handle success or error
        Inertia.post('/fabricante/productos', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    };

    return (
        <Layout>


            <div className="p-4 sm:p-7">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Crear Producto
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Llena los campos para crear un nuevo producto
                </p>

                <div className="mt-5">
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="nombre">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre_prod"
                                name="nombre_prod"
                                value={formData.nombre_prod}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Nombre del producto"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="foto_prod">
                                Imagen del Producto
                            </label>
                            <input
                                type="file"
                                id="foto_prod"
                                name="foto_prod"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="descripcion">
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Descripción del producto"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="precio">
                                Precio
                            </label>
                            <input
                                type="number"
                                id="precio"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Precio del producto"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="color">
                                Color
                            </label>
                            <input
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Colores del producto"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="grupo_usuarios">
                                Grupo de Usuarios
                            </label>
                            <input
                                type="text"
                                id="grupo_usuarios"
                                name="grupo_usuarios"
                                value={formData.grupo_usuarios}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Grupo de usuarios"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="existencias">
                                Existencias
                            </label>
                            <input
                                type="number"
                                id="existencias"
                                name="existencias"
                                value={formData.existencias}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                                placeholder="Existencias"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="tipo_producto">
                                Tipo de Producto
                            </label>
                            <select
                                id="tipo_producto"
                                name="tipo_producto"
                                value={formData.tipo_producto}
                                onChange={handleChange}
                                className="w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                            >
                                <option value="protesis">Prótesis</option>
                                <option value="ortesis">Órtesis</option>
                                <option value="ortopedicos">Ortopédicos</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 mt-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                            Crear Producto
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Create;
