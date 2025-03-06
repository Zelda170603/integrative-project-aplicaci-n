import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Layouts/Layout';

const Index = ({ prods }) => { 
    return (
        <Layout> 
            {/* Card */}
            <div className="flex flex-col pt-4">
                <div className=" overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Lista de Productos
                                    </h2>
                                </div>

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700" href="/fabricante/productos/create">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokewidth="2" strokelinecap="round" strokelinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                            Crear Producto
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-900">
                                    <tr>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">ID</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Nombre</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Descripción</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Precio</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Color</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Grupo Users</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Existencias</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Tipo</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Foto</th>
                                        <th className="px-6 py-3 text-end"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {prods.map((producto) => (
                                        <tr key={producto.id}>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.id}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.nombre_prod}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.descripcion}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.precio}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.color}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.grupo_usuarios}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.existencias}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{producto.tipo_producto}</td>
                                            <td className="px-6 py-3 text-center">
                                                    <img src={producto.foto_prod}  className="h-12 w-12 object-cover" />
                                            </td>
                                            <td className="px-6 py-3 text-end">
                                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href={`/fabricante/productos/${producto.id}/edit`}>
                                                    Editar
                                                </a>
                                                <button className="py-2 px-3 ml-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700" onClick={() => Inertia.delete(`/fabricante/productos/${producto.id}`)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
        </Layout>
    );
};

export default Index;
