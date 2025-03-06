import React from "react";
import Layout from "@/Layouts/Layout";

const Compras = ({ compras = [] }) => { // Cambiado 'compra' a 'compras'
    console.log(compras);
    return (
        <Layout>
            <div className="pt-8">
                <div className="mx-auto lg:max-w-4xl lg:px-0">
                    <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">Historial de compras</h1>
                    <p className="mt-2 text-md text-neutral-500 dark:text-neutral-400">
                        Revisa el estado de las ordenes, gestiona devoluciones y descubre productos similares.
                    </p>
                </div>
            </div>
            <div className="mt-8">
                <div className="sm:px-2 lg:px-8">
                    <div className="mx-auto flex flex-col gap-4 sm:max-w-2xl sm:px-4 lg:max-w-4xl lg:px-0">
                        {compras.length === 0 ? (
                            <p className="text-center text-neutral-500 dark:text-neutral-400">No se encontraron órdenes.</p>
                        ) : (
                            compras.map((compra) => (
                                <div key={compra.id} className="border border-neutral-600 bg-white dark:bg-neutral-800 shadow-sm sm:rounded-lg">
                                    <div className="flex items-center border-b border-neutral-200 dark:border-neutral-600 p-4 sm:grid grid-cols-4 sm:gap-x-6 sm:p-6">
                                        <dl className="grid flex-1 grid-cols-3 gap-x-6 text-sm col-span-3">
                                            <div>
                                                <dt className="font-bold text-neutral-900 dark:text-neutral-400">Número de orden</dt>
                                                <dd className="mt-2 text-neutral-500">{compra.id}</dd>
                                            </div>
                                            <div>
                                                <dt className="font-bold text-neutral-900 dark:text-neutral-400">Fecha de la compra</dt>
                                                <dd className="mt-2 text-neutral-500">
                                                    <time dateTime={compra.created_at}>{new Date(compra.created_at).toLocaleDateString()}</time>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-bold text-neutral-900 dark:text-neutral-400">Total</dt>
                                                <dd className="mt-2 font-bold text-neutral-900 dark:text-neutral-400">${compra.total}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <ul role="list" className="divide-y divide-neutral-200 dark:divide-neutral-600">
                                        {(compra.compra_productos || []).map((compraProducto) => (
                                            <li key={compraProducto.id} className="sm:p-6 p-4">
                                                <div className="flex sm:items-start">
                                                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 sm:w-44 sm:h-44">
                                                        <img src={compraProducto.producto.foto_prod}
                                                            alt={compraProducto.producto.nombre_prod}
                                                            className="w-full h-full object-cover object-center" />
                                                    </div>
                                                    <div className="ml-4 w-full">
                                                        <div className="flex justify-between text-md font-medium text-neutral-700 dark:text-neutral-400">
                                                            <span>{compraProducto.producto.nombre_prod} x {compraProducto.cantidad}</span>
                                                            <p>${compraProducto.producto.precio}</p>
                                                        </div>
                                                        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                                                            {compraProducto.producto.descripcion}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mx-auto flex items-center justify-between space-x-2 mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                            fill="currentColor" className="w-6 h-6 text-green-500">
                                                            <path fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                                clipRule="evenodd" />
                                                        </svg>
                                                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                            Entregado el <time dateTime={compra.created_at}>{new Date(compra.created_at).toLocaleDateString()}</time>
                                                        </p>
                                                    </div>
                                                    <div className="font-medium flex items-center justify-center space-x-4">
                                                        <button className="text-neutral-600 pr-4 hover:text-neutral-900 border-r border-neutral-500 dark:text-neutral-400 dark:border-neutral-600">
                                                            Calificar
                                                        </button>
                                                        <a href={`/productos/${compraProducto.producto.id}`} className="text-neutral-600 pr-4 hover:text-neutral-900 border-r border-neutral-500 dark:text-neutral-400 dark:border-neutral-600">
                                                            Ver producto
                                                        </a>
                                                        <a href="#" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400">
                                                            Comprar de nuevo
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul> 
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Compras;
