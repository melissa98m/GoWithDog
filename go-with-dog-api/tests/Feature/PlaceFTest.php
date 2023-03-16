<?php
use App\Models\Address;
use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PlaceFTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_create_a_new_place()
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $address = Address::factory()->create();
        $category = Category::factory()->create();

        $image = UploadedFile::fake()->image('place.jpg');
        $data = [
            'place_name' => 'New Place',
            'place_description' => 'This is a new place',
            'place_image' => $image,
            'user' => $user->id,
            'address' => $address->id,
            'category' => $category->id
        ];

        $response = $this->post('/places', $data);

        $response->assertRedirect('/places');
        $this->assertDatabaseHas('places', ['place_name' => 'New Place']);
        Storage::disk('public')->assertExists('images/places/' . $image->hashName());
    }
}
