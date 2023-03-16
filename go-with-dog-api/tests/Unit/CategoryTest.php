<?php

use App\Models\Category;
use App\Models\Place;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_has_many_places()
    {
        $category = Category::factory()->create();
        $place1 = Place::factory()->create(['category_id' => $category->id]);
        $place2 = Place::factory()->create(['category_id' => $category->id]);

        $places = $category->places();

        $this->assertInstanceOf('Illuminate\Database\Eloquent\Relations\HasMany', $places);
        $this->assertEquals(2, $places->count());
        $this->assertTrue($places->get()->contains($place1));
        $this->assertTrue($places->get()->contains($place2));
    }
}
