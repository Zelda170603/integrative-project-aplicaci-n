import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Layouts/Layout';

const Edit = ({ producto }) => {

    const { data, setData, errors } = useForm({
        nombre_prod: producto.nombre_prod,
        descripcion: producto.descripcion,
        precio: producto.precio,
        color: producto.color,
        grupo_usuarios: producto.grupo_usuarios,
        existencias: producto.existencias,
        tipo_producto: producto.tipo_producto,
        foto_prod: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/productos/${producto.id}`, data);
    };

    return (
        <Layout>
            <div className="p-4 sm:p-7">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Actualizar Producto
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Llena los campos para actualizar el producto seleccionado
                </p>
                <div className="mt-5">
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="nombre_prod">Nombre</label>
                            <input
                                type="text"
                                name="nombre_prod"
                                value={data.nombre_prod}
                                onChange={handleChange}
                                className={`border ${errors.nombre_prod ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.nombre_prod && <span className="text-red-500 text-sm">{errors.nombre_prod}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="foto_prod">Foto del Producto</label>
                            <input
                                type="file"
                                id="foto_prod"
                                name="foto_prod"
                                accept="image/*"
                                onChange={handleChange}
                                className=" w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                            />
                            {errors.foto_prod && <span className="text-red-500 text-sm">{errors.foto_prod}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="descripcion">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={data.descripcion}
                                onChange={handleChange}
                                className={`border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.descripcion && <span className="text-red-500 text-sm">{errors.descripcion}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="precio">Precio</label>
                            <input
                                type="number"
                                name="precio"
                                value={data.precio}
                                onChange={handleChange}
                                className={`border ${errors.precio ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.precio && <span className="text-red-500 text-sm">{errors.precio}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="color">Color</label>
                            <input
                                type="text"
                                name="color"
                                value={data.color}
                                onChange={handleChange}
                                className={`border ${errors.color ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.color && <span className="text-red-500 text-sm">{errors.color}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="grupo_usuarios">Grupo de usuarios</label>
                            <input
                                type="text"
                                name="grupo_usuarios"
                                value={data.grupo_usuarios}
                                onChange={handleChange}
                                className={`border ${errors.grupo_usuarios ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.grupo_usuarios && <span className="text-red-500 text-sm">{errors.grupo_usuarios}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="existencias">Existencias</label>
                            <input
                                type="number"
                                name="existencias"
                                value={data.existencias}
                                onChange={handleChange}
                                className={`border ${errors.existencias ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            />
                            {errors.existencias && <span className="text-red-500 text-sm">{errors.existencias}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-white" htmlFor="tipo_producto">Tipo</label>
                            <select
                                name="tipo_producto"
                                value={data.tipo_producto}
                                onChange={handleChange}
                                className={`border ${errors.tipo_producto ? 'border-red-500' : 'border-gray-300'} w-full py-3 px-4 mt-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white`}
                            >
                                <option value="protesis">Prótesis</option>
                                <option value="ortesis">Ortesis</option>
                                <option value="ortopedicos">Ortopédicos</option>
                            </select>
                            {errors.tipo_producto && <span className="text-red-500 text-sm">{errors.tipo_producto}</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                        >
                            Actualizar Producto
                        </button>
                    </form>
                </div>
            </div></Layout>);
};

export default Edit;
