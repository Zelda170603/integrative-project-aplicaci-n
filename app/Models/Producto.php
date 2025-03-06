<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    
    protected $table = 'productos';

    // Atributos que se pueden llenar en las operaciones de creación/edición
    protected $fillable = [
        'nombre_prod',
        'foto_prod',
        'descripcion',
        'precio',
        'color',
        'grupo_usuarios',
        'existencias',
        'tipo_producto', 
        'id_fabricante',
    ];

    public function fabricante()
    {
        return $this->belongsTo(Fabricante::class, 'id_fabricante');
    } 

    public function compras()
    {
        return $this->hasMany(Compra_producto::class, 'producto_id');
    }
}
