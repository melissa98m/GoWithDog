<?php
use App\Models\Address;
use App\Models\Category;
use App\Models\Place;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PlaceTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function test_places_listed_successfully()
    {
        $this->json('GET', 'api/places', ['Accept' => 'application/json'])
            ->assertStatus(200);
    }

}
