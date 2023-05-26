<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Model\Address;
use App\Model\Category;
use App\Model\Tag;
use App\Model\User;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        User::factory()->time(2)->create();
        Address::factory()->time(2)->create();
        Category::factory()->time(2)->create();
        Tag::factory()->time(2)->create();

    }
}
