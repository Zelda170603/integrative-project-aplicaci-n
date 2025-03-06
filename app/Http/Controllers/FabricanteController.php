<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fabricante; 
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Role;
use App\Models\User;
use App\Models\Compra;
use Inertia\Inertia;
use App\Models\Compra_producto;
use App\Models\Producto;
use Illuminate\Support\Facades\Hash;

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;



class FabricanteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Fabricantes/index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    { 
        return Inertia::render('Auth/Register_as_fabricante');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de usuario y fabricante
        $validated = $request->validate([
            // Datos de usuario
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',

            // Datos de fabricante
            'nombre' => 'required|string|max:100',
            'foto_fabr' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'ubicacion' => 'required|string|max:100',
            'descripcion' => 'required|string|max:500',
            'direccion' => 'required|string|max:100', 
            'telefono' => 'required|numeric',
        ]); 

        // Manejar el archivo de imagen si existe
        if ($request->hasFile('foto_fabr')) {
            $imageName = time() . '.' . $request->foto_fabr->extension();
            $request->foto_fabr->storeAs('public/images/fabricantes', $imageName);
            $validated['foto_fabr'] = $imageName;
        }

        // Generar unique_id para el fabricante
        $validated['unique_id'] = Str::random(10);

        // Crear un nuevo registro de Fabricante
        $fabricante = Fabricante::create($validated);

        $user = User::create([
            'email' => $validated['email'],
            'name'=> $validated['nombre'],
            'password' => Hash::make($validated['password']),
        ]);

        // Crear el rol y asociarlo al usuario y al fabricante
        Role::create([
            'user_id' => $user->id,
            'role_type' => 'fabricante',
            'roleable_id' => $fabricante->id,
            'roleable_type' => Fabricante::class,
        ]);
        event(new Registered($user));

        Auth::login($user); 
        return redirect()->route('productos.index_admin')->with('success', 'Fabricante creado exitosamente');
    }

    public function showAllOrders()
    {
        // Obtener el ID del fabricante
        $fabricante = Auth::user()->role->roleable;
        $fabricanteId = $fabricante->id;

        // Obtener todos los datos de los productos de compra para el fabricante
        $compras = Compra_Producto::where('fabricante_id', $fabricanteId)
            ->with('compra', 'producto') // Cargar la relación con Compra y Producto
            ->get()
            ->groupBy('compra_id'); // Agrupar por ID de compra

        // Pasar los datos a la vista
        return Inertia::render('Fabricantes/Compras',["compras" => $compras]); 
    }

    public function showPendingOrders()
    {
        // Obtener el ID del fabricante
        $fabricante = Auth::user()->role->roleable;
        $fabricanteId = $fabricante->id;

        // Obtener todas las compras pendientes para el fabricante
        $comprasPendientes = Compra_Producto::where('fabricante_id', $fabricanteId)
            ->whereHas('compra', function ($query) {
                $query->where('status', 'pendiente'); // Filtrar solo compras pendientes
            })
            ->with('compra', 'producto') // Cargar la relación con Compra y Producto
            ->get()
            ->groupBy('compra_id'); // Agrupar por ID de compra

        // Pasar los datos a la vista
        return view('Administracion.Fabricante.compras-pendientes', ['comprasPendientes' => $comprasPendientes]);
    }

    public function showCancellOrders()
    {
        // Obtener el ID del fabricante
        $fabricante = Auth::user()->role->roleable;
        $fabricanteId = $fabricante->id;

        // Obtener todas las compras pendientes para el fabricante
        $comprasCanceladas = Compra_Producto::where('fabricante_id', $fabricanteId)
            ->whereHas('compra', function ($query) {
                $query->where('status', 'cancelada'); // Filtrar solo compras canceladas
            })
            ->with('compra', 'producto') // Cargar la relación con Compra y Producto
            ->get()
            ->groupBy('compra_id'); // Agrupar por ID de compra

        // Pasar los datos a la vista
        return view('Administracion.Fabricante.compras-canceladas', ['comprasCanceladas' => $comprasCanceladas]);
    }

    public function showCompletedOrders()
    {
        // Obtener el ID del fabricante
        $fabricante = Auth::user()->role->roleable;
        $fabricanteId = $fabricante->id;

        // Obtener todas las compras pendientes para el fabricante
        $comprascompletadas = Compra_Producto::where('fabricante_id', $fabricanteId)
            ->whereHas('compra', function ($query) {
                $query->where('status', 'completada'); // Filtrar solo compras completadas
            })
            ->with('compra', 'producto') // Cargar la relación con Compra y Producto
            ->get()
            ->groupBy('compra_id'); // Agrupar por ID de compra

        // Pasar los datos a la vista
        return view('Administracion.Fabricante.compras-completadas', ['comprasCompletadas' => $comprascompletadas]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fabricante $fabricante)
    {
        return view('fabricantes.fabricante')->with('fabricante', $fabricante);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fabricante $fabricante)
    {
        return view('fabricantes.edit')->with('fabricante', $fabricante);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validar los datos de entrada
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'foto_fabr' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'ubicacion' => 'required|string|max:100',
            'descripcion' => 'required|string|max:500',
            'direccion' => 'required|string|max:100',
            'correo' => 'required|string|email|max:100',
            'telefono' => 'required|numeric',
        ]);

        $fabricante = Fabricante::findOrFail($id);

        // Manejar el archivo de imagen
        if ($request->hasFile('foto_fabr')) {
            // Eliminar la imagen anterior si existe
            if ($fabricante->foto_fabr && Storage::exists('public/images/fabricantes/' . $fabricante->foto_fabr)) {
                Storage::delete('public/images/fabricantes/' . $fabricante->foto_fabr);
            }
            // Subir la nueva imagen
            $imageName = time() . '.' . $request->foto_fabr->extension();
            $request->foto_fabr->storeAs('public/images/fabricantes', $imageName);
            $validated['foto_fabr'] = $imageName;
        } else {
            // Mantener la foto actual si no se ha subido una nueva
            $validated['foto_fabr'] = $request->current_foto_fabr;
        }

        // Actualizar el registro de Fabricante
        $fabricante->update($validated);

        return redirect()->route('fabricantes.edit', $fabricante->id)->with('success', 'Fabricante actualizado exitosamente');
    }

    // Método para eliminar el fabricante
    public function destroy(Fabricante $fabricante)
    {
        $fabricante->delete();
        return redirect()->route('fabricantes.index')->with('success', 'Fabricante eliminado con éxito.');
    }

    public function get_products()
    {
        $fabricante = Fabricante::find(Auth::user()->role->roleable_id);
        $productos = Producto::where('id_fabricante', $fabricante->id)->paginate(15);
        return view("Administracion.Fabricante.productos")->with('productos', $productos);
    }

    public function get_reviews()
    {
        // Get the authenticated user's fabricante
        $fabricante = Fabricante::find(Auth::user()->role->roleable_id);

        // Retrieve products related to the fabricante, including their reviews
        $productos = Producto::with(['calificaciones.user']) // Eager load calificaciones and the associated user
            ->where('id_fabricante', $fabricante->id)
            ->paginate(15);

        // Prepare reviews data
        $reviews = [];

        foreach ($productos as $producto) {
            foreach ($producto->calificaciones as $calificacion) {
                $reviews[] = [
                    'producto' => $producto,
                    'calificacion' => $calificacion,
                    'buyer' => $calificacion->user, // Directly get the user from calificacion
                ];
            }
        }

        return view("Administracion.Fabricante.comentarios", compact('reviews'));
    }
}
