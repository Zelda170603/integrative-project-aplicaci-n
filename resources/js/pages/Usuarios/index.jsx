import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Layouts/Layout';

const UserIndex = ({ usuarios }) => { 
    return (
        <Layout>
            {/* Card */}
            <div className="flex flex-col pt-4">
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                        Lista de Usuarios
                                    </h2>
                                </div>

                                <div>
                                    <div className="inline-flex gap-x-2">
                                        <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700" href="/Admin/usuarios/create">
                                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                            Crear Usuario
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-900">
                                    <tr>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">ID</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Nombre</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Email</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Estado</th>
                                        <th className="px-6 py-3 text-start text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Rol</th>
                                        <th className="px-6 py-3 text-end"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id}>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{usuario.id}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{usuario.name}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{usuario.email}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{usuario.estado}</td>
                                            <td className="px-6 py-3 text-sm text-gray-600 dark:text-neutral-400">{usuario.role ? usuario.role.role_type : 'N/A'}</td>
                                            <td className="px-6 py-3 text-end">
                                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href={`/Admin/usuarios/${usuario.id}/edit`}>
                                                    Editar
                                                </a>
                                                <button className="py-2 px-3 ml-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700" onClick={() => Inertia.delete(`/Admin/usuarios/${usuario.id}`)}>
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

export default UserIndex;
