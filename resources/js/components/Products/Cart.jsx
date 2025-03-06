import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({
        originalPrice: 0, tax: 0, total: 0,
    });
    const TAX_RATE = 0.1; // Example tax rate
    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        loadCart();
    };

    // Load cart items on mount
    const loadCart = async () => {
        try {
            const response = await fetch('/carrito');
            const data = await response.json();
            setCartItems(data.items);
            calculateTotals(data.items);
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    // Actualizar la cantidad del producto en el carrito en el backend
    const updateCartItemQuantity = async (productoId, cantidad) => {
        try {
            const response = await fetch('/carrito/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productoId, cantidad }),
            });
            const data = await response.json();

            if (!data.success) {
                console.error("Error al actualizar la cantidad del producto:", data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        loadCart()
    };

    // Incrementar cantidad
    const incrementQuantity = (productoId) => {
        const updatedItems = cartItems.map((item) =>
            item.productoId === productoId
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        );
        setCartItems(updatedItems);
        calculateTotals(updatedItems);

        // Llamada a la función para actualizar la cantidad en el backend
        const updatedItem = updatedItems.find((item) => item.productoId === productoId);
        updateCartItemQuantity(productoId, updatedItem.cantidad);
        loadCart()
    };

    // Decrementar cantidad
    const decrementQuantity = (productoId) => {
        const updatedItems = cartItems.map((item) =>
            item.productoId === productoId && item.cantidad > 1
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
        );
        setCartItems(updatedItems);
        calculateTotals(updatedItems);

        // Llamada a la función para actualizar la cantidad en el backend
        const updatedItem = updatedItems.find((item) => item.productoId === productoId);
        if (updatedItem.cantidad > 0) {
            updateCartItemQuantity(productoId, updatedItem.cantidad);
        }
        loadCart()
    };

    // Eliminar producto del carrito
    const deleteProductFromCart = async (productoId) => {
        // Filtrar el producto a eliminar
        const updatedItems = cartItems.filter((item) => item.productoId !== productoId);
        setCartItems(updatedItems);
        calculateTotals(updatedItems);
        try {
            // Llamada al backend para eliminar el producto
            const response = await fetch(`/carrito/delete/${productoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productoId }),
            });

            const data = await response.json();

            if (!data.success) {
                console.error("Error al eliminar el producto del carrito:", data.error);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        loadCart()
    };


    // Calcular totales
    const calculateTotals = (items) => {
        const originalPrice = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const tax = originalPrice * TAX_RATE;
        const total = originalPrice + tax;
        setTotals({ originalPrice, tax, total });
    };


    return (
        <div>
            <button onClick={toggleCart} className="fixed bottom-4 right-4 text-white p-2 rounded-full shadow-lg backdrop-blur-3xl bg-green-800 dark:bg-green-600">
                {/* Cart icon SVG */}
                <svg className="w-8 h-8 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                </svg>
            </button>

            <div className={`fixed inset-0 bg-neutral-900 bg-opacity-70 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart}></div>

            {/* Cart container */}
            <div className={`fixed top-0 pt-14 right-0 z-40 h-screen p-4 overflow-y-auto no-scrollbar transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} w-80 backdrop-blur-3xl bg-white/70 dark:bg-neutral-800/10`} tabIndex="-1">
                <div className="flex items-center justify-between p-2">
                    <h5 className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400">
                        {/* Cart icon */}
                        <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        Shopping Cart
                    </h5>
                    <button onClick={toggleCart} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>

                <div className="mt-8 no-scrollbar">
                    <div className="flow-root">
                        <ul role="list" id="product-list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.productoId} className="flex items-center py-6">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-400 dark:border-gray-200">
                                        <img src={item.foto_prod} alt={item.nombre_prod} className="h-full w-full object-cover object-center" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                                                <h3><a href="#">{item.nombre_prod}</a></h3>
                                                <p className="ml-4">${(item.precio * item.cantidad).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">{item.color}</p>
                                        </div>
                                        <div className="flex items-end justify-between text-sm">
                                            <div className="flex items-center">
                                                <button onClick={() => decrementQuantity(item.productoId)} className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                                    <svg className="h-2 w-2 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" className="w-8 border-0 bg-transparent text-center text-sm font-light text-gray-900 dark:text-white" value={item.cantidad} readOnly />
                                                <button onClick={() => incrementQuantity(item.productoId)} className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                                                    <svg className="h-2 w-2 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <button onClick={() => deleteProductFromCart(item.productoId)} className="font-medium text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-700">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 space-y-3 border-t border-gray-200 pt-6 dark:border-gray-500">
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                        <p>Original Price:</p>
                        <p>${totals.originalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                        <p>Tax:</p>
                        <p>${totals.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-200">
                        <p>Total:</p>
                        <p>${totals.total.toFixed(2)}</p>
                    </div>
                    <div className="mt-8">
                        <a href="producto/pago" className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">Checkout</a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or <button onClick={toggleCart} className="font-medium text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-700">Continue Shopping</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
