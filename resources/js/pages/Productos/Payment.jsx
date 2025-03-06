import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react'; // Make sure to import usePage
import Layout from '@/Layouts/Layout';

const Payment = (props) => {  
    const { carritos, subtotal, tax, total } = props; // Destructure props here

    useEffect(() => {
        // Cargar el script de PayPal SDK
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AUqL3cvaCIGDXcwEmA1goqRftEzPvkImUriLAJaHAO7leEhoMt4WqsvpXrF6NMSnPNc6eNiK7OP_Wxy4&components=buttons,funding-eligibility`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Inicializar los botones de PayPal una vez que se cargue el SDK
            window.paypal.Buttons({
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toFixed(2) // Asegúrate de que sea una cadena
                            }
                        }],
                    });
                },
                onApprove: function (data, actions) {
                    return fetch(`/compra/process/${data.orderID}`)
                        .then(response => {
                            if (!response.ok) {
                                return response.json().then(errorData => {
                                    throw new Error(errorData.error || 'Network response was not ok');
                                });
                            }
                            return response.json();
                        })
                        .then(orderData => {
                            if (orderData.error) {
                                throw new Error(orderData.error);
                            }
                            alert(`Transacción completada con ID de Compra: ${orderData.compra_id}`);
                            setTimeout(() => {
                                Inertia.visit('/compras'); // Reemplaza con tu URL de destino
                            }, 2000);
                        })
                        .catch(error => {
                            console.error('Hubo un error procesando el pedido:', error);
                            alert(`Ha ocurrido un error al realizar el pago: ${error.message}`);
                        });
                },
                onError: function (err) {
                    console.log(err);
                    alert("Ha ocurrido un error al realizar el pago, intentar más tarde");
                }
            }).render('#paypal-button-container'); // Renderiza el botón de PayPal en este div
        };

        return () => {
            document.body.removeChild(script); // Limpia el script al desmontar
        };
    }, [total]); // Vuelve a ejecutar el efecto si cambia total

    return (
        <Layout>
            <div className="mx-auto max-w-5xl">
                <h2 className="text-xl font-semibold text-white sm:text-2xl">Métodos de Pago</h2>
                <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                    <div className="w-full lg:max-w-lg">
                        <div id="payment-buttons-container" className="mb-8">
                            <div id="paypal-button-container"></div>
                        </div>
                    </div>
                    <div className="mt-6 grow flex flex-col gap-2 sm:mt-8 lg:mt-0">
                        <div className="no-scrollbar space-y-4 rounded-lg border  p-6 border-neutral-700 bg-neutral-800">
                            <ul role="list" id="product-list" className="-my-6 divide-y divide-gray-200">
                                {carritos.map((carrito) => {
                                    const producto = carrito.producto;
                                    return (
                                        <li className="flex items-center py-6" key={producto.id}>
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-400 dark:border-gray-200">
                                                <img src= {producto.foto_prod} alt={producto.nombre_prod} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                                                        <h3><a href="#">{producto.nombre_prod}</a></h3>
                                                        <p className="ml-4">${(producto.precio * carrito.cantidad).toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-200">{producto.color}</p>
                                                </div>
                                                
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="space-y-4 rounded-lg border p-6 border-neutral-700 bg-neutral-800">
                            <div className="space-y-2">
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-neutral-300">Precio Original</dt>
                                    <dd className="text-sm font-medium text-neutral-300">${subtotal.toFixed(2)}</dd>
                                </dl>
                                <dl className="flex items-center justify-between gap-4">
                                    <dt className="text-neutral-300">Impuesto</dt>
                                    <dd className="text-sm font-medium text-neutral-300">${tax.toFixed(2)}</dd>
                                </dl>
                            </div>
                            <dl className="flex items-center justify-between gap-4 border-t border-neutral-200 pt-2">
                                <dt className="text-md font-bold text-neutral-300">Total</dt>
                                <dd className="text-md font-bold text-neutral-300">${total.toFixed(2)}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Payment;
