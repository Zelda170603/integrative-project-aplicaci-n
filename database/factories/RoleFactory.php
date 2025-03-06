<?php
namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition()
    {
        return [
            'user_id' => null, // Will be set manually
            'role_type' => 'fabricante',
            'roleable_id' => null, // Will be set manually
            'roleable_type' => \App\Models\Fabricante::class, // Will be set manually
        ];
    }
}
