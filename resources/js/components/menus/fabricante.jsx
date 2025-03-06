import React from "react";

export default function fabricante() {
    return (
        <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
            <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="/fabricante/productos" aria-current="page">
                Productos
            </a> 
            <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="/fabricante/productos/compras">
                Compras
            </a>
            <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="/fabricante/index">
                dashboard
            </a>
        </div>
    );
}