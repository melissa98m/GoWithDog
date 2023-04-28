<?php

use Illuminate\Foundation\Auth\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthTest extends TestCase
{
    //use RefreshDatabase;
    use WithFaker;

    public function test_can_login_with_valid_credentials()
    {
        // Créer un utilisateur de test
        $user = factory(User::class)->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Effectuer une requête POST avec des informations d'identification valides
        $response = $this->post('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'password123',
        ]);

        // Vérifier que la requête a réussi
        $response->assertStatus(200);

        // Vérifier que la réponse contient les informations attendues
        $response->assertJsonStructure([
            'status',
            'user' => [
                'id',
                'name',
                'email',
                'created_at',
                'updated_at',
            ],
            'token',
        ]);

        // Vérifier que le jeton JWT est valide et peut être utilisé pour authentifier les requêtes ultérieures
        $token = $response->json('token');
        Auth::setToken($token);
        $this->assertTrue(Auth::check());
    }

    public function test_cannot_login_with_invalid_credentials()
    {
        // Créer un utilisateur de test
        $user = factory(User::class)->create([
            'email' => 'testuser@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Effectuer une requête POST avec des informations d'identification invalides
        $response = $this->post('/api/login', [
            'email' => 'testuser@example.com',
            'password' => 'wrongpassword',
        ]);

        // Vérifier que la requête a échoué avec un code d'erreur 401
        $response->assertStatus(401);

        // Vérifier que la réponse contient le message d'erreur attendu
        $response->assertJson([
            'status' => 'error',
            'message' => 'Unauthorized',
        ]);

        // Vérifier que l'utilisateur n'est pas authentifié
        $this->assertFalse(Auth::check());
    }
}
