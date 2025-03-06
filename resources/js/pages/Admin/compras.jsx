import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';

const OrderHistory = ({ compras }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserProfileClick = (user) => {
        setSelectedUser(user);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setSelectedUser(null);
    };

    return (
        <Layout>
            <div className="mx-auto max-w-7xl lg:px-8 my-4">
                <div className="mx-auto lg:max-w-4xl lg:px-0 mb-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Historial de compras en la aplicacion</h1>
                    <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
                        Revisa el estado de las ordenes, gestiona devoluciones.
                    </p>
                </div>
                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    {compras.length === 0 ? (
                        <div className="mx-auto w-full text-center text-gray-500 dark:text-gray-400">
                            <p className="text-lg">No hay compras realizadas.</p>
                        </div>
                    ) : (
                        Object.keys(compras).map(compraId => (
                            <div key={compraId} className="mb-4 p-4 border border-neutral-700 rounded-lg gap-4 bg-neutral-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-4 text-neutral-200">
                                        <h2 className="text-lg font-semibold mb-2">Orden #{compras[compraId][0].compra.id}</h2>
                                        <p>Fecha de la compra: {new Date(compras[compraId][0].compra.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <button 
                                        onClick={() => handleUserProfileClick(compras[compraId][0].compra.User)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        User Profile
                                    </button>
                                </div>
                                <ul className="mb-4">
                                    {compras[compraId].map((compraProducto) => (
                                        <li key={compraProducto.id} className="rounded-lg border mt-4 p-4 shadow-sm border-neutral-700 bg-neutral-800 md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img className="h-20 w-20 dark:hidden" src={`/storage/images/product_pictures/${compraProducto.producto.foto_prod}`} alt={`${compraProducto.producto.nombre_prod} image`} />
                                                    <img className="hidden h-20 w-20 dark:block" src={`/storage/images/product_pictures/${compraProducto.producto.foto_prod}`} alt={`${compraProducto.producto.nombre_prod} image`} />
                                                </a>
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 ">
                                                    <div className="flex items-center justify-between">
                                                        <a href="#" className="text-base font-medium text-gray-900 dark:text-white">{compraProducto.producto.nombre_prod}</a>
                                                        <div className='flex items-center justify-between gap-4'>
                                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                                ${compraProducto.producto.precio}
                                                            </p>
                                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                                Cantidad: {compraProducto.cantidad}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-start gap-4">
                                                        <p className="text-base font-normal text-gray-900 dark:text-gray-200">
                                                            Hay un contenido de ti que no lo puedo borrar
                                                            No lo puedo borrar, baby
                                                            Anoche no me pude aguantar, lo tuve que mirar
                                                            Me empecé a tocar recordando
                                                            Puede que te borre' el tattoo del nombre mío
                                                            Pero han sido muchas sábana' mojá' que son testigo'
                                                            Ahora nuestro amor es de un autor desconocido
                                                            Como si nunca hubiera existido
                                                            {compraProducto.producto.nombre_prod}
                                                        </p>
                                                        <div className="flex gap-4">
                                                            <span className="me-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-normal text-green-800 dark:bg-green-900 dark:text-green-300">
                                                                {compraProducto.producto.tipo_producto}
                                                            </span>
                                                            <span className="me-2 max-w-full rounded bg-blue-100 px-2 py-0.5 text-xs font-normal text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                                {compraProducto.producto.color}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                    <div className="flex gap-2 items-start mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-green-500">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {compras[compraId][0].status} <time dateTime={compras[compraId][0].compra.created_at}>{new Date(compras[compraId][0].compra.created_at).toLocaleDateString()}</time>
                                        </p>
                                    </div>
                                </ul>
                            </div>
                        ))
                    )}
                </div>
                {/* Popup para el perfil de usuario */}
                {isOpen && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
                            <h2 className="text-lg font-semibold mb-2">Perfil de Usuario</h2>
                            <div className="flex flex-col items-center">
                                <img className="h-32 w-32 rounded-full" src={`/storage/images/profile_pictures/${selectedUser.profile_picture}`} alt={selectedUser.name} />
                                <p className="mt-2 font-bold">{selectedUser.name}</p>
                                <p>{selectedUser.email}</p>
                                <p>{selectedUser.domicilio}</p>
                                <button onClick={closePopup} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default OrderHistory;
