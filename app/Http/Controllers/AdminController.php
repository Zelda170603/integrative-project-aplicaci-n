<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Producto;
use App\Models\Compra;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Admin/index'
        );
    }

    public function productos()
    {
        $productos = Producto::with('fabricante')->get();
        return Inertia::render(
            'Admin/productos',
            [
                'prods' => $productos
            ]
        );
    }

    public function compras()
    {
        $compras = Compra::with('compraProductos.producto')->get();
        if ($compras->isEmpty()) {
            $compras = collect(); // Asegurarse de que siempre se pase una colección vacía
        }
        return Inertia::render('Admin/compras', ['compras' => $compras]); // Cambiado 'compra' a 'compras'

    }
}
