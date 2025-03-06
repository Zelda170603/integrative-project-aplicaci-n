<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role')->get();
        return Inertia::render('Usuarios/index', ['usuarios' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Usuarios/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'estado' => 'required|string|max:255',
        ]);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'estado' => $request->estado,
        ]);

        Role::create([
            'user_id' => $user->id,
            'role_type' => 'User',
            'roleable_id' => $user->id,
            'roleable_type' => User::class,
        ]);
        
        return Inertia::render('Usuarios/index');
    }
    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Usuarios/Show', ['usuario' => $user]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Usuarios/Edit', ['usuario' => $user]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id'
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role_id' => $request->role_id,
        ]);

        return redirect()->route('usuarios.index')->with('success', 'Usuario actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    { 
        $user = User::where('id', $request->id);
        $user->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuario eliminado con éxito.');
    }
}
