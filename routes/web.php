<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\FabricanteController;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {

    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name("home");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


// Rutas de productos
Route::controller(ProductoController::class)->group(function () {
    Route::middleware('fabricante')->group(function () {
        Route::get('fabricante/productos/create', 'create')->name('productos.create');
        Route::get('fabricante/productos', 'index_admin')->name('productos.index_admin');
        Route::post('fabricante/productos', 'store')->name('productos.store');
        Route::get('fabricante/productos/{producto}/edit', 'edit')->name('productos.edit');
        Route::put('fabricante/productos/{producto}', 'update')->name('productos.update');
        Route::delete('fabricante/productos/{producto}', 'destroy')->name('productos.destroy');
    });
    // Subgrupo sin middleware'
    Route::get('/productos', 'index')->name('productos.index');
    Route::post('/productos/searchByName', 'searchByName')->name('productos.searchByName');
    Route::get('/productos/{producto}', 'show')->name('productos.show');
});

// Rutas de compras
Route::middleware('auth')->controller(CompraController::class)->group(function () {
    Route::get('/compra/process/{orderId}', 'process')->name('payment.process');
    Route::get('/producto/pago', 'pago')->name("productos.pago");
    Route::get('/compras', 'show')->name('mis_compras');
});

// Rutas de carrito
Route::middleware('auth')->controller(CarritoController::class)->group(function () {
    Route::post('carrito/store/{productoId}', 'addProducto')->name('carrito.add');
    Route::get('carrito', 'show');
    Route::put('carrito/update', 'updateQuantity')->name("carrito.update");
    Route::delete('carrito/delete/{productoId}', 'removeProducto')->name("carrito.delete");
});

Route::controller(FabricanteController::class)->group(function () {
    Route::get('fabricante/index', 'index')->name('fabricante.index');
    Route::get('Administracion/fabricante/productos', 'get_products')->name('get_productos');
    Route::get('register/fabricante', 'create')->name('fabricantes.create');
    Route::post('register/fabricante', 'store')->name('fabricantes.store');
    Route::get('fabricante/productos/compras', "showAllOrders")->name('showOrders');
})->middleware('fabricante');


Route::controller(UsuariosController::class)->group(function () {
    Route::get('Admin/usuarios', 'index')->name('usuarios.index');
    Route::get('Admin/usuarios/create', 'create')->name('usuarios.create');
    Route::post('Admin/usuarios', 'store')->name('usuarios.store');
    Route::get('Admin/usuarios/{id}/edit', 'edit')->name('usuarios.edit');
    Route::put('Admin/usuarios/{id}', 'update')->name('usuarios.update');
    Route::delete('Admin/usuarios/{id}', 'destroy')->name('usuarios.destroy');
})->middleware('administrador');

Route::controller(AdminController::class)->group( function(){
        Route::get('Admin/index', 'index')->name('Admin.index');
        Route::get('Admin/productos', 'productos')->name('Admin.productos');
        Route::get('Admin/compras', 'compras')->name('Admin.compras');
    }
)->middleware('administrador');