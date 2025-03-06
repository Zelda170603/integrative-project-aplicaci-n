import React   from 'react';

const AddToCartButton = ({ productId, onAddToCart }) => {
    
    const handleAddToCart = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch(`/carrito/store/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json(); // Cambia a .json() ya que la respuesta ahora es JSON
            console.log('Response:', data); // Log de la respuesta
    
            if (data.success) {
                alert(data.message);  
                if (onAddToCart) {
                    onAddToCart(data.product); // Asegúrate de que `data.product` contenga el producto añadido
                }
            } else {
                alert(data.message); // Muestra el mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al procesar tu solicitud.');
        }
    };
    
    return (
        <button
            type="button"
            data-product-id={productId}
            className="add-to-cart inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleAddToCart}
        >
            <svg
                className="-ms-2 me-2 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
            </svg>
            Add to cart
        </button>
    );
};

export default AddToCartButton;
