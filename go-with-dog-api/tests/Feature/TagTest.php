<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Tag;

class TagTest extends TestCase
{
    //use RefreshDatabase; // Réinitialise la base de données à chaque test
    /**
     * A basic feature test example.
     *
     * @return void
     */
    /**
     * Teste si la page de la liste des tags est accessible
     *
     * @return void
     */
    public function testIndex(): void
    {
        $response = $this->get('/api/tags');

        $response->assertStatus(200);

    }
    /**
     * Teste si l'API peut créer un tag
     *
     * @return void
     */
    public function testCreateTag(): void
    {
        $data = [
            'id' => "1000",
            'tag_name' => 'test',
            'color' => '#0000'
        ];

        $response = $this->postJson('/api/tags', $data);

        $response->assertStatus(200);
    }
    /**
     * Teste si l'API peut modifier un tag existant
     *
     * @return void
     */
    public function testUpdateTag()
    {

        $data = [
            'tag_name' => 'test',
            'color' => '#05704'
        ];
        $response = $this->putJson("/api/tags/1000", $data);
        $response->assertStatus(200);

    }
    /**
     * Teste si l'API peut supprimer un tag existant
     *
     * @return void
     */
    public function testDeleteTag()
    {


        $response = $this->delete("/api/tags/1000");
        $response->assertStatus(204);
    }


}
