<?php

namespace App\Http\Controllers;

use App\Models\carrito;
use App\Models\User;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Auth; 
use Inertia\Inertia;

class CarritoController extends Controller
{
    public function addProducto($productoId)
    {
        try {
            ($productoId);
            // Crear o actualizar el carrito para el usuario
            $carrito = Carrito::where('user_id', Auth::id())->where('producto_id', $productoId)->first();

            if ($carrito) {
                // Actualiza la cantidad del producto en el carrito
                $carrito->cantidad = 1; // O ajusta según sea necesario
                $carrito->save();
            } else {
                // Crea una nueva entrada en el carrito
                Carrito::create([
                    'user_id' => Auth::id(),
                    'producto_id' => $productoId,
                    'cantidad' => 1 // O ajusta según sea necesario
                ]);
            }
            // Respuesta exitosa
            return response()->json(['success' => true, 'message' => 'Producto añadido al carrito', 'producto_id' => $productoId]);
        } catch (\Exception $e) {
            // Manejo de errores
            return response()->json(['success' => false, 'message' => 'Error al añadir el producto al carrito', 'error' => $e->getMessage()], 500);
        }
    }



    public function show()
    {
        $carritos = Carrito::where('user_id', Auth::id())->with('producto')->get();

        $items = $carritos->map(function ($carrito) {
            return [
                'productoId' => $carrito->producto->id,
                'nombre_prod' => $carrito->producto->nombre_prod,
                'precio' => $carrito->producto->precio,
                'cantidad' => $carrito->cantidad,
                'color' => $carrito->producto->color,
                'foto_prod' =>  $carrito->producto->foto_prod,
                'existencias' => $carrito->producto->existencias,
            ];
        });

        return response()->json(['items' => $items]);
    }




    // Eliminar un producto del carrito
    public function removeProducto($productoId)
    {
        // Buscar el carrito del usuario con el producto dado
        $carrito = Carrito::where('user_id', Auth::id())
            ->where('producto_id', $productoId)
            ->firstOrFail();
        // Eliminar el producto del carrito
        $carrito->delete();
        return response()->json(['success' => true, 'message' => 'Producto eliminado del carrito']);
    }


    public function updateQuantity(Request $request)
    {
        try {
            $carrito = Carrito::where('user_id', Auth::id())
                ->where('producto_id', $request->productoId)
                ->firstOrFail();

            $carrito->cantidad = $request->cantidad;
            $carrito->save();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function getCartTotal()
    {
        $carritos = Carrito::where('user_id', Auth::id())->with('producto')->get();
        $subtotal = 0;
        foreach ($carritos as $carrito) {
            $subtotal += $carrito->producto->precio * $carrito->cantidad;
        }
        $tax = $subtotal * 0.15; // 15% de IVA
        $total = $subtotal + $tax;
        return response()->json([
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
        ]);
    }

    public function pago()
    {
        $carritos = Carrito::where('user_id', Auth::id())->with('producto')->get();
        $user = User::Where('id', Auth::id());
        $subtotal = 0;

        foreach ($carritos as $carrito) {
            $subtotal += $carrito->producto->precio * $carrito->cantidad;
        }

        $tax = $subtotal * 0.15;
        $total = $subtotal + $tax;

        
        return Inertia::render('Productos/pago', [
            'carritos' => $carritos,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'total' => $total,
            'user' => $user,
        ]);
    }
}
