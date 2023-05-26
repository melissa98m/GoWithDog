<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Model\Address;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'address' => $this->faker->text(50),
            'postal_code' => '38400',
            'city' => $this->faker->text(50),
            'latitude'=> '52.20',
            'longitude' => '56.32'
        ];
    }
}
