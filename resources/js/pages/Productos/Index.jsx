import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import AddToCartButton from '@/components/Products/AddToCartButton';
import Cart from '@/components/Products/Cart';

const Index = ({ productos }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [cartItems, setCartItems] = useState([]); // Estado para el carrito

    const handleSearch = async (e) => {
        const value = e.target.value.trim();
        setSearchTerm(value);

        if (value.length === 0) {
            setResults([]); // Clear results if the input is empty
            setShowResults(false); // Hide results
            return;
        }

        try {
            const response = await fetch('/productos/searchByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm: value })
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.html);
                setShowResults(true);
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Request failed', error);
        }
    };

    // Función para actualizar el carrito
    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    return (
        <Layout>
            {/* Card */}
            <div class="mb-4 items-center justify-between space-y-4 md:flex sm:space-y-0 gap-y-4 md:mb-8">
                <h2 class="mt-3 text-xl sm:mb-4 font-semibold text-gray-900 dark:text-white md:text-3xl">Lista de Productos
                </h2>
                <div class="flex flex-col sm:flex-row items-center relative gap-2">
                    <div class="flex flex-row w-full gap-2">
                        <button
                            class="flex w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium   focus:z-10 focus:outline-none focus:ring-4    border-neutral-600 bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:ring-gray-700 sm:w-auto"
                            type="button" id="openFiltersButton">
                            <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                    d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                            </svg>
                            Filtros
                            <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>
                        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button"
                            class="flex w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium   focus:z-10 focus:outline-none focus:ring-4    border-neutral-600 bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:ring-gray-700 sm:w-auto">
                            <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                            </svg>
                            Sort
                            <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-row w-full">
                            <input
                                type="text"
                                id="search-bar"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="flex w-full items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:ring-neutral-700"
                                placeholder="Search products..."
                                required
                            />
                        </div>
                        {showResults && (
                            <div
                                id="search-result"
                                className="absolute right-0 top-12 max-h-64 overflow-scroll no-scrollbar text-sm rounded-lg block w-full p-6 bg-neutral-700 border-neutral-600 placeholder-neutral-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                dangerouslySetInnerHTML={{ __html: results }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
            <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                {productos.map((producto) => (
                    <div
                        class="rounded-lg border p-6 shadow-sm border-gray-700 bg-neutral-800">
                        <div class="h-56 w-full">
                            <a>
                                <img class="mx-auto h-full dark:hidden"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg"
                                    alt="" />
                                <img class="mx-auto hidden h-full dark:block"
                                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg"
                                    alt="" />
                            </a>
                        </div>

                        <div class="pt-6">
                            <div class="mb-4 flex items-center justify-between gap-4">
                                <span
                                    class="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                    {producto.grupo_usuarios} </span>

                                <div class="flex items-center justify-end gap-1">
                                    <button type="button" data-tooltip-target="tooltip-quick-look-5"
                                        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only"> Quick look </span>
                                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="2"
                                                d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                            <path stroke="currentColor" stroke-width="2"
                                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-quick-look-5" role="tooltip"
                                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                        data-popper-placement="top">
                                        Quick look
                                        <div class="tooltip-arrow" data-popper-arrow=""></div>
                                    </div>

                                    <button type="button" data-tooltip-target="tooltip-add-to-favorites-5"
                                        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only"> Add to Favorites </span>
                                        <svg class="h-5 w-5" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round"
                                                stroke-linejoin="round" stroke-width="2"
                                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-add-to-favorites-5" role="tooltip"
                                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                                        data-popper-placement="top">
                                        Add to favorites
                                        <div class="tooltip-arrow" data-popper-arrow=""></div>
                                    </div>
                                </div>
                            </div>

                            <a href="#"
                                class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{producto.nombre_prod}</a>

                            <div class="mt-2 flex items-center gap-2">
                                <div class="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <svg
                                            key={i}
                                            className="h-4 w-4 text-yellow-400 " aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>


                            <ul class="mt-2 flex items-center gap-4">
                                <li class="flex items-center gap-2">
                                    <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2"
                                            d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
                                    </svg>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{producto.tipo_producto}
                                    </p>
                                </li>

                                <li class="flex items-center gap-2">
                                    <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                    </svg>
                                    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{producto.color}
                                    </p>
                                </li>
                            </ul>

                            <div class="mt-4 flex items-center justify-between gap-4">
                                <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                                    C${producto.precio}</p>

                                {/* Pasar la función addToCart como prop */}
                                <AddToCartButton productId={producto.id} onAddToCart={addToCart} /> 
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <Cart items={cartItems} /> 
        </Layout>
    );
};

export default Index;
