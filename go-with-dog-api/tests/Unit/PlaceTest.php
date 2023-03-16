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
    public function it_belongs_to_a_user()
    {
        $user = User::factory()->create();
        $place = Place::factory()->create(['user' => $user->id]);

        $this->assertInstanceOf(User::class, $place->user);
        $this->assertEquals($user->id, $place->user->id);
    }

    /** @test */
    public function it_belongs_to_an_address()
    {
        $address = Address::factory()->create();
        $place = Place::factory()->create(['address' => $address->id]);

        $this->assertInstanceOf(Address::class, $place->address);
        $this->assertEquals($address->id, $place->address->id);
    }

    /** @test */
    public function it_belongs_to_a_category()
    {
        $category = Category::factory()->create();
        $place = Place::factory()->create(['category' => $category->id]);

        $this->assertInstanceOf(Category::class, $place->category);
        $this->assertEquals($category->id, $place->category->id);
    }
}
