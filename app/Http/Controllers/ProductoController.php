<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\View;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index_admin()
    {
        $productos = Producto::where('id_fabricante', Auth::user()->role->roleable_id)->get();

        return Inertia::render('Productos/Index_admin', [
            'prods' => $productos
        ]);
    }

    public function index()
    {
        $productos = Producto::all();
        return Inertia::render('Productos/Index', [
            'productos' => $productos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Productos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos antes de guardarlos
        $validated = $request->validate([
            'nombre_prod' => 'required|string|max:100',
            'descripcion' => 'required|string|max:400',
            'precio' => 'required|integer',
            'color' => 'required|string|max:100',
            'grupo_usuarios' => 'required|string|max:100',
            'existencias' => 'required|integer',
            'tipo_producto' => 'required|in:protesis,ortesis,ortopedicos',
            'foto_prod' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $validated['id_fabricante'] = Auth::user()->role->roleable_id;
        // Manejar la foto principal
        if ($request->hasFile('foto_prod')) {
            $imageName = time() . '_main.' . $request->file('foto_prod')->extension();
            $request->file('foto_prod')->move(public_path('images/productos'), $imageName);
            $validated['foto_prod'] = $imageName;
        }

        Producto::create($validated);
        return redirect()->route('productos.index_admin')->with('success', 'Producto creado exitosamente');
    }



    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        return Inertia::render('Productos/Edit', [
            'producto' => $producto, // Aquí pasamos el producto específico
        ]);
    }
    public function searchByName(Request $request)
    {
        $searchTerm = $request->input('searchTerm');
        $productos = Producto::where('nombre_prod', 'LIKE', '%' . $searchTerm . '%')->get();
        $html = '';

        $html = View::make('productos.partials.search_result', ['productos' => $productos])->render();
        $response = ['html' => $html];
        return response()->json($response);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        // Validación de los datos entrantes
        $validated = $request->validate([
            'nombre_prod' => 'required|string|max:100',
            'descripcion' => 'required|string|max:400',
            'precio' => 'required|integer',
            'color' => 'required|string|max:100',
            'grupo_usuarios' => 'required|string|max:100',
            'existencias' => 'required|integer',
            'tipo_producto' => 'required|in:protesis,ortesis,ortopedicos',
            'foto_prod' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        // Actualizar los datos del producto
        $producto->nombre_prod = $validated['nombre_prod'];
        $producto->descripcion = $validated['descripcion'];
        $producto->precio = $validated['precio'];
        $producto->color = $validated['color'];
        $producto->grupo_usuarios = $validated['grupo_usuarios'];
        $producto->existencias = $validated['existencias'];
        $producto->tipo_producto = $validated['tipo_producto'];

        // Manejo de la imagen
        if ($request->hasFile('foto_prod')) {
            // Borrar la imagen anterior si existe
            if ($producto->foto_prod) {
                $oldImagePath = public_path('images/productos/' . $producto->foto_prod);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Guardar la nueva imagen
            $imageName = time() . '_main.' . $request->file('foto_prod')->extension();
            $request->file('foto_prod')->move(public_path('images/productos'), $imageName);
            $producto->foto_prod = $imageName; // Actualizar el nombre de la imagen en la base de datos
        }

        // Guardar los cambios en la base de datos
        $producto->save();

        // Redirigir con un mensaje de éxito
        return redirect()->route('productos.index')->with('success', 'Producto actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();
        return redirect()->route('productos.index_admin')->with('success', 'Producto eliminado exitosamente');
    }
}
